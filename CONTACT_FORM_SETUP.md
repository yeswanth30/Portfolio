# Contact Form Setup Guide

Your portfolio contact form is now functional! It currently uses the **mailto** method which opens the user's email client to send messages directly to you.

## Current Implementation (Mailto)

✅ **Works right away!** No setup needed.

When users submit the form:
1. Their email client opens (Mail, Outlook, Gmail, etc.)
2. The message is pre-filled with their details
3. They click send to deliver the message to your email

**Pros:**
- Works immediately without any backend
- Free and requires no setup
- Simple and reliable

**Cons:**
- Users must have an email client configured
- Doesn't work in some mobile browsers

---

## Upgrade Option: EmailJS (Recommended for Production)

For a more professional experience, you can upgrade to EmailJS which sends emails directly from the browser without requiring an email client.

### Setup Steps:

1. **Create a Free EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account (100 emails/month free)

2. **Create an Email Service**
   - Go to Dashboard → Email Services
   - Click "Add New Service"
   - Choose Gmail, Outlook, or Custom SMTP
   - Connect your email account
   - Note your **Service ID**

3. **Create an Email Template**
   - Go to Dashboard → Email Templates
   - Click "Create New Template"
   - Use these variables:
     - `{{name}}` - sender's name
     - `{{email}}` - sender's email
     - `{{subject}}` - message subject
     - `{{message}}` - message content
   - Note your **Template ID**

4. **Get Your Public Key**
   - Go to Dashboard → Account → API Keys
   - Copy your **Public Key**

5. **Update the JavaScript**
   
   In `script.js`, find the `initEmailJS()` function and uncomment it, then replace these placeholders:
   
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your public key
   
   emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
   ```
   
   With your actual values:
   
   ```javascript
   emailjs.init("abc123xyz"); // Your public key
   
   emailjs.sendForm('service_123', 'template_456', this)
   ```

6. **Activate EmailJS**
   
   In `script.js`, around line 575, comment out the mailto implementation and uncomment the EmailJS section.

### Alternative: Other Services

You can also use:
- **Formspree** - [https://formspree.io/](https://formspree.io/)
- **Netlify Forms** - If hosting on Netlify
- **Web3Forms** - [https://web3forms.com/](https://web3forms.com/)
- **FormSubmit** - [https://formsubmit.co/](https://formsubmit.co/)

---

## Testing

To test your contact form:
1. Fill out all fields
2. Click "Send Message"
3. Your email client should open with the message pre-filled
4. Send a test message to yourself

---

## Need Help?

If you need help setting up EmailJS or want to use a different email service, the portfolio is already set up to easily integrate with any email sending solution!

**Current Status:** ✅ Contact form is fully functional with mailto method
