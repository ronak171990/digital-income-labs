import { ArrowRight, CheckCircle, Star } from "lucide-react";

interface Props {
  onNavigate: (view: string, params?: any) => void;
}

export default function AIResumeToolkitView({}: Props) {
  const gumroadUrl =
    "https://ronakstar60.gumroad.com/l/wxklgf";

  return (
    <div className="bg-white">

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-5 gap-12 items-center">

          {/* LEFT */}

          <div className="lg:col-span-2">

            <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold mb-5">
              🚀 NEW DIGITAL PRODUCT
            </span>

            <h1 className="text-5xl lg:text-6xl font-black leading-tight">

              AI Resume

              <span className="block text-purple-600">
                Builder Toolkit
              </span>

            </h1>

            <p className="text-xl text-gray-600 mt-6 leading-relaxed">

              Land more interviews with AI-powered resume templates,
              ATS optimization, LinkedIn branding, interview guides,
              and professional career resources.

            </p>

            {/* Rating */}

            <div className="flex items-center gap-3 mt-8">

              <div className="flex text-yellow-500">

                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />

              </div>

              <span className="font-semibold">
                4.9/5 Rating
              </span>

              <span className="text-gray-500">
                • 100+ Job Seekers Helped
              </span>

            </div>

            {/* FEATURES */}

            <div className="mt-8 space-y-4">

              {[
                "10+ ATS Resume Templates",
                "50+ AI Resume Prompts",
                "LinkedIn Optimization Guide",
                "HR Interview Guide",
                "10+ Cover Letter Templates",
                "200+ Resume Power Words",
                "ATS Resume Checklist",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle
                    className="text-green-500"
                    size={22}
                  />

                  <span className="text-lg">
                    {item}
                  </span>
                </div>
              ))}

            </div>

            {/* PRICE */}

            <div className="mt-10">

              <p className="text-gray-500">
                Launch Offer
              </p>

              <div className="flex items-center gap-4 mt-2">

                <span className="text-6xl font-black text-purple-600">

                  $5.99

                </span>

                <span className="line-through text-3xl text-gray-400">

                  $84

                </span>

                <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-bold">

                  93% OFF

                </span>

              </div>

            </div>

            {/* BUTTON */}

            <button
              onClick={() =>
                window.open(gumroadUrl, "_blank")
              }
              className="mt-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl px-8 py-5 text-xl font-bold flex items-center gap-3 hover:scale-105 transition shadow-xl"
            >
              Get Instant Access

              <ArrowRight size={22} />

            </button>

            {/* TRUST */}

            <div className="grid grid-cols-3 gap-4 mt-10 text-center">

              <div>

                <p className="text-2xl font-bold">
                  100+
                </p>

                <p className="text-gray-500 text-sm">
                  Customers
                </p>

              </div>

              <div>

                <p className="text-2xl font-bold">
                  Lifetime
                </p>

                <p className="text-gray-500 text-sm">
                  Access
                </p>

              </div>

              <div>

                <p className="text-2xl font-bold">
                  Instant
                </p>

                <p className="text-gray-500 text-sm">
                  Download
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="lg:col-span-3 relative">

            <img
              src="/images/ai-resume-toolkit.png"
              alt="AI Resume Builder Toolkit"
              className="w-full rounded-3xl shadow-2xl"
            />

            {/* Floating Card */}

            <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-xl p-6 hidden lg:block">

              <p className="text-gray-500 text-sm">

                Bundle Value

              </p>

              <h3 className="text-4xl font-black mt-2">

                $84

              </h3>

              <p className="text-green-600 font-semibold mt-1">

                Yours Today for

              </p>

              <h2 className="text-5xl font-black text-purple-600">

                $5.99

              </h2>

            </div>

          </div>

        </div>

      </section>

       {/* BEFORE VS AFTER */}

      <section className="bg-gray-50 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-black">
              Before vs After
            </h2>

            <p className="text-xl text-gray-600 mt-4">
              See the difference the AI Resume Builder Toolkit can make.
            </p>

          </div>

          <img
            src="/images/before-after.png"
            alt="Before vs After Resume"
            className="w-full rounded-3xl shadow-xl"
          />

        </div>

      </section>

      {/* WHAT'S INCLUDED */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-black">
              Everything Included
            </h2>

            <p className="text-xl text-gray-600 mt-4">
              Everything you need to create a professional job-winning resume.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              {
                title: "ATS Resume Templates",
                value: "$19",
                icon: "📄",
                desc: "Professional ATS-friendly editable templates."
              },
              {
                title: "AI Resume Prompts",
                value: "$15",
                icon: "🤖",
                desc: "Powerful ChatGPT prompts to improve resumes."
              },
              {
                title: "LinkedIn Guide",
                value: "$15",
                icon: "💼",
                desc: "Optimize your LinkedIn profile."
              },
              {
                title: "Interview Guide",
                value: "$15",
                icon: "🎯",
                desc: "Professional interview questions & answers."
              },
              {
                title: "Cover Letter Templates",
                value: "$10",
                icon: "✍️",
                desc: "Ready-to-edit templates."
              },
              {
                title: "ATS Checklist",
                value: "$10",
                icon: "📋",
                desc: "Final recruiter-ready checklist."
              }
            ].map((item) => (

              <div
                key={item.title}
                className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition"
              >

                <div className="text-5xl mb-5">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  {item.desc}
                </p>

                <div className="mt-6">

                  <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-bold">

                    Value {item.value}

                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* BUNDLE VALUE */}

      <section className="bg-gradient-to-r from-blue-700 to-purple-700 text-white py-24">

        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-5xl font-black">

            Complete Bundle Value

          </h2>

          <p className="text-xl mt-6 opacity-90">

            Pay once. Lifetime access.

          </p>

          <div className="mt-12 bg-white rounded-3xl text-gray-800 p-10 shadow-2xl">

            <table className="w-full text-left">

              <tbody className="divide-y">

                <tr>
                  <td className="py-4">ATS Resume Templates</td>
                  <td className="text-right font-bold">$19</td>
                </tr>

                <tr>
                  <td className="py-4">AI Resume Prompts</td>
                  <td className="text-right font-bold">$15</td>
                </tr>

                <tr>
                  <td className="py-4">LinkedIn Guide</td>
                  <td className="text-right font-bold">$15</td>
                </tr>

                <tr>
                  <td className="py-4">Interview Guide</td>
                  <td className="text-right font-bold">$15</td>
                </tr>

                <tr>
                  <td className="py-4">Cover Letter Templates</td>
                  <td className="text-right font-bold">$10</td>
                </tr>

                <tr>
                  <td className="py-4">Resume Power Words</td>
                  <td className="text-right font-bold">$5</td>
                </tr>

                <tr>
                  <td className="py-4">ATS Checklist</td>
                  <td className="text-right font-bold">$5</td>
                </tr>

              </tbody>

            </table>

            <div className="border-t mt-8 pt-8">

              <p className="text-gray-500">
                Total Value
              </p>

              <h2 className="text-6xl font-black mt-2">
                $84
              </h2>

              <p className="text-2xl mt-6">
                Today Only
              </p>

              <h1 className="text-7xl font-black text-purple-600 mt-2">
                $5.99
              </h1>

              <button
                onClick={() =>
                  window.open(gumroadUrl, "_blank")
                }
                className="mt-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl text-2xl font-bold shadow-xl hover:scale-105 transition"
              >
                🚀 Get Instant Access
              </button>

            </div>

          </div>

        </div>

      </section>

            {/* WHY THIS TOOLKIT WORKS */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="text-purple-600 font-bold uppercase tracking-widest">
              Why Choose This Toolkit
            </span>

            <h2 className="text-5xl font-black mt-4">
              Everything You Need to Land More Interviews
            </h2>

            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
              Instead of purchasing multiple career resources separately,
              you'll get everything in one affordable toolkit.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              {
                icon:"🎯",
                title:"ATS Optimized",
                desc:"Designed to help your resume pass Applicant Tracking Systems."
              },
              {
                icon:"🤖",
                title:"AI Powered",
                desc:"Use advanced ChatGPT prompts to improve your resume in minutes."
              },
              {
                icon:"💼",
                title:"Recruiter Friendly",
                desc:"Create resumes recruiters actually want to read."
              },
              {
                icon:"⚡",
                title:"Instant Download",
                desc:"Get access immediately after completing your purchase."
              },
              {
                icon:"📝",
                title:"Fully Editable",
                desc:"Customize every template using Microsoft Word or Google Docs."
              },
              {
                icon:"♾️",
                title:"Lifetime Access",
                desc:"Buy once and use forever. No subscriptions."
              }

            ].map((item)=>(

              <div
                key={item.title}
                className="rounded-3xl border p-8 hover:shadow-xl transition"
              >

                <div className="text-5xl mb-5">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* PERFECT FOR */}

      <section className="bg-gray-50 py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="text-blue-600 font-bold uppercase tracking-widest">
              Perfect For
            </span>

            <h2 className="text-5xl font-black mt-4">
              Built For Every Job Seeker
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              {
                icon:"🎓",
                title:"Freshers",
                desc:"Create your first professional ATS resume."
              },
              {
                icon:"💼",
                title:"Working Professionals",
                desc:"Upgrade your resume and switch to better opportunities."
              },
              {
                icon:"📈",
                title:"Career Switchers",
                desc:"Transition into a new industry confidently."
              },
              {
                icon:"📊",
                title:"Data Analyst Aspirants",
                desc:"Perfect for analytics, IT and tech careers."
              },
              {
                icon:"🏫",
                title:"MBA • BBA • BCom Students",
                desc:"Stand out during campus placements."
              },
              {
                icon:"🚀",
                title:"Job Seekers Worldwide",
                desc:"Works for resumes in every industry."
              }

            ].map((item)=>(

              <div
                key={item.title}
                className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl transition"
              >

                <div className="text-6xl">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold mt-5">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-4">
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* BONUS RESOURCES */}

      <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <span className="uppercase tracking-widest font-bold">
            FREE BONUSES
          </span>

          <h2 className="text-5xl font-black mt-5">

            Get Over $40 Worth of Bonus Resources

          </h2>

          <p className="text-xl opacity-90 mt-6">

            Included absolutely FREE when you purchase today.

          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-16">

            {[
              "LinkedIn Optimization Guide",
              "HR Interview Guide",
              "Cover Letter Templates",
              "Resume Power Words",
              "ATS Resume Checklist",
              "Future Toolkit Updates"
            ].map((bonus)=>(

              <div
                key={bonus}
                className="bg-white text-gray-800 rounded-2xl p-6 flex items-center gap-4 shadow-xl"
              >

                <div className="text-4xl">

                  🎁

                </div>

                <div>

                  <h3 className="font-bold text-xl">
                    {bonus}
                  </h3>

                  <p className="text-gray-600">

                    Included FREE

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

            {/* TESTIMONIALS */}

      <section className="py-24 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="uppercase tracking-widest text-purple-600 font-bold">
              SUCCESS STORIES
            </span>

            <h2 className="text-5xl font-black mt-4">
              Loved by Job Seekers
            </h2>

            <p className="text-xl text-gray-600 mt-5">
              Here's what people say after using the toolkit.
            </p>

          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            {[
              {
                name:"Sarah M.",
                role:"Marketing Professional",
                review:"I completely redesigned my resume using the templates. Within two weeks I started receiving interview calls."
              },
              {
                name:"Michael R.",
                role:"Software Engineer",
                review:"The AI prompts alone are worth the price. My LinkedIn profile looks much more professional now."
              },
              {
                name:"David P.",
                role:"Data Analyst",
                review:"Excellent toolkit. The ATS checklist helped me fix several mistakes I didn't even know existed."
              }

            ].map((item)=>(

              <div
                key={item.name}
                className="bg-white rounded-3xl shadow-lg p-8"
              >

                <div className="flex text-yellow-500 text-2xl">

                  ⭐⭐⭐⭐⭐

                </div>

                <p className="text-gray-700 leading-8 italic mt-6">

                  "{item.review}"

                </p>

                <div className="mt-8">

                  <h3 className="font-bold text-xl">
                    {item.name}
                  </h3>

                  <p className="text-gray-500">
                    {item.role}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* STATS */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-10 text-center">

            <div>
              <h2 className="text-5xl font-black text-purple-600">
                100+
              </h2>
              <p className="text-gray-600 mt-3">
                Job Seekers Helped
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-black text-purple-600">
                4.9★
              </h2>
              <p className="text-gray-600 mt-3">
                Average Rating
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-black text-purple-600">
                7
              </h2>
              <p className="text-gray-600 mt-3">
                Premium Resources
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-black text-purple-600">
                24/7
              </h2>
              <p className="text-gray-600 mt-3">
                Instant Access
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* FAQ */}

      <section className="bg-white py-24">

        <div className="max-w-5xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="uppercase tracking-widest text-blue-600 font-bold">
              Frequently Asked Questions
            </span>

            <h2 className="text-5xl font-black mt-4">
              Got Questions?
            </h2>

          </div>

          <div className="space-y-6">

            {[
              {
                q:"How do I receive the toolkit?",
                a:"Immediately after completing your purchase on Gumroad you'll receive instant access to download the complete toolkit."
              },
              {
                q:"Can I edit the templates?",
                a:"Yes. All templates are fully editable using Microsoft Word or compatible editors."
              },
              {
                q:"Is this beginner friendly?",
                a:"Absolutely. Every resource is designed for beginners as well as experienced professionals."
              },
              {
                q:"Will this work outside India?",
                a:"Yes. The templates and resume strategies work internationally."
              },
              {
                q:"Do I get lifetime access?",
                a:"Yes. Purchase once and access your toolkit forever."
              },
              {
                q:"Is this a physical product?",
                a:"No. This is a digital download delivered instantly after purchase."
              }

            ].map((faq)=>(

              <div
                key={faq.q}
                className="rounded-2xl border p-8"
              >

                <h3 className="text-2xl font-bold">

                  {faq.q}

                </h3>

                <p className="text-gray-600 mt-4 leading-8">

                  {faq.a}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* GUARANTEE */}

      <section className="py-24 bg-gradient-to-r from-green-500 to-emerald-600 text-white">

        <div className="max-w-5xl mx-auto text-center px-6">

          <div className="text-7xl">

            🛡️

          </div>

          <h2 className="text-5xl font-black mt-6">

            Secure Checkout

          </h2>

          <p className="text-xl mt-6 opacity-90 max-w-3xl mx-auto">

            Your payment is securely processed through Gumroad.
            Download your toolkit instantly after purchase and
            access it anytime.

          </p>

          <div className="flex flex-wrap justify-center gap-8 mt-10">

            <span className="bg-white/20 px-6 py-3 rounded-full">
              🔒 Secure Payment
            </span>

            <span className="bg-white/20 px-6 py-3 rounded-full">
              ⚡ Instant Download
            </span>

            <span className="bg-white/20 px-6 py-3 rounded-full">
              ♾️ Lifetime Access
            </span>

          </div>

        </div>

      </section>

            {/* FINAL CTA */}

      <section className="py-24 bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 text-white">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <span className="uppercase tracking-widest font-bold opacity-90">
            LIMITED-TIME OFFER
          </span>

          <h2 className="text-5xl lg:text-6xl font-black mt-6">
            Ready to Land More Interviews?
          </h2>

          <p className="text-xl opacity-90 mt-8 max-w-3xl mx-auto leading-8">
            Stop guessing what recruiters want.
            Create an ATS-friendly resume, improve your LinkedIn profile,
            prepare for interviews, and start applying with confidence.
          </p>

          <div className="flex justify-center items-center gap-6 mt-12 flex-wrap">

            <span className="text-7xl font-black">
              $5.99
            </span>

            <span className="text-4xl line-through opacity-70">
              $84
            </span>

            <span className="bg-red-500 px-5 py-3 rounded-full font-bold">
              SAVE 93%
            </span>

          </div>

          <button
            onClick={() =>
              window.open(
                gumroadUrl,
                "_blank"
              )
            }
            className="mt-12 bg-white text-purple-700 px-12 py-6 rounded-2xl text-2xl font-bold hover:scale-105 transition shadow-2xl"
          >
            🚀 Get Instant Access
          </button>

          <div className="flex justify-center gap-8 flex-wrap mt-10 text-lg">

            <span>⚡ Instant Download</span>

            <span>♾️ Lifetime Access</span>

            <span>🔒 Secure Checkout</span>

          </div>

        </div>

      </section>


      {/* CREATOR */}

      <section className="py-24 bg-white">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <img
            src="/images/ronak-patel.jpg"
            alt="Ronak Patel"
            className="w-40 h-40 rounded-full mx-auto object-cover shadow-xl"
          />

          <h2 className="text-4xl font-black mt-8">

            Created by Ronak Patel

          </h2>

          <p className="text-xl text-purple-600 mt-3">

            Founder • Digital Income Labs

          </p>

          <p className="text-lg text-gray-600 mt-8 leading-8 max-w-3xl mx-auto">

            I'm passionate about helping students,
            professionals and career switchers build
            better resumes, improve their personal brand,
            and land more interviews using AI and proven
            job search strategies.

          </p>

        </div>

      </section>


      {/* NEWSLETTER */}

      <section className="py-24 bg-gray-50">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-5xl font-black">

            Want More AI Career Resources?

          </h2>

          <p className="text-xl text-gray-600 mt-6">

            Join thousands of subscribers receiving
            AI tools, resume tips and online income ideas.

          </p>

          <button
            onClick={() =>
              onNavigate("free-guide")
            }
            className="mt-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl text-xl font-bold"
          >
            📘 Download Free AI Guide
          </button>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="bg-slate-900 text-white py-12">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

            <div>

              <h3 className="text-2xl font-black">

                Digital Income Labs

              </h3>

              <p className="text-gray-400 mt-2">

                Helping people build online income with AI.

              </p>

            </div>

            <div className="flex gap-8">

              <button
                onClick={() =>
                  onNavigate("about")
                }
                className="hover:text-purple-400"
              >
                About
              </button>

              <button
                onClick={() =>
                  onNavigate("contact")
                }
                className="hover:text-purple-400"
              >
                Contact
              </button>

              <button
                onClick={() =>
                  onNavigate("legal", "privacy")
                }
                className="hover:text-purple-400"
              >
                Privacy
              </button>

            </div>

          </div>

          <div className="border-t border-gray-700 mt-10 pt-8 text-center text-gray-400">

            © 2026 Digital Income Labs.
            All Rights Reserved.

          </div>

        </div>

      </footer>
    
    </div>
  );
}