import React, { useMemo } from 'react';

export default function Preview({ form, onBack, onNext }) {
  // Create a temporary URL for the uploaded image so the user can see themselves
  const imageUrl = useMemo(() => {
    return form.image ? URL.createObjectURL(form.image) : null;
  }, [form.image]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* We use two distinct "Cards" here to show the user how their 
          content adapts to different premium "sections".
      */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* CARD 1: Modern Professional Card */}
        <section className="group">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2 ml-1">Modern Display</p>
          <div className="border border-gray-100 rounded-sm p-8 bg-white shadow-xl shadow-gray-100/50 transition-all">
            <div className="flex flex-col items-center text-center gap-6">
              {imageUrl ? (
                <img src={imageUrl} className="w-24 h-24 rounded-full object-cover border-2 border-sira-lavender p-1" alt="Profile" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4C1D95] to-[#FB923C] opacity-80" />
              )}
              
              <div>
                <h3 className="text-2xl font-heading text-sira-purple mb-1">
                  {form.fullName || 'Abdullah Ahmed'}
                </h3>
                <p className="text-sm tracking-widest uppercase text-sira-orange font-medium">
                  {form.title || 'Senior Executive'}
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm italic max-w-sm">
                "{form.bio || 'Your professional story will be elegantly displayed here...'}"
              </p>
            </div>
          </div>
        </section>

        {/* CARD 2: Classic Saudi Heritage Style */}
        <section className="group">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2 ml-1">Classic Premium</p>
          <div className="border-t-4 border-sira-purple rounded-sm p-8 bg-[#FDFCFB] shadow-xl shadow-gray-100/50 h-full">
            <div className="text-right" dir="rtl">
              <h3 className="text-3xl font-semibold mb-2" style={{ fontFamily: '"Amiri", serif' }}>
                {form.fullName || 'الاسم الكامل'}
              </h3>
              <div className="h-px w-20 bg-sira-orange mb-4 mr-0" />
              <p className="text-lg text-gray-700 mb-6" style={{ fontFamily: '"Noto Sans Arabic", sans-serif' }}>
                {form.title || 'المسمى الوظيفي'}
              </p>
            </div>
            
            <div className="mt-12 pt-6 border-l-2 border-gray-100 pl-6">
              <p className="text-sm text-gray-500 uppercase tracking-tighter mb-2">Portfolio Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-gray-800">Ready for Global Deployment</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Action Buttons (The Pay/Deploy section) */}
      <div className="flex flex-col items-center gap-4 pt-8 border-t border-gray-100">
        <p className="text-sm text-gray-400">Everything looks perfect? Proceed to secure your custom domain.</p>
        <div className="flex gap-4">
          <button 
            className="px-8 py-3 rounded-sm border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-all" 
            onClick={onBack}
          >
            Edit Details
          </button>
          <button 
            className="px-10 py-3 rounded-sm bg-sira-purple text-white text-sm font-semibold hover:bg-[#3b1675] hover:shadow-lg hover:shadow-purple-200 transition-all transform hover:-translate-y-1" 
            onClick={onNext}
          >
            Deploy & Pay 299 SAR
          </button>
        </div>
      </div>
    </div>
  );
}