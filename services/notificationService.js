require('dotenv').config();
const twilio     = require('twilio');
const nodemailer = require('nodemailer');

// ── Twilio client (lazy) ──────────────────────────────────────────────────────
function getTwilioClient() {
  const sid   = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !sid.startsWith('AC') || !token || token.startsWith('your_')) return null;
  return twilio(sid, token);
}

// ── Nodemailer transporter (lazy) ─────────────────────────────────────────────
function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || user.startsWith('your_') || !pass || pass.startsWith('your_')) return null;
  return nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
}

// ── WhatsApp to admin ─────────────────────────────────────────────────────────
async function sendAdminWhatsApp(booking) {
  const client = getTwilioClient();
  if (!client) { console.warn('Twilio not configured — skipping admin WhatsApp'); return null; }

  const msg =
    `🏔 *NEW BOOKING — Manali Escape*\n\n` +
    `📋 *ID:* ${booking.id}\n` +
    `👤 *Name:* ${booking.name}\n` +
    `📍 *Destination:* ${booking.destination}\n` +
    `📅 *Dates:* ${booking.startDate} → ${booking.endDate}\n` +
    `👥 *Travelers:* ${booking.travelers} | *Type:* ${booking.tripType}\n` +
    `💰 *Budget:* ${booking.budget}\n` +
    `📧 *Email:* ${booking.email}\n` +
    `📞 *Phone:* ${booking.phone || '—'}`;

  return client.messages.create({
    body: msg,
    from: process.env.TWILIO_PHONE_NUMBER,   // whatsapp:+14155238886
    to:   process.env.ADMIN_PHONE            // whatsapp:+919805549992
  });
}

// ── WhatsApp to customer ──────────────────────────────────────────────────────
async function sendCustomerWhatsApp(booking) {
  const client = getTwilioClient();
  if (!client || !booking.phone) return null;

  let phone = booking.phone.trim().replace(/\s+/g, '');
  if (/^\d{10}$/.test(phone)) phone = '+91' + phone;
  const to = 'whatsapp:' + phone;

  const msg =
    `Namaste *${booking.name}*! 🏔\n\n` +
    `Your trip to *${booking.destination}* is *CONFIRMED*!\n\n` +
    `📋 *Booking ID:* ${booking.id}\n` +
    `📅 *Dates:* ${booking.startDate} → ${booking.endDate}\n` +
    `👥 *Travelers:* ${booking.travelers}\n\n` +
    `Safe travels! — *Manali Escape* 🙏`;

  return client.messages.create({
    body: msg,
    from: process.env.TWILIO_PHONE_NUMBER,
    to
  });
}

