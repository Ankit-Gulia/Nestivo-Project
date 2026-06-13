import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import toast from 'react-hot-toast';


const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const navItems = [
    { label: "Home", to: "/property" },
    { label: "Add new property", to: "/property/add" },
    { label: "About", to: "/about" }
  ];

  const handleLogout = async () => {
    const response = await axios.post("http://localhost:8080/user/logout", {}, { withCredentials: true });
    toast.success(response.data.message);
    setUser(null);
  };

  const [open, setOpen] = React.useState(false);
  console.log(user);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 rounded-full border border-slate-200/80 bg-white/90 px-3 py-2 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.7)]">
          <Link to="/property" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-orange-400 text-lg font-bold text-white shadow-lg shadow-rose-500/30">
              N
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight text-slate-900">Nestivo</p>
              <p className="-mt-0.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">Stay beautifully</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-medium transition-all ${isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-500 lg:flex">
              <span className="mr-2 text-base">🔎</span>
              <form>
                <input type="search" placeholder="search stay" className="rounded-2xl border border-slate-900 px-2 py-2 text-sm text-slate-900 outline-none"/>
                <button className="rounded-full border px-4 py-2 text-sm font-semibold text-black transition hover:bg-slate-800 hover:text-white">search</button>
              </form>
            </div>

            {user ? (
              <>

                <div className="flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-white" onClick={() => setOpen(!open)}>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500 text-xs font-bold">
                    {user?.full_name?.charAt(0).toUpperCase() || "N"}
                  </div>
                  <span className="hidden text-sm font-semibold sm:block">{user.full_name}</span>
                </div>

                <div className="relative">

                  {open && (
                    <div className="absolute right-0 ml-8 mt-8 w-40 bg-white shadow rounded">
                      <span className="absolute right-1 top-1 text-3xl cursor-pointer bg-gray-200" onClick={() => setOpen(false)}>
                        ×
                      </span>
                      <br></br>
                      <a href="/profile" className="block p-2 hover:bg-gray-100 mt-4">
                        Profile
                      </a>
                      <a href="/settings" className="block p-2 hover:bg-gray-100">
                        Settings
                      </a>
                      <button className="block w-full text-left p-2 hover:bg-gray-100" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>

              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
