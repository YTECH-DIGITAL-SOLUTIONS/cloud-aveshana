/** @format */

import { useEffect, useState } from "react";
import { Star, Pencil } from "lucide-react";
import { api } from "@/utils/api";
import { toast } from "react-toastify";

interface Review {
  id: string;
  place_name: string;
  image: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function RatingReview() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    document.title = "Rating & Ulasan | Bhumi Aveshana";
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const res = await api.get(`/reviews?user_id=${userId}`);
      setReviews(res.data);
    } catch (err) {
      toast.error("Gagal mengambil ulasan");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Rating & Ulasan Anda
      </h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Belum ada ulasan 😢</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md flex flex-col md:flex-row overflow-hidden"
            >
              <img
                src={review.image}
                alt={review.place_name}
                className="w-full md:w-48 h-48 object-cover"
              />
              <div className="flex-1 p-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {review.place_name}
                  </h3>
                  <button className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm flex items-center gap-1">
                    <Pencil size={14} />
                    Edit
                  </button>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < review.rating
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                      fill={i < review.rating ? "currentColor" : "none"}
                    />
                  ))}
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    ({new Date(review.created_at).toLocaleDateString("id-ID")})
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