// ── Email to admin ────────────────────────────────────────────────────────────
async function sendAdminEmail(booking) {
  const t = getTransporter();
  if (!t) { console.warn('SMTP not configured — skipping admin email'); return null; }

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#0f2744,#1a3c5e);padding:28px 32px;">
        <h1 style="color:#fff;margin:0;font-size:1.4rem;">🏔 New Booking — Manali Escape</h1>
        <p style="color:rgba(255,255,255,0.7);margin:6px 0 0;">Booking ID: <strong style="color:#f39c12">${booking.id}</strong></p>
      </div>
      <div style="padding:28px 32px;background:#f9fafb;">
        <table style="width:100%;border-collapse:collapse;font-size:0.92rem;">
          <tr><td style="padding:8px 0;color:#6b7280;width:140px;">👤 Name</td><td style="padding:8px 0;font-weight:600;color:#111">${booking.name}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">📧 Email</td><td style="padding:8px 0;color:#111">${booking.email}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">📞 Phone</td><td style="padding:8px 0;color:#111">${booking.phone || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">📍 Destination</td><td style="padding:8px 0;font-weight:600;color:#e67e22">${booking.destination}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">📅 Start Date</td><td style="padding:8px 0;color:#111">${booking.startDate}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">📅 End Date</td><td style="padding:8px 0;color:#111">${booking.endDate}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">👥 Travelers</td><td style="padding:8px 0;color:#111">${booking.travelers}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">🎒 Trip Type</td><td style="padding:8px 0;color:#111">${booking.tripType}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">💰 Budget</td><td style="padding:8px 0;color:#111">${booking.budget}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">🕐 Booked At</td><td style="padding:8px 0;color:#111">${new Date(booking.createdAt).toLocaleString('en-IN')}</td></tr>
        </table>
      </div>
      <div style="padding:16px 32px;background:#fff;border-top:1px solid #e5e7eb;font-size:0.8rem;color:#9ca3af;text-align:center;">
        Manali Escape — Automated Booking Alert
      </div>
    </div>`;

  return t.sendMail({
    from:    `"Manali Escape" <${process.env.SMTP_USER}>`,
    to:      process.env.ADMIN_EMAIL,
    subject: `🏔 New Booking [${booking.id}] — ${booking.destination} | ${booking.name}`,
    html
  });
}

// ── Confirmation email to customer ────────────────────────────────────────────
async function sendCustomerEmail(booking) {
  const t = getTransporter();
  if (!t || !booking.email) return null;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#0f2744,#1a3c5e);padding:32px;text-align:center;">
        <div style="font-size:2.5rem;margin-bottom:12px;">🏔</div>
        <h1 style="color:#fff;margin:0;font-size:1.5rem;">Booking Confirmed!</h1>
        <p style="color:rgba(255,255,255,0.75);margin:8px 0 0;">Your Himachal Pradesh adventure is all set</p>
      </div>
      <div style="padding:32px;background:#fff;">
        <p style="font-size:1rem;color:#374151;margin-bottom:24px;">Namaste <strong>${booking.name}</strong>! 🙏 We're thrilled to confirm your trip to <strong style="color:#e67e22">${booking.destination}</strong>.</p>
        <div style="background:#f9fafb;border-radius:10px;padding:20px;margin-bottom:24px;">
          <h3 style="color:#0f2744;margin:0 0 16px;font-size:1rem;">📋 Booking Summary</h3>
          <table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
            <tr><td style="padding:6px 0;color:#6b7280;width:130px;">Booking ID</td><td style="padding:6px 0;font-weight:700;color:#e67e22">${booking.id}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Destination</td><td style="padding:6px 0;font-weight:600">${booking.destination}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Travel Dates</td><td style="padding:6px 0">${booking.startDate} → ${booking.endDate}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Travelers</td><td style="padding:6px 0">${booking.travelers} person(s)</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Trip Type</td><td style="padding:6px 0">${booking.tripType}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Budget</td><td style="padding:6px 0">${booking.budget}</td></tr>
          </table>
        </div>
        <p style="font-size:0.88rem;color:#6b7280;line-height:1.7;">Our team will reach out within 24 hours to finalise your itinerary.</p>
      </div>
      <div style="padding:20px 32px;background:linear-gradient(135deg,#0f2744,#1a3c5e);text-align:center;">
        <p style="color:rgba(255,255,255,0.6);font-size:0.8rem;margin:0;">Manali Escape &nbsp;|&nbsp; Heritage of the Himalayas</p>
      </div>
    </div>`;

  return t.sendMail({
    from:    `"Manali Escape" <${process.env.SMTP_USER}>`,
    to:      booking.email,
    subject: `✅ Booking Confirmed [${booking.id}] — ${booking.destination} Trip`,
    html
  });
}

// ── Main dispatcher ───────────────────────────────────────────────────────────
async function notifyBooking(booking) {
  const results = { waAdmin: null, waCustomer: null, emailAdmin: null, emailCustomer: null, errors: [] };

  await Promise.allSettled([
    sendAdminWhatsApp(booking)
      .then(m => { if (m) results.waAdmin = m.sid; })
      .catch(e => results.errors.push('WA admin: ' + e.message)),

    sendCustomerWhatsApp(booking)
      .then(m => { if (m) results.waCustomer = m.sid; })
      .catch(e => results.errors.push('WA customer: ' + e.message)),

    sendAdminEmail(booking)
      .then(m => { if (m) results.emailAdmin = m.messageId; })
      .catch(e => results.errors.push('Email admin: ' + e.message)),

    sendCustomerEmail(booking)
      .then(m => { if (m) results.emailCustomer = m.messageId; })
      .catch(e => results.errors.push('Email customer: ' + e.message))
  ]);

  if (results.errors.length) console.warn('Notification errors:', results.errors);
  else console.log('✅ All notifications sent for booking', booking.id);

  return results;
}

module.exports = { notifyBooking };
