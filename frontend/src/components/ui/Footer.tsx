import Link from 'next/link';

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  platform: string;
  href: string;
  icon: React.ReactNode;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  sections: FooterSection[];
  socialLinks: SocialLink[];
  copyright: string;
}

export function Footer({ sections, socialLinks, copyright }: FooterProps) {
  return (
    <footer className="relative bg-slate-900/90 border-t border-slate-800/50 pt-12 pb-6 mt-20 overflow-hidden">
      {/* Cyberpunk accent line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-indigo-500/0"></div>
      
      {/* Diagonal accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-[-5%] w-[10%] h-[1px] bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-cyan-500/0 transform rotate-[-45deg] origin-right"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold text-cyan-400 tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-300 hover:text-cyan-300 transition-colors relative group"
                    >
                      <span>{link.label}</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-500 to-indigo-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 border-t border-slate-800 pt-8 md:flex md:items-center md:justify-between">
          {/* Social links */}
          <div className="flex space-x-6 md:order-2">
            {socialLinks.map((item) => (
              <a
                key={item.platform}
                href={item.href}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{item.platform}</span>
                <div className="relative group">
                  <div className="w-6 h-6">
                    {item.icon}
                  </div>
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </div>
              </a>
            ))}
          </div>
          
          {/* Copyright */}
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center md:text-left text-xs text-slate-400">
              {copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 