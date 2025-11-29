import React, { useState } from 'react';
import postgraduateColleges from '../data/schools_postgraduate.json';

const Postgraduate = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const [streamSection, setStreamSection] = useState("Academic Master's Degrees");
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = [
        'Home', 'Streams', 'College List', 'Scholarship', 'Job Opportunities', 'Career Opportunities'
    ];

    const renderStreamContent = () => {
        switch (streamSection) {
            case "Academic Master's Degrees":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                        {[
                            { title: '🔬 M.Sc (Master of Science)', desc: 'Physics, Chemistry, Bio, Data Science.', focus: 'Research, Scientific Careers' },
                            { title: '📖 M.A (Master of Arts)', desc: 'History, Economics, Pol Sci, Psychology.', focus: 'Academia, Social Research' },
                            { title: '📊 M.Com (Master of Commerce)', desc: 'Accounting, Finance, Business Mgmt.', focus: 'Financial Analysis, Corporate Mgmt' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                                <p className="text-xs text-blue-600 font-semibold">Focus: {item.focus}</p>
                            </div>
                        ))}
                    </div>
                );
            case "Professional Master's Degrees":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                        {[
                            { title: '🛠️ M.Tech / M.E', desc: 'AI, Robotics, Mechanical, Civil.', focus: 'Advanced Engineering, R&D' },
                            { title: '💼 MBA', desc: 'Strategy, Marketing, Finance, HR.', focus: 'Leadership, Management' },
                            { title: '💻 MCA', desc: 'Software Dev, IT Management.', focus: 'Software Engineering, IT' },
                            { title: '⚖️ LLM', desc: 'Criminal, Corporate, International Law.', focus: 'Legal Practice, Theory' },
                            { title: '🏛️ M.Arch', desc: 'Urban Planning, Sustainable Design.', focus: 'Urban Development, Design' },
                            { title: '🎨 M.Des', desc: 'Product, Graphic, UX/UI Design.', focus: 'Creative Innovation' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                                <p className="text-xs text-purple-600 font-semibold">Focus: {item.focus}</p>
                            </div>
                        ))}
                    </div>
                );
            case "Medical & Health Sciences PG Courses":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                        {[
                            { title: '🩺 MD (Doctor of Medicine)', desc: 'Pediatrics, Dermatology, Radiology.', focus: 'Clinical Expertise' },
                            { title: '🛡️ MS (Master of Surgery)', desc: 'General Surgery, Orthopedics, ENT.', focus: 'Surgical Expertise' },
                            { title: '🦷 MDS (Master of Dental Surgery)', desc: 'Orthodontics, Oral Surgery.', focus: 'Advanced Dental Practice' },
                            { title: '🏃‍♂️ MPT (Master of Physiotherapy)', desc: 'Orthopedic, Sports Physio.', focus: 'Rehabilitation' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-green-800 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                                <p className="text-xs text-green-600 font-semibold">Focus: {item.focus}</p>
                            </div>
                        ))}
                    </div>
                );
            case "Agricultural & Allied Sciences PG Courses":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                        {[
                            { title: '🌱 M.Sc Agriculture', desc: 'Agronomy, Horticulture, Soil Science.', focus: 'Agri Research, Crop Mgmt' },
                            { title: '🌳 M.Sc Forestry', desc: 'Forest Mgmt, Conservation.', focus: 'Environmental Sustainability' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-emerald-800 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                                <p className="text-xs text-emerald-600 font-semibold">Focus: {item.focus}</p>
                            </div>
                        ))}
                    </div>
                );
            case "Postgraduate Diplomas":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                        {[
                            { title: '🏢 PGDM', desc: 'Business Mgmt, Strategy, Leadership.', focus: 'Corporate Leadership' },
                            { title: '💻 PGDCA', desc: 'Software Apps, IT Systems.', focus: 'App Development, Support' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-orange-800 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                                <p className="text-xs text-orange-600 font-semibold">Focus: {item.focus}</p>
                            </div>
                        ))}
                    </div>
                );
            case "Research Degrees":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                        {[
                            { title: '🧪 M.Phil', desc: 'Research Methods, Thesis Prep.', focus: 'Research Development' },
                            { title: '🎓 Ph.D', desc: 'In-depth Research, Dissertation.', focus: 'Advanced Research, Innovation' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-indigo-800 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                                <p className="text-xs text-indigo-600 font-semibold">Focus: {item.focus}</p>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    const renderCollegeList = () => {
        const filteredColleges = postgraduateColleges.filter(college =>
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
                                    {postgraduateColleges.length > 0 && Object.keys(postgraduateColleges[0]).map((key) => (
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
                Postgraduate Education
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
                                <h2 className="text-lg font-bold text-blue-900 mb-2">Postgraduation: Elevate Your Education</h2>
                                <p className="text-sm text-blue-800 leading-relaxed">
                                    Postgraduation allows you to gain deeper knowledge, specialize in a field, and engage in research.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">🎯 Why Pursue Postgraduation?</h3>
                                    <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                                        <li><strong>Specialization:</strong> Deepen expertise.</li>
                                        <li><strong>Career Advancement:</strong> Access higher-level roles.</li>
                                        <li><strong>Better Earning:</strong> Higher salary potential.</li>
                                        <li><strong>Research:</strong> Contribute original ideas.</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">🌍 Best Countries</h3>
                                    <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                                        <li><strong>USA:</strong> Top universities, research.</li>
                                        <li><strong>UK:</strong> 1-year Masters, history.</li>
                                        <li><strong>Germany:</strong> Low tuition, engineering.</li>
                                        <li><strong>Australia:</strong> Quality of life, work rights.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Streams' && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Streams</h2>
                            <div className="flex flex-wrap gap-4 mb-8">
                                {[
                                    "Academic Master's Degrees",
                                    "Professional Master's Degrees",
                                    "Medical & Health Sciences PG Courses",
                                    "Agricultural & Allied Sciences PG Courses",
                                    "Postgraduate Diplomas",
                                    "Research Degrees"
                                ].map((option) => (
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
                                <p className="text-gray-500 text-sm mt-1">Find the best colleges for your postgraduate education.</p>
                            </div>
                            {renderCollegeList()}
                        </div>
                    )}

                    {activeTab === 'Scholarship' && (
                        <div className="animate-fadeIn">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-gray-900">Scholarship Opportunities</h2>
                                <p className="text-gray-500 mt-2">Financial support for your postgraduate journey</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                                    <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
                                        <span>🏛️</span> University-Specific
                                    </h3>
                                    <ul className="space-y-4">
                                        <li className="bg-blue-50 p-4 rounded-xl">
                                            <div className="font-bold text-gray-900">Rhodes Scholarship (UK)</div>
                                            <div className="text-sm text-gray-600">Highly competitive, fully funded at Oxford.</div>
                                        </li>
                                        <li className="bg-blue-50 p-4 rounded-xl">
                                            <div className="font-bold text-gray-900">Gates Cambridge (UK)</div>
                                            <div className="text-sm text-gray-600">Fully funded for international students.</div>
                                        </li>
                                        <li className="bg-blue-50 p-4 rounded-xl">
                                            <div className="font-bold text-gray-900">Knight-Hennessy (USA)</div>
                                            <div className="text-sm text-gray-600">Fully funded at Stanford University.</div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                                    <h3 className="text-xl font-bold text-pink-600 mb-4 flex items-center gap-2">
                                        <span>🌍</span> International
                                    </h3>
                                    <ul className="space-y-4">
                                        <li className="bg-pink-50 p-4 rounded-xl">
                                            <div className="font-bold text-gray-900">Chevening (UK)</div>
                                            <div className="text-sm text-gray-600">Fully funded for any master's degree.</div>
                                        </li>
                                        <li className="bg-pink-50 p-4 rounded-xl">
                                            <div className="font-bold text-gray-900">Fulbright (USA)</div>
                                            <div className="text-sm text-gray-600">For non-US students to study in the US.</div>
                                        </li>
                                        <li className="bg-pink-50 p-4 rounded-xl">
                                            <div className="font-bold text-gray-900">DAAD (Germany)</div>
                                            <div className="text-sm text-gray-600">Funded master's and PhD programs.</div>
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
                                            { role: 'Research', desc: 'ISRO, DRDO Scientist' },
                                            { role: 'Banking', desc: 'PO, Specialist Officer' },
                                            { role: 'Teaching', desc: 'University Professor (NET/SLET)' },
                                            { role: 'Civil Services', desc: 'IAS, IPS, IFS' }
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
                                            { role: 'AI/ML', desc: 'Engineer, Researcher, Data Scientist' },
                                            { role: 'Robotics', desc: 'Robotics Engineer' },
                                            { role: 'Big Data', desc: 'Big Data Engineer' },
                                            { role: 'Cloud', desc: 'Solutions Architect' }
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
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Detailed Career Opportunities</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { title: '🧑‍🔬 M.Sc', desc: 'Research Scientist, Data Analyst, Professor.' },
                                    { title: '🎓 M.A', desc: 'Civil Services, Journalist, Social Worker.' },
                                    { title: '💼 M.Com', desc: 'CA, Financial Analyst, Investment Banker.' },
                                    { title: '📚 M.Lib', desc: 'Librarian, Archivist, Info Manager.' },
                                    { title: '👨‍🏫 M.Ed', desc: 'Principal, Curriculum Developer, Consultant.' },
                                    { title: '📊 M.Stat', desc: 'Statistician, Data Scientist, Actuary.' },
                                    { title: '🎨 MFA', desc: 'Artist, Curator, Graphic Designer.' },
                                    { title: '🤝 MSW', desc: 'Social Worker, Counselor, NGO Worker.' }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                                        <h3 className="text-lg font-bold text-blue-900 mb-2">{item.title}</h3>
                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Postgraduate;
