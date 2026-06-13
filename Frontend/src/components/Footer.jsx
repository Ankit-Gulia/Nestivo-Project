import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerSections = [
    {
      title: "Nestivo",
      items: [
        { label: "Explore stays", href: "/property" },
        { label: "List your place", href: "/property/add" },
        { label: "Sign up", href: "/signup" }
      ]
    },
    {
      title: "Company",
      items: [
        { label: "About us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Newsroom", href: "/newsroom" }
      ]
    },
    {
      title: "Support",
      items: [
        { label: "Help center", href: "/support" },
        { label: "Trust & safety", href: "/trust" },
        { label: "Contact us", href: "/contact" }
      ]
    }
  ];

  return (
    <footer className="mt-10 border-t border-slate-200 bg-[#fffdf8]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-orange-400 text-lg font-bold text-white">
                N
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">Nestivo</p>
                <p className="-mt-0.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">Stay beautifully</p>
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm text-slate-600">
              Find elegant homes, flexible stays, and unforgettable city escapes with Nestivo — crafted for modern travel.
            </p>

            <div className="mt-5 flex items-center gap-2">
              {['✨', '🌍', '🏡'].map((icon) => (
                <span key={icon} className="rounded-full bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200">
                  {icon}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {footerSections.map((section) => (
              <div key={section.title}>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">{section.title}</p>
                <ul className="mt-4 space-y-2">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        className="text-sm text-slate-600 transition hover:text-slate-900"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-5 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Nestivo. Designed for modern stays.</p>
          <p>Developed by : Ankit Gulia (ankit20dev@gmail.com)</p>
          <div className="flex items-center gap-4">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Instagram</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
