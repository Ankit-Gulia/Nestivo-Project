
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function NotFound() {
    useEffect(() => {
        toast.error('Page not found');
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#fffdf8] px-4 py-6 sm:px-6 lg:px-8">
            <div className="absolute inset-0">
                <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-rose-200/60 blur-3xl" />
                <div className="absolute bottom-[-6rem] right-[-4rem] h-80 w-80 rounded-full bg-cyan-200/50 blur-3xl" />
                <div className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-orange-200/40 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-6xl pt-8">
                <div className="grid items-center gap-8 rounded-[36px] border border-slate-200 bg-white/80 p-6 shadow-[0_35px_120px_-55px_rgba(15,23,42,0.65)] backdrop-blur md:p-8 lg:grid-cols-[1.05fr_0.95fr]">
                    <section className="text-center lg:text-left">
                        <div className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.26em] text-rose-600">
                            Lost in the matrix
                        </div>

                        <div className="mt-5 flex items-center justify-center gap-3 lg:justify-start">
                            <div className="rounded-3xl bg-slate-950 px-4 py-3 text-white shadow-lg">
                                <p className="text-4xl font-black">404</p>
                            </div>
                            <div className="rounded-3xl bg-rose-500/10 px-4 py-3 text-left ring-1 ring-rose-100">
                                <p className="text-xs font-bold uppercase tracking-[0.24em] text-rose-600">Signal</p>
                                <p className="mt-1 text-sm font-semibold text-slate-800">No route found</p>
                            </div>
                        </div>

                        <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                            This page wandered off the map.
                        </h1>

                        <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
                            The destination doesn’t exist, or it moved. Let’s help you return to the curated stays and polished experiences you came for.
                        </p>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                            <Link
                                to="/property"
                                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                            >
                                Back to homes
                            </Link>

                            <Link
                                to="/login"
                                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                            >
                                Sign in
                            </Link>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                            {['No route', 'Broken link', 'Explore stays'].map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="relative">
                        <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 p-6 text-white shadow-2xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.26em] text-white/60">Nestivo orbit</p>
                                    <p className="mt-2 text-2xl font-bold">Signal lost</p>
                                </div>
                                <div className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-white/70 backdrop-blur">
                                    Live scan
                                </div>
                            </div>

                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-[26px] bg-white/10 p-4 backdrop-blur">
                                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/60">Status</p>
                                    <p className="mt-2 text-3xl font-black">404</p>
                                    <p className="mt-1 text-sm text-white/70">No destination found</p>
                                </div>

                                <div className="rounded-[26px] bg-white/10 p-4 backdrop-blur">
                                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/60">Mode</p>
                                    <p className="mt-2 text-lg font-bold">Recovery</p>
                                    <p className="mt-1 text-sm text-white/70">Redirecting to discoverable stays</p>
                                </div>
                            </div>

                            <div className="mt-5 rounded-[26px] bg-white/10 p-5 backdrop-blur">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-white">Navigation map</p>
                                        <p className="mt-1 text-xs text-white/60">Search radius recalibrating</p>
                                    </div>
                                    <div className="rounded-full bg-emerald-400/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-200">
                                        Active
                                    </div>
                                </div>

                                <div className="mt-4 space-y-3">
                                    {[
                                        ['Home', 'Ready'],
                                        ['Discover stays', 'Ready'],
                                        ['Stay guides', 'Synced'],
                                    ].map(([label, status]) => (
                                        <div key={label} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm">
                                            <span className="font-medium text-white">{label}</span>
                                            <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-white/70">
                                                {status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default NotFound;