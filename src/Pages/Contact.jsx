import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import { Link } from "react-router-dom";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { supabase } from "../lib/supabase";
import { sendContactEmails } from "../lib/emailService";
import SEO from '../components/SEO';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    showLoadingMessage();

    try {
      // Store in Supabase database for record keeping
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message
          }
        ]);

      if (dbError) {
        console.warn('Database storage failed:', dbError);
        // Continue with email sending even if database fails
      }

      // Send emails via independent Resend API service
      const emailResult = await sendContactEmails(
        formData.name,
        formData.email,
        formData.message
      );

      console.log('Email service result:', emailResult);

      showSuccessMessage();
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error('Error processing contact form:', error);
      showErrorMessage(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const showSuccessMessage = () => {
    Swal.fire({
      title: '<div class="success-title">Message Sent! ✨</div>',
      html: `
        <div class="success-content">
          <div class="success-text">
            Thank you for reaching out! I'll get back to you within 24-48 hours.
          </div>
          <div style="margin-top: 16px; padding: 12px; background: rgba(16, 185, 129, 0.1); border-radius: 8px; border-left: 3px solid #10b981;">
            <div style="color: #10b981; font-size: 14px; font-weight: 500;">
              📧 Confirmation email sent to your inbox
            </div>
            <div style="color: #6b7280; font-size: 12px; margin-top: 4px;">
              Check your email for a confirmation message with next steps
            </div>
          </div>
        </div>
      `,
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'Awesome!',
      timer: 5000,
      timerProgressBar: true,
      customClass: {
        popup: 'glass-modal',
        confirmButton: 'glass-button',
      },
      background: 'rgba(26, 26, 46, 0.9)',
      backdrop: `rgba(3, 0, 20, 0.8)`,
    });
  };

  const showErrorMessage = (error) => {
    Swal.fire({
      title: '<div class="error-title">Oops!</div>',
      html: `
        <div class="error-content">
          <div class="error-text">
            ${error.message || 'Something went wrong. Please try again.'}
          </div>
        </div>
      `,
      icon: 'error',
      showConfirmButton: true,
      confirmButtonText: 'Try Again',
      customClass: {
        popup: 'glass-modal',
        confirmButton: 'glass-button',
      },
      background: 'rgba(26, 26, 46, 0.9)',
      backdrop: `rgba(3, 0, 20, 0.8)`,
    });
  };

  const showLoadingMessage = () => {
    Swal.fire({
      title: '<div class="loading-title">Sending Message...</div>',
      html: '<div class="loading-text">Please wait while we process your message</div>',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
      customClass: {
        popup: 'glass-modal',
      },
      background: 'rgba(26, 26, 46, 0.9)',
      backdrop: `rgba(3, 0, 20, 0.8)`,
    });
  };

  return (
    <>
      <SEO 
        title="Contact Wenslauce Chengo | Get in Touch"
        description="Ready to collaborate? Contact Wenslauce Chengo for media strategy, web development projects, brand consulting, and digital innovation opportunities. Let's discuss your next project."
        url="https://wenslauce.com/#Contact"
        keywords="Contact Wenslauce Chengo, Media Consultation, Web Development Services, Brand Strategy, Project Collaboration, Business Inquiries, Digital Services"
      />
      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact Me
          </span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
        >
          Got a question? Send me a message, and I'll get back to you soon.
        </p>
      </div>

      <div
        className="h-auto py-10 flex items-center justify-center px-[5%] md:px-0"
        id="Contact"
      >
        <div className="container px-[1%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%] gap-12">
          <div
            data-aos="fade-right"
            data-aos-duration="1200"
            className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 py-10 sm:p-10 transform transition-all duration-300 hover:shadow-[#6366f1]/10"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                  Get in Touch
                </h2>
                <p className="text-gray-400">
                  Have something to discuss? Send me a message and let's talk.
                </p>
              </div>
              <Share2 className="w-10 h-10 text-[#6366f1] opacity-50" />
            </div>

            <form 
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group"
              >
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group"
              >
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="relative group"
              >
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 h-[9.9rem] disabled:opacity-50"
                  required
                />
              </div>
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="mt-10 pt-6 border-t border-white/10 flex justify-center space-x-6">
              <SocialLinks />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-3 py-3 md:p-10 md:py-8 shadow-2xl transform transition-all duration-300 hover:shadow-[#6366f1]/10">
            <Komentar />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;