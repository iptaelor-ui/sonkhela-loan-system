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

function wrap(title: string, headerColor: string, inner: string) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:580px;margin:0 auto;border:1px solid #d4e8db;border-radius:12px;overflow:hidden;">
    <div style="background:${headerColor};padding:24px 28px;">
      <div style="color:#fff;font-size:1.2rem;font-weight:bold;">Sonkhela Soft Loans</div>
      <div style="color:rgba(255,255,255,0.75);font-size:0.85rem;margin-top:3px;">${title}</div>
    </div>
    <div style="padding:28px;color:#0d1f14;font-size:0.95rem;line-height:1.7;">
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
    const trackUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://sonkhela.com"}/track?id=${applicationNumber}`;

    // ── 1. Confirmation email to the client ─────────────────────────────
    const clientHtml = wrap(
      "Application Received",
      "#145f39",
      `
      <p>Dear ${firstName},</p>
      <p>Thank you for applying to <strong>Sonkhela Soft Loans</strong>. We have received your application and our team will review it shortly.</p>

      <div style="background:#f4fbf6;border:1px solid #d4e8db;border-radius:10px;padding:20px;margin:20px 0;">
        <p style="margin:0 0 12px;font-weight:bold;color:#145f39;">Your Application Summary</p>
        <table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
          <tr><td style="padding:6px 0;color:#6b7c72;">Application Number</td><td style="text-align:right;font-weight:800;font-family:monospace;">${applicationNumber}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7c72;">Loan Type</td><td style="text-align:right;font-weight:700;">${loanName}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7c72;">Amount Requested</td><td style="text-align:right;font-weight:700;">${fmtK(loanAmount)}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7c72;">Repayment Period</td><td style="text-align:right;font-weight:700;">${repaymentPeriod} week${Number(repaymentPeriod) > 1 ? "s" : ""}</td></tr>
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
        <a href="${trackUrl}" style="display:inline-block;background:#F97316;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
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
        <table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
          <tr><td style="padding:6px 0;color:#6b7280;">Application No.</td><td style="text-align:right;font-weight:800;font-family:monospace;">${applicationNumber}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;">Name</td><td style="text-align:right;font-weight:700;">${fullName}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;">Phone</td><td style="text-align:right;font-weight:700;">${phone}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;">Email</td><td style="text-align:right;font-weight:700;">${email || "—"}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;">Loan Type</td><td style="text-align:right;font-weight:700;">${loanName}</td></tr>
          <tr style="border-top:2px solid #c7d2fe;"><td style="padding:8px 0;color:#6b7280;font-weight:bold;">Amount</td><td style="text-align:right;font-weight:800;font-size:1.1rem;color:#0B1F4D;">${fmtK(loanAmount)}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;">Repayment Period</td><td style="text-align:right;font-weight:700;">${repaymentPeriod} week${Number(repaymentPeriod) > 1 ? "s" : ""}</td></tr>
        </table>
      </div>

      <p>
        <a href="https://admin.sonkhela.com" style="display:inline-block;background:#145f39;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
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
