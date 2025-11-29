import React from 'react';

const PrimaryEducation = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">📚 Primary Education</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6" aria-label="Tabs">
                        <button className="border-b-2 border-primary py-4 px-1 text-sm font-medium text-primary">
                            Home
                        </button>
                        <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                            Syllabus
                        </button>
                        <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                            School List
                        </button>
                        {/* Add other tabs as needed */}
                    </nav>
                </div>

                <div className="p-6">
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">🎓 SSC (Grade 10) Education</h2>

                    <div className="prose max-w-none text-gray-600 space-y-4">
                        <p>
                            The <strong>Secondary School Certificate (SSC)</strong> is an important academic milestone for students.
                            It is usually awarded after completing <strong>Grade 10</strong> under various state education boards in India.
                        </p>

                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                            <h3 className="font-semibold text-blue-800 mb-2">Key Highlights:</h3>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Focuses on building strong academic foundations in core subjects.</li>
                                <li>Prepares students for higher secondary education (11th and 12th grades).</li>
                                <li>Helps in choosing future streams like Science, Commerce, or Arts.</li>
                                <li>Develops skills needed for entrance exams and career planning.</li>
                            </ul>
                        </div>

                        <h3 className="text-xl font-semibold text-green-600 mt-6 mb-2">📚 Core Subjects Studied</h3>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li><strong>Mathematics</strong></li>
                            <li><strong>Science</strong> (Physics, Chemistry, Biology)</li>
                            <li><strong>Social Studies</strong> (History, Geography, Civics, Economics)</li>
                            <li><strong>First Language</strong> (State language or Hindi)</li>
                            <li><strong>Second Language</strong> (English or other regional language)</li>
                            <li><strong>Optional Subjects</strong> (Computer Science, Physical Education, etc.)</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-green-600 mt-6 mb-2">🏆 Importance of SSC Grade 10</h3>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Acts as a gateway to higher studies and specialized streams.</li>
                            <li>Forms the base for competitive exams and scholarship opportunities.</li>
                            <li>Builds academic confidence and future career direction.</li>
                        </ul>

                        <div className="mt-6 bg-green-100 text-green-800 p-4 rounded-lg text-center font-medium">
                            ✨ Performing well in SSC Grade 10 opens many doors for future success!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrimaryEducation;
