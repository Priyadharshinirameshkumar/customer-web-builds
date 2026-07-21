import { EmailTemplateOptions } from "../types/email.types";

export const buildEmailTemplate = ({
  title,
  previewText,
  bodyHtml,
}: EmailTemplateOptions) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, sans-serif; color: #111827;">
    <span style="display: none; max-height: 0; overflow: hidden;">${previewText}</span>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f3f4f6; padding: 24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);">
            <tr>
              <td style="background-color: #2563eb; padding: 24px 32px;">
                <h1 style="margin: 0; font-size: 24px; line-height: 1.3; color: #ffffff;">${title}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding: 20px 32px; background-color: #f9fafb; font-size: 12px; line-height: 1.5; color: #6b7280;">
                Customer Web Builds
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export const buildDetailRow = (label: string, value: string) => `
  <tr>
    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; width: 160px; font-size: 14px; color: #6b7280; vertical-align: top;">
      ${label}
    </td>
    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #111827; vertical-align: top;">
      ${value}
    </td>
  </tr>
`;
