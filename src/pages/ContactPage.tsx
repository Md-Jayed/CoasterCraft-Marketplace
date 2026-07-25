import React, { useState } from 'react';
import { Mail, MessageSquare, Send, ShieldCheck, Clock, Gamepad2, CheckCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discord: '',
    projectType: 'General Question',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Message Sent!', 'We will respond via email or Discord within 10 minutes.', 'success');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-3">
            <Mail className="w-4 h-4 text-cyan-400" /> 24/7 VIP Support
          </span>
          <h1 className="text-4xl font-black text-white tracking-tight mb-4">
            Contact CoasterCraft Team
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            Have a question about a Theme Park Tycoon 2 build, need installation support, or want to order a custom 4-plot mega park? Drop us a line!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Info Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2">Direct Contact Channels</h3>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-950 border border-gray-800">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-semibold">Business Email</span>
                  <a href="mailto:support@coastercraft.gg" className="text-sm font-bold text-cyan-300 hover:underline">
                    support@coastercraft.gg
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-950 border border-gray-800">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-semibold">Official Discord Community</span>
                  <p className="text-sm font-bold text-indigo-300">discord.gg/coastercraft</p>
                  <p className="text-[10px] text-gray-500">Tag: CoasterCraft#0001</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-950 border border-gray-800">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-semibold">Support Hours & SLA</span>
                  <p className="text-sm font-bold text-gray-200">24/7 Operations</p>
                  <p className="text-[10px] text-gray-500">Average response time: &lt; 10 minutes</p>
                </div>
              </div>
            </div>

            {/* Custom Build Callout Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/80 via-gray-900 to-blue-950/80 border border-cyan-500/40 text-xs text-gray-300 space-y-2">
              <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-1.5">
                <Gamepad2 className="w-4 h-4" /> Want a Custom 1-on-1 Build?
              </h4>
              <p className="leading-relaxed">
                Select "Custom Coaster or Park Request" in the form dropdown and include your plot size, theme preferences, and budget!
              </p>
            </div>
          </div>

          {/* Form Area (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-white mb-2">Send Us a Message</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Your Name / Roblox User <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. CoasterRider2026"
                        className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Discord Username (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.discord}
                        onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
                        placeholder="e.g. builder#0001"
                        className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Inquiry Type</label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-xs text-gray-100 focus:outline-none focus:border-cyan-500 cursor-pointer"
                      >
                        <option value="General Question">General Question</option>
                        <option value="Custom Order Inquiry">Custom Coaster or Park Request</option>
                        <option value="Installation Support">Installation / Import Support</option>
                        <option value="Business Inquiry">Partnership / Creator Affiliate</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your question or custom theme park idea..."
                      className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-gray-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      'Sending Message...'
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Inquiry
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Message Received!</h3>
                  <p className="text-xs text-gray-400 max-w-md mx-auto mb-6">
                    Thank you, <strong>{formData.name}</strong>. Our support team and master builders have been notified and will reply shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        discord: '',
                        projectType: 'General Question',
                        message: ''
                      });
                    }}
                    className="py-2.5 px-6 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-200"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
