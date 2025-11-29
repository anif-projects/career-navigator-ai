import React, { useState } from 'react';
import secondaryColleges from '../data/schools_secondary.json';

const SecondaryEducation = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const [streamSection, setStreamSection] = useState('Intermediate Streams');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = [
        'Home', 'Streams', 'College List', 'Scholarship', 'Job Opportunities', 'Career Opportunities'
    ];

    const renderStreamContent = () => {
        switch (streamSection) {
            case 'Intermediate Streams':
                return (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-bold text-blue-800 mb-4">🧪 Science Stream</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50 rounded-xl">
                                    <div className="font-bold text-blue-900">MPC (Maths, Physics, Chemistry)</div>
                                    <p className="text-sm text-blue-700 mt-1">Ideal for Engineering, Architecture, Defense, and Data Science careers.</p>
                                </div>
                                <div className="p-4 bg-green-50 rounded-xl">
                                    <div className="font-bold text-green-900">BiPC (Biology, Physics, Chemistry)</div>
                                    <p className="text-sm text-green-700 mt-1">Ideal for Medicine, Pharmacy, Agriculture, and Nursing careers.</p>
                                </div>
                                <div className="p-4 bg-purple-50 rounded-xl">
                                    <div className="font-bold text-purple-900">PCMB (Physics, Chemistry, Maths, Biology)</div>
                                    <p className="text-sm text-purple-700 mt-1">Keeps both Engineering and Medical options open.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-bold text-indigo-800 mb-4">📈 Commerce Stream</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><strong>Subjects:</strong> Accounts, Economics, Business Studies, Mathematics.</li>
                                <li><strong>Careers:</strong> CA, Banking, MBA, Stock Market, Company Secretary.</li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-bold text-orange-800 mb-4">🎨 Arts / Humanities Stream</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><strong>Subjects:</strong> History, Political Science, Psychology, Sociology.</li>
                                <li><strong>Careers:</strong> Law, Teaching, Journalism, Civil Services (IAS/IPS).</li>
                            </ul>
                        </div>
                    </div>
                );
            case 'Diploma Streams':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                        {[
                            { title: 'Mechanical Engineering', desc: 'Thermodynamics, Manufacturing, Machine Design.' },
                            { title: 'Electrical Engineering', desc: 'Circuits, Electronics, Power Systems.' },
                            { title: 'Civil Engineering', desc: 'Structural Analysis, Building Materials, Surveying.' },
                            { title: 'Computer Engineering', desc: 'Programming, Data Structures, Networking.' },
                            { title: 'Electronics Engineering', desc: 'Digital Electronics, Microprocessors, Signals.' },
                            { title: 'Automobile Engineering', desc: 'Vehicle Design, Engine Components, Maintenance.' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                );
            case 'Hotel Management Stream':
                return (
                    <div className="space-y-6 animate-fadeIn">
                        {[
                            { title: 'Diploma in Hotel Management', focus: 'Hotel Operations, F&B, Front Office', career: 'Hotel Manager, Event Planner' },
                            { title: 'Diploma in Food & Beverage', focus: 'Food Production, Safety, Menu Planning', career: 'F&B Manager, Chef' },
                            { title: 'Diploma in Front Office', focus: 'Reception, Reservations, Guest Relations', career: 'Front Desk Manager, Concierge' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div><span className="font-semibold text-gray-700">Focus:</span> {item.focus}</div>
                                    <div><span className="font-semibold text-gray-700">Careers:</span> {item.career}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'Compare Streams':
                return (
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-fadeIn">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span>🔍</span> Quick Comparison Table
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stream</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Best For</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Examples</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {[
                                        { stream: 'Science', bestFor: 'Doctor, Engineer, Scientist', examples: 'MBBS, BTech, BSc' },
                                        { stream: 'Commerce', bestFor: 'Business, Finance', examples: 'BCom, CA, BBA' },
                                        { stream: 'Arts', bestFor: 'Law, Government, Teaching, Journalism', examples: 'BA, LLB, UPSC' }
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{row.stream}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{row.bestFor}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{row.examples}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderCollegeList = () => {
        const filteredColleges = secondaryColleges.filter(college =>
            Object.values(college).some(val =>
                String(val).toLowerCase().includes(searchQuery.toLowerCase())
            )
        );

        return (
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
                                    {secondaryColleges.length > 0 && Object.keys(secondaryColleges[0]).map((key) => (
                                        <th key={key} className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                            {key}
                                        </th>
                                    ))}
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
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-lg text-2xl">🎓</span>
                Secondary Education
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
                    {activeTab === 'Home' && (
                        <div className="animate-fadeIn space-y-8">
                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
                                <h2 className="text-xl font-bold text-indigo-900 mb-2">Further Education After Grade 10</h2>
                                <p className="text-sm text-indigo-800 leading-relaxed">
                                    Explore the exciting pathways available after completing Grade 10. Whether you choose the traditional
                                    <strong> Intermediate</strong> route, skill-focused <strong> Diploma</strong> courses, or vocational training via
                                    <strong> ITI</strong>, each path offers unique opportunities for your future.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <span className="text-blue-500">🏫</span> Intermediate (11th & 12th)
                                    </h3>
                                    <p className="text-sm text-gray-600">The traditional academic route preparing for undergraduate studies in Science, Commerce, or Arts.</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <span className="text-green-500">🛠️</span> Diploma Courses
                                    </h3>
                                    <p className="text-sm text-gray-600">Skill-based programs (Polytechnic) offering specialized training for specific industries like Engineering.</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <span className="text-orange-500">⚙️</span> ITI (Vocational)
                                    </h3>
                                    <p className="text-sm text-gray-600">Practical training in technical trades like Electrician, Fitter, and Welder for direct employment.</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <span className="text-purple-500">🎨</span> Skill Certifications
                                    </h3>
                                    <p className="text-sm text-gray-600">Short-term courses in Digital Marketing, Design, and more to enhance specific skills.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Streams' && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Path</h2>
                            <div className="flex flex-wrap gap-4 mb-8">
                                {['Intermediate Streams', 'Diploma Streams', 'Hotel Management Stream', 'Compare Streams'].map((option) => (
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
                    )}



                    {activeTab === 'College List' && (
                        <div className="animate-fadeIn h-full flex flex-col">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">College Directory</h2>
                                <p className="text-gray-500 text-sm mt-1">Find the best colleges for your higher education.</p>
                            </div>
                            {renderCollegeList()}
                        </div>
                    )}

                    {activeTab === 'Scholarship' && (
                        <div className="animate-fadeIn">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-gray-900">Scholarship Opportunities</h2>
                                <p className="text-gray-500 mt-2">Financial support for your secondary education journey</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                                    <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
                                        <span>🏛️</span> Andhra Pradesh
                                    </h3>
                                    <ul className="space-y-4">
                                        <li className="bg-blue-50 p-4 rounded-xl">
                                            <div className="font-bold text-gray-900">Jnanabhumi Scholarships</div>
                                            <div className="text-sm text-gray-600">For SC, ST, BC, Minority students. Requires 75% attendance.</div>
                                        </li>
                                        <li className="bg-blue-50 p-4 rounded-xl">
                                            <div className="font-bold text-gray-900">Vidyadhan Scholarship</div>
                                            <div className="text-sm text-gray-600">For students with &gt;80% in Class 10.</div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                                    <h3 className="text-xl font-bold text-pink-600 mb-4 flex items-center gap-2">
                                        <span>🏛️</span> Telangana
                                    </h3>
                                    <ul className="space-y-4">
                                        <li className="bg-pink-50 p-4 rounded-xl">
                                            <div className="font-bold text-gray-900">TS ePASS Scholarships</div>
                                            <div className="text-sm text-gray-600">Pre & Post Matric aid for reserved categories.</div>
                                        </li>
                                        <li className="bg-pink-50 p-4 rounded-xl">
                                            <div className="font-bold text-gray-900">Ambedkar Overseas Vidya Nidhi</div>
                                            <div className="text-sm text-gray-600">Financial aid for studying abroad (up to ₹20L).</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Job Opportunities' && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Career Pathways</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-8 border border-teal-100">
                                    <h3 className="text-xl font-bold text-teal-800 mb-6">🏛️ Government Sector</h3>
                                    <ul className="space-y-4">
                                        {[
                                            { role: 'SSC CHSL', desc: 'LDC, Data Entry Operator, Postal Assistant' },
                                            { role: 'Defense', desc: 'Army Soldier, Navy Sailor, Air Force Group Y' },
                                            { role: 'Railways', desc: 'Group D Posts, Track Maintainer' }
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
                                            { role: 'BPO / Customer Support', desc: 'Voice and Non-Voice processes' },
                                            { role: 'Data Entry', desc: 'Back office operations and typing jobs' },
                                            { role: 'Retail & Sales', desc: 'Showroom executives, Field sales' }
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
                    )}

                    {activeTab === 'Career Opportunities' && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Future Roadmap & Entrance Exams</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                                    <div className="text-4xl mb-4">🎓</div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Engineering (MPC)</h3>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• JEE Main / Advanced</li>
                                        <li>• BITSAT</li>
                                        <li>• EAMCET (State Level)</li>
                                        <li>• VITEEE / SRMJEEE</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                                    <div className="text-4xl mb-4">🧬</div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Medical (BiPC)</h3>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• NEET-UG</li>
                                        <li>• ICAR AIEEA (Agriculture)</li>
                                        <li>• State CETs (Pharmacy)</li>
                                        <li>• B.Sc Nursing Entrance</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                                    <div className="text-4xl mb-4">🚢</div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Defense & Others</h3>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• NDA (Army, Navy, Air Force)</li>
                                        <li>• IMU CET (Merchant Navy)</li>
                                        <li>• CLAT (Law)</li>
                                        <li>• NIFT (Fashion Design)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SecondaryEducation;
