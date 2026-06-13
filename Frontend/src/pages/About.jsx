import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  const highlights = [
    {
      title: "Curated stays",
      description: "Nestivo helps guests discover comfortable properties with the details they need before booking."
    },
    {
      title: "Easy hosting",
      description: "Owners can add, update, and manage property listings through a simple protected workflow."
    },
    {
      title: "Modern experience",
      description: "The app is designed with clean navigation, secure authentication, and a friendly browsing flow."
    }
  ];

  return (
    <main className="min-h-screen bg-[#fffdf8] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-500">
              About Nestivo
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              A simple place to find and manage beautiful stays.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Nestivo is a property listing platform built for people who want a smooth way to explore stays,
              view property details, and create listings. It brings together a clean frontend, protected user
              flows, and property management features in one travel-focused experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/property"
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Explore stays
              </Link>
              <Link
                to="/property/add"
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-900"
              >
                Add property
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_24px_80px_-36px_rgba(15,23,42,0.7)]">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
              alt="A welcoming modern stay"
              className="h-72 w-full object-cover sm:h-96"
            />
            <div className="grid gap-4 p-5 sm:grid-cols-3">
              <div>
                <p className="text-2xl font-bold text-slate-950">01</p>
                <p className="mt-1 text-sm text-slate-500">Browse properties</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-950">02</p>
                <p className="mt-1 text-sm text-slate-500">View stay details</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-950">03</p>
                <p className="mt-1 text-sm text-slate-500">Manage listings</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-5 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.8)]"
            >
              <h2 className="text-lg font-bold text-slate-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-16 rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-42px_rgba(15,23,42,0.75)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-500">
                Developer
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                Developed by Ankit Gulia
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="mailto:ankit20dev@gmail.com"
                className="rounded-2xl border border-slate-200 bg-[#fffdf8] p-5 transition hover:border-rose-300"
              >
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Email</p>
                <p className="mt-2 break-words text-sm font-semibold text-slate-900">
                  ankit20dev@gmail.com
                </p>
              </a>
              <a
                href="https://www.linkedin.com/in/ankit20dev"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-slate-200 bg-[#fffdf8] p-5 transition hover:border-rose-300"
              >
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">LinkedIn</p>
                <p className="mt-2 break-words text-sm font-semibold text-slate-900">
                  /ankit20dev
                </p>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
