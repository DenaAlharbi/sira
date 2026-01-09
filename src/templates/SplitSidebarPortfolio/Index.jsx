import React, { useState, useEffect } from 'react';
import { 
  Twitter, Facebook, Instagram, Linkedin, Dribbble, Github,
  Palette, Code, Smartphone, Layers, Monitor, Search,
  MapPin, Phone, Mail, Download, Menu, X
} from 'lucide-react';

// Dynamic Icon Component
const Icon = ({ name, ...props }) => {
  const icons = {
    Twitter, Facebook, Instagram, Linkedin, Dribbble, Github,
    Palette, Code, Smartphone, Layers, Monitor, Search,
    MapPin, Phone, Mail, Download, Menu, X
  };
  const IconComponent = icons[name] || icons.Palette; 
  return <IconComponent {...props} />;
};

export default function SplitSidebarPortfolio({ data, isMobilePreview = false }) {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    profileImage,
    fullName = "Jackson Ford",
    socials = [],
    copyrightText = "© 2023 All rights reserved.",
    heroTitle = "I'm a Designer",
    heroBio = "100% responsive, fully customizable template for...",
    resumeLink = "#",
    aboutText = "I am a graphic designer, web developer, and addict to all things creative...",
    skillsList = [],
    services = [],
    projects = [],
    contactInfo = []
  } = data || {};

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  // Handle scroll active state
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(nav => document.querySelector(nav.href));
      const scrollPos = window.scrollY + 200; 
      sections.forEach(section => {
        if (section && section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
          setActiveSection(section.id);
        }
      });
    };
    if (!isMobilePreview) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isMobilePreview, navigation]);

  // Sidebar Content (Reused for Desktop & Mobile)
  const SidebarContent = ({ mobile = false }) => (
    <div className={`h-full flex flex-col justify-between ${mobile ? 'p-8 pt-12' : 'p-12'} text-center font-serif`}>
      <div>
        <div className="mb-8">
          <div className="relative inline-block">
             <img 
              src={profileImage || "https://placehold.co/150x150/444/fff?text=JD"} 
              alt={fullName} 
              className={`rounded-full mx-auto mb-6 object-cover border-4 border-[#444] ${mobile ? 'w-24 h-24' : 'w-40 h-40'}`}
            />
          </div>
          <h1 className={`${mobile ? 'text-xl' : 'text-3xl'} font-bold tracking-wider mb-2`}>{fullName}</h1>
          <p className="text-sm text-gray-400 uppercase tracking-widest">Designer / Developer</p>
        </div>
        <nav className="space-y-4">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => mobile && setIsMobileMenuOpen(false)}
              className={`block text-sm uppercase tracking-widest hover:text-[#2C98F0] transition-colors duration-300 ${
                activeSection === item.href.substring(1) ? 'text-[#2C98F0]' : 'text-gray-400'
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
      <div className="mt-8">
        <div className="flex justify-center space-x-4 mb-6">
          {socials.map((social, idx) => (
            <a key={idx} href={social.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Icon name={social.platform} size={18} />
            </a>
          ))}
        </div>
        <p className="text-xs text-gray-500">{copyrightText}</p>
      </div>
    </div>
  );

  return (
    // MAIN WRAPPER: Added 'relative' so absolute children (like the mobile menu) stay inside.
    <div className={`min-h-screen bg-[#F2F3F7] font-serif flex flex-col md:flex-row relative ${isMobilePreview ? 'overflow-hidden' : ''}`}>
      
      {/* --- MOBILE HEADER (Sticky) --- */}
      <div className="md:hidden bg-[#2C2C2C] text-white p-4 flex justify-between items-center sticky top-0 z-[60] shadow-md h-16 shrink-0">
        <div className="flex items-center gap-3">
          {/* Mini Avatar in Header */}
          <img 
            src={profileImage || "https://placehold.co/150x150/444/fff?text=JD"} 
            alt="Avatar" 
            className="w-8 h-8 rounded-full border border-gray-500 object-cover" 
          />
          <span className="font-bold text-lg tracking-wide">{fullName}</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- MOBILE MENU OVERLAY (Absolute) --- */}
      {/* Changed fixed -> absolute to contain it within the preview box */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute inset-0 z-[50] bg-[#2C2C2C] text-white pt-16 animate-fadeIn">
          <SidebarContent mobile={true} />
        </div>
      )}

      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:block w-80 flex-shrink-0 bg-[#2C2C2C] text-white">
         <div className="sticky top-0 h-screen overflow-y-auto custom-scrollbar">
            <SidebarContent />
         </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 min-w-0 h-full overflow-y-auto">
        
        {/* 1. HERO SECTION */}
        <section id="home" className="min-h-screen flex items-center relative" 
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 p-8 md:p-16 lg:p-24 text-white max-w-4xl">
            {/* Clamped Font Sizes for Mobile */}
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">{heroTitle}</h1>
            <p className="text-lg md:text-2xl mb-10 opacity-90 leading-relaxed max-w-xl">{heroBio}</p>
            <a href={resumeLink} className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 border-2 border-white text-white uppercase tracking-widest text-xs md:text-sm hover:bg-white hover:text-black transition-colors duration-300 font-bold">
              Download CV <Download size={18} className="ml-3" />
            </a>
          </div>
        </section>


        {/* 2. ABOUT SECTION */}
        <section id="about" className="py-16 md:py-32 px-6 md:px-16 lg:px-24 bg-white">
          <div className="max-w-5xl mx-auto">
            <span className="block text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em] mb-4">About Us</span>
            <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-[#2C2C2C]">Who Am I?</h2>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <p className="text-gray-600 leading-loose mb-6 text-sm md:text-base">{aboutText}</p>
              </div>
              <div className="space-y-6">
                {skillsList.map((skill, idx) => (
                  <div key={idx}>
                    <h3 className="text-sm md:text-md font-bold text-[#2C2C2C] mb-2 uppercase tracking-widest">{skill.skillName}</h3>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full bg-[#2C98F0] rounded-full" style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* 3. SERVICES SECTION */}
        <section id="services" className="py-16 md:py-32 px-6 md:px-16 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <span className="block text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em] mb-4">What I Do?</span>
            <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-[#2C2C2C]">Here are some of my expertise</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((service, idx) => (
                <div key={idx} className="bg-white p-8 md:p-10 shadow-sm border-b-4 border-transparent hover:border-[#2C98F0] transition-all duration-300 group">
                  <div className="mb-6 text-[#2C98F0]">
                    <Icon name={service.icon} size={40} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-4 text-[#2C2C2C]">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* 4. PORTFOLIO SECTION */}
        <section id="portfolio" className="py-16 md:py-32 px-6 md:px-16 lg:px-24 bg-white">
          <div className="max-w-6xl mx-auto">
            <span className="block text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em] mb-4">My Work</span>
            <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-[#2C2C2C]">Recent Work</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project, idx) => (
                <a key={idx} href={project.link} target="_blank" rel="noreferrer" className="group relative block overflow-hidden h-64 md:h-80">
                  <img 
                    src={project.image || "https://placehold.co/600x400/eee/999?text=Project"} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#2C98F0]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-8 text-center">
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{project.title}</h3>
                    <span className="text-white/80 text-xs md:text-sm uppercase tracking-widest">{project.category}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>


        {/* 5. CONTACT SECTION */}
        <section id="contact" className="py-16 md:py-32 px-6 md:px-16 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <span className="block text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em] mb-4">Get in Touch</span>
            <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-[#2C2C2C]">Contact</h2>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-6 md:mb-8 text-[#2C2C2C]">Contact Info</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="text-[#2C98F0] mt-1">
                        <Icon name={info.icon} size={20} />
                      </div>
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">{info.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-6 md:mb-8 text-[#2C2C2C]">Message Me</h3>
                <form className="space-y-4 md:space-y-6">
                  <input type="text" placeholder="Name" className="w-full p-3 md:p-4 bg-white border border-gray-200 focus:border-[#2C98F0] outline-none transition-colors" />
                  <input type="email" placeholder="Email" className="w-full p-3 md:p-4 bg-white border border-gray-200 focus:border-[#2C98F0] outline-none transition-colors" />
                  <textarea rows={5} placeholder="Message" className="w-full p-3 md:p-4 bg-white border border-gray-200 focus:border-[#2C98F0] outline-none transition-colors resize-none"></textarea>
                  <button type="submit" className="px-8 py-3 md:px-10 md:py-4 bg-[#2C98F0] text-white uppercase tracking-widest text-xs md:text-sm font-bold hover:bg-[#1a82d6] transition-colors w-full md:w-auto">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}