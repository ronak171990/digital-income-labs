import React, { useState } from "react";
import { 
  Mail, Phone, MapPin, Globe, Shield, Scale, HelpCircle, CheckCircle2, User,
  BookOpen, Layers, Sparkles, TrendingUp, Compass, FileText, Award, Check, Heart, ShieldCheck,
  MessageSquare, Clock, ArrowRight, Send
} from "lucide-react";

interface StaticPagesProps {
  pageType: "about" | "contact" | "privacy" | "disclaimer" | "disclosure";
  onNavigate: (view: string, params?: any) => void;
}

export default function StaticPages({ pageType, onNavigate }: StaticPagesProps) {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("General Inquiry");
  const [formMsg, setFormMsg] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) return;
    setSentSuccess(true);
    setFormName("");
    setFormEmail("");
    setFormSubject("General Inquiry");
    setFormMsg("");
  };

  if (pageType === "about") {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16 sm:space-y-24 animate-fade-in" id="about-page">
        
        {/* Hero Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            WHO WE ARE
          </span>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
            About Digital Income Labs®
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-semibold">
            Helping people discover side hustles, AI tools, and online income opportunities through research-driven reviews, practical guides, and transparent analysis.
          </p>
        </div>

        {/* Mission Statement Callout Box with subtle blue/purple gradients */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 sm:p-10 border border-indigo-100/70 shadow-3xs flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-white rounded-2xl shadow-3xs border border-indigo-100">
            <Compass className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="space-y-3">
            <h2 className="font-sans font-extrabold text-lg text-slate-900">Our Shared Mission</h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-semibold">
              Digital Income Labs exists to simplify the world of online income opportunities. We research products, analyze business models, and create beginner-friendly guides that help readers make informed decisions with greater confidence.
            </p>
          </div>
        </div>

        {/* Statistics Benchmarks Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-200 shadow-3xs transition-all duration-300 text-center">
            <span className="block text-3xl sm:text-4xl font-extrabold text-blue-600">100+</span>
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Guides Published</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 shadow-3xs transition-all duration-300 text-center">
            <span className="block text-3xl sm:text-4xl font-extrabold text-indigo-600">Multiple</span>
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Product Reviews</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-purple-200 shadow-3xs transition-all duration-300 text-center">
            <span className="block text-3xl sm:text-4xl font-extrabold text-purple-600">AI & Hustle</span>
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1 font-sans">Coverage</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-pink-200 shadow-3xs transition-all duration-300 text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-pink-600">Regularly</span>
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Updated Content</span>
          </div>
        </div>

        {/* The Three Core Values Columns */}
        <div className="space-y-6">
          <div className="text-center space-y-1.5">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">How we approach analysis</span>
            <h2 className="font-sans font-extrabold text-2xl text-slate-900">Our Core Pillars</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-100 hover:border-blue-200 shadow-3xs hover:shadow-md transition-all duration-350 space-y-4 group text-left">
              <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-100 rounded-2xl flex items-center justify-center transition-colors">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-sans font-extrabold text-lg text-slate-900">Research-Driven Reviews</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
                We independently research products and present balanced insights, including strengths, limitations, and use cases.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-100 hover:border-indigo-200 shadow-3xs hover:shadow-md transition-all duration-350 space-y-4 group text-left">
              <div className="w-12 h-12 bg-indigo-50 group-hover:bg-indigo-100 rounded-2xl flex items-center justify-center transition-colors">
                <Globe className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-sans font-extrabold text-lg text-slate-900">Always Up To Date</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
                Digital products evolve rapidly. We regularly review and update our content to reflect the latest information available.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-100 hover:border-purple-200 shadow-3xs hover:shadow-md transition-all duration-350 space-y-4 group text-left">
              <div className="w-12 h-12 bg-purple-50 group-hover:bg-purple-100 rounded-2xl flex items-center justify-center transition-colors">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-sans font-extrabold text-lg text-slate-900">Actionable Roadmaps</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
                We focus on practical frameworks and step-by-step guides that help readers take meaningful action.
              </p>
            </div>
          </div>
        </div>

        {/* Founder Bio section with Premium card decoration */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-[2.5rem] p-8 sm:p-12 flex flex-col md:flex-row gap-8 sm:gap-12 items-center relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 h-48 w-48 bg-blue-500/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 h-48 w-48 bg-purple-500/10 blur-3xl rounded-full" />
          
          <div className="h-28 w-28 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center font-black text-white text-3xl shrink-0 shadow-lg border-2 border-white/20 select-none">
            RP
          </div>

          <div className="space-y-4 relative z-10 text-center md:text-left flex-1">
            <div className="space-y-1">
              <span className="block text-xs font-mono tracking-widest text-indigo-400 font-extrabold uppercase">FOUNDER & SENIOR EDITOR</span>
              <h3 className="font-sans font-extrabold text-2xl text-white">Ronak Patel</h3>
            </div>
            <p className="text-slate-300 text-sm sm:text-base italic leading-relaxed font-medium">
              "Digital Income Labs was created to help people cut through online noise and discover practical ways to learn new skills, explore digital opportunities, and make informed decisions. Our goal is to provide useful resources, transparent analysis, and beginner-friendly guidance that supports long-term growth."
            </p>
          </div>
        </div>

        {/* Evaluation Standards and Editorial Principles Split section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-4">
          
          {/* Review Standards */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-3xs space-y-5 text-left">
            <h3 className="font-sans font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <Award className="h-5 w-5 text-indigo-600" />
              Our Review Standards
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              At Digital Income Labs, our reviews are based on structured evaluation criteria, including:
            </p>
            <ul className="space-y-2 text-slate-700 text-xs sm:text-sm font-semibold">
              {[
                "Features and functionality",
                "Ease of use",
                "Pricing and value",
                "Learning curve",
                "Support and resources",
                "Intended audience and use cases"
              ].map((std, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-blue-500 flex-shrink-0" />
                  <span>{std}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Editorial Principles */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-3xs space-y-5 text-left">
            <h3 className="font-sans font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-indigo-600" />
              Editorial Principles
            </h3>
            <p className="text-slate-600 text-sm">
              Our commitment ensures absolute trust and premium reliability in each guide we distribute:
            </p>
            <ul className="space-y-2.5 text-slate-750 text-xs sm:text-sm font-bold">
              {[
                "Transparency",
                "Research-Based Analysis",
                "Clear Disclosures",
                "Beginner-Friendly Education",
                "Regular Content Updates"
              ].map((pr, i) => (
                <li key={i} className="flex items-center gap-2 text-indigo-600">
                  <span className="text-lg text-indigo-600">✓</span>
                  <span>{pr}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Affiliate Disclosure Section */}
        <div className="bg-slate-50 border border-slate-150 p-6 sm:p-8 rounded-3xl text-slate-500 space-y-3.5 text-left">
          <div className="flex items-center gap-2.5">
            <Shield className="h-5 w-5 text-slate-400" />
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">Affiliate Disclosure</h4>
          </div>
          <p className="text-[11.5px] leading-relaxed">
            Some links on Digital Income Labs are affiliate links. If you purchase through these links, we may earn a commission at no additional cost to you. This helps support our research and allows us to continue publishing free content.
          </p>
        </div>

      </div>
    );
  }

  if (pageType === "contact") {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16 sm:space-y-24 animate-fade-in" id="contact-page">
        
        {/* Hero Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            GET IN TOUCH
          </span>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
            Contact Support
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-semibold">
            Have questions about side hustles, AI tools, product reviews, or partnership opportunities? We'd love to hear from you.
          </p>
        </div>

        {/* Form and Support Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left panel: Info cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between h-full">
            
            {/* Card 1: General Inquiries */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full space-y-4 group">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-indigo-50 group-hover:bg-indigo-100 rounded-xl flex items-center justify-center transition-colors">
                  <MessageSquare className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-sans font-extrabold text-lg text-slate-900">General Inquiries</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-1 font-semibold">
                    For questions about our reviews, guides, and website content.
                  </p>
                </div>
              </div>
              <div className="pt-2 space-y-2 text-xs sm:text-sm font-bold text-indigo-600">
                <a href="mailto:support@digitalincomelabs.com" className="flex items-center gap-2 hover:underline">
                  <Mail className="h-4 w-4" />
                  <span>support@digitalincomelabs.com</span>
                </a>
                <a href="https://digitalincomelabs.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                  <Globe className="h-4 w-4" />
                  <span>digitalincomelabs.com</span>
                </a>
              </div>
            </div>

            {/* Card 2: Partnerships */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full space-y-4 group">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-blue-50 group-hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors">
                  <Layers className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-sans font-extrabold text-lg text-slate-900">Partnerships & Product Submissions</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-1 font-semibold">
                    Submit your AI tool, software, or digital product for review consideration and partnership discussions.
                  </p>
                </div>
              </div>
              <div className="pt-2 text-xs sm:text-sm font-bold text-blue-600">
                <a href="mailto:partnerships@digitalincomelabs.com" className="flex items-center gap-2 hover:underline">
                  <Mail className="h-4 w-4" />
                  <span>partnerships@digitalincomelabs.com</span>
                </a>
              </div>
            </div>

            {/* Card 3: Response Speed */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 hover:border-purple-100 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full space-y-4 group">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-purple-50 group-hover:bg-purple-100 rounded-xl flex items-center justify-center transition-colors">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-sans font-extrabold text-lg text-slate-900">Response Time</h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-bold tracking-wide mt-1 uppercase text-purple-600">
                    Monday – Friday
                  </p>
                </div>
              </div>
              <div className="text-slate-600 text-xs sm:text-sm font-semibold">
                We typically respond within 24–48 business hours.
              </div>
            </div>

          </div>

          {/* Right panel: Premium Contact form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-6 sm:p-10 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-500/5 blur-2xl rounded-full" />
            <div className="absolute bottom-0 left-0 h-32 w-32 bg-purple-500/5 blur-2xl rounded-full" />
            
            {sentSuccess ? (
              <div className="p-8 text-center space-y-6 animate-scale-up relative z-10 my-10">
                <div className="w-16 h-16 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <Check className="h-8 w-8 text-white stroke-[3px]" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-sans font-black text-2xl text-slate-900">Message Dispatched!</h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-semibold">
                    Thank you for contacting Digital Income Labs. We'll get back to you within 24–48 business hours.
                  </p>
                </div>
                <button
                  onClick={() => setSentSuccess(false)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-bold hover:underline"
                >
                  Send another inquiry
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6 text-left relative z-10">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-indigo-500" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Ronak Patel"
                    className="w-full bg-slate-50/65 border border-slate-200/80 rounded-xl p-3 sm:p-3.5 text-xs sm:text-sm font-semibold focus:outline-none focus:bg-white focus:border-indigo-500 transition-all text-left placeholder:text-slate-400"
                  />
                </div>
                
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-indigo-500" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="e.g. ronak@digitalincomelabs.com"
                    className="w-full bg-slate-50/65 border border-slate-200/80 rounded-xl p-3 sm:p-3.5 text-xs sm:text-sm font-semibold focus:outline-none focus:bg-white focus:border-indigo-500 transition-all text-left placeholder:text-slate-400"
                  />
                </div>

                {/* Subject Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="h-3.5 w-3.5 text-indigo-500" />
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      className="w-full bg-slate-50/65 border border-slate-200/80 rounded-xl p-3 sm:p-3.5 text-xs sm:text-sm font-semibold focus:outline-none focus:bg-white focus:border-indigo-500 transition-all text-left appearance-none"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Product Review Request">Product Review Request</option>
                      <option value="Partnership Opportunity">Partnership Opportunity</option>
                      <option value="Technical Issue">Technical Issue</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5 text-indigo-500" />
                    How can we help?
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your request in detail..."
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    className="w-full bg-slate-50/65 border border-slate-200/80 rounded-xl p-3 sm:p-3.5 text-xs sm:text-sm font-semibold focus:outline-none focus:bg-white focus:border-indigo-500 transition-all text-left placeholder:text-slate-400"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-6 rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow flex items-center justify-center gap-2 group-hover:scale-[1.01]"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer CTA Section */}
        <div className="bg-gradient-to-r from-blue-50/60 via-indigo-50/60 to-purple-50/60 border border-slate-100 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-left relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <span className="text-[10px] sm:text-xs font-black text-indigo-600 uppercase tracking-widest block">STILL EXPLORING?</span>
            <h4 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-900">Still exploring?</h4>
            <p className="text-slate-600 text-xs sm:text-sm font-semibold max-w-lg leading-relaxed">
              Browse our verified reviews and side hustle guides.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full md:w-auto shrink-0">
            <button
              onClick={() => onNavigate("reviews")}
              className="px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-3xs flex items-center justify-center gap-1.5"
            >
              Explore Reviews
            </button>
            <button
              onClick={() => onNavigate("blog")}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-3xs flex items-center justify-center gap-1.5"
            >
              Read Blog
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    );
  }

  // Legal views (Privacy, Disclaimer, Disclosure)
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-fade-in text-slate-700 text-xs leading-relaxed text-left" id="legal-layout text-left">
      
      {pageType === "privacy" && (
        <>
          <div className="border-b pb-4 space-y-1">
            <h1 className="font-sans font-extrabold text-2xl text-slate-900">Privacy Policy</h1>
            <span className="text-slate-400 block font-mono">LAST MODIFIED: June 17, 2026</span>
          </div>

          <p>
            At Digital Income Labs® (accessible from digitalincomelabs.com), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Digital Income Labs® and how we use it.
          </p>

          <h3 className="font-bold text-slate-900 text-sm mt-4">Consent</h3>
          <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

          <h3 className="font-bold text-slate-900 text-sm mt-4">Information we collect</h3>
          <p>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
          </p>
          <p>
            If you contact us directly or subscribe to our newsletter, we may receive additional info about you such as your name, email address, the contents of the message and/or attachments you may send us, and any other info you may choose to provide.
          </p>

          <h3 className="font-bold text-slate-900 text-sm mt-4">Log Files & Cookies</h3>
          <p>
            Digital Income Labs® follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date-time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
          </p>
        </>
      )}

      {pageType === "disclaimer" && (
        <>
          <div className="border-b pb-4 space-y-1">
            <h1 className="font-sans font-extrabold text-2xl text-slate-900">Disclaimer Notice</h1>
            <span className="text-slate-400 block font-mono">PUBLISHED: June 17, 2026</span>
          </div>

          <p>
            All the information on this website - digitalincomelabs.com - is published in good faith and for general information purpose only. Digital Income Labs® does not make any warranties about the completeness, reliability and accuracy of this information. 
          </p>

          <h3 className="font-bold text-slate-900 text-sm mt-4 font-sans">No Financial Advice</h3>
          <p>
            The contents of this website (including summaries of products, side hustle ideas, and guides) are purely educational. Pursuing online business ventures, configuring affiliate marketing networks, or deploying automated services involves financial risk and consistent effort. Results differ heavily according to dedication and baseline expertise. We recommend conducting independent audits or hiring certified financial helpers before dedicating funds.
          </p>

          <h3 className="font-bold text-slate-900 text-sm mt-4">Outward Redirect Links</h3>
          <p>
            From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites.
          </p>
        </>
      )}

      {pageType === "disclosure" && (
        <>
          <div className="border-b pb-4 space-y-1">
            <h1 className="font-sans font-extrabold text-2xl text-slate-900">Affiliate Disclosure</h1>
            <span className="text-slate-400 block font-mono">PUBLISHED: June 17, 2026</span>
          </div>

          <p>
            We believe in 100% honesty and transparency on the internet. In compliance with the FTC Guidelines, please assume the following about outlinks, redirects, and buttons on Digital Income Labs®:
          </p>

          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>
              Any link leading to a vendor product page (including JvZoo, Clickbank, WarriorPlus, Amazon or corporate software portals) is an affiliate link. 
            </li>
            <li>
              This means our laboratory receives a small recurring or one-time referral commission whenever you purchase a package through our outlink partners.
            </li>
            <li>
              Crucially, you pay the exact same price (or in many circumstances, a discounted launch promotional rate negotiated by our founder, Ronak Patel), meaning the affiliate commission comes directly from vendor margins.
            </li>
            <li>
              The compensation received does not influence the editorial evaluation. We buy and test software ourselves, indicating transparent pros, cons, pricing, and our genuine opinions.
            </li>
          </ul>
        </>
      )}

      <div className="pt-6 border-t flex justify-start">
        <button
          onClick={() => onNavigate("home")}
          className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold leading-none"
        >
          Return to home
        </button>
      </div>

    </div>
  );
}
