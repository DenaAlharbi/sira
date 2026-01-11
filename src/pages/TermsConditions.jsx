import React from 'react';

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-2">Terms and Conditions</h1>
        <p className="text-slate-500 mb-8 uppercase tracking-widest text-xs font-bold">Last Updated: January 1, 2026</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Agreement to Terms</h2>
            <p>
              These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and <strong>Portfiller Premium Systems</strong> ("we," "us," or "our"), concerning your access to and use of the Portfiller website and application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
            </p>
            <p className="mt-2 text-sm italic text-slate-500">
              Note: You retain full ownership of the personal content, project data, and images you upload to your personal portfolio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. User Representations</h2>
            <p>
              By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you have the legal capacity and you agree to comply with these Terms of Use; (3) you will not access the Site through automated or non-human means, whether through a bot, script or otherwise; (4) you will not use the Site for any illegal or unauthorized purpose.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Prohibited Activities</h2>
            <p>
              You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Limitation of Liability</h2>
            <p>
              In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Governing Law</h2>
            <p>
              These Terms shall be governed by and defined following the laws of the <strong>Kingdom of Saudi Arabia</strong>. Portfiller and yourself irrevocably consent that the courts of Saudi Arabia shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Contact Us</h2>
            <p>
              To resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: <strong>support@portfiller.sa</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}