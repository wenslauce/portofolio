import React, { useState } from 'react';
import { Mail, Eye, X } from 'lucide-react';

const EmailPreview = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState('client');

  const clientTemplate = (name = "John Doe") => `
    <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 24px;">✓</span>
          </div>
          <h1 style="color: #1f2937; margin: 0; font-size: 28px; font-weight: 600;">Thank You!</h1>
          <p style="color: #6b7280; margin: 10px 0 0; font-size: 16px;">Your message has been received successfully</p>
        </div>

        <!-- Greeting -->
        <div style="margin-bottom: 32px;">
          <p style="color: #374151; margin: 0 0 16px; font-size: 18px; font-weight: 500;">Hi ${name},</p>
          <p style="color: #4b5563; line-height: 1.6; margin: 0; font-size: 16px;">
            Thank you for reaching out through my portfolio! I really appreciate you taking the time to connect with me.
          </p>
        </div>

        <!-- What's Next -->
        <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin-bottom: 32px; border-radius: 0 8px 8px 0;">
          <h3 style="color: #0c4a6e; margin: 0 0 12px; font-size: 16px; font-weight: 600;">What happens next?</h3>
          <ul style="color: #075985; margin: 0; padding-left: 20px; line-height: 1.6;">
            <li style="margin-bottom: 8px;">I'll review your message carefully</li>
            <li style="margin-bottom: 8px;">You can expect a personal reply within 24-48 hours</li>
            <li>I'll reach out to discuss your project or inquiry in detail</li>
          </ul>
        </div>

        <!-- Signature -->
        <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; text-align: center;">
          <p style="color: #374151; margin: 0 0 8px; font-size: 16px; font-weight: 600;">Best regards,</p>
          <p style="color: #6366f1; margin: 0; font-size: 18px; font-weight: 700;">Wenslauce Chengo</p>
          <p style="color: #6b7280; margin: 4px 0 0; font-size: 14px;">Media Strategist & Web Developer</p>
        </div>
      </div>
    </div>
  `;

  const adminTemplate = (name = "John Doe", email = "john@example.com", message = "Hello, I'm interested in discussing a potential project with you. Could we schedule a call to discuss the details?") => `
    <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #6366f1, #a855f7); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 24px; font-weight: bold;">W</span>
          </div>
          <h1 style="color: #1f2937; margin: 0; font-size: 28px; font-weight: 600;">New Contact Message</h1>
          <p style="color: #6b7280; margin: 10px 0 0; font-size: 16px;">You have received a new message through your portfolio</p>
        </div>

        <!-- Contact Details -->
        <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h3 style="color: #374151; margin: 0 0 16px; font-size: 18px; font-weight: 600;">Contact Information</h3>
          <div style="margin-bottom: 12px;">
            <span style="color: #6b7280; font-weight: 500;">Name:</span>
            <span style="color: #111827; margin-left: 8px; font-weight: 600;">${name}</span>
          </div>
          <div>
            <span style="color: #6b7280; font-weight: 500;">Email:</span>
            <span style="color: #6366f1; margin-left: 8px; font-weight: 600;">${email}</span>
          </div>
        </div>

        <!-- Message -->
        <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
          <h3 style="color: #374151; margin: 0 0 16px; font-size: 18px; font-weight: 600;">Message</h3>
          <p style="color: #374151; line-height: 1.6; margin: 0; white-space: pre-wrap; font-size: 15px;">${message}</p>
        </div>

        <!-- Action Button -->
        <div style="text-align: center;">
          <a style="display: inline-block; background: linear-gradient(135deg, #6366f1, #a855f7); color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px;">
            Reply to ${name}
          </a>
        </div>
      </div>
    </div>
  `;

  if (!showPreview) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowPreview(true)}
          className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
          title="Preview Email Templates"
        >
          <Eye className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6" />
              <h2 className="text-xl font-bold">Email Template Preview</h2>
            </div>
            <button
              onClick={() => setShowPreview(false)}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Template Selector */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTemplate('client')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTemplate === 'client' 
                  ? 'bg-white text-[#6366f1] font-semibold' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Client Confirmation
            </button>
            <button
              onClick={() => setActiveTemplate('admin')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTemplate === 'admin' 
                  ? 'bg-white text-[#6366f1] font-semibold' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Admin Notification
            </button>
          </div>
        </div>

        {/* Email Preview */}
        <div className="h-[calc(90vh-140px)] overflow-auto bg-gray-100">
          <div 
            className="min-h-full"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            dangerouslySetInnerHTML={{
              __html: activeTemplate === 'client' ? clientTemplate() : adminTemplate()
            }}
          />
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t">
          <p className="text-sm text-gray-600 text-center">
            {activeTemplate === 'client' 
              ? 'This email will be sent to clients when they contact you'
              : 'This email will be sent to you when someone submits the contact form'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview; 