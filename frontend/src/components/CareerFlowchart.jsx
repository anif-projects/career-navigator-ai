import React, { useState, useEffect } from 'react';



const CareerFlowchart = ({ data, title = "What Next ?", subTitle = "After 10th class" }) => {
    const [viewMode, setViewMode] = useState('overview'); // Default to overview as per latest request

    // Use the passed data
    const rootData = data;

    // --- Drill-down Logic ---
    const [path, setPath] = useState([rootData]);
    const currentNode = path[path.length - 1];

    // Reset path when data changes (e.g. switching between 10th and Intermediate)
    useEffect(() => {
        setPath([data]);
    }, [data]);

    const handleNodeClick = (node) => {
        if (node.children && node.children.length > 0) {
            setPath([...path, node]);
        }
    };

    const handleBreadcrumbClick = (index) => {
        setPath(path.slice(0, index + 1));
    };

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

            {/* Header & Toggle */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <div className="text-center w-full">
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    <p className="text-gray-500 text-sm">{subTitle}</p>
                </div>

                <div className="absolute right-8 flex bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode('overview')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'overview' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Column View
                    </button>
                    <button
                        onClick={() => setViewMode('drilldown')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'drilldown' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Drill-down
                    </button>
                </div>
            </div>

            {viewMode === 'drilldown' ? (
                <>
                    {/* Breadcrumb Navigation */}
                    <div className="flex flex-wrap items-center gap-2 mb-8">
                        {path.map((node, index) => (
                            <React.Fragment key={index}>
                                <button
                                    onClick={() => handleBreadcrumbClick(index)}
                                    className={`
                                        px-3 py-1 rounded-lg text-sm font-medium transition-colors
                                        ${index === path.length - 1
                                            ? 'bg-blue-100 text-blue-700 cursor-default'
                                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                                        }
                                    `}
                                >
                                    {node.label}
                                </button>
                                {index < path.length - 1 && (
                                    <span className="text-gray-300">/</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 animate-fadeIn">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                {currentNode.label === rootData.label ? "Select a Stream" : `Options in ${currentNode.label}`}
                            </h3>
                        </div>

                        {currentNode.children ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {currentNode.children.map((child, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleNodeClick(child)}
                                        className={`
                                            relative p-6 rounded-xl border-2 text-left transition-all duration-200 group
                                            ${child.children
                                                ? 'cursor-pointer hover:shadow-md hover:-translate-y-1 hover:border-blue-300 bg-white border-gray-100'
                                                : 'cursor-default bg-gray-50 border-gray-100'
                                            }
                                        `}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`
                                                inline-block p-2 rounded-lg bg-opacity-20 
                                                ${child.color ? child.color.replace('text-', 'bg-').replace('600', '100') : 'bg-blue-50'}
                                            `}>
                                                <span className="text-xl">
                                                    {child.children ? '📂' : '🎓'}
                                                </span>
                                            </span>
                                            {child.children && (
                                                <span className="text-gray-300 group-hover:text-blue-400 transition-colors">
                                                    ➔
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="font-bold text-gray-800 text-lg mb-1">{child.label}</h4>
                                        {child.subLabel && (
                                            <p className="text-sm text-gray-500">{child.subLabel}</p>
                                        )}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                                <div className="text-4xl mb-4">🎉</div>
                                <h4 className="text-xl font-bold text-gray-800 mb-2">{currentNode.label}</h4>
                                <p className="text-gray-600 max-w-md">
                                    Great choice!
                                </p>
                                <button
                                    onClick={() => handleBreadcrumbClick(0)}
                                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-colors"
                                >
                                    Start Over
                                </button>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="animate-fadeIn">
                    {renderColumnView()}
                </div>
            )}
        </div>
    );
};

export default CareerFlowchart;
