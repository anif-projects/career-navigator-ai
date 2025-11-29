import React, { useState } from 'react';
import cbseSchools from '../data/schools_cbse.json';
import stateSchools from '../data/schools_state.json';

const PrimaryEducation = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const [syllabusOption, setSyllabusOption] = useState('CBSE Syllabus');
    const [searchQuery, setSearchQuery] = useState('');
    const [schoolBoard, setSchoolBoard] = useState('CBSE'); // 'CBSE' or 'State'

    const tabs = [
        'Home', 'Syllabus', 'School List', 'Scholarship', 'Job Opportunities', 'Career Opportunities'
    ];

    const renderSyllabusContent = () => {
        switch (syllabusOption) {
            case 'CBSE Syllabus':
                return (
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-fadeIn">
                        <h3 className="text-xl font-bold text-blue-800 mb-4">Key Subjects in CBSE</h3>
                        <ul className="space-y-3 text-gray-700">
                            {[
                                { title: 'Mathematics', desc: 'Algebra, Trigonometry, Calculus, and Geometry.' },
                                { title: 'Science', desc: 'Physics, Chemistry, and Biology.' },
                                { title: 'English', desc: 'Focuses on communication skills, comprehension, and writing.' },
                                { title: 'Hindi & Regional', desc: 'Language proficiency and literature.' }
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                                    <span><strong>{item.title}</strong>: {item.desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case 'IGCSE Syllabus':
                return (
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-fadeIn">
                        <h3 className="text-xl font-bold text-blue-800 mb-4">Key Subjects in IGCSE</h3>
                        <ul className="space-y-3 text-gray-700">
                            {[
                                { title: 'Mathematics', desc: 'Emphasis on problem-solving and application.' },
                                { title: 'Science', desc: 'Physics, Chemistry, Biology, and Environmental Science.' },
                                { title: 'English', desc: 'English Literature and Language.' },
                                { title: 'Foreign Languages', desc: 'Options include French, Spanish, German, etc.' }
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                                    <span><strong>{item.title}</strong>: {item.desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case 'State Board Syllabus':
                return (
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-fadeIn">
                        <h3 className="text-xl font-bold text-blue-800 mb-4">Key Subjects in State Board</h3>
                        <ul className="space-y-3 text-gray-700">
                            {[
                                { title: 'Mathematics', desc: 'Similar to national standards, but with regional emphasis.' },
                                { title: 'Science', desc: 'Physics, Chemistry, and Biology with a local context.' },
                                { title: 'Social Science', desc: 'Focuses on regional history and geography.' },
                                { title: 'Regional Languages', desc: 'The primary focus is on the local language.' }
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                                    <span><strong>{item.title}</strong>: {item.desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderSchoolList = () => {
        const schools = schoolBoard === 'CBSE' ? cbseSchools : stateSchools;

        const filteredSchools = schools.filter(school =>
            Object.values(school).some(val =>
                String(val).toLowerCase().includes(searchQuery.toLowerCase())
            )
        );

        return (
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="relative w-full sm:w-72">
                        <input
                            type="text"
                            placeholder="Search schools, cities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setSchoolBoard('CBSE')}
                            className={`px-6 py-2 rounded-md text-sm font-bold transition-all duration-200 ${schoolBoard === 'CBSE'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            CBSE Schools
                        </button>
                        <button
                            onClick={() => setSchoolBoard('State')}
                            className={`px-6 py-2 rounded-md text-sm font-bold transition-all duration-200 ${schoolBoard === 'State'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            State Board Schools
                        </button>
                    </div>

                </div>

                <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm bg-white">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {schools.length > 0 && Object.keys(schools[0]).map((key) => (
                                        <th key={key} className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                            {key}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredSchools.length > 0 ? (
                                    filteredSchools.map((school, index) => (
                                        <tr key={index} className="hover:bg-blue-50/50 transition-colors duration-150 group">
                                            {Object.values(school).map((val, idx) => (
                                                <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 group-hover:text-gray-900">
                                                    {String(val).startsWith('http') ? (
                                                        <a href={val} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline font-medium inline-flex items-center gap-1">
                                                            Visit <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                                        </a>
                                                    ) : (
                                                        val
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="100%" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <svg className="w-12 h-12 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                <p className="text-lg font-medium">No schools found</p>
                                                <p className="text-sm">Try adjusting your search terms</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="text-right text-xs text-gray-400 px-2">
                    Showing {filteredSchools.length} results
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-lg text-2xl">📚</span>
                Primary Education
            </h1>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden min-h-[600px]">
                {/* Enhanced Tabs Navigation */}
                <div className="bg-gray-50/50 border-b border-gray-200 p-2">
                    <nav className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar" aria-label="Tabs">
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
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                                <h2 className="text-lg font-bold text-blue-900 mb-2">🎓 SSC (Grade 10) Education</h2>
                                <p className="text-sm text-blue-800 leading-relaxed">
                                    The <strong>Secondary School Certificate (SSC)</strong> is a pivotal milestone, marking the completion of
                                    <strong> Grade 10</strong>. It lays the groundwork for your future academic and career choices.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="text-blue-500">✨</span> Key Highlights
                                    </h3>
                                    <ul className="space-y-3">
                                        {[
                                            'Builds strong foundations in core subjects',
                                            'Prepares for Higher Secondary (11th & 12th)',
                                            'Gateway to Science, Commerce, or Arts streams',
                                            'Develops critical thinking for entrance exams'
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-600">
                                                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="text-purple-500">📚</span> Core Subjects
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['Mathematics', 'Science (Phy, Chem, Bio)', 'Social Studies', 'First Language', 'English', 'Computer Science'].map((subject, i) => (
                                            <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100">
                                                {subject}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Syllabus' && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Board</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                {['CBSE Syllabus', 'IGCSE Syllabus', 'State Board Syllabus'].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => setSyllabusOption(option)}
                                        className={`
                                            p-4 rounded-xl border-2 text-left transition-all duration-200
                                            ${syllabusOption === option
                                                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                                                : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50 text-gray-600'
                                            }
                                        `}
                                    >
                                        <div className="font-bold text-lg mb-1">{option.split(' ')[0]}</div>
                                        <div className="text-sm opacity-80">View Curriculum</div>
                                    </button>
                                ))}
                            </div>
                            {renderSyllabusContent()}
                        </div>
                    )}

                    {activeTab === 'School List' && (
                        <div className="animate-fadeIn h-full flex flex-col">
                            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-6 gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">School Directory</h2>
                                    <p className="text-gray-500 text-sm mt-1">Find the best schools in your region</p>
                                </div>
                            </div>
                            {renderSchoolList()}
                        </div>
                    )}

                    {activeTab === 'Scholarship' && (
                        <div className="animate-fadeIn">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-gray-900">Scholarship Opportunities</h2>
                                <p className="text-gray-500 mt-2">Financial aid and merit-based support for students</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-xl hover:border-blue-200 transition-all duration-300">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">🏛️</div>
                                        <h3 className="text-2xl font-bold text-gray-900">Andhra Pradesh</h3>
                                    </div>
                                    <ul className="space-y-4 mb-8">
                                        {[
                                            { title: 'Jagananna Vidya Deevena', desc: 'Full fee reimbursement for eligible students' },
                                            { title: 'Pre-Matric Scholarships', desc: 'Support for SC/ST/BC/Minority students' },
                                            { title: 'NMMS', desc: 'National Means-cum-Merit Scholarship' }
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0"></div>
                                                <div>
                                                    <div className="font-bold text-gray-800">{item.title}</div>
                                                    <div className="text-sm text-gray-500">{item.desc}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <a href="https://apepass.cgg.gov.in/" target="_blank" rel="noopener noreferrer"
                                        className="block w-full py-3 text-center bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-colors">
                                        Visit AP ePASS Portal
                                    </a>
                                </div>

                                <div className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-xl hover:border-pink-200 transition-all duration-300">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-2xl">🏛️</div>
                                        <h3 className="text-2xl font-bold text-gray-900">Telangana</h3>
                                    </div>
                                    <ul className="space-y-4 mb-8">
                                        {[
                                            { title: 'Overseas Scholarship', desc: 'Financial support for studying abroad' },
                                            { title: 'Pre-Matric Scholarships', desc: 'Tuition and allowance for reserved categories' },
                                            { title: 'Telangana NMMS', desc: 'Merit-based aid for 10th grade students' }
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2.5 flex-shrink-0"></div>
                                                <div>
                                                    <div className="font-bold text-gray-800">{item.title}</div>
                                                    <div className="text-sm text-gray-500">{item.desc}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <a href="https://telanganaepass.cgg.gov.in/" target="_blank" rel="noopener noreferrer"
                                        className="block w-full py-3 text-center bg-pink-50 text-pink-600 font-bold rounded-xl hover:bg-pink-600 hover:text-white transition-colors">
                                        Visit TS ePASS Portal
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Job Opportunities' && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Career Pathways</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-8 border border-teal-100">
                                    <h3 className="text-xl font-bold text-teal-800 mb-6 flex items-center gap-2">
                                        <span>🏛️</span> Government Sector
                                    </h3>
                                    <div className="space-y-6">
                                        {[
                                            { role: 'Railway Group D', desc: 'Track Maintainer, Helper, Pointsman' },
                                            { role: 'Defense Services', desc: 'Army (Soldier GD), Navy (MR), Air Force (Gp Y)' },
                                            { role: 'Postal Dept', desc: 'Gramin Dak Sevak, Postman' }
                                        ].map((job, i) => (
                                            <div key={i} className="bg-white/60 p-4 rounded-xl">
                                                <div className="font-bold text-gray-800">{job.role}</div>
                                                <div className="text-sm text-gray-600">{job.desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100">
                                    <h3 className="text-xl font-bold text-orange-800 mb-6 flex items-center gap-2">
                                        <span>🏢</span> Private Sector
                                    </h3>
                                    <div className="space-y-6">
                                        {[
                                            { role: 'Technical Trades', desc: 'Electrician, Fitter, Welder (via ITI)' },
                                            { role: 'Retail & Sales', desc: 'Store Executive, Sales Representative' },
                                            { role: 'Logistics', desc: 'Delivery Partners, Warehouse Operations' }
                                        ].map((job, i) => (
                                            <div key={i} className="bg-white/60 p-4 rounded-xl">
                                                <div className="font-bold text-gray-800">{job.role}</div>
                                                <div className="text-sm text-gray-600">{job.desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Career Opportunities' && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Future Roadmap</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { title: 'Intermediate (+2)', icon: '🎓', items: ['MPC (Engineering)', 'BiPC (Medical)', 'MEC/CEC (Commerce)'] },
                                    { title: 'Polytechnic', icon: '⚙️', items: ['Civil / Mechanical', 'Electrical / EEE', 'Computer Science'] },
                                    { title: 'ITI Courses', icon: '🛠️', items: ['Electrician', 'Fitter', 'Draftsman'] },
                                    { title: 'Defense', icon: '🎖️', items: ['NDA Exam', 'Soldier Entry', 'Police Constable'] },
                                    { title: 'Vocational', icon: '💼', items: ['Agriculture', 'Paramedical', 'Hotel Management'] }
                                ].map((path, i) => (
                                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
                                        <div className="text-4xl mb-4">{path.icon}</div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3">{path.title}</h3>
                                        <ul className="space-y-2">
                                            {path.items.map((item, j) => (
                                                <li key={j} className="text-sm text-gray-600 flex items-center gap-2">
                                                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
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

export default PrimaryEducation;
