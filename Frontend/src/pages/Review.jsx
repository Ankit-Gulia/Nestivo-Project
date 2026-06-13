import { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../components/AuthContext";

const Review = ({ propertyId, reviews = [], onReviewCreated }) => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        rating: 5,
        comment: "",
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentData) => ({
            ...currentData,
            [name]: name === "rating" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.comment.trim()) {
            toast.error("Please write a review before submitting.");
            return;
        }

        try {
            setSubmitting(true);
            const response = await axios.post(
                `http://localhost:8080/property/${propertyId}/review`,
                formData,
                { withCredentials: true }
            );

            onReviewCreated(response.data.response);
            setFormData({ rating: 5, comment: "" });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Unable to add review.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-rose-500">Guest reviews</p>
                    <h2 className="mt-2 text-2xl font-black text-slate-900">What guests are saying</h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                </span>
            </div>

            {user ? (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-[24px] bg-slate-50 p-4">
                    <div>
                        <label htmlFor="rating" className="text-sm font-bold text-slate-700">
                            Rating
                        </label>
                        <select
                            id="rating"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-rose-400"
                        >
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <option key={rating} value={rating}>
                                    {rating} {rating === 1 ? "star" : "stars"}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="comment" className="text-sm font-bold text-slate-700">
                            Review
                        </label>
                        <textarea
                            id="comment"
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Share your experience with this stay"
                            className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-rose-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                        {submitting ? "Posting..." : "Post review"}
                    </button>
                </form>
            ) : (
                <div className="mt-6 rounded-[24px] bg-slate-50 p-4 text-sm text-slate-600">
                    <Link to="/login" className="font-bold text-slate-900">
                        Login
                    </Link>{" "}
                    to add your review for this stay.
                </div>
            )}

            <div className="mt-6 space-y-3">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <article key={review._id} className="rounded-[24px] border border-slate-200 bg-white p-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div>
                                    <p className="text-sm font-bold text-slate-900">
                                        {review.author?.email || "Nestivo guest"}
                                    </p>
                                    <p className="mt-1 text-xs font-semibold text-amber-600">
                                        Rating: {review.rating || 0}/5
                                    </p>
                                </div>
                                {review.createdAt && (
                                    <span className="text-xs font-semibold text-slate-400">
                                        {new Date(review.createdAt).toLocaleDateString("en-IN")}
                                    </span>
                                )}
                            </div>
                            <p className="mt-3 text-sm leading-6 text-slate-700">{review.comment}</p>
                        </article>
                    ))
                ) : (
                    <div className="rounded-[24px] border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                        No reviews yet. Be the first to share your stay experience.
                    </div>
                )}
            </div>
        </section>
    );
};

export default Review;
