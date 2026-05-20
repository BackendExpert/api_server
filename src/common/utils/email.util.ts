import nodemailer, { Transporter } from "nodemailer";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: this.configService.get<string>("EMAIL_USER"),
        pass: this.configService.get<string>("EMAIL_PASSWORD")
      },
    });
  }

  async sendOTP(
    email: string,
    authlink: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    const projectName = this.configService.get<string>("PROJECT_NAME");

    await this.transporter.sendMail({
      from: `"${projectName}" <${this.configService.get<string>("EMAIL_USER")}>`,
      to: email,
      subject: `${projectName} - Secure Verification Link`,
      text: `Your verification link is ${authlink}. It expires in 10 minutes. IP: ${ipAddress}, Device: ${userAgent}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body style="margin:0; padding:0; font-family:Arial, sans-serif;">

  <div style="max-width:600px; margin:40px auto; border-radius:16px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.1);">

    <!-- Header -->
    <div style="background:#4f46e5; padding:28px; text-align:center;">
      <h1 style="margin:0; color:#ffffff; font-size:22px;">
        ${projectName}
      </h1>
      <p style="margin:6px 0 0; color:#c7d2fe; font-size:13px;">
        Secure Access Verification
      </p>
    </div>

    <!-- Body -->
    <div style="padding:30px; text-align:center; background:#ffffff;">

      <h2 style="color:#111827; margin-bottom:10px;">
        Verify Your Login
      </h2>

      <p style="color:#6b7280; font-size:14px; line-height:1.5;">
        We received a login request for your account. Click the button below to continue securely.
      </p>

      <!-- Button -->
      <a href="${authlink}"
         style="display:inline-block; margin:24px 0; padding:12px 26px; background:#4f46e5; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600;">
        Verify Account
      </a>

      <p style="color:#ef4444; font-size:12px; font-weight:600;">
        This link expires in 10 minutes
      </p>

      <!-- Security Info -->
      <div style="margin-top:24px; text-align:left; background:#f9fafb; padding:14px; border-radius:8px; font-size:12px; color:#374151;">
        <p style="margin:0 0 6px;"><strong>Security Details</strong></p>
        <p style="margin:0;">IP Address: ${ipAddress || "N/A"}</p>
        <p style="margin:0;">Device: ${userAgent || "N/A"}</p>
      </div>

    </div>

    <!-- Footer -->
    <div style="background:#f3f4f6; text-align:center; padding:14px; font-size:12px; color:#6b7280;">
      © ${new Date().getFullYear()} ${projectName} • Secure Authentication System
    </div>

  </div>

</body>
</html>
`,
    });
  }

  async NotificationEmail(
    email: string,
    notification: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    const projectName = this.configService.get<string>("PROJECT_NAME");

    await this.transporter.sendMail({
      from: `"${projectName}" <${this.configService.get<string>("EMAIL_USER")}>`,
      to: email,
      subject: `${projectName} - System Notification`,
      text: `${projectName}: ${notification}. IP: ${ipAddress}, Device: ${userAgent}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background:#0f172a; font-family:Arial, sans-serif;">

  <div style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.2);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#10b981,#06b6d4); padding:30px; text-align:center;">
      <h1 style="margin:0; color:white; font-size:22px; letter-spacing:1px;">
        ${projectName}
      </h1>
      <p style="margin:8px 0 0; color:#d1fae5; font-size:14px;">
        System Notification
      </p>
    </div>

    <!-- Body -->
    <div style="padding:30px; text-align:center;">

      <div style="display:inline-block; padding:8px 14px; background:#ecfdf5; color:#10b981; border-radius:999px; font-size:12px; font-weight:600; margin-bottom:15px;">
        New Update
      </div>

      <h2 style="color:#111827; margin-bottom:10px;">
        Notification
      </h2>

      <p style="color:#6b7280; font-size:14px; line-height:1.5;">
        You have received a system update from <strong>${projectName}</strong>.
      </p>

      <!-- Notification Card -->
      <div style="margin:25px 0; padding:18px; background:#f0fdf4; border-left:4px solid #10b981; border-radius:10px; text-align:left;">
        <p style="margin:0; font-size:15px; color:#065f46; font-weight:600;">
          ${notification}
        </p>
      </div>

      <!-- Info Box -->
      <div style="margin-top:20px; text-align:left; background:#f9fafb; padding:15px; border-radius:10px; font-size:12px; color:#374151;">
        <p style="margin:0 0 6px;"><strong>Request Details</strong></p>
        <p style="margin:0;">IP Address: ${ipAddress || "N/A"}</p>
        <p style="margin:0;">Device: ${userAgent || "N/A"}</p>
      </div>

    </div>

    <!-- Footer -->
    <div style="background:#f3f4f6; text-align:center; padding:15px; font-size:12px; color:#6b7280;">
      © ${new Date().getFullYear()} ${projectName} • System Notification Service
    </div>

  </div>

</body>
</html>
        `,
    });
  }

  async APIKeyCreatedEmail(
    email: string,
    apiKey: string,
    requests: number
  ): Promise<void> {
    const projectName = this.configService.get<string>("PROJECT_NAME");

    await this.transporter.sendMail({
      from: `"${projectName}" <${this.configService.get<string>("EMAIL_USER")}>`,
      to: email,
      subject: `${projectName} - API Key Created Successfully`,
      text: `Your API Key has been created successfully.`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body style="margin:0; padding:0; background:#0f172a; font-family:Arial,sans-serif;">

  <div style="max-width:650px; margin:40px auto; background:#ffffff; border-radius:20px; overflow:hidden; box-shadow:0 15px 40px rgba(0,0,0,0.25);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed); padding:35px; text-align:center;">
      <div style="height:70px; width:70px; margin:auto; background:rgba(255,255,255,0.15); border-radius:18px; line-height:70px; font-size:30px;">
        🔑
      </div>

      <h1 style="margin:18px 0 5px; color:white; font-size:28px;">
        API Key Created
      </h1>

      <p style="margin:0; color:#c7d2fe; font-size:14px;">
        Your secure API access is now active
      </p>
    </div>

    <!-- Content -->
    <div style="padding:35px;">

      <h2 style="margin-top:0; color:#111827; font-size:22px;">
        Hello,
      </h2>

      <p style="color:#6b7280; line-height:1.7; font-size:15px;">
        Your API key has been successfully generated for
        <strong>${projectName}</strong>.
      </p>

      <!-- API KEY BOX -->
      <div style="margin:30px 0; background:#111827; border-radius:14px; padding:22px; text-align:center;">

        <p style="margin:0 0 12px; color:#9ca3af; font-size:12px; letter-spacing:1px;">
          YOUR API KEY
        </p>

        <p style="margin:0; color:#ffffff; font-size:16px; font-weight:bold; word-break:break-all;">
          ${apiKey}
        </p>

      </div>

      <!-- Stats -->
      <div style="display:flex; gap:15px; margin-top:25px;">

        <div style="flex:1; background:#eef2ff; padding:20px; border-radius:14px; text-align:center;">
          <p style="margin:0; color:#6366f1; font-size:13px; font-weight:600;">
            Monthly Requests
          </p>

          <h2 style="margin:10px 0 0; color:#111827; font-size:28px;">
            ${requests}
          </h2>
        </div>

        <div style="flex:1; background:#ecfeff; padding:20px; border-radius:14px; text-align:center;">
          <p style="margin:0; color:#0891b2; font-size:13px; font-weight:600;">
            Status
          </p>

          <h2 style="margin:10px 0 0; color:#111827; font-size:28px;">
            Active
          </h2>
        </div>

      </div>

      <!-- Warning -->
      <div style="margin-top:30px; background:#fef2f2; border-left:4px solid #ef4444; padding:18px; border-radius:10px;">
        <p style="margin:0; color:#991b1b; font-size:13px; line-height:1.6;">
          Never share your API key publicly. If your key becomes compromised,
          regenerate it immediately from your dashboard.
        </p>
      </div>

    </div>

    <!-- Footer -->
    <div style="background:#f8fafc; padding:18px; text-align:center;">
      <p style="margin:0; color:#6b7280; font-size:12px;">
        © ${new Date().getFullYear()} ${projectName} • API Management System
      </p>
    </div>

  </div>

</body>
</html>
`,
    });
  }

  async APIKeyLimitReachedEmail(
    email: string,
    apiKey: string,
    requests: number
  ): Promise<void> {
    const projectName = this.configService.get<string>("PROJECT_NAME");

    await this.transporter.sendMail({
      from: `"${projectName}" <${this.configService.get<string>("EMAIL_USER")}>`,
      to: email,
      subject: `${projectName} - Monthly API Limit Reached`,
      text: `You have reached your monthly API request limit.`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body style="margin:0; padding:0; background:#020617; font-family:Arial,sans-serif;">

  <div style="max-width:650px; margin:40px auto; background:#ffffff; border-radius:20px; overflow:hidden; box-shadow:0 15px 40px rgba(0,0,0,0.25);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#dc2626,#f97316); padding:35px; text-align:center;">

      <div style="height:75px; width:75px; margin:auto; background:rgba(255,255,255,0.15); border-radius:20px; line-height:75px; font-size:34px;">
        ⚠️
      </div>

      <h1 style="margin:18px 0 5px; color:white; font-size:28px;">
        API Limit Reached
      </h1>

      <p style="margin:0; color:#fee2e2; font-size:14px;">
        Your monthly request quota has been exhausted
      </p>

    </div>

    <!-- Content -->
    <div style="padding:35px;">

      <p style="color:#374151; line-height:1.7; font-size:15px;">
        Your API key has reached the maximum allowed monthly requests
        for <strong>${projectName}</strong>.
      </p>

      <!-- Usage Card -->
      <div style="margin:30px 0; background:#fff7ed; border:1px solid #fdba74; border-radius:16px; padding:25px;">

        <div style="text-align:center;">
          <p style="margin:0; color:#ea580c; font-size:13px; font-weight:600;">
            MONTHLY REQUESTS USED
          </p>

          <h1 style="margin:10px 0; color:#111827; font-size:42px;">
            ${requests}
          </h1>
        </div>

        <div style="margin-top:20px; background:#fed7aa; height:10px; border-radius:999px; overflow:hidden;">
          <div style="width:100%; height:100%; background:#ea580c;"></div>
        </div>

      </div>

      <!-- API KEY -->
      <div style="background:#0f172a; border-radius:14px; padding:20px;">

        <p style="margin:0 0 10px; color:#94a3b8; font-size:12px; text-align:center;">
          API KEY
        </p>

        <p style="margin:0; color:white; font-size:15px; word-break:break-all; text-align:center; font-weight:bold;">
          ${apiKey}
        </p>

      </div>

      <!-- Message -->
      <div style="margin-top:28px; background:#f8fafc; border-radius:14px; padding:20px;">

        <p style="margin:0; color:#475569; font-size:14px; line-height:1.7;">
          To continue using the API without interruption, upgrade your plan
          or wait until the next monthly reset cycle.
        </p>

      </div>

    </div>

    <!-- Footer -->
    <div style="background:#f1f5f9; text-align:center; padding:18px;">
      <p style="margin:0; color:#64748b; font-size:12px;">
        © ${new Date().getFullYear()} ${projectName} • API Usage Monitoring
      </p>
    </div>

  </div>

</body>
</html>
`,
    });
  }
}

