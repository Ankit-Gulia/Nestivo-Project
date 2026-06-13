import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Add = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    country: "",
    price: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url)
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("location", formData.location);
      data.append("country", formData.country);
      data.append("price", formData.price); 
      if (file) {
        data.append("image", file);
      }

    try {
      setIsSubmitting(true);
      const res = await axios.post(`https://nestivo-project-1.onrender.com/property`, data, { withCredentials: true });
      toast.success(res.data.message);
      navigate("/property");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdf8] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_30px_120px_-50px_rgba(15,23,42,0.55)] lg:grid-cols-[0.95fr_1.05fr]">
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 p-8 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(244,63,94,0.24),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(14,116,144,0.18),_transparent_26%)]" />
          <div className="relative z-10">
            <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-white/70 backdrop-blur">
              Host dashboard
            </div>
            <p className="mt-5 text-4xl font-black tracking-tight">Showcase a property that feels unforgettable.</p>
            <p className="mt-3 max-w-md text-sm text-white/70">
              Add images, pricing, and rich details to publish a polished stay listing that stands out on Nestivo.
            </p>
          </div>

          <div className="relative z-10 grid gap-3">
            {[
              {
                title: "Polished listings",
                detail: "Present high-quality property imagery and strong descriptions in one place.",
              },
              {
                title: "Better conversion",
                detail: "Clear pricing and location details help guests book with confidence.",
              },
              {
                title: "Fast publishing",
                detail: "Publish your stay instantly with a smooth, guided workflow.",
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
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500 text-base font-bold text-white">
                N
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">Nestivo</p>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Property publishing</p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Add property</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">Create a new listing</h1>
              <p className="mt-2 text-sm text-slate-600">
                Capture the details, imagery, and pricing that make a stay feel finished and inviting.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="title">
                    Property title
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="The Loft at Marina Bay"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="location">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="country">
                    Country
                  </label>
                  <input
                    id="country"
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="India"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="price">
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="8500"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the mood, space, and what makes this stay special"
                    rows="5"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
                    required
                  />
                </div>
              </div>

              <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Cover image</p>
                    <p className="mt-1 text-xs text-slate-500">Upload a high-quality photo to make the stay feel premium.</p>
                  </div>
                  <label className="cursor-pointer rounded-full bg-slate-900 px-3 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white">
                    Choose file
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files[0])}
                      
                    />
                  </label>
                </div>

                <div className="mt-4 overflow-hidden rounded-[26px] border border-slate-200 bg-white p-3">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="h-56 w-full rounded-[22px] object-cover" />
                  ) : (
                    <div className="flex h-56 items-center justify-center rounded-[22px] bg-slate-100 text-sm text-slate-500">
                      Preview will appear here after you select an image.
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-rose-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Publishing listing..." : "Publish property"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Add;
