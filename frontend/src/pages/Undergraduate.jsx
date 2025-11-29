import React, { useState } from 'react';
import undergraduateColleges from '../data/schools_undergraduate.json';

const streams = [
    { name: 'Engineering Programs', icon: '⚙️', description: 'B.Tech, B.E in various specializations like CSE, ECE, Mechanical, Civil, etc.', color: 'from-blue-500 to-cyan-500', courses: ['CSE', 'ECE', 'EEE', 'Mech', 'Civil'] },
    { name: 'Medical Sciences', icon: '🩺', description: 'MBBS, BDS, BAMS, BHMS, Pharmacy, Nursing and other allied health sciences.', color: 'from-green-500 to-emerald-500', courses: ['MBBS', 'BDS', 'B.Pharm', 'Nursing'] },
    { name: 'Degree Courses', icon: '🎓', description: 'B.Sc, B.Com, B.A and other 3-year undergraduate degree programs.', color: 'from-purple-500 to-violet-500', courses: ['B.Sc', 'B.Com', 'B.A', 'BBA', 'BCA'] },
    { name: 'Architecture & Design', icon: '🏛️', description: 'B.Arch, B.Des and other creative fields.', color: 'from-orange-500 to-amber-500', courses: ['B.Arch', 'B.Des', 'Fashion Tech'] },
    { name: 'Agriculture', icon: '🌾', description: 'B.Sc Agriculture and related fields.', color: 'from-lime-500 to-green-500', courses: ['B.Sc Agri', 'Horticulture'] },
    { name: 'Defense (NDA)', icon: '🎖️', description: 'Join Army, Navy, or Airforce through NDA.', color: 'from-red-500 to-rose-500', courses: ['Army', 'Navy', 'Airforce'] }
];

const scholarships = {
    ap: [
        { name: 'Jnanabhumi', description: 'Post-matric scholarships for SC/ST/BC/Minorities.', amount: 'Full Fee Reimbursement + Maintenance' },
        { name: 'Vidyadhan', description: 'For meritorious students from economically challenged families.', amount: '₹10,000 - ₹60,000/year' }
    ],
    ts: [
        { name: 'ePASS', description: 'Reimbursement of Tuition Fee (RTF) & Maintenance Fee (MTF).', amount: 'Full Fee + Monthly Stipend' },
        { name: 'Ambedkar Overseas Vidya Nidhi', description: 'Financial assistance for studying abroad.', amount: 'Up to ₹20 Lakhs' }
    ]
};

