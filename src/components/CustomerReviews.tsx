import React, { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, User, Sparkles, ThumbsUp } from 'lucide-react';
import { CustomerReview } from '../types';
import { REVIEWS } from '../data/bakeryData';

export const CustomerReviews: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(REVIEWS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [branch, setBranch] = useState('Annavaram Flagship (NH-16)');
  const [favoriteItem, setFavoriteItem] = useState('');

  // Load user submitted reviews from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pastry_inn_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviewsList([...parsed, ...REVIEWS]);
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newRev: CustomerReview = {
      id: 'rev-user-' + Date.now(),
      author: author.trim(),
      rating,
      date: 'Just now',
      branch,
      favoriteItem: favoriteItem.trim() || undefined,
      comment: comment.trim(),
      verified: true,
    };

    const updated = [newRev, ...reviewsList];
    setReviewsList(updated);
    try {
      const userOnly = updated.filter(r => r.id.startsWith('rev-user-'));
      localStorage.setItem('pastry_inn_reviews', JSON.stringify(userOnly));
    } catch (e) {
      // ignore
    }

    setShowAddModal(false);
    setAuthor('');
    setComment('');
    setFavoriteItem('');
  };

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EFE7D8] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8C5E48]">
              <span>Customer Satisfaction</span>
              <span aria-hidden="true" className="text-[#C86D51]">·</span>
              <span>1,280+ Verified Ratings</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29221F]">
              Loved by Highway Travellers & Locals
            </h2>
            <p className="text-sm text-[#5A4E48] max-w-xl">
              From birthday milestone celebrations to unforgettable highway tea breaks, here is what guests say about Pastry Inn.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="self-start md:self-end flex items-center gap-2 px-5 py-2.5 bg-[#C86D51] hover:bg-[#B3583C] text-white rounded-xl text-xs font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Rating Breakdown Banner */}
        <div className="bg-white rounded-2xl border border-[#DDD0BC] p-6 sm:p-8 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Average Score */}
          <div className="md:col-span-4 text-center md:text-left space-y-2 md:border-r border-[#EFE7D8] md:pr-8">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="font-serif text-5xl font-bold text-[#29221F]">4.8</span>
              <div className="space-y-1">
                <div className="flex items-center text-[#E5A853]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#786A63]">Out of 5.0 Stars</p>
              </div>
            </div>
            <p className="text-xs text-[#5A4E48]">
              Based on authentic feedback from Google Maps and dining guests across all branches.
            </p>
          </div>

          {/* Breakdown Bars */}
          <div className="md:col-span-8 space-y-2">
            {[
              { stars: '5 Stars', percent: 88, count: '1,126' },
              { stars: '4 Stars', percent: 9, count: '115' },
              { stars: '3 Stars', percent: 2, count: '26' },
              { stars: '2 Stars', percent: 1, count: '8' },
            ].map((bar) => (
              <div key={bar.stars} className="flex items-center gap-3 text-xs text-[#5A4E48]">
                <span className="w-14 text-right font-medium">{bar.stars}</span>
                <div className="flex-1 h-2 bg-[#F3EBDD] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E5A853] rounded-full"
                    style={{ width: `${bar.percent}%` }}
                  />
                </div>
                <span className="w-12 text-[#786A63] text-right font-mono">{bar.count}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.slice(0, 6).map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-[#E5DACF] p-6 shadow-2xs flex flex-col justify-between space-y-4 hover:border-[#C86D51]/30 transition-all"
            >
              <div className="space-y-3">
                
                {/* Header & Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#E5A853]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#8F817A]">{rev.date}</span>
                </div>

                {/* Comment Text */}
                <p className="text-xs text-[#5A4E48] leading-relaxed italic">
                  "{rev.comment}"
                </p>

                {/* Favorite Item Mention if any */}
                {rev.favoriteItem && (
                  <div className="pt-2 text-[11px] text-[#8C5E48]">
                    <span className="font-semibold text-[#29221F]">Favorite: </span>
                    <span>{rev.favoriteItem}</span>
                  </div>
                )}
              </div>

              {/* Author & Branch */}
              <div className="pt-3 border-t border-[#EFE7D8] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#29221F] flex items-center gap-1">
                    <span>{rev.author}</span>
                    {rev.verified && (
                      <span title="Verified Guest" className="inline-flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#34A853]" />
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#786A63]">{rev.branch}</span>
                </div>

                <div className="text-[10px] text-[#34A853] font-medium flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3" />
                  <span>Recommended</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-[#FAF7F2] rounded-2xl border border-[#DDD0BC] shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#EFE7D8] pb-3">
              <h3 className="font-serif text-lg font-bold text-[#29221F]">
                Share Your Pastry Inn Experience
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-[#786A63] hover:text-[#29221F] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#29221F] block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Balu K."
                  className="w-full text-xs px-3 py-2 bg-white rounded-xl border border-[#DDD0BC] text-[#29221F] focus:outline-hidden focus:border-[#C86D51]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#29221F] block mb-1">Star Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-[#E5A853] hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${star <= rating ? 'fill-current' : 'text-[#DDD0BC]'}`} />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#29221F] ml-2">{rating} / 5 Stars</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#29221F] block mb-1">Branch Visited</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white rounded-xl border border-[#DDD0BC] text-[#29221F] focus:outline-hidden focus:border-[#C86D51]"
                >
                  <option value="Annavaram Flagship (NH-16)">Annavaram Flagship (NH-16)</option>
                  <option value="Tuni Town Branch">Tuni Town Branch</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#29221F] block mb-1">Favorite Pastry or Cake</label>
                <input
                  type="text"
                  value={favoriteItem}
                  onChange={(e) => setFavoriteItem(e.target.value)}
                  placeholder="e.g. Dutch Truffle Pastry, Paneer Puff"
                  className="w-full text-xs px-3 py-2 bg-white rounded-xl border border-[#DDD0BC] text-[#29221F] focus:outline-hidden focus:border-[#C86D51]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#29221F] block mb-1">Your Review *</label>
                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about the taste, packaging, and ambiance..."
                  className="w-full text-xs px-3 py-2 bg-white rounded-xl border border-[#DDD0BC] text-[#29221F] focus:outline-hidden focus:border-[#C86D51]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-2.5 text-xs font-semibold text-[#4A3E39] bg-white border border-[#DDD0BC] rounded-xl hover:bg-[#FAF7F2] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 text-xs font-semibold text-white bg-[#C86D51] hover:bg-[#B3583C] rounded-xl cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
