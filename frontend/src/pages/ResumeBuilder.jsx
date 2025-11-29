import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';

const ResumeBuilder = () => {
    const username = localStorage.getItem('username') || 'User';

    const [activeTab, setActiveTab] = useState('personal');
    const [template, setTemplate] = useState('modern');
    const [showPreview, setShowPreview] = useState(false);
    const [aiSuggesting, setAiSuggesting] = useState(false);

    const [resumeData, setResumeData] = useState({
        personal: {
            name: username,
            email: '',
            phone: '',
            location: '',
            summary: ''
        },
        education: [],
        experience: [],
        skills: {
            technical: [],
            soft: []
        },
        projects: []
    });

    // Load saved resume data
    useEffect(() => {
        const savedResume = localStorage.getItem('resumeData');
        if (savedResume) {
            setResumeData(JSON.parse(savedResume));
        } else {
            // Pre-fill from profile data
            const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
            if (profileData.email || profileData.phone || profileData.location) {
                setResumeData(prev => ({
                    ...prev,
                    personal: {
                        ...prev.personal,
                        email: profileData.email || '',
                        phone: profileData.phone || '',
                        location: profileData.location || ''
                    }
                }));
            }
        }
    }, []);

    // Auto-save
    useEffect(() => {
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
    }, [resumeData]);

    const handlePersonalChange = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            personal: { ...prev.personal, [field]: value }
        }));
    };

    const addEducation = () => {
        setResumeData(prev => ({
            ...prev,
            education: [...prev.education, { degree: '', institution: '', year: '', gpa: '' }]
        }));
    };

    const updateEducation = (index, field, value) => {
        const newEducation = [...resumeData.education];
        newEducation[index][field] = value;
        setResumeData(prev => ({ ...prev, education: newEducation }));
    };

    const removeEducation = (index) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index)
        }));
    };

    const addExperience = () => {
        setResumeData(prev => ({
            ...prev,
            experience: [...prev.experience, { title: '', company: '', duration: '', responsibilities: '' }]
        }));
    };

    const updateExperience = (index, field, value) => {
        const newExperience = [...resumeData.experience];
        newExperience[index][field] = value;
        setResumeData(prev => ({ ...prev, experience: newExperience }));
    };

    const removeExperience = (index) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.filter((_, i) => i !== index)
        }));
    };

    const addSkill = (type) => {
        const skill = prompt(`Enter ${type} skill:`);
        if (skill) {
            setResumeData(prev => ({
                ...prev,
                skills: { ...prev.skills, [type]: [...prev.skills[type], skill] }
            }));
        }
    };

    const removeSkill = (type, index) => {
        setResumeData(prev => ({
            ...prev,
            skills: { ...prev.skills, [type]: prev.skills[type].filter((_, i) => i !== index) }
        }));
    };

    const addProject = () => {
        setResumeData(prev => ({
            ...prev,
            projects: [...prev.projects, { title: '', description: '', technologies: '' }]
        }));
    };

    const updateProject = (index, field, value) => {
        const newProjects = [...resumeData.projects];
        newProjects[index][field] = value;
        setResumeData(prev => ({ ...prev, projects: newProjects }));
    };

    const removeProject = (index) => {
        setResumeData(prev => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index)
        }));
    };

    const getAISuggestions = async (section) => {
        setAiSuggesting(true);
        try {
            const response = await fetch('http://localhost:8000/chat/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: `Generate professional ${section} content for a resume. Current data: ${JSON.stringify(resumeData[section])}. Provide 3 concise, impactful suggestions.`,
                    username: username
                })
            });
            const data = await response.json();
            alert(`AI Suggestions:\n\n${data.response}`);
        } catch (error) {
            alert('Failed to get AI suggestions. Please try again.');
        }
        setAiSuggesting(false);
    };

    const exportToPDF = () => {
        const element = document.getElementById('resume-preview');
        const opt = {
            margin: 0.5,
            filename: `${resumeData.personal.name}_Resume.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };

    const tabs = [
        { id: 'personal', label: 'Personal Info', icon: '👤' },
        { id: 'education', label: 'Education', icon: '🎓' },
        { id: 'experience', label: 'Experience', icon: '💼' },
        { id: 'skills', label: 'Skills', icon: '⚡' },
        { id: 'projects', label: 'Projects', icon: '🚀' }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Resume Builder</h1>
                    <p className="text-sm text-gray-500 mt-1">Create a professional resume with AI assistance</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        {showPreview ? '📝 Edit' : '👁️ Preview'}
                    </button>
                    {showPreview && (
                        <button
                            onClick={exportToPDF}
                            className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                            <span>📄 Export PDF</span>
                        </button>
                    )}
                </div>
            </div>

            {!showPreview ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-4">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Sections</h3>
                            <div className="space-y-1">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                                : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="text-lg">{tab.icon}</span>
                                        <span>{tab.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Template</h3>
                                <select
                                    value={template}
                                    onChange={(e) => setTemplate(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                >
                                    <option value="modern">Modern</option>
                                    <option value="classic">Classic</option>
                                    <option value="minimal">Minimal</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            {/* Personal Info Tab */}
                            {activeTab === 'personal' && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                                        <button
                                            onClick={() => getAISuggestions('personal')}
                                            disabled={aiSuggesting}
                                            className="px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-bold rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50"
                                        >
                                            {aiSuggesting ? '⏳ Generating...' : '✨ AI Suggest'}
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
                                            <input
                                                type="text"
                                                value={resumeData.personal.name}
                                                onChange={(e) => handlePersonalChange('name', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                                            <input
                                                type="email"
                                                value={resumeData.personal.email}
                                                onChange={(e) => handlePersonalChange('email', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Phone</label>
                                            <input
                                                type="tel"
                                                value={resumeData.personal.phone}
                                                onChange={(e) => handlePersonalChange('phone', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Location</label>
                                            <input
                                                type="text"
                                                value={resumeData.personal.location}
                                                onChange={(e) => handlePersonalChange('location', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Professional Summary</label>
                                            <textarea
                                                value={resumeData.personal.summary}
                                                onChange={(e) => handlePersonalChange('summary', e.target.value)}
                                                rows="4"
                                                placeholder="Brief overview of your professional background and career objectives..."
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Education Tab */}
                            {activeTab === 'education' && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-800">Education</h2>
                                        <button
                                            onClick={addEducation}
                                            className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            + Add Education
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {resumeData.education.map((edu, index) => (
                                            <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h3 className="text-sm font-bold text-gray-700">Education #{index + 1}</h3>
                                                    <button
                                                        onClick={() => removeEducation(index)}
                                                        className="text-red-500 text-xs font-bold hover:underline"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Degree</label>
                                                        <input
                                                            type="text"
                                                            value={edu.degree}
                                                            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                                            placeholder="e.g., B.Tech in Computer Science"
                                                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Institution</label>
                                                        <input
                                                            type="text"
                                                            value={edu.institution}
                                                            onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                                                            placeholder="e.g., IIT Delhi"
                                                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Year</label>
                                                        <input
                                                            type="text"
                                                            value={edu.year}
                                                            onChange={(e) => updateEducation(index, 'year', e.target.value)}
                                                            placeholder="e.g., 2020-2024"
                                                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-500 mb-1">GPA/Percentage</label>
                                                        <input
                                                            type="text"
                                                            value={edu.gpa}
                                                            onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                                                            placeholder="e.g., 8.5/10"
                                                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {resumeData.education.length === 0 && (
                                            <div className="text-center py-8 text-gray-400">
                                                <p className="text-sm">No education added yet. Click "Add Education" to get started.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Experience Tab */}
                            {activeTab === 'experience' && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-800">Work Experience</h2>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => getAISuggestions('experience')}
                                                disabled={aiSuggesting}
                                                className="px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-bold rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50"
                                            >
                                                {aiSuggesting ? '⏳ Generating...' : '✨ AI Suggest'}
                                            </button>
                                            <button
                                                onClick={addExperience}
                                                className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors"
                                            >
                                                + Add Experience
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {resumeData.experience.map((exp, index) => (
                                            <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h3 className="text-sm font-bold text-gray-700">Experience #{index + 1}</h3>
                                                    <button
                                                        onClick={() => removeExperience(index)}
                                                        className="text-red-500 text-xs font-bold hover:underline"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Job Title</label>
                                                        <input
                                                            type="text"
                                                            value={exp.title}
                                                            onChange={(e) => updateExperience(index, 'title', e.target.value)}
                                                            placeholder="e.g., Software Engineer"
                                                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Company</label>
                                                        <input
                                                            type="text"
                                                            value={exp.company}
                                                            onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                                            placeholder="e.g., Google"
                                                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Duration</label>
                                                        <input
                                                            type="text"
                                                            value={exp.duration}
                                                            onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                                                            placeholder="e.g., Jan 2022 - Present"
                                                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Responsibilities</label>
                                                        <textarea
                                                            value={exp.responsibilities}
                                                            onChange={(e) => updateExperience(index, 'responsibilities', e.target.value)}
                                                            rows="3"
                                                            placeholder="Describe your key responsibilities and achievements..."
                                                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {resumeData.experience.length === 0 && (
                                            <div className="text-center py-8 text-gray-400">
                                                <p className="text-sm">No experience added yet. Click "Add Experience" to get started.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Skills Tab */}
                            {activeTab === 'skills' && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-800">Skills</h2>
                                        <button
                                            onClick={() => getAISuggestions('skills')}
                                            disabled={aiSuggesting}
                                            className="px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-bold rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50"
                                        >
                                            {aiSuggesting ? '⏳ Generating...' : '✨ AI Suggest'}
                                        </button>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-sm font-bold text-gray-700">Technical Skills</h3>
                                                <button
                                                    onClick={() => addSkill('technical')}
                                                    className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors"
                                                >
                                                    + Add Skill
                                                </button>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {resumeData.skills.technical.map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-200"
                                                    >
                                                        {skill}
                                                        <button
                                                            onClick={() => removeSkill('technical', index)}
                                                            className="text-blue-500 hover:text-blue-700"
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                ))}
                                                {resumeData.skills.technical.length === 0 && (
                                                    <p className="text-sm text-gray-400">No technical skills added yet.</p>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-sm font-bold text-gray-700">Soft Skills</h3>
                                                <button
                                                    onClick={() => addSkill('soft')}
                                                    className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors"
                                                >
                                                    + Add Skill
                                                </button>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {resumeData.skills.soft.map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-lg border border-green-200"
                                                    >
                                                        {skill}
                                                        <button
                                                            onClick={() => removeSkill('soft', index)}
                                                            className="text-green-500 hover:text-green-700"
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                ))}
                                                {resumeData.skills.soft.length === 0 && (
                                                    <p className="text-sm text-gray-400">No soft skills added yet.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Projects Tab */}
                            {activeTab === 'projects' && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-800">Projects</h2>
                                        <button
                                            onClick={addProject}
                                            className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            + Add Project
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {resumeData.projects.map((project, index) => (
                                            <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h3 className="text-sm font-bold text-gray-700">Project #{index + 1}</h3>
                                                    <button
                                                        onClick={() => removeProject(index)}
                                                        className="text-red-500 text-xs font-bold hover:underline"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Project Title</label>
                                                        <input
                                                            type="text"
                                                            value={project.title}
                                                            onChange={(e) => updateProject(index, 'title', e.target.value)}
                                                            placeholder="e.g., E-commerce Platform"
                                                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Description</label>
                                                        <textarea
                                                            value={project.description}
                                                            onChange={(e) => updateProject(index, 'description', e.target.value)}
                                                            rows="3"
                                                            placeholder="Describe the project, your role, and impact..."
                                                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Technologies Used</label>
                                                        <input
                                                            type="text"
                                                            value={project.technologies}
                                                            onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                                                            placeholder="e.g., React, Node.js, MongoDB"
                                                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {resumeData.projects.length === 0 && (
                                            <div className="text-center py-8 text-gray-400">
                                                <p className="text-sm">No projects added yet. Click "Add Project" to get started.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <ResumePreview data={resumeData} template={template} />
            )}
        </div>
    );
};

// Resume Preview Component
const ResumePreview = ({ data, template }) => {
    const templates = {
        modern: ModernTemplate,
        classic: ClassicTemplate,
        minimal: MinimalTemplate
    };

    const TemplateComponent = templates[template] || ModernTemplate;

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div id="resume-preview" className="max-w-4xl mx-auto">
                <TemplateComponent data={data} />
            </div>
        </div>
    );
};

// Modern Template
const ModernTemplate = ({ data }) => (
    <div className="bg-white p-8 font-sans">
        {/* Header */}
        <div className="border-b-4 border-indigo-600 pb-6 mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.personal.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {data.personal.email && <span>📧 {data.personal.email}</span>}
                {data.personal.phone && <span>📱 {data.personal.phone}</span>}
                {data.personal.location && <span>📍 {data.personal.location}</span>}
            </div>
        </div>

        {/* Summary */}
        {data.personal.summary && (
            <div className="mb-6">
                <h2 className="text-xl font-bold text-indigo-600 mb-3 uppercase tracking-wide">Professional Summary</h2>
                <p className="text-gray-700 leading-relaxed">{data.personal.summary}</p>
            </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
            <div className="mb-6">
                <h2 className="text-xl font-bold text-indigo-600 mb-3 uppercase tracking-wide">Work Experience</h2>
                {data.experience.map((exp, index) => (
                    <div key={index} className="mb-4">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                            <span className="text-sm text-gray-600">{exp.duration}</span>
                        </div>
                        <p className="text-md font-semibold text-gray-700 mb-2">{exp.company}</p>
                        <p className="text-gray-600 text-sm whitespace-pre-line">{exp.responsibilities}</p>
                    </div>
                ))}
            </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
            <div className="mb-6">
                <h2 className="text-xl font-bold text-indigo-600 mb-3 uppercase tracking-wide">Education</h2>
                {data.education.map((edu, index) => (
                    <div key={index} className="mb-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                                <p className="text-md text-gray-700">{edu.institution}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">{edu.year}</p>
                                {edu.gpa && <p className="text-sm font-semibold text-gray-700">{edu.gpa}</p>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Skills */}
        {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
            <div className="mb-6">
                <h2 className="text-xl font-bold text-indigo-600 mb-3 uppercase tracking-wide">Skills</h2>
                {data.skills.technical.length > 0 && (
                    <div className="mb-2">
                        <span className="font-semibold text-gray-700">Technical: </span>
                        <span className="text-gray-600">{data.skills.technical.join(', ')}</span>
                    </div>
                )}
                {data.skills.soft.length > 0 && (
                    <div>
                        <span className="font-semibold text-gray-700">Soft Skills: </span>
                        <span className="text-gray-600">{data.skills.soft.join(', ')}</span>
                    </div>
                )}
            </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
            <div className="mb-6">
                <h2 className="text-xl font-bold text-indigo-600 mb-3 uppercase tracking-wide">Projects</h2>
                {data.projects.map((project, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{project.title}</h3>
                        <p className="text-gray-600 text-sm mb-1">{project.description}</p>
                        {project.technologies && (
                            <p className="text-sm text-gray-500"><span className="font-semibold">Technologies:</span> {project.technologies}</p>
                        )}
                    </div>
                ))}
            </div>
        )}
    </div>
);

// Classic Template
const ClassicTemplate = ({ data }) => (
    <div className="bg-white p-8 font-serif">
        {/* Header */}
        <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.personal.name}</h1>
            <div className="text-sm text-gray-600">
                {data.personal.email && <span>{data.personal.email}</span>}
                {data.personal.phone && <span> | {data.personal.phone}</span>}
                {data.personal.location && <span> | {data.personal.location}</span>}
            </div>
        </div>

        {/* Summary */}
        {data.personal.summary && (
            <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400">PROFESSIONAL SUMMARY</h2>
                <p className="text-gray-700 text-sm leading-relaxed">{data.personal.summary}</p>
            </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
            <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400">EXPERIENCE</h2>
                {data.experience.map((exp, index) => (
                    <div key={index} className="mb-3">
                        <div className="flex justify-between">
                            <h3 className="font-bold text-gray-900">{exp.title} - {exp.company}</h3>
                            <span className="text-sm text-gray-600">{exp.duration}</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1 whitespace-pre-line">{exp.responsibilities}</p>
                    </div>
                ))}
            </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
            <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400">EDUCATION</h2>
                {data.education.map((edu, index) => (
                    <div key={index} className="mb-2">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                <p className="text-sm text-gray-700">{edu.institution}</p>
                            </div>
                            <div className="text-right text-sm">
                                <p className="text-gray-600">{edu.year}</p>
                                {edu.gpa && <p className="font-semibold">{edu.gpa}</p>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Skills */}
        {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
            <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400">SKILLS</h2>
                {data.skills.technical.length > 0 && (
                    <p className="text-sm text-gray-700 mb-1"><span className="font-bold">Technical:</span> {data.skills.technical.join(', ')}</p>
                )}
                {data.skills.soft.length > 0 && (
                    <p className="text-sm text-gray-700"><span className="font-bold">Soft Skills:</span> {data.skills.soft.join(', ')}</p>
                )}
            </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
            <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400">PROJECTS</h2>
                {data.projects.map((project, index) => (
                    <div key={index} className="mb-3">
                        <h3 className="font-bold text-gray-900">{project.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                        {project.technologies && (
                            <p className="text-sm text-gray-500 mt-1"><span className="font-bold">Tech:</span> {project.technologies}</p>
                        )}
                    </div>
                ))}
            </div>
        )}
    </div>
);

// Minimal Template
const MinimalTemplate = ({ data }) => (
    <div className="bg-white p-8 font-sans">
        {/* Header */}
        <div className="mb-8">
            <h1 className="text-5xl font-light text-gray-900 mb-3">{data.personal.name}</h1>
            <div className="flex gap-4 text-xs text-gray-500 uppercase tracking-wider">
                {data.personal.email && <span>{data.personal.email}</span>}
                {data.personal.phone && <span>{data.personal.phone}</span>}
                {data.personal.location && <span>{data.personal.location}</span>}
            </div>
        </div>

        {/* Summary */}
        {data.personal.summary && (
            <div className="mb-8">
                <p className="text-gray-700 text-sm leading-relaxed">{data.personal.summary}</p>
            </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
            <div className="mb-8">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Experience</h2>
                {data.experience.map((exp, index) => (
                    <div key={index} className="mb-5">
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="text-base font-semibold text-gray-900">{exp.title}</h3>
                            <span className="text-xs text-gray-500">{exp.duration}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{exp.company}</p>
                        <p className="text-sm text-gray-600 whitespace-pre-line">{exp.responsibilities}</p>
                    </div>
                ))}
            </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
            <div className="mb-8">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Education</h2>
                {data.education.map((edu, index) => (
                    <div key={index} className="mb-3">
                        <div className="flex justify-between items-baseline">
                            <div>
                                <h3 className="text-base font-semibold text-gray-900">{edu.degree}</h3>
                                <p className="text-sm text-gray-600">{edu.institution}</p>
                            </div>
                            <div className="text-right text-xs">
                                <p className="text-gray-500">{edu.year}</p>
                                {edu.gpa && <p className="font-semibold text-gray-700">{edu.gpa}</p>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Skills */}
        {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
            <div className="mb-8">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Skills</h2>
                <div className="space-y-2">
                    {data.skills.technical.length > 0 && (
                        <p className="text-sm text-gray-700">{data.skills.technical.join(' • ')}</p>
                    )}
                    {data.skills.soft.length > 0 && (
                        <p className="text-sm text-gray-600">{data.skills.soft.join(' • ')}</p>
                    )}
                </div>
            </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
            <div className="mb-8">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Projects</h2>
                {data.projects.map((project, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="text-base font-semibold text-gray-900 mb-1">{project.title}</h3>
                        <p className="text-sm text-gray-600 mb-1">{project.description}</p>
                        {project.technologies && (
                            <p className="text-xs text-gray-500">{project.technologies}</p>
                        )}
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default ResumeBuilder;