const Undergraduate = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const [streamSection, setStreamSection] = useState('Engineering');
    const [searchQuery, setSearchQuery] = useState('');
    const [wishlist, setWishlist] = useState([]);

    React.useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('collegeWishlist') || '[]');
        setWishlist(savedWishlist);
    }, []);

    const isInWishlist = (collegeName) => {
        return wishlist.some(item => item.name === collegeName);
    };

    const toggleWishlist = (college) => {
        let updatedWishlist;
        const collegeId = `undergraduate-${college['College Name']}`;

        if (isInWishlist(college['College Name'])) {
            updatedWishlist = wishlist.filter(item => item.name !== college['College Name']);
        } else {
            const wishlistItem = {
                id: collegeId,
                name: college['College Name'],
                location: college['Location'] || college['City'] || 'N/A',
                type: college['Type'] || 'Undergraduate',
                category: 'Undergraduate',
                addedDate: new Date().toISOString()
            };
            updatedWishlist = [...wishlist, wishlistItem];
        }

        setWishlist(updatedWishlist);
        localStorage.setItem('collegeWishlist', JSON.stringify(updatedWishlist));
        window.dispatchEvent(new Event('wishlistUpdated'));
    };

    const tabs = [
        'Home', 'Streams', 'College List', 'Scholarship', 'Job Opportunities', 'Career Opportunities'
    ];

    const renderStreamContent = () => {
        switch (streamSection) {
            case 'Engineering':
                return (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-bold text-blue-800 mb-4">⚙️ Engineering (B.Tech / B.E)</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50 rounded-xl">
                                    <div className="font-bold text-blue-900">Computer Science (CSE) & IT</div>
                                    <p className="text-sm text-blue-700 mt-1">Software Development, AI, Data Science, Cybersecurity.</p>
                                </div>
                                <div className="p-4 bg-indigo-50 rounded-xl">
                                    <div className="font-bold text-indigo-900">Electronics (ECE) & Electrical (EEE)</div>
                                    <p className="text-sm text-indigo-700 mt-1">VLSI, Embedded Systems, Power Systems, IoT.</p>
                                </div>
                                <div className="p-4 bg-cyan-50 rounded-xl">
                                    <div className="font-bold text-cyan-900">Mechanical & Civil</div>
                                    <p className="text-sm text-cyan-700 mt-1">Robotics, Automotive, Construction, Structural Engineering.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Medical':
                return (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-bold text-green-800 mb-4">🩺 Medical & Allied Health</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-green-50 rounded-xl">
                                    <div className="font-bold text-green-900">MBBS & BDS</div>
                                    <p className="text-sm text-green-700 mt-1">Doctor of Medicine, Surgery, and Dental Surgery.</p>
                                </div>
                                <div className="p-4 bg-emerald-50 rounded-xl">
                                    <div className="font-bold text-emerald-900">AYUSH (BAMS, BHMS, BUMS)</div>
                                    <p className="text-sm text-emerald-700 mt-1">Ayurveda, Homeopathy, Unani, and Naturopathy.</p>
                                </div>
                                <div className="p-4 bg-teal-50 rounded-xl">
                                    <div className="font-bold text-teal-900">Allied Health Sciences</div>
                                    <p className="text-sm text-teal-700 mt-1">B.Pharm, Nursing, Physiotherapy, Lab Technician.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Degree':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                        {[
                            { title: 'B.Sc (Bachelor of Science)', desc: 'Maths, Physics, Chemistry, Computer Science, Agriculture.', color: 'bg-purple-50 text-purple-900' },
                            { title: 'B.Com (Bachelor of Commerce)', desc: 'General, Computers, Banking, Taxation.', color: 'bg-orange-50 text-orange-900' },
                            { title: 'B.A (Bachelor of Arts)', desc: 'History, Economics, Political Science, Psychology.', color: 'bg-pink-50 text-pink-900' },
                            { title: 'BBA / BBM', desc: 'Business Administration, Management.', color: 'bg-yellow-50 text-yellow-900' }
                        ].map((item, i) => (
                            <div key={i} className={`p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${item.color.split(' ')[0]}`}>
                                <h3 className={`text-lg font-bold mb-2 ${item.color.split(' ')[1]}`}>{item.title}</h3>
                                <p className="text-sm text-gray-700">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                );
            case 'Others':
                return (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">✨ Other Professional Courses</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                                    <span className="text-2xl">⚖️</span>
                                    <div>
                                        <div className="font-bold text-gray-900">Law (LLB)</div>
                                        <div className="text-sm text-gray-600">Integrated 5-year courses (BA LLB, BBA LLB).</div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                                    <span className="text-2xl">🏛️</span>
                                    <div>
                                        <div className="font-bold text-gray-900">Architecture (B.Arch)</div>
                                        <div className="text-sm text-gray-600">Design, planning, and construction of buildings.</div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                                    <span className="text-2xl">🎖️</span>
                                    <div>
                                        <div className="font-bold text-gray-900">Defense (NDA)</div>
                                        <div className="text-sm text-gray-600">Army, Navy, and Air Force wings.</div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                                    <span className="text-2xl">🏨</span>
                                    <div>
                                        <div className="font-bold text-gray-900">Hotel Management</div>
                                        <div className="text-sm text-gray-600">Hospitality, culinary arts, and tourism.</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Home':
                return (
                    <div className="space-y-8 animate-fadeIn">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                            <h2 className="text-xl font-bold text-blue-900 mb-2">Undergraduate Education</h2>
                            <p className="text-sm text-blue-800 leading-relaxed">
                                Your gateway to professional excellence. Explore diverse streams, top colleges, and career pathways to shape your future.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <span className="text-blue-500">🎓</span> Bachelor's Degree
                                </h3>
                                <p className="text-sm text-gray-600">3-4 year undergraduate programs in Arts, Science, Commerce, and Engineering.</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <span className="text-green-500">🩺</span> Professional Courses
                                </h3>
                                <p className="text-sm text-gray-600">Specialized programs like MBBS, B.Arch, and Law for specific career paths.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'Streams':
                return (
                    <div className="animate-fadeIn">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Path</h2>
                        <div className="flex flex-wrap gap-4 mb-8">
                            {['Engineering', 'Medical', 'Degree', 'Others'].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setStreamSection(option)}
                                    className={`
                                        px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 border
                                        ${streamSection === option
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                                        }
                                    `}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        {renderStreamContent()}
                    </div>
                );
            case 'College List':
                const filteredColleges = undergraduateColleges.filter(college =>
                    Object.values(college).some(val =>
                        String(val).toLowerCase().includes(searchQuery.toLowerCase())
                    )
                );
                return (
                    <div className="animate-fadeIn h-full flex flex-col">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">College Directory</h2>
                            <p className="text-gray-500 text-sm mt-1">Find the best colleges for your higher education.</p>
                        </div>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <div className="relative w-full sm:w-96">
                                    <input
                                        type="text"
                                        placeholder="Search colleges, cities..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <div className="text-sm text-gray-500">
                                    Showing {filteredColleges.length} results
                                </div>
                            </div>

                            <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm bg-white">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                {undergraduateColleges.length > 0 && Object.keys(undergraduateColleges[0]).map((key) => (
                                                    <th key={key} className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                                        {key}
                                                    </th>
                                                ))}
                                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                                    Wishlist
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredColleges.length > 0 ? (
                                                filteredColleges.map((college, index) => (
                                                    <tr key={index} className="hover:bg-blue-50/50 transition-colors duration-150">
                                                        {Object.values(college).map((val, idx) => (
                                                            <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                                {val}
                                                            </td>
                                                        ))}
                                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                                            <button
                                                                onClick={() => toggleWishlist(college)}
                                                                className={`p-2 rounded-lg transition-all ${isInWishlist(college['College Name'])
                                                                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                                                        : 'bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600'
                                                                    }`}
                                                                title={isInWishlist(college['College Name']) ? 'Remove from wishlist' : 'Add to wishlist'}
                                                            >
                                                                <svg className="w-5 h-5" fill={isInWishlist(college['College Name']) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="100%" className="px-6 py-12 text-center text-gray-500">
                                                        No colleges found matching your search.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Scholarship':
                return (
                    <div className="animate-fadeIn">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-900">Scholarship Opportunities</h2>
                            <p className="text-gray-500 mt-2">Financial support for your undergraduate journey</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                                <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
                                    <span>🏛️</span> Andhra Pradesh
                                </h3>
                                <ul className="space-y-4">
                                    {scholarships.ap.map((sch, index) => (
                                        <li key={index} className="bg-blue-50 p-4 rounded-xl">
                                            <div className="font-bold text-gray-900">{sch.name}</div>
                                            <div className="text-sm text-gray-600">{sch.description}</div>
                                            <div className="text-xs font-semibold text-blue-700 mt-1">Benefit: {sch.amount}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                                <h3 className="text-xl font-bold text-pink-600 mb-4 flex items-center gap-2">
                                    <span>🏛️</span> Telangana
                                </h3>
                                <ul className="space-y-4">
                                    {scholarships.ts.map((sch, index) => (
                                        <li key={index} className="bg-pink-50 p-4 rounded-xl">
                                            <div className="font-bold text-gray-900">{sch.name}</div>
                                            <div className="text-sm text-gray-600">{sch.description}</div>
                                            <div className="text-xs font-semibold text-pink-700 mt-1">Benefit: {sch.amount}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 'Job Opportunities':
                return (
                    <div className="animate-fadeIn">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Career Pathways After Graduation</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-8 border border-teal-100">
                                <h3 className="text-xl font-bold text-teal-800 mb-6">🏛️ Government Sector</h3>
                                <ul className="space-y-4">
                                    {[
                                        { role: 'Civil Services', desc: 'IAS, IPS, IFS (UPSC)' },
                                        { role: 'Banking', desc: 'PO, Clerk (IBPS, SBI)' },
                                        { role: 'Railways', desc: 'NTPC, Group A/B Officers' },
                                        { role: 'State Services', desc: 'Group 1 & 2 Officers' }
                                    ].map((job, i) => (
                                        <li key={i} className="bg-white/60 p-4 rounded-xl">
                                            <div className="font-bold text-gray-800">{job.role}</div>
                                            <div className="text-sm text-gray-600">{job.desc}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl p-8 border border-purple-100">
                                <h3 className="text-xl font-bold text-purple-800 mb-6">🏢 Private Sector</h3>
                                <ul className="space-y-4">
                                    {[
                                        { role: 'IT & Software', desc: 'Developer, Analyst, Tester' },
                                        { role: 'Management', desc: 'HR, Marketing, Operations' },
                                        { role: 'Finance', desc: 'Accountant, Auditor, Analyst' },
                                        { role: 'Core Engineering', desc: 'Design, Manufacturing, R&D' }
                                    ].map((job, i) => (
                                        <li key={i} className="bg-white/60 p-4 rounded-xl">
                                            <div className="font-bold text-gray-800">{job.role}</div>
                                            <div className="text-sm text-gray-600">{job.desc}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 'Career Opportunities':
                return (
                    <div className="animate-fadeIn">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Higher Education & Entrance Exams</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                                <div className="text-4xl mb-4">🎓</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Postgraduate (Tech)</h3>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li>• GATE (M.Tech / PSU Jobs)</li>
                                    <li>• GRE (MS Abroad)</li>
                                    <li>• CDAC (PG Diploma)</li>
                                </ul>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                                <div className="text-4xl mb-4">💼</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Management (MBA)</h3>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li>• CAT / XAT / MAT</li>
                                    <li>• GMAT (MBA Abroad)</li>
                                    <li>• State ICET</li>
                                </ul>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                                <div className="text-4xl mb-4">🔬</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Research & Others</h3>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li>• CSIR NET (Research)</li>
                                    <li>• JAM (M.Sc)</li>
                                    <li>• B.Ed (Teaching)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-lg text-2xl">🎓</span>
                Undergraduate Education
            </h1>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden min-h-[600px]">
                {/* Tabs Navigation */}
                <div className="bg-gray-50/50 border-b border-gray-200 p-2">
                    <nav className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                    whitespace-nowrap px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 ease-in-out flex-shrink-0
                                    ${activeTab === tab
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 transform scale-105'
                                        : 'text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-md'
                                    }
                                `}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-8">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Undergraduate;
