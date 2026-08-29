import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const LOAN_NAMES: Record<string, string> = {
  collateral: "Collateral Backed Loan",
  payslip: "Payslip Backed Loan",
  student: "Student Loan",
  marketeer: "Marketeer Loan",
  business: "Business Loan",
  "white-book": "White Book Loan",
};

function fmtK(n: number | string) {
  return "K " + Number(n).toLocaleString("en", { minimumFractionDigits: 2 });
}

/**
 * One label/value pair, stacked. Label sits above the value, both left
 * aligned. This is the only layout that stays readable on a phone —
 * side-by-side columns squeeze long values like email addresses and force
 * the labels to wrap.
 */
function row(label: string, value: string, opts: { emphasis?: boolean } = {}) {
  const valueStyle = opts.emphasis
    ? "font-size:1.25rem;font-weight:800;color:#0B1F4D;"
    : "font-size:1rem;font-weight:700;color:#0d1f14;";

  return `
    <tr>
      <td style="padding:0 0 2px;">
        <span style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;">${label}</span>
      </td>
    </tr>
    <tr>
      <td style="padding:0 0 16px;word-break:break-word;${valueStyle}">${value}</td>
    </tr>`;
}

function divider() {
  return `
    <tr>
      <td style="padding:0 0 16px;">
        <div style="height:1px;background:#c7d2fe;line-height:1px;font-size:0;">&nbsp;</div>
      </td>
    </tr>`;
}

function wrap(title: string, headerColor: string, inner: string) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:580px;margin:0 auto;border:1px solid #d4e8db;border-radius:12px;overflow:hidden;">
    <div style="background:${headerColor};padding:24px 20px;">
      <div style="color:#fff;font-size:1.2rem;font-weight:bold;">Sonkhela Soft Loans</div>
      <div style="color:rgba(255,255,255,0.75);font-size:0.85rem;margin-top:3px;">${title}</div>
    </div>
    <div style="padding:24px 20px;color:#0d1f14;font-size:0.95rem;line-height:1.7;">
      ${inner}
      <p style="margin-top:28px;padding-top:16px;border-top:1px solid #e8f0eb;color:#6b7c72;font-size:0.8rem;">
        Sonkhela Soft Loans · Lusaka, Zambia
      </p>
    </div>
  </div>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      loanType,
      loanAmount,
      repaymentPeriod,
      applicationNumber,
    } = body;

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_PASS;
    const adminEmail = process.env.ADMIN_EMAIL || gmailUser;

    if (!gmailUser || !gmailPass) {
      console.error("GMAIL_USER / GMAIL_PASS not set");
      return NextResponse.json({ error: "Email not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });

    const loanName = LOAN_NAMES[loanType] || loanType;
    const firstName = (fullName || "").split(" ")[0] || "there";
    const weeks = `${repaymentPeriod} week${Number(repaymentPeriod) > 1 ? "s" : ""}`;
    const trackUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://sonkhela.com"}/track?id=${applicationNumber}`;

    // ── 1. Confirmation email to the client ─────────────────────────────
    const clientHtml = wrap(
      "Application Received",
      "#145f39",
      `
      <p>Dear ${firstName},</p>
      <p>Thank you for applying to <strong>Sonkhela Soft Loans</strong>. We have received your application and our team will review it shortly.</p>

      <div style="background:#f4fbf6;border:1px solid #d4e8db;border-radius:10px;padding:20px;margin:20px 0;">
        <p style="margin:0 0 16px;font-weight:bold;color:#145f39;">Your Application Summary</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
          ${row("Application Number", `<span style="font-family:monospace;">${applicationNumber}</span>`)}
          ${row("Loan Type", loanName)}
          ${row("Amount Requested", fmtK(loanAmount))}
          ${row("Repayment Period", weeks)}
        </table>
      </div>

      <p><strong>What happens next?</strong></p>
      <ul style="padding-left:18px;color:#4a5a50;">
        <li>Our team will review your application — usually same day.</li>
        <li>You will receive an email once a decision has been made.</li>
        <li>If approved, we will send you a secure agreement signing link.</li>
      </ul>

      <p>You can check your application status anytime:</p>
      <p>
        <a href="${trackUrl}" style="display:block;background:#F97316;color:#fff;padding:14px 24px;border-radius:8px;text-decoration:none;font-weight:bold;text-align:center;">
          Track My Application
        </a>
      </p>

      <p>If you have any questions, simply reply to this email or call us directly.</p>
      <p>We look forward to helping you.</p>
    `
    );

    // ── 2. Alert email to admin ──────────────────────────────────────────
    const adminHtml = wrap(
      "New Loan Application",
      "#0B1F4D",
      `
      <p>A new loan application has been submitted.</p>

      <div style="background:#f0f4ff;border:1px solid #c7d2fe;border-radius:10px;padding:20px;margin:20px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
          ${row("Application No.", `<span style="font-family:monospace;">${applicationNumber}</span>`)}
          ${row("Name", fullName)}
          ${row("Phone", `<a href="tel:${phone}" style="color:#0B1F4D;text-decoration:none;">${phone}</a>`)}
          ${row("Email", email ? `<a href="mailto:${email}" style="color:#1d4ed8;">${email}</a>` : "—")}
          ${row("Loan Type", loanName)}
          ${divider()}
          ${row("Amount", fmtK(loanAmount), { emphasis: true })}
          ${row("Repayment Period", weeks)}
        </table>
      </div>

      <p>
        <a href="https://admin.sonkhela.com" style="display:block;background:#145f39;color:#fff;padding:14px 24px;border-radius:8px;text-decoration:none;font-weight:bold;text-align:center;">
          Open Management System →
        </a>
      </p>
    `
    );

    const promises = [];

    // Send client confirmation only if they have an email
    if (email) {
      promises.push(
        transporter.sendMail({
          from: `Sonkhela Soft Loans <${gmailUser}>`,
          to: email,
          subject: `Application Received — ${applicationNumber}`,
          html: clientHtml,
        })
      );
    }

    // Always send admin alert
    promises.push(
      transporter.sendMail({
        from: `Sonkhela Soft Loans <${gmailUser}>`,
        to: adminEmail,
        subject: `🔔 New Application: ${fullName} — ${fmtK(loanAmount)}`,
        html: adminHtml,
      })
    );

    await Promise.all(promises);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("notify-application error:", err);
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 });
  }
}
