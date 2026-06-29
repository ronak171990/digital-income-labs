import { useState } from "react";
import { Menu, X, ArrowRight, ShieldCheck, Cpu } from "lucide-react";

interface NavbarProps {
  currentView: string;
  currentParams: any;
  onNavigate: (view: string, params?: any) => void;
  isAdmin: boolean;
}

export default function Navbar({
  currentView,
  currentParams,
  onNavigate,
  isAdmin,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", view: "home" },
    { name: "Side Hustles", view: "category", params: "Side Hustle Ideas" },
    { name: "AI Tools", view: "category", params: "AI Tools" },
    { name: "Make Money Online", view: "category", params: "Make Money Online" },
    { name: "Passive Income", view: "category", params: "Passive Income" },
    { name: "AI Resume Toolkit", view: "ai-resume-builder-toolkit" },
    { name: "Reviews", view: "reviews" },
    { name: "Blog", view: "blog" },
    { name: "About", view: "about" },
    { name: "Contact", view: "contact" },
  ];

  const handleItemClick = (item: any) => {
    onNavigate(item.view, item.params);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center shrink-0">
            {/* Logo */}
            <div
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2 cursor-pointer group"
              id="nav-logo"
            >
              <div className="h-11 w-11 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110">
                <Cpu className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-[20px] tracking-tight text-slate-900 leading-none">
                  Digital Income Labs<span className="text-blue-600 font-bold">®</span>
                </span>
                <span className="text-[11px] text-slate-500 font-medium tracking-widest font-mono uppercase mt-0.5">
                  Side Hustles & AI
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {menuItems.map((item) => {
              const isActive =
  item.view === "category"
    ? currentView === "category" &&
      currentParams === item.params
    : currentView === item.view;
              return (
                <button
                  key={item.name}
                  onClick={() => handleItemClick(item)}
                  className={`px-5 py-2 rounded-full text-[13.5px] font-medium transition-all whitespace-nowrap ${
  item.view === "ai-resume-builder-toolkit"
    ? currentView === "ai-resume-builder-toolkit"
      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
    : isActive
      ? "bg-slate-900 text-white font-semibold"
      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
}`}
                  id={`nav-link-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => onNavigate("reviews")}
              className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-5 py-2 rounded-full text-xs font-semibold shadow-xs hover:bg-blue-700 hover:shadow-md transition-all cursor-pointer"
            >
              Explore Reviews
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex items-center lg:hidden gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-100 shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleItemClick(item)}
                className="block w-full text-left px-3 py-2.5 rounded-md text-[14px] font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 pb-2 border-t border-slate-100 px-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  onNavigate("reviews");
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-all"
              >
                Explore Reviews
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
