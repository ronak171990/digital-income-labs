import { Mail, Linkedin, Youtube, Pin, Flame, ArrowUpRight } from "lucide-react";

interface FooterProps {
  onNavigate: (view: string, params?: any) => void;
  disclosureText?: string;
}

export default function Footer({ onNavigate, disclosureText }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800" id="main-footer">
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & Desc */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate("home")}>
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-medium">
                D
              </div>
              <span className="font-sans font-extrabold text-lg text-white tracking-wide">
                Digital Income Labs<span className="text-blue-500">®</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Digital Income Labs is a premium online resource hub specializing in transparent affiliate reviews, practical side hustle tutorials, automated AI tool analysis, and sustainable passive income strategies. We help solo entrepreneurs build digital empires with confidence.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noreferrer" 
                className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-all text-slate-400"
                aria-label="Pinterest"
              >
                <Pin className="h-4 w-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-all text-slate-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-all text-slate-400"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">
              RESOURCES
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate("category", "Side Hustle Ideas")} className="hover:text-white transition-all">
                  Side Hustles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("category", "AI Tools")} className="hover:text-white transition-all">
                  AI Tools & Software
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("category", "Passive Income")} className="hover:text-white transition-all">
                  Passive Income Ideas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("reviews")} className="hover:text-white transition-all">
                  Product Reviews 2026
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("blog")} className="hover:text-white transition-all">
                  Side Hustle Blog & Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono tracking-wider text-slate-400 uppercase">
              LEGAL INFO
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate("about")} className="hover:text-white transition-all">
                  About Digital Income Labs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("contact")} className="hover:text-white transition-all">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("legal", "privacy")} className="hover:text-white transition-all">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("legal", "disclaimer")} className="hover:text-white transition-all">
                  Disclaimer Notice
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("legal", "disclosure")} className="hover:text-white transition-all inline-flex items-center gap-1">
                  Affiliate Disclosure <ArrowUpRight className="h-3 w-3" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure Box */}
        <div className="mt-10 pt-8 border-t border-slate-800 text-stone-400 text-[11px] leading-relaxed space-y-4">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex items-start gap-3">
            <Flame className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Affiliate Disclosure:</span> Some links on this website are affiliate links. We may earn a commission if you purchase through our links at no additional cost to you.
            </div>
          </div>

          <div className="text-slate-500 text-[10px] space-y-1 text-center md:text-left">
            <p>© {currentYear} Digital Income Labs®. All Rights Reserved. "Digital Income Labs®" is a registered trademark.</p>
            <p>Disclaimer: Generating digital income and pursuing side hustles involves real effort and commitment. All earnings numbers shared across this portal are indicative or illustrative of actual historical case studies, and are not guarantees of future financial outcomes. Always conduct your own research before investing time or funds into business ventures.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
