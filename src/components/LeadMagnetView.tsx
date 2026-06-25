import { useState } from "react";

export default function LeadMagnetView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validate inputs
  if (name.trim() === "") {
    alert("Please enter your name.");
    return;
  }

  if (!email.includes("@")) {
    alert("Please enter a valid email address.");
    return;
  }

  try {
    setLoading(true);

    await fetch(
      "https://script.google.com/macros/s/AKfycbwMMNhNta05AtGUveL_vKS00ebCo05wLX69hEAz8TlPA5RYIeCMQLWb9T6lf9Pwu4vA/exec",
      {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
        }),
      }
    );

    window.open("/ebooks/30 AI Tools to Make Money Online in 2026.pdf", "_blank");

    alert("🎉 Thank you! Your free guide has been downloaded. Check your inbox every Friday for new AI tools and online income ideas.");

    setName("");
    setEmail("");
    setLoading(false);
  } catch (error) {
    console.error(error);
    setLoading(false);
    alert("Something went wrong.");
  }
};

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 text-center">

        <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
          📘 FREE PDF GUIDE
        </span>

        <h1 className="text-5xl font-bold mb-6">
          Download 30 AI Tools That Can Help You Build Online Income in 2026
        </h1>

        <p className="text-gray-600 text-xl mb-10">
          Get the free PDF guide and weekly AI business tips directly in your inbox.
        </p>

        <div className="text-left max-w-lg mx-auto mb-10 space-y-3">
          <p>✅ 30 carefully selected AI tools</p>
          <p>✅ Side hustle ideas and online business tips</p>
          <p>✅ Weekly AI recommendations</p>
          <p>✅ Bonus productivity resources</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto space-y-5"
        >
          <input
            type="text"
            placeholder="First Name"
            className="w-full border rounded-xl p-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border rounded-xl p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 disabled:opacity-70"
          >
            {loading ? "Please wait..." : "Download Free Guide"}
          </button>
          
        </form>

        <p className="text-gray-400 text-sm mt-6">
          🔒 No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}