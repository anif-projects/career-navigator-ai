import React, { useState, useEffect } from 'react';

const CareerAssessment = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    const username = localStorage.getItem('username');

    const [formData, setFormData] = useState({
        name: username || '',
        username: username || '',
        qualification: '',
        subjects: '',
        interests: '',
        skills: '',
        preferred_sector: ''
    });

    useEffect(() => {
        if (username) {
            fetchHistory();
        }
    }, [username]);

    const fetchHistory = async () => {
        try {
            const response = await fetch(`http://localhost:8000/assessment/history/${username}`);
            if (response.ok) {
                const data = await response.json();
                setHistory(data);
            }
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/assessment/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, username }), // Ensure username is sent
            });
            const data = await response.json();
            if (response.ok) {
                setResult(data.response);
                setStep(2); // Move to result view
                fetchHistory(); // Refresh history
            } else {
                alert('Error generating assessment: ' + data.detail);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to connect to the server.');
        } finally {
            setLoading(false);
        }
    };

    const loadHistoryItem = (item) => {
        setResult(item.result);
        setStep(2);
        setShowHistory(false);
    };

    const renderForm = () => (
        <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto animate-fadeIn">
            {/* Main Form */}
            <div className="flex-1 bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Career Discovery</h2>
                    <p className="text-gray-500 text-sm mt-1">AI-powered pathfinding for your future.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">Current Qualification</label>
                            <select
                                name="qualification"
                                value={formData.qualification}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                                required
                            >
                                <option value="">Select Qualification</option>
                                <option value="Class 10 (SSC)">Class 10 (SSC)</option>
                                <option value="Class 11-12 (Intermediate)">Class 11-12 (Intermediate)</option>
                                <option value="Undergraduate">Undergraduate</option>
                                <option value="Postgraduate">Postgraduate</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">Favorite Subjects</label>
                        <input
                            type="text"
                            name="subjects"
                            value={formData.subjects}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                            placeholder="e.g., Mathematics, Physics, History"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">Hobbies & Interests</label>
                        <textarea
                            name="interests"
                            value={formData.interests}
                            onChange={handleChange}
                            rows="2"
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                            placeholder="e.g., Coding, Painting, Solving Puzzles"
                            required
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">Key Skills (Optional)</label>
                            <input
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                                placeholder="e.g., Python, Leadership"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">Preferred Job Type</label>
                            <input
                                list="job-types"
                                type="text"
                                name="preferred_role_type"
                                value={formData.preferred_role_type}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                                placeholder="Select or type your preference"
                            />
                            <datalist id="job-types">
                                <option value="Any (Open to all)" />
                                <option value="Private Sector (MNCs, Startups)" />
                                <option value="Government Jobs (IAS, IPS, PSU)" />
                                <option value="Entrepreneurship / Business" />
                                <option value="Freelancing / Remote Work" />
                            </datalist>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">Preferred Sector (Optional)</label>
                        <input
                            type="text"
                            name="preferred_sector"
                            value={formData.preferred_sector}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                            placeholder="e.g., IT, Healthcare, Education"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-bold text-base shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Analyzing...
                            </>
                        ) : (
                            <>
                                🚀 Generate Roadmap
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* History Sidebar - Floating & Distinct */}
            <div className="w-full lg:w-80 h-fit lg:sticky lg:top-8">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 overflow-hidden relative">
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                            <span className="bg-blue-50 text-blue-600 p-1.5 rounded-lg">📜</span> History
                        </h3>
                        {history.length > 0 && (
                            <button
                                onClick={async (e) => {
                                    e.stopPropagation();
                                    if (window.confirm('Are you sure you want to clear your assessment history?')) {
                                        try {
                                            const res = await fetch(`http://localhost:8000/assessment/history/${username}`, { method: 'DELETE' });
                                            if (res.ok) {
                                                setHistory([]);
                                                setShowHistory(false);
                                            }
                                        } catch (err) {
                                            console.error(err);
                                        }
                                    }
                                }}
                                className="text-xs text-red-500 hover:text-red-700 font-semibold px-2 py-1 rounded hover:bg-red-50 transition-colors"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {history.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center py-8 italic relative z-10">No past assessments found.</p>
                    ) : (
                        <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2 relative z-10">
                            {history.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => loadHistoryItem(item)}
                                    className="p-4 rounded-xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-md cursor-pointer transition-all duration-300 group shadow-sm"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]"></span>
                                            <span className="text-xs font-bold text-gray-700 group-hover:text-blue-600 transition-colors tracking-wide">
                                                {new Date(item.timestamp).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                                            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-medium group-hover:text-gray-700 transition-colors">
                                        {item.request.interests}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const renderResult = () => {
        if (!result) return null;

        const { profile_analysis, recommendations, roadmap, motivational_note } = result;

        return (
            <div className="max-w-6xl mx-auto animate-fadeIn pb-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Your Career Blueprint</h1>
                    <button
                        onClick={() => setStep(1)}
                        className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg font-bold hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
                    >
                        ← New Assessment
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Profile & Recommendations */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl">
                                    📊
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800">Profile Insights</h2>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {profile_analysis.strengths.map((strength, index) => (
                                            <span key={index} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold border border-blue-100">
                                                {strength}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-3 rounded-xl border border-gray-100 text-sm text-gray-700 leading-relaxed">
                                {profile_analysis.potential}
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="text-blue-600">🌟</span> Top Recommendations
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {recommendations.map((rec, index) => (
                                    <div key={index} className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300 ${index === 0 ? 'md:col-span-2 border-blue-200 ring-1 ring-blue-50' : ''}`}>
                                        <div className="flex items-start gap-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-2xl shrink-0 ${index === 0 ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-600'}`}>
                                                {rec.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-base font-bold text-gray-800">{rec.role}</h3>
                                                <p className="text-gray-600 text-xs mt-1 leading-relaxed">{rec.fit_reason}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Motivational Note */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white text-center shadow-lg shadow-blue-200/50">
                            <p className="text-lg font-medium italic opacity-90">"{motivational_note}"</p>
                        </div>
                    </div>

                    {/* Right Column: Roadmap */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
                            <div className="p-5 border-b border-gray-100 bg-gray-50 rounded-t-2xl">
                                <h2 className="font-bold text-gray-800 flex items-center gap-2">
                                    <span>🗺️</span> Action Plan
                                </h2>
                            </div>
                            <div className="p-5 flex-1 overflow-y-auto max-h-[600px] custom-scrollbar">
                                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-3.5 before:h-full before:w-0.5 before:bg-gray-100">
                                    {roadmap.steps.map((step, index) => (
                                        <div key={index} className="relative pl-10">
                                            <div className="absolute left-0 top-1 w-7 h-7 rounded-full border-2 border-white bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm z-10">
                                                {index + 1}
                                            </div>
                                            <h3 className="font-bold text-sm text-gray-800 mb-2">{step.phase}</h3>
                                            <ul className="space-y-2">
                                                {step.details.map((detail, i) => (
                                                    <li key={i} className="text-gray-600 text-xs flex items-start gap-2">
                                                        <span className="text-blue-400 mt-0.5">•</span>
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                                <button onClick={() => window.print()} className="w-full py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-100 transition-colors text-sm shadow-sm">
                                    🖨️ Print Roadmap
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 py-6 px-4 font-manrope">
            {step === 1 ? renderForm() : renderResult()}
        </div>
    );
};

export default CareerAssessment;
