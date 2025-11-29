import React, { useState, useEffect } from 'react';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        loadWishlist();
    }, []);

    const loadWishlist = () => {
        const savedWishlist = localStorage.getItem('collegeWishlist');
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
    };

    const removeFromWishlist = (collegeId) => {
        const updatedWishlist = wishlist.filter(college => college.id !== collegeId);
        setWishlist(updatedWishlist);
        localStorage.setItem('collegeWishlist', JSON.stringify(updatedWishlist));
        window.dispatchEvent(new Event('wishlistUpdated'));
    };

    const clearWishlist = () => {
        if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
            setWishlist([]);
            localStorage.setItem('collegeWishlist', JSON.stringify([]));
            window.dispatchEvent(new Event('wishlistUpdated'));
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">My College Wishlist</h1>
                    <p className="text-sm text-gray-500 mt-1">Colleges you've saved for future reference</p>
                </div>
                {wishlist.length > 0 && (
                    <button
                        onClick={clearWishlist}
                        className="px-4 py-2 bg-red-50 text-red-600 text-sm font-bold rounded-lg hover:bg-red-100 transition-colors"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {wishlist.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-5xl">🏛️</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-500 mb-6">Start adding colleges from the education pages to build your wishlist!</p>
                    <div className="flex gap-2 justify-center flex-wrap">
                        <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">Primary Education</span>
                        <span className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-lg">Secondary Education</span>
                        <span className="px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-medium rounded-lg">Undergraduate</span>
                        <span className="px-3 py-1.5 bg-orange-50 text-orange-700 text-xs font-medium rounded-lg">Postgraduate</span>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-700">
                                {wishlist.length} {wishlist.length === 1 ? 'College' : 'Colleges'} Saved
                            </span>
                            <div className="flex gap-2">
                                {[...new Set(wishlist.map(c => c.category))].map(category => (
                                    <span key={category} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded">
                                        {category}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {wishlist.map((college) => (
                            <div key={college.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded mb-2">
                                            {college.category}
                                        </span>
                                        <h3 className="font-bold text-gray-900 text-base leading-tight mb-1">
                                            {college.name}
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => removeFromWishlist(college.id)}
                                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Remove from wishlist"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-2 text-sm">
                                    {college.location && (
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{college.location}</span>
                                        </div>
                                    )}
                                    {college.type && (
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <span>{college.type}</span>
                                        </div>
                                    )}
                                    {college.addedDate && (
                                        <div className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
                                            Added {new Date(college.addedDate).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
