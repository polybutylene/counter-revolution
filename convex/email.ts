"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendLeadNotification = action({
  args: {
    leadName: v.string(),
    leadEmail: v.string(),
    leadPhone: v.string(),
    projectType: v.string(),
    materialPreference: v.string(),
    estimateLow: v.number(),
    estimateHigh: v.number(),
    timeline: v.string(),
    preferredContact: v.string(),
  },
  handler: async (ctx, args) => {
    const notificationEmail = process.env.NOTIFICATION_EMAIL;
    if (!notificationEmail) return;

    await resend.emails.send({
      from: "Stratum Co. <noreply@stratumco.com>",
      to: [notificationEmail],
      subject: `New Estimate Lead: ${args.leadName} — ${args.projectType}`,
      html: `
        <h2>New Estimate Request</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${args.leadName}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${args.leadEmail}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${args.leadPhone}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Project Type</td><td style="padding:8px;border:1px solid #ddd">${args.projectType}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Material</td><td style="padding:8px;border:1px solid #ddd">${args.materialPreference}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Estimate Range</td><td style="padding:8px;border:1px solid #ddd">$${args.estimateLow.toLocaleString()} — $${args.estimateHigh.toLocaleString()}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Timeline</td><td style="padding:8px;border:1px solid #ddd">${args.timeline}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Preferred Contact</td><td style="padding:8px;border:1px solid #ddd">${args.preferredContact}</td></tr>
        </table>
      `,
    });
  },
});

export const sendEstimateConfirmation = action({
  args: {
    customerEmail: v.string(),
    customerName: v.string(),
    estimateLow: v.number(),
    estimateHigh: v.number(),
    materialPreference: v.string(),
  },
  handler: async (ctx, args) => {
    await resend.emails.send({
      from: "Stratum Co. <noreply@stratumco.com>",
      to: [args.customerEmail],
      subject: "Your Estimate from Stratum Co.",
      html: `
        <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif">
          <div style="background:#1B3A5C;padding:24px;text-align:center">
            <h1 style="color:#fff;margin:0">Counter <span style="color:#C9942E">Revolution</span></h1>
          </div>
          <div style="padding:24px">
            <p>Hi ${args.customerName},</p>
            <p>Thank you for your interest! Here's a summary of your estimate:</p>
            <div style="background:#F5F2EC;border-radius:12px;padding:20px;margin:16px 0;text-align:center">
              <p style="font-size:14px;color:#666;margin:0">Your Estimated Range</p>
              <p style="font-size:28px;font-weight:bold;color:#1B3A5C;margin:8px 0">$${args.estimateLow.toLocaleString()} — $${args.estimateHigh.toLocaleString()}</p>
              <p style="font-size:14px;color:#666;margin:0">Material: ${args.materialPreference}</p>
            </div>
            <p>This is a ballpark estimate. A member of our team will contact you within 24 hours to discuss your project in detail and schedule a free in-home measurement.</p>
            <p>In the meantime, feel free to <a href="https://stratumco.com/portfolio" style="color:#C9942E">browse our portfolio</a> or <a href="https://stratumco.com/materials" style="color:#C9942E">explore materials</a>.</p>
            <p>Best regards,<br>The Stratum Co. Team</p>
          </div>
          <div style="background:#f5f5f5;padding:16px;text-align:center;font-size:12px;color:#999">
            <p>Stratum Co. · Panama City, FL · (850) 000-0000</p>
          </div>
        </div>
      `,
    });
  },
});

export const sendContactConfirmation = action({
  args: {
    customerEmail: v.string(),
    customerName: v.string(),
  },
  handler: async (ctx, args) => {
    await resend.emails.send({
      from: "Stratum Co. <noreply@stratumco.com>",
      to: [args.customerEmail],
      subject: "We received your message — Stratum Co.",
      html: `
        <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif">
          <div style="background:#1B3A5C;padding:24px;text-align:center">
            <h1 style="color:#fff;margin:0">Counter <span style="color:#C9942E">Revolution</span></h1>
          </div>
          <div style="padding:24px">
            <p>Hi ${args.customerName},</p>
            <p>Thank you for reaching out! We've received your message and a member of our team will get back to you within 24 hours.</p>
            <p>If you need immediate assistance, call us at <a href="tel:+18500000000" style="color:#C9942E">(850) 000-0000</a>.</p>
            <p>Best regards,<br>The Stratum Co. Team</p>
          </div>
        </div>
      `,
    });
  },
});

