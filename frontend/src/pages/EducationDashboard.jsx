import React from 'react';
import cbseSchools from '../data/schools_cbse.json';
import stateSchools from '../data/schools_state.json';
import secondaryColleges from '../data/schools_secondary.json';
import undergraduateColleges from '../data/schools_undergraduate.json';
import postgraduateColleges from '../data/schools_postgraduate.json';

const EducationDashboard = ({ setActiveTab }) => {
    const educationLevels = [
        {
            id: 'primary',
            title: 'Primary Education',
            subtitle: 'SSC (Grade 10)',
            icon: '📚',
            description: 'Foundation for your academic journey',
            gradient: 'from-blue-50 to-indigo-100',
            iconBg: 'from-blue-400 to-indigo-500',
            iconShadow: 'shadow-blue-200',
            count: cbseSchools.length + stateSchools.length,
            countLabel: 'Schools',
            features: ['School Directory', 'CBSE & State Board', 'Syllabus Guide', 'Scholarships'],
            navigateTo: 'Primary Education'
        },
        {
            id: 'secondary',
            title: 'Secondary Education',
            subtitle: 'Intermediate (+2)',
            icon: '🎓',
            description: 'Choose your stream and excel',
            gradient: 'from-purple-50 to-pink-100',
            iconBg: 'from-purple-400 to-pink-500',
            iconShadow: 'shadow-purple-200',
            count: secondaryColleges.length,
            countLabel: 'Colleges',
            features: ['Stream Selection', 'College List', 'MPC/BiPC/CEC', 'Career Guidance'],
            navigateTo: 'Secondary Education'
        },
        {
            id: 'undergraduate',
            title: 'Undergraduate',
            subtitle: 'Bachelor\'s Degree',
            icon: '🏛️',
            description: 'Build expertise in your field',
            gradient: 'from-emerald-50 to-teal-100',
            iconBg: 'from-emerald-400 to-teal-500',
            iconShadow: 'shadow-emerald-200',
            count: undergraduateColleges.length,
            countLabel: 'Colleges',
            features: ['Engineering', 'Medical', 'Arts & Science', 'Career Paths'],
            navigateTo: 'Undergraduate'
        },
        {
            id: 'postgraduate',
            title: 'Postgraduate',
            subtitle: 'Master\'s & Beyond',
            icon: '🎯',
            description: 'Advanced studies and specialization',
            gradient: 'from-orange-50 to-red-100',
            iconBg: 'from-orange-400 to-red-500',
            iconShadow: 'shadow-orange-200',
            count: postgraduateColleges.length,
            countLabel: 'Programs',
            features: ['Master\'s Degrees', 'PhD Programs', 'Research', 'Specializations'],
            navigateTo: 'Postgraduate'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-extrabold text-gray-900 mb-1 flex items-center gap-2">
                    <span className="bg-indigo-100 text-indigo-600 p-1.5 rounded-lg text-xl">🎓</span>
                    Education Hub
                </h1>
                <p className="text-sm text-gray-600">Explore educational opportunities across all levels</p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {educationLevels.map((level) => (
                    <div
                        key={level.id}
                        onClick={() => setActiveTab(level.navigateTo)}
                        className={`bg-gradient-to-br ${level.gradient} p-2.5 rounded-lg shadow-md border border-gray-100 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden`}
                    >
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/40 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-110 duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-10 h-10 bg-white/40 rounded-full -ml-2.5 -mb-2.5"></div>

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-1.5">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${level.iconBg} flex items-center justify-center shadow-md ${level.iconShadow} text-white text-lg transform transition-transform group-hover:rotate-12`}>
                                    {level.icon}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-base font-bold text-gray-900 mb-0.5">{level.title}</h3>
                            <p className="text-[11px] font-semibold text-gray-600 mb-0.5">{level.subtitle}</p>
                            <p className="text-[11px] text-gray-700 mb-1.5">{level.description}</p>

                            {/* Features */}
                            <div className="space-y-0.5 mb-1.5">
                                {level.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-gray-700">
                                        <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span className="font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="flex items-center justify-between pt-1.5 border-t border-gray-200/50">
                                <span className="text-[11px] font-bold text-gray-700">Explore {level.title}</span>
                                <svg className="w-3.5 h-3.5 text-gray-700 transform transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                    <div className="text-xl font-black text-indigo-600">{cbseSchools.length + stateSchools.length + secondaryColleges.length + undergraduateColleges.length + postgraduateColleges.length}</div>
                    <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mt-0.5">Total Institutions</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                    <div className="text-xl font-black text-purple-600">4</div>
                    <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mt-0.5">Education Levels</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                    <div className="text-xl font-black text-emerald-600">∞</div>
                    <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mt-0.5">Career Paths</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                    <div className="text-xl font-black text-orange-600">24/7</div>
                    <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mt-0.5">AI Guidance</div>
                </div>
            </div>
        </div>
    );
};

export default EducationDashboard;
