import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../components/AuthContext";
import Review from "./Review";

const Details = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [property, setProperty] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8080/property/${id}`, { withCredentials: true });
                setProperty(response.data.property);
            } catch (err) {
                toast.error(err);
            }
            setLoading(false);
        };
        fetchProperty();
    }, [id]);


    const handleDelete = async () => {
        console.log('delete triggered');
        const res = await axios.delete(`http://localhost:8080/property/${id}`, { withCredentials: true });
        navigate('/property');
        toast.success(res.data.message);
    }

    const handleReviewCreated = (review) => {
        setProperty((currentProperty) => ({
            ...currentProperty,
            reviews: [review, ...(currentProperty.reviews || [])],
        }));
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-[#fffdf8] px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="animate-pulse space-y-6">
                        <div className="h-6 w-40 rounded-full bg-slate-200" />
                        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                            <div className="space-y-4">
                                <div className="h-96 rounded-[30px] bg-slate-200" />
                                <div className="h-8 w-2/3 rounded bg-slate-200" />
                                <div className="h-4 w-full rounded bg-slate-200" />
                                <div className="h-4 w-5/6 rounded bg-slate-200" />
                            </div>
                            <div className="space-y-4 rounded-[30px] bg-slate-100 p-6">
                                <div className="h-8 w-1/2 rounded bg-slate-200" />
                                <div className="h-10 w-1/3 rounded bg-slate-200" />
                                <div className="h-16 rounded bg-slate-200" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-[#fffdf8] px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl rounded-[30px] border border-rose-100 bg-white p-10 text-center shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Property unavailable</p>
                    <h1 className="mt-3 text-3xl font-bold text-slate-900">We couldn't load this stay</h1>
                    <p className="mt-3 text-slate-600">The property may have been removed or is temporarily unavailable.</p>
                    <Link
                        to="/property"
                        className="mt-6 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                    >
                        Back to properties
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fffdf8] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">Property showcase</p>
                        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900 sm:text-4xl">{property.title}</h1>
                    </div>
                    <Link
                        to="/property"
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
                    >
                        ← Back to homes
                    </Link>
                </div>

                <section className="flex justify-center">
                    <article className="w-full max-w-4xl overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_30px_120px_-50px_rgba(15,23,42,0.55)]">
                        <div className="relative">
                            <img
                                src={property.image?.url}
                                alt={property.image?.filename || property.title}
                                className="h-[26rem] w-full object-cover"
                            />
                        </div>

                        <div className="p-6 sm:p-7">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-rose-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-rose-600">{property.country}</span>
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-600">{property.location}</span>
                            </div>

                            <div className="mt-5 grid gap-4 md:grid-cols-2">
                                <div className="rounded-[28px] bg-slate-50 p-4">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Price</p>
                                    <p className="mt-2 text-3xl font-black text-slate-900">₹{property.price}</p>
                                    <p className="mt-1 text-sm text-slate-500">per stay</p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="text-2xl font-bold text-slate-900">About this stay</h2>
                                    <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-white">Verified listing</span>
                                </div>
                                <p className="mt-3 text-base leading-7 text-slate-700">{property.description}</p>
                            </div>

                            <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                {[
                                    { label: "Stay style", value: "Entire property" },
                                    { label: "Location", value: property.location },
                                    { label: "Host", value: property.owner?.email || "Hosted by Nestivo" },
                                ].map((detail) => (
                                    <div key={detail.label} className="rounded-[24px] border border-slate-200 bg-white p-4">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">{detail.label}</p>
                                        <p className="mt-2 text-sm font-semibold text-slate-900">{detail.value}</p>
                                    </div>
                                ))}
                            </div>

                            {user && user?._id === property?.owner?._id && (
                                <>
                                    <Link to={`/property/${id}/edit`}>
                                        <button className="mt-6 w-full rounded-full bg-blue-800 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-900">
                                            Edit your stay
                                        </button>
                                    </Link>


                                    <button className="mt-6 w-full rounded-full bg-rose-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-rose-600"
                                        onClick={handleDelete}
                                    >
                                        Delete your stay
                                    </button>
                                </>
                            )}

                        </div>
                    </article>
                </section>

                <Review
                    propertyId={id}
                    reviews={property.reviews || []}
                    onReviewCreated={handleReviewCreated}
                />
            </div>
        </div>
    );
};

export default Details;



