import { useContext, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/property";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      setIsSubmitting(true);
      const res = await axios.post("http://localhost:8080/user/login", formData, { withCredentials: true });
      toast.success(res.data.message);
      setUser(res.data.user);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdf8] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_30px_120px_-50px_rgba(15,23,42,0.55)] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 p-8 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(244,63,94,0.28),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(56,189,248,0.18),_transparent_24%)]" />
          <div className="relative z-10">
            <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-white/70 backdrop-blur">
              Exclusive access
            </div>
            <p className="mt-5 text-4xl font-black tracking-tight">Discover stays that feel like home.</p>
            <p className="mt-3 max-w-md text-sm text-white/70">
              Sign in to unlock premium listings, host messages, and a curated booking experience across the world’s best stays.
            </p>
          </div>

          <div className="relative z-10 grid gap-3">
            {[
              {
                title: "Curated homes",
                detail: "Choose from design-led apartments and signature getaways.",
              },
              {
                title: "Trusted hosts",
                detail: "Verified owners and seamless communication every step of the way.",
              },
              {
                title: "Fast booking",
                detail: "Save favorites, review details, and reserve stays in moments.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[26px] border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-sm font-bold text-white">{item.title}</p>
                <p className="mt-1 text-sm text-white/70">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-6 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500 text-base font-bold text-white">
                N
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">Nestivo</p>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Stay smarter</p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Welcome back</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">Login to your account</h1>
              <p className="mt-2 text-sm text-slate-600">
                Continue exploring high-end stays, host conversations, and saved favorites.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
                />
              </div>

              {message && (
                <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-slate-400">
              <div className="h-px flex-1 bg-slate-200" />
              <span>Or</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="mt-6 rounded-[26px] border border-slate-200 bg-white p-4 text-sm text-slate-600">
              New here? <Link to="/signup" className="font-bold text-rose-600">Create an account</Link> to start booking curated stays.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
