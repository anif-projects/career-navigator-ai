import React from 'react';

const CareerFlowchart = ({ data, title = "What Next ?", subTitle = "After 10th class" }) => {
    // Use the passed data
    const rootData = data;

    // --- Column View Logic ---
    const renderColumnView = () => (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-2">
                {rootData.children.map((column, colIndex) => {
                    // Determine styles based on label or index
                    // Default styles
                    let styles = {
                        headerGradient: 'bg-gradient-to-r from-gray-600 to-gray-500',
                        icon: '🎓',
                        softBg: 'bg-gray-50',
                        bullet: 'bg-gray-400',
                        shadow: 'shadow-gray-200'
                    };

                    // Dynamic styling logic
                    const label = column.label.toLowerCase();
                    if (label.includes('intermediate') || label.includes('engineering')) {
                        styles = {
                            headerGradient: 'bg-gradient-to-r from-rose-500 to-orange-500',
                            icon: label.includes('engineering') ? '🏗️' : '📚',
                            softBg: 'bg-rose-50/50',
                            bullet: 'bg-rose-500',
                            shadow: 'shadow-rose-100'
                        };
                    } else if (label.includes('polytechnic') || label.includes('medical')) {
                        styles = {
                            headerGradient: 'bg-gradient-to-r from-blue-600 to-cyan-500',
                            icon: label.includes('medical') ? '⚕️' : '⚙️',
                            softBg: 'bg-blue-50/50',
                            bullet: 'bg-blue-500',
                            shadow: 'shadow-blue-100'
                        };
                    } else if (label.includes('iti') || label.includes('degree') || label.includes('teaching')) {
                        styles = {
                            headerGradient: 'bg-gradient-to-r from-emerald-600 to-teal-500',
                            icon: label.includes('teaching') ? '👩‍🏫' : (label.includes('degree') ? '🎓' : '🛠️'),
                            softBg: 'bg-emerald-50/50',
                            bullet: 'bg-emerald-500',
                            shadow: 'shadow-emerald-100'
                        };
                    } else if (label.includes('paramedical') || label.includes('others') || label.includes('nda')) {
                        styles = {
                            headerGradient: 'bg-gradient-to-r from-violet-600 to-purple-500',
                            icon: label.includes('nda') ? '🎖️' : '✨',
                            softBg: 'bg-violet-50/50',
                            bullet: 'bg-violet-500',
                            shadow: 'shadow-violet-100'
                        };
                    }

                    return (
                        <div key={colIndex} className={`flex flex-col rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${styles.shadow}`}>
                            {/* Graphical Header */}
                            <div className={`${styles.headerGradient} p-3 text-white relative overflow-hidden`}>
                                <div className="absolute top-0 right-0 opacity-20 transform translate-x-2 -translate-y-2 text-6xl">
                                    {styles.icon}
                                </div>
                                <div className="relative z-10 text-center">
                                    <h3 className="text-xl font-extrabold tracking-wide drop-shadow-sm">{column.label}</h3>
                                    <p className="text-xs font-medium opacity-90 mt-1 bg-white/20 inline-block px-2 py-0.5 rounded-full">{column.subLabel}</p>
                                </div>
                            </div>

                            {/* Column Content */}
                            <div className={`space-y-2 flex-1 p-3 ${styles.softBg}`}>
                                {column.children.map((item, itemIndex) => (
                                    <div key={itemIndex}>
                                        {item.children ? (
                                            // It's a category like Science, Commerce
                                            <div className="mb-2 last:mb-0 bg-white rounded-xl p-2.5 shadow-sm border border-gray-100/50">
                                                <h4 className="text-gray-800 font-bold text-xs mb-1.5 uppercase tracking-wider border-b border-gray-100 pb-1 flex items-center">
                                                    <span className={`w-1 h-4 rounded-full mr-2 ${styles.headerGradient}`}></span>
                                                    {item.label}
                                                </h4>
                                                <ul className="space-y-1">
                                                    {item.children.map((subItem, subIndex) => (
                                                        <li key={subIndex} className="text-gray-600 text-xs flex items-center group cursor-default">
                                                            <span className={`mr-2 w-1.5 h-1.5 rounded-full ${styles.bullet} group-hover:scale-125 transition-transform`}></span>
                                                            <span className="leading-tight group-hover:text-gray-900 transition-colors">{subItem.label}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            // It's a direct item like Mechanical, Fitter
                                            <div className="bg-white text-gray-700 text-xs py-1.5 px-3 rounded-lg shadow-sm border border-gray-100/50 hover:border-gray-200 hover:shadow-md transition-all flex items-center group cursor-default">
                                                <span className={`mr-2 w-1.5 h-1.5 rounded-full ${styles.bullet} group-hover:scale-125 transition-transform`}></span>
                                                <span className="font-medium group-hover:text-gray-900">{item.label}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="w-full p-6 bg-white rounded-xl border border-gray-100 shadow-sm min-h-[600px] flex flex-col">

            {/* Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <div className="text-center w-full">
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    <p className="text-gray-500 text-sm">{subTitle}</p>
                </div>
            </div>

            <div className="animate-fadeIn">
                {renderColumnView()}
            </div>
        </div>
    );
};

export default CareerFlowchart;
