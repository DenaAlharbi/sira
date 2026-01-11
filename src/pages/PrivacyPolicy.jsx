import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-slate-500 mb-8 uppercase tracking-widest text-xs font-bold">Effective Date: January 1, 2026</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Introduction</h2>
            <p>
              Welcome to <strong>Portfiller</strong> ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Information We Collect</h2>
            <p className="mb-2">We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together follows:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Identity Data:</strong> First name, last name, username, or similar identifier.</li>
              <li><strong>Contact Data:</strong> Email address and telephone number.</li>
              <li><strong>Portfolio Data:</strong> Projects, images, descriptions, and professional history you upload to the platform.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>To provide the portfolio generation services you have requested.</li>
              <li>To manage your account and subscription.</li>
              <li>To improve our website, products/services, marketing, and customer relationships.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. Access to your personal data is limited to those employees, agents, contractors, and other third parties who have a business need to know.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Your Legal Rights</h2>
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, or to object to processing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:<br/>
              <strong>Email:</strong> support@portfiller.sa<br/>
              <strong>Location:</strong> Dhahran, Kingdom of Saudi Arabia
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}