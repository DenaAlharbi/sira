import React from "react";

export default function ProjectFocus({ data }) {
  // Professional, modern palette (Slate + Indigo/Violet)
  const bgGradient = "from-slate-50 via-white to-indigo-50/50";

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${bgGradient} text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-12 md:pb-24 overflow-x-hidden relative`}
    >
      {/* Background Mesh */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      {/* 1. HERO SECTION */}
      <header className="relative px-4 sm:px-6 pt-24 md:pt-32 pb-16 md:pb-24 max-w-5xl mx-auto text-center md:text-left z-10">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-4 text-slate-900 leading-tight">
          {data.fullName}
        </h1>

        <p className="text-2xl md:text-3xl text-indigo-600 font-medium mb-12">
          {data.title}
        </p>

        {data.bio && (
          <div className="bg-white/80 backdrop-blur-sm p-6 md:p-10 rounded-2xl border border-indigo-50 shadow-sm max-w-3xl mx-auto md:mx-0">
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed whitespace-pre-wrap break-words">
              {data.bio}
            </p>
          </div>
        )}
      </header>

      {/* 2. PROJECTS GRID */}
      <section className="px-4 sm:px-6 py-14 md:py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10 md:mb-12">
            <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
              Selected Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {data.projects &&
              data.projects.map((project, index) => {
                const hasLink = project.link && project.link.trim() !== "";

                const CardContent = () => (
                  <div className="flex flex-col h-full">
                    {/* TOP */}
                    <div className="flex-grow">
                      <h3
                        className={`text-xl sm:text-2xl font-bold text-slate-900 mb-4 ${
                          hasLink ? "group-hover:text-indigo-600" : ""
                        } transition-colors`}
                      >
                        {project.name}
                      </h3>

                      <p className="text-slate-500 text-sm sm:text-base leading-relaxed sm:leading-loose mb-8 break-words">
                        {project.desc}
                      </p>
                    </div>

                    {/* BOTTOM */}
                    <div className="mt-auto pt-5 sm:pt-6 border-t border-slate-100 flex justify-between items-center gap-4">
                      {hasLink ? (
                        <>
                          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 group-hover:underline decoration-2 underline-offset-4">
                            View Project
                          </span>

                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="7" y1="17" x2="17" y2="7"></line>
                              <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                          </div>
                        </>
                      ) : (
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                          Concept
                        </span>
                      )}
                    </div>
                  </div>
                );

                const cardClasses =
                  "group relative p-7 sm:p-8 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 h-full min-h-[260px] sm:min-h-0 flex flex-col overflow-hidden motion-reduce:hover:transform-none";

                return hasLink ? (
                  <a
                    key={index}
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`${cardClasses} bg-white hover:shadow-xl hover:-translate-y-1 hover:border-indigo-100`}
                  >
                    <CardContent />
                  </a>
                ) : (
                  <div
                    key={index}
                    className={`${cardClasses} bg-slate-50/50 cursor-default`}
                  >
                    <CardContent />
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* 3. CONTACT FOOTER */}
      <footer className="px-4 sm:px-6 mt-16 md:mt-20 max-w-6xl mx-auto relative z-10">
        <div className="border-t border-slate-200 pt-16 md:pt-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-slate-500 max-w-md mx-auto md:mx-0">
                Interested in working together? Feel free to reach out.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center md:justify-end">
              {data.contact &&
                data.contact.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-white border border-slate-200 px-6 py-4 rounded-xl shadow-sm min-w-[150px] text-center md:text-left"
                  >
                    <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-500 mb-1">
                      {item.type}
                    </span>
                    <span className="text-sm font-medium text-slate-700 truncate max-w-[180px]">
                      {item.value}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-20 text-center md:text-left text-xs text-slate-400 font-medium">
            © {new Date().getFullYear()} {data.fullName}. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
