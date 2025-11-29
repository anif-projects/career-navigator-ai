import React from 'react';

const CareerPathDashboard = ({ setActiveTab }) => {
    const careerPathOptions = [
        {
            id: 'after-10th',
            title: 'After 10th',
            subtitle: 'Career Guidance Post-SSC',
            icon: '🎯',
            description: 'Explore career paths after completing 10th grade',
            gradient: 'from-blue-50 to-cyan-100',
            iconBg: 'from-blue-400 to-cyan-500',
            iconShadow: 'shadow-blue-200',
            features: ['Stream Selection', 'Career Options', 'Skill Development', 'Future Planning'],
            navigateTo: 'CareerPath-Secondary'
        },
        {
            id: 'after-intermediate',
            title: 'After Intermediate',
            subtitle: 'Career Guidance Post-12th',
            icon: '🚀',
            description: 'Discover opportunities after intermediate education',
            gradient: 'from-purple-50 to-violet-100',
            iconBg: 'from-purple-400 to-violet-500',
            iconShadow: 'shadow-purple-200',
            features: ['Degree Programs', 'Entrance Exams', 'Professional Courses', 'Industry Insights'],
            navigateTo: 'CareerPath-Undergraduate'
        },
        {
            id: 'resume-builder',
            title: 'Resume Builder',
            subtitle: 'Create Professional Resume',
            icon: '📄',
            description: 'Build and customize your professional resume',
            gradient: 'from-emerald-50 to-green-100',
            iconBg: 'from-emerald-400 to-green-500',
            iconShadow: 'shadow-emerald-200',
            features: ['Multiple Templates', 'PDF Export', 'Easy Customization', 'Professional Design'],
            navigateTo: 'Resume Builder'
        },
        {
            id: 'career-assessment',
            title: 'Career Assessment',
            subtitle: 'Discover Your Strengths',
            icon: '🧭',
            description: 'Take assessments to find your ideal career path',
            gradient: 'from-orange-50 to-amber-100',
            iconBg: 'from-orange-400 to-amber-500',
            iconShadow: 'shadow-orange-200',
            features: ['Personality Tests', 'Skill Analysis', 'Career Matching', 'Personalized Results'],
            navigateTo: 'Career Assessment'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-extrabold text-gray-900 mb-1 flex items-center gap-2">
                    <span className="bg-purple-100 text-purple-600 p-1.5 rounded-lg text-xl">🚀</span>
                    Career Path Hub
                </h1>
                <p className="text-sm text-gray-600">Navigate your career journey with expert guidance</p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {careerPathOptions.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => setActiveTab(option.navigateTo)}
                        className={`bg-gradient-to-br ${option.gradient} p-2.5 rounded-lg shadow-md border border-gray-100 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden`}
                    >
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/40 rounded-full -mr-5 -mt-5 transition-transform group-hover:scale-110 duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-10 h-10 bg-white/40 rounded-full -ml-2.5 -mb-2.5"></div>

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-1.5">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${option.iconBg} flex items-center justify-center shadow-md ${option.iconShadow} text-white text-lg transform transition-transform group-hover:rotate-12`}>
                                    {option.icon}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-base font-bold text-gray-900 mb-0.5">{option.title}</h3>
                            <p className="text-[11px] font-semibold text-gray-600 mb-0.5">{option.subtitle}</p>
                            <p className="text-[11px] text-gray-700 mb-1.5">{option.description}</p>

                            {/* Features */}
                            <div className="space-y-0.5 mb-1.5">
                                {option.features.map((feature, idx) => (
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
                                <span className="text-[11px] font-bold text-gray-700">Explore {option.title}</span>
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
                    <div className="text-xl font-black text-blue-600">2</div>
                    <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mt-0.5">Career Paths</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                    <div className="text-xl font-black text-purple-600">1</div>
                    <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mt-0.5">Resume Builder</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                    <div className="text-xl font-black text-emerald-600">1</div>
                    <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mt-0.5">Assessment Tool</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                    <div className="text-xl font-black text-orange-600">∞</div>
                    <div className="text-[10px] font-bold text-gray-600 uppercase tracking-wide mt-0.5">Opportunities</div>
                </div>
            </div>
        </div>
    );
};

export default CareerPathDashboard;
