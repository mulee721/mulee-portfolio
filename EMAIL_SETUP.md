# Email Setup Guide

This portfolio uses **EmailJS** for handling contact form submissions. Follow these steps to set it up:

## 1. Sign up for EmailJS
- Go to [EmailJS](https://www.emailjs.com) and create a free account
- Verify your email

## 2. Add Gmail Service
1. Go to **Email Services** in the dashboard
2. Click **Add Service**
3. Select **Gmail**
4. Connect your Gmail account (use: `mulugetadaba719@gmail.com`)
5. Copy the **Service ID** (looks like: `service_xxxxxxxxx`)

## 3. Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Set up the template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Message content

Example template HTML:
```html
<h2>New Message from {{from_name}}</h2>
<p><strong>From:</strong> {{from_email}}</p>
<p><strong>Subject:</strong> {{subject}}</p>
<p><strong>Message:</strong></p>
<p>{{message}}</p>
```

4. Copy the **Template ID** (looks like: `template_xxxxxxxxx`)

## 4. Get Public Key
1. Go to **Account** in the dashboard
2. Go to **API Keys**
3. Copy your **Public Key**

## 5. Configure Environment Variables
Create `.env.local` in the project root:
```
VITE_EMAILJS_SERVICE_ID=service_YOUR_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID=template_YOUR_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
VITE_MAIL_TO=mulugetadaba719@gmail.com
```

## 6. Restart Development Server
```bash
npm run dev
```

## 7. Test the Form
- Go to the Contact section
- Fill out the form
- Click Send
- You should receive an email at `mulugetadaba719@gmail.com`

## How It Works
- EmailJS is initialized on page load
- When users submit the form, it validates the data
- If valid, it sends directly to your Gmail inbox
- No backend server needed!

## Troubleshooting
- **Email not sending?** Check that all three credentials are correct in `.env.local`
- **Environment variables not loading?** Restart the dev server
- **CORS errors?** Make sure you're using the Public Key, not the Private Key
- **Gmail not receiving?** Check spam folder, and ensure Gmail service is properly connected in EmailJS dashboard

## Security Notes
- The Public Key is meant to be public (it's in the frontend)
- Never commit `.env.local` to git (it's in `.gitignore`)
- EmailJS handles the SMTP connection securely
