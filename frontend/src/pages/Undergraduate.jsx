import React, { useState } from 'react';
import undergraduateColleges from '../data/schools_undergraduate.json';

const Undergraduate = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const [streamSection, setStreamSection] = useState('Engineering Programs');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = [
        'Home', 'Streams', 'College List', 'Scholarship', 'Job Opportunities', 'Career Opportunities'
    ];

    const renderStreamContent = () => {
        switch (streamSection) {
            case 'Engineering Programs':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                        {[
                            { title: '💻 Computer Science (CSE)', desc: 'Programming, AI, Data Science, Cybersecurity.', careers: 'Software Developer, Data Scientist' },
                            { title: '📡 Electronics (ECE)', desc: 'Circuits, IoT, Wireless Communications.', careers: 'Electronics Engineer, Telecom Engineer' },
                            { title: '⚡ Electrical (EEE)', desc: 'Power Systems, Machines, Control Systems.', careers: 'Electrical Engineer, Automation Engineer' },
                            { title: '⚙️ Mechanical', desc: 'Machines, Robotics, Manufacturing.', careers: 'Design Engineer, Robotics Expert' },
                            { title: '🏗️ Civil', desc: 'Construction, Structural Analysis, Urban Planning.', careers: 'Civil Engineer, Urban Planner' },
                            { title: '🤖 AI & ML', desc: 'Neural Networks, Deep Learning, Analytics.', careers: 'AI Engineer, ML Specialist' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                                <p className="text-xs text-blue-600 font-semibold">Careers: {item.careers}</p>
                            </div>
                        ))}
                    </div>
                );
            case 'Medical Sciences':
                return (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-bold text-green-800 mb-4">🩺 MBBS (Bachelor of Medicine and Bachelor of Surgery)</h3>
                            <div className="space-y-4 text-gray-700">
                                <p><strong>Duration:</strong> 5.5 years (including 1-year internship)</p>
                                <p><strong>Eligibility:</strong> 12th pass with PCB, entrance via NEET.</p>
                                <div className="bg-green-50 p-4 rounded-xl">
                                    <h4 className="font-bold text-green-900 mb-2">Course Structure</h4>
                                    <ul className="list-disc list-inside text-sm space-y-1">
                                        <li><strong>Pre-Clinical:</strong> Anatomy, Physiology, Biochemistry</li>
                                        <li><strong>Para-Clinical:</strong> Pathology, Microbiology, Pharmacology</li>
                                        <li><strong>Clinical:</strong> Medicine, Surgery, Pediatrics, OBG</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Architecture & Design':
                return (
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-fadeIn">
                        <h3 className="text-xl font-bold text-orange-800 mb-4">🏛️ B.Arch (Bachelor of Architecture)</h3>
                        <div className="space-y-4 text-gray-700">
                            <p><strong>Duration:</strong> 5 years</p>
                            <p><strong>Eligibility:</strong> 12th MPC, entrance via NATA or JEE Main Paper 2.</p>
                            <p className="text-sm">Focuses on design, history of architecture, building construction, and urban planning.</p>
                        </div>
                    </div>
                );
            case 'Agriculture Studies':
                return (
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-fadeIn">
                        <h3 className="text-xl font-bold text-green-800 mb-4">🌾 B.Sc (Agriculture)</h3>
                        <div className="space-y-4 text-gray-700">
                            <p><strong>Duration:</strong> 4 years</p>
                            <p className="text-sm">Covers agronomy, horticulture, soil science, plant breeding, and agricultural economics.</p>
                            <p className="text-sm text-green-700 font-semibold">Careers: Agricultural Officer, Agronomist, Farm Manager.</p>
                        </div>
                    </div>
                );
            case 'Marine & Navy Careers':
                return (
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-fadeIn">
                        <h3 className="text-xl font-bold text-blue-800 mb-4">⚓ Marine Engineering</h3>
                        <div className="space-y-4 text-gray-700">
                            <p><strong>Duration:</strong> 4 years</p>
                            <p className="text-sm">Study of ship design, marine engines, navigation systems, and maritime laws.</p>
                            <p className="text-sm text-blue-700 font-semibold">Careers: Marine Engineer, Naval Architect, Merchant Navy Officer.</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderCollegeList = () => {
        const filteredColleges = undergraduateColleges.filter(college =>
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
                                    {undergraduateColleges.length > 0 && Object.keys(undergraduateColleges[0]).map((key) => (
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
                    {activeTab === 'Home' && (
                        <div className="animate-fadeIn space-y-8">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                                <h2 className="text-lg font-bold text-blue-900 mb-2">Undergraduate Courses After Intermediate</h2>
                                <p className="text-sm text-blue-800 leading-relaxed">
                                    Explore career options after completing Intermediate (Grade 12) based on your chosen stream.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <span className="text-blue-500">🧮</span> After MPC
                                    </h3>
                                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                                        <li>Engineering (B.Tech / B.E.)</li>
                                        <li>B.Sc (Maths, Stats, Physics)</li>
                                        <li>B.Arch (Architecture)</li>
                                        <li>BCA (Computer Applications)</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <span className="text-green-500">🧬</span> After BiPC
                                    </h3>
                                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                                        <li>MBBS, BDS, BAMS, BHMS</li>
                                        <li>B.Sc Nursing, Agriculture</li>
                                        <li>Veterinary Science (BVSc)</li>
                                        <li>Pharmacy (B.Pharm)</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <span className="text-orange-500">💹</span> After MEC
                                    </h3>
                                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                                        <li>B.Com, BBA</li>
                                        <li>CA (Chartered Accountancy)</li>
                                        <li>CS (Company Secretary)</li>
                                        <li>B.Sc (Statistics, Data Science)</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <span className="text-purple-500">🏛️</span> After CEC / HEC
                                    </h3>
                                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                                        <li>B.A (Economics, Pol. Sci, History)</li>
                                        <li>LLB (Law)</li>
                                        <li>Hotel Management</li>
                                        <li>Mass Communication</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Streams' && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Stream</h2>
                            <div className="flex flex-wrap gap-4 mb-8">
                                {['Engineering Programs', 'Medical Sciences', 'Architecture & Design', 'Agriculture Studies', 'Marine & Navy Careers'].map((option) => (
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
                                <p className="text-gray-500 text-sm mt-1">Find the best colleges for your undergraduate education.</p>
                            </div>
                            {renderCollegeList()}
                        </div>
                    )}

                    {activeTab === 'Scholarship' && (
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
                                            { role: 'Engineering', desc: 'APPSC/TSPSC AE, RRB JE, Defense Technical' },
                                            { role: 'Commerce', desc: 'Bank PO/Clerk, SSC CGL, State Tax Officers' },
                                            { role: 'Arts & Sciences', desc: 'Group 1 & 2 Services, Police SI, Teachers' }
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
                                            { role: 'Engineering', desc: 'Software Dev, Data Scientist, Cloud Engineer' },
                                            { role: 'Commerce', desc: 'Accountant, Financial Analyst, Marketing Exec' },
                                            { role: 'Arts & Sciences', desc: 'Content Writer, Graphic Designer, Research Asst' }
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
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Higher Education & Entrance Exams</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                                    <h3 className="text-lg font-bold text-blue-900 mb-4">🎓 Higher Education Options</h3>
                                    <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                                        <li><strong>M.Tech / ME:</strong> via GATE, PGECET</li>
                                        <li><strong>MBA:</strong> via CAT, MAT, ICET</li>
                                        <li><strong>M.Sc / M.A:</strong> via University Entrance</li>
                                        <li><strong>Professional:</strong> CA, CS, CMA</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                                    <h3 className="text-lg font-bold text-blue-900 mb-4">🎯 Entrance Exams</h3>
                                    <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                                        <li><strong>MPC:</strong> EAMCET, BITSAT, VITEEE, GATE</li>
                                        <li><strong>BiPC:</strong> NEET, ICAR AIEEA, GPAT</li>
                                        <li><strong>Commerce:</strong> CA/CS Foundation, IPMAT</li>
                                        <li><strong>Arts:</strong> CLAT, CUET, TISSNET</li>
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

export default Undergraduate;
