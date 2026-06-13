
import {Link} from "react-router-dom";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get("http://localhost:8080/property", { withCredentials: true });
                setProperties(response.data.properties);
            }   catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchProperties();
    }, []);

    

    return (
        <div className="min-h-screen bg-[#fffdf8] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                <section className="mt-8">
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {properties.map((property) => (
                            <article
                                key={property._id}
                                className="overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_24px_80px_-36px_rgba(15,23,42,0.7)]"
                            >
                                <img
                                    src={property.image.url}
                                    alt={property.image.filename}
                                    className="h-52 w-full object-cover"
                                />

                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className="text-lg font-bold tracking-tight text-slate-900">{property.title}</h3>
                                            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                                                <span>📍</span>
                                                <span>{property.location}</span>
                                            </p>
                                        </div>
                                        <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-rose-600">
                                            {property.country}
                                        </span>
                                    </div>

                                    <p className="mt-3 text-sm text-slate-600">{property.description}</p>

                                    <div className="mt-4 border-t border-slate-100 pt-4">
                                        <div className="flex items-end justify-between gap-3">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Starting from</p>
                                                <p className="mt-1 text-base font-bold text-slate-900">₹{Number(property.price).toLocaleString("en-IN")}</p>
                                            </div>
                                            

                                            <Link to={`/property/${property._id}`}>
                                                <span className="rounded-full bg-slate-900 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-white">
                                                    View stay
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
