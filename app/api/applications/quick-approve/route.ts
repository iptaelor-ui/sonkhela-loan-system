import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyApplicationToken } from "@/lib/approvalToken";

export async function POST(req: NextRequest) {
  try {
    const { id, token } = await req.json();

    if (!id || !token || !verifyApplicationToken(id, token)) {
      return NextResponse.json({ error: "Invalid or expired link." }, { status: 403 });
    }

    const { data: app, error: fetchErr } = await supabaseAdmin
      .from("applications")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchErr || !app) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }

    if (app.status !== "pending") {
      return NextResponse.json(
        { error: `This application has already been ${app.status}.` },
        { status: 409 }
      );
    }

    const { error: updateErr } = await supabaseAdmin
      .from("applications")
      .update({
        status: "approved",
        approved_without_record: true,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("status", "pending");

    if (updateErr) {
      return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }

    // Notify the client, if they gave an email
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_PASS;

    if (app.email && gmailUser && gmailPass) {
      const firstName = (app.full_name || "").split(" ")[0] || "there";

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPass },
      });

      await transporter.sendMail({
        from: `Sonkhela Soft Loans <${gmailUser}>`,
        to: app.email,
        subject: `Loan Approved — ${app.application_number}`,
        html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:580px;margin:0 auto;border:1px solid #d4e8db;border-radius:12px;overflow:hidden;">
          <div style="background:#145f39;padding:24px 20px;">
            <div style="color:#fff;font-size:1.2rem;font-weight:bold;">Sonkhela Soft Loans</div>
            <div style="color:rgba(255,255,255,0.75);font-size:0.85rem;margin-top:3px;">Application Approved</div>
          </div>
          <div style="padding:24px 20px;color:#0d1f14;font-size:0.95rem;line-height:1.7;">
            <p>Dear ${firstName},</p>
            <p>Good news — your loan application <strong>${app.application_number}</strong> has been <strong>approved</strong>.</p>
            <p>Please visit our office to complete the process and collect your funds. Bring your NRC and your collateral item.</p>
            <p>If you have any questions, simply reply to this email or call us directly.</p>
            <p style="margin-top:28px;padding-top:16px;border-top:1px solid #e8f0eb;color:#6b7c72;font-size:0.8rem;">
              Sonkhela Soft Loans · Lusaka, Zambia
            </p>
          </div>
        </div>`,
      });
    }

    return NextResponse.json({
      ok: true,
      applicationNumber: app.application_number,
      notified: Boolean(app.email),
    });
  } catch (err) {
    console.error("quick-approve error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
