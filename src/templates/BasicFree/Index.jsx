import React from 'react';

export default function BasicFree({ data }) {
  // Destructure data with fallbacks to prevent crashes
  const { 
    fullName = 'Your Name', 
    title = 'Professional Title', 
    bio = 'No biography provided.', 
    experience = [], 
    contact = [] 
  } = data;

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      
      {/* 1. HEADER / HERO */}
      <header className="border-b-4 border-black py-20 px-6 md:px-12 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-4">
          {fullName}
        </h1>
        <p className="text-xl md:text-2xl font-medium text-gray-600">
          {title}
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-6 md:px-12 py-16 space-y-20">
        
        {/* 2. ABOUT SECTION */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest mb-6 border-l-4 border-black pl-4">
            About Me
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-gray-800 whitespace-pre-wrap">
            {bio}
          </p>
        </section>

        {/* 3. EXPERIENCE SECTION */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest mb-8 border-l-4 border-black pl-4">
            Experience
          </h2>
          <div className="space-y-12">
            {experience.length > 0 ? (
              experience.map((job, index) => (
                <div key={index} className="group">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                    <h3 className="text-2xl font-bold group-hover:underline decoration-2 underline-offset-4">
                      {job.company || 'Company Name'}
                    </h3>
                    <span className="text-sm font-mono text-gray-500 mt-1 md:mt-0">
                      {job.duration || 'Dates'}
                    </span>
                  </div>
                  <div className="text-lg font-medium text-gray-700 mb-3">
                    {job.role || 'Role'}
                  </div>
                  <p className="text-gray-600 leading-relaxed max-w-2xl">
                    {job.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">No experience added yet.</p>
            )}
          </div>
        </section>

        {/* 4. CONTACT SECTION */}
        <section className="bg-black text-white p-10 -mx-6 md:-mx-12 md:rounded-3xl mt-20">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-8 text-gray-400">
            Contact
          </h2>
          {contact.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contact.map((item, index) => (
                <div key={index} className="flex flex-col border-b border-gray-800 pb-4">
                  <span className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                    {item.platform || 'Link'}
                  </span>
                  <a 
                    href={item.value?.includes('@') ? `mailto:${item.value}` : item.value} 
                    className="text-xl font-bold hover:text-gray-300 transition-colors truncate"
                    target="_blank" 
                    rel="noreferrer"
                  >
                    {item.value || '...'}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No contact details provided.</p>
          )}
        </section>

      </main>

      {/* FOOTER */}
      <footer className="text-center py-10 text-xs text-gray-400 uppercase tracking-widest">
        © {new Date().getFullYear()} {fullName}
      </footer>
    </div>
  );
}