/**
 * Sends the customer their project code so they can log in to the tracker.
 */
export const sendProjectCodeEmail = action({
  args: {
    customerEmail: v.string(),
    customerName: v.string(),
    projectCode: v.string(),
    material: v.string(),
    edgeProfile: v.string(),
    estimatedCompletion: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const completionLine = args.estimatedCompletion
      ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Est. Completion</td><td style="padding:8px;border:1px solid #ddd">${args.estimatedCompletion}</td></tr>`
      : "";

    await resend.emails.send({
      from: "Stratum Co. <noreply@stratumco.com>",
      to: [args.customerEmail],
      subject: `Your Project Is Live — ${args.projectCode}`,
      html: `
        <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif">
          <div style="background:#1B3A5C;padding:24px;text-align:center">
            <h1 style="color:#fff;margin:0">Counter <span style="color:#C9942E">Revolution</span></h1>
          </div>
          <div style="padding:24px">
            <p>Hi ${args.customerName},</p>
            <p>Great news — your countertop project is officially underway! You can track every step of the process in real time using our <strong>Project Tracker</strong>.</p>
            <div style="background:#F5F2EC;border-radius:12px;padding:20px;margin:16px 0;text-align:center">
              <p style="font-size:14px;color:#666;margin:0">Your Project Code</p>
              <p style="font-size:32px;font-weight:bold;color:#1B3A5C;margin:8px 0;font-family:monospace;letter-spacing:2px">${args.projectCode}</p>
            </div>
            <table style="border-collapse:collapse;width:100%;margin:16px 0">
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Material</td><td style="padding:8px;border:1px solid #ddd">${args.material}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Edge Profile</td><td style="padding:8px;border:1px solid #ddd">${args.edgeProfile}</td></tr>
              ${completionLine}
            </table>
            <div style="text-align:center;margin:24px 0">
              <a href="https://stratumco.com/portal" style="display:inline-block;background:#C9942E;color:#1B3A5C;font-weight:bold;padding:14px 28px;border-radius:8px;text-decoration:none;font-size:16px">Track Your Project</a>
            </div>
            <p style="font-size:14px;color:#666">Log in with your email address (<strong>${args.customerEmail}</strong>) and the project code above.</p>
            <p>You can also send us messages directly through the tracker if you have questions at any point.</p>
            <p>Best regards,<br>The Stratum Co. Team</p>
          </div>
          <div style="background:#f5f5f5;padding:16px;text-align:center;font-size:12px;color:#999">
            <p>Stratum Co. · Panama City, FL · (850) 000-0000</p>
          </div>
        </div>
      `,
    });
  },
});

/**
 * Notifies the customer when their project stage is updated.
 */
export const sendStageUpdateEmail = action({
  args: {
    customerEmail: v.string(),
    customerName: v.string(),
    projectCode: v.string(),
    stageName: v.string(),
    stageAction: v.string(),
    scheduledDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const dateBlock = args.scheduledDate
      ? `<p style="font-size:16px;color:#1B3A5C;margin:12px 0"><strong>Scheduled for:</strong> ${args.scheduledDate}</p>`
      : "";

    await resend.emails.send({
      from: "Stratum Co. <noreply@stratumco.com>",
      to: [args.customerEmail],
      subject: `Project Update: ${args.stageName} — ${args.projectCode}`,
      html: `
        <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif">
          <div style="background:#1B3A5C;padding:24px;text-align:center">
            <h1 style="color:#fff;margin:0">Counter <span style="color:#C9942E">Revolution</span></h1>
          </div>
          <div style="padding:24px">
            <p>Hi ${args.customerName},</p>
            <p>Your project <strong>${args.projectCode}</strong> has been updated:</p>
            <div style="background:#F5F2EC;border-left:4px solid #C9942E;border-radius:0 8px 8px 0;padding:16px;margin:16px 0">
              <p style="font-size:18px;font-weight:bold;color:#1B3A5C;margin:0">${args.stageName}</p>
              <p style="font-size:14px;color:#666;margin:4px 0 0">${args.stageAction}</p>
              ${dateBlock}
            </div>
            <div style="text-align:center;margin:24px 0">
              <a href="https://stratumco.com/portal" style="display:inline-block;background:#C9942E;color:#1B3A5C;font-weight:bold;padding:12px 24px;border-radius:8px;text-decoration:none">View Full Timeline</a>
            </div>
            <p>Best regards,<br>The Stratum Co. Team</p>
          </div>
        </div>
      `,
    });
  },
});
