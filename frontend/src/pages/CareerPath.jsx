import React, { useEffect } from 'react';
import CareerFlowchart from '../components/CareerFlowchart';
import { after10thData, afterIntermediateData } from '../data/careerPaths';

const CareerPath = ({ level }) => {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [level]);

    const getContent = () => {
        switch (level) {
            case 'secondary':
                return {
                    data: after10thData,
                    title: "What Next ?",
                    subTitle: "After 10th Class",
                    color: "text-purple-600",
                    description: "Career Path After 10th"
                };
            case 'undergraduate':
                return {
                    data: afterIntermediateData,
                    title: "What Next ?",
                    subTitle: "After Intermediate",
                    color: "text-blue-600",
                    description: "Career Path After Intermediate"
                };
            default:
                return null;
        }
    };

    const content = getContent();

    if (!content) return null;

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-8 min-h-[600px] flex flex-col items-center">
            <div className="w-full max-w-6xl">
                <CareerFlowchart
                    data={content.data}
                    title={content.title}
                    subTitle={content.subTitle}
                />
            </div>
        </div>
    );
};

export default CareerPath;
