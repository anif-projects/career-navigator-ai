import React from 'react';

const ThemeShowcase = () => {
    const themes = [
        { name: 'Slate', from: 'from-slate-50', to: 'to-slate-100', border: 'border-slate-100', iconBg: 'from-slate-500 to-slate-600', iconShadow: 'shadow-slate-200', text: 'text-slate-600', subText: 'text-slate-700', descText: 'text-slate-800/70', buttonText: 'text-slate-600', buttonHover: 'hover:bg-slate-50' },
        { name: 'Gray', from: 'from-gray-50', to: 'to-gray-100', border: 'border-gray-100', iconBg: 'from-gray-500 to-gray-600', iconShadow: 'shadow-gray-200', text: 'text-gray-600', subText: 'text-gray-700', descText: 'text-gray-800/70', buttonText: 'text-gray-600', buttonHover: 'hover:bg-gray-50' },
        { name: 'Zinc', from: 'from-zinc-50', to: 'to-zinc-100', border: 'border-zinc-100', iconBg: 'from-zinc-500 to-zinc-600', iconShadow: 'shadow-zinc-200', text: 'text-zinc-600', subText: 'text-zinc-700', descText: 'text-zinc-800/70', buttonText: 'text-zinc-600', buttonHover: 'hover:bg-zinc-50' },
        { name: 'Neutral', from: 'from-neutral-50', to: 'to-neutral-100', border: 'border-neutral-100', iconBg: 'from-neutral-500 to-neutral-600', iconShadow: 'shadow-neutral-200', text: 'text-neutral-600', subText: 'text-neutral-700', descText: 'text-neutral-800/70', buttonText: 'text-neutral-600', buttonHover: 'hover:bg-neutral-50' },
        { name: 'Stone', from: 'from-stone-50', to: 'to-stone-100', border: 'border-stone-100', iconBg: 'from-stone-500 to-stone-600', iconShadow: 'shadow-stone-200', text: 'text-stone-600', subText: 'text-stone-700', descText: 'text-stone-800/70', buttonText: 'text-stone-600', buttonHover: 'hover:bg-stone-50' },
        { name: 'Red', from: 'from-red-50', to: 'to-red-100', border: 'border-red-100', iconBg: 'from-red-500 to-red-600', iconShadow: 'shadow-red-200', text: 'text-red-600', subText: 'text-red-700', descText: 'text-red-800/70', buttonText: 'text-red-600', buttonHover: 'hover:bg-red-50' },
        { name: 'Orange', from: 'from-orange-50', to: 'to-orange-100', border: 'border-orange-100', iconBg: 'from-orange-500 to-orange-600', iconShadow: 'shadow-orange-200', text: 'text-orange-600', subText: 'text-orange-700', descText: 'text-orange-800/70', buttonText: 'text-orange-600', buttonHover: 'hover:bg-orange-50' },
        { name: 'Amber', from: 'from-amber-50', to: 'to-amber-100', border: 'border-amber-100', iconBg: 'from-amber-500 to-amber-600', iconShadow: 'shadow-amber-200', text: 'text-amber-600', subText: 'text-amber-700', descText: 'text-amber-800/70', buttonText: 'text-amber-600', buttonHover: 'hover:bg-amber-50' },
        { name: 'Yellow', from: 'from-yellow-50', to: 'to-yellow-100', border: 'border-yellow-100', iconBg: 'from-yellow-500 to-yellow-600', iconShadow: 'shadow-yellow-200', text: 'text-yellow-600', subText: 'text-yellow-700', descText: 'text-yellow-800/70', buttonText: 'text-yellow-600', buttonHover: 'hover:bg-yellow-50' },
        { name: 'Lime', from: 'from-lime-50', to: 'to-lime-100', border: 'border-lime-100', iconBg: 'from-lime-500 to-lime-600', iconShadow: 'shadow-lime-200', text: 'text-lime-600', subText: 'text-lime-700', descText: 'text-lime-800/70', buttonText: 'text-lime-600', buttonHover: 'hover:bg-lime-50' },
        { name: 'Green', from: 'from-green-50', to: 'to-green-100', border: 'border-green-100', iconBg: 'from-green-500 to-green-600', iconShadow: 'shadow-green-200', text: 'text-green-600', subText: 'text-green-700', descText: 'text-green-800/70', buttonText: 'text-green-600', buttonHover: 'hover:bg-green-50' },
        { name: 'Emerald', from: 'from-emerald-50', to: 'to-emerald-100', border: 'border-emerald-100', iconBg: 'from-emerald-500 to-emerald-600', iconShadow: 'shadow-emerald-200', text: 'text-emerald-600', subText: 'text-emerald-700', descText: 'text-emerald-800/70', buttonText: 'text-emerald-600', buttonHover: 'hover:bg-emerald-50' },
        { name: 'Teal', from: 'from-teal-50', to: 'to-teal-100', border: 'border-teal-100', iconBg: 'from-teal-500 to-teal-600', iconShadow: 'shadow-teal-200', text: 'text-teal-600', subText: 'text-teal-700', descText: 'text-teal-800/70', buttonText: 'text-teal-600', buttonHover: 'hover:bg-teal-50' },
        { name: 'Cyan', from: 'from-cyan-50', to: 'to-cyan-100', border: 'border-cyan-100', iconBg: 'from-cyan-500 to-cyan-600', iconShadow: 'shadow-cyan-200', text: 'text-cyan-600', subText: 'text-cyan-700', descText: 'text-cyan-800/70', buttonText: 'text-cyan-600', buttonHover: 'hover:bg-cyan-50' },
        { name: 'Sky', from: 'from-sky-50', to: 'to-sky-100', border: 'border-sky-100', iconBg: 'from-sky-500 to-sky-600', iconShadow: 'shadow-sky-200', text: 'text-sky-600', subText: 'text-sky-700', descText: 'text-sky-800/70', buttonText: 'text-sky-600', buttonHover: 'hover:bg-sky-50' },
        { name: 'Blue', from: 'from-blue-50', to: 'to-blue-100', border: 'border-blue-100', iconBg: 'from-blue-500 to-blue-600', iconShadow: 'shadow-blue-200', text: 'text-blue-600', subText: 'text-blue-700', descText: 'text-blue-800/70', buttonText: 'text-blue-600', buttonHover: 'hover:bg-blue-50' },
        { name: 'Indigo', from: 'from-indigo-50', to: 'to-indigo-100', border: 'border-indigo-100', iconBg: 'from-indigo-500 to-indigo-600', iconShadow: 'shadow-indigo-200', text: 'text-indigo-600', subText: 'text-indigo-700', descText: 'text-indigo-800/70', buttonText: 'text-indigo-600', buttonHover: 'hover:bg-indigo-50' },
        { name: 'Violet', from: 'from-violet-50', to: 'to-violet-100', border: 'border-violet-100', iconBg: 'from-violet-500 to-violet-600', iconShadow: 'shadow-violet-200', text: 'text-violet-600', subText: 'text-violet-700', descText: 'text-violet-800/70', buttonText: 'text-violet-600', buttonHover: 'hover:bg-violet-50' },
        { name: 'Purple', from: 'from-purple-50', to: 'to-purple-100', border: 'border-purple-100', iconBg: 'from-purple-500 to-purple-600', iconShadow: 'shadow-purple-200', text: 'text-purple-600', subText: 'text-purple-700', descText: 'text-purple-800/70', buttonText: 'text-purple-600', buttonHover: 'hover:bg-purple-50' },
        { name: 'Fuchsia', from: 'from-fuchsia-50', to: 'to-fuchsia-100', border: 'border-fuchsia-100', iconBg: 'from-fuchsia-500 to-fuchsia-600', iconShadow: 'shadow-fuchsia-200', text: 'text-fuchsia-600', subText: 'text-fuchsia-700', descText: 'text-fuchsia-800/70', buttonText: 'text-fuchsia-600', buttonHover: 'hover:bg-fuchsia-50' },
        { name: 'Pink', from: 'from-pink-50', to: 'to-pink-100', border: 'border-pink-100', iconBg: 'from-pink-500 to-pink-600', iconShadow: 'shadow-pink-200', text: 'text-pink-600', subText: 'text-pink-700', descText: 'text-pink-800/70', buttonText: 'text-pink-600', buttonHover: 'hover:bg-pink-50' },
        { name: 'Rose', from: 'from-rose-50', to: 'to-rose-100', border: 'border-rose-100', iconBg: 'from-rose-500 to-rose-600', iconShadow: 'shadow-rose-200', text: 'text-rose-600', subText: 'text-rose-700', descText: 'text-rose-800/70', buttonText: 'text-rose-600', buttonHover: 'hover:bg-rose-50' },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-800 mb-2">Theme Showcase</h1>
                <p className="text-gray-600">Explore available color themes for your dashboard cards.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {themes.map((theme, index) => (
                    <div key={index} className={`bg-gradient-to-br ${theme.from} ${theme.to} p-4 rounded-2xl shadow-lg border ${theme.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group`}>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/40 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110"></div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.iconBg} flex items-center justify-center shadow-lg ${theme.iconShadow} text-white text-xl`}>
                                    🎨
                                </div>
                                <span className={`bg-white/60 ${theme.text} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border ${theme.border} backdrop-blur-sm`}>
                                    {theme.name}
                                </span>
                            </div>

                            <h3 className={`${theme.text} text-xs font-bold uppercase tracking-widest mb-1`}>Theme Name</h3>
                            <div className="flex items-baseline gap-1.5 mb-2">
                                <span className="text-2xl font-black text-gray-800">{theme.name}</span>
                            </div>
                            <p className={`text-[10px] ${theme.descText} leading-relaxed mb-4`}>
                                This is a sample card demonstrating the {theme.name} color theme.
                            </p>

                            <button className={`w-full bg-white ${theme.buttonText} py-2 rounded-lg font-bold ${theme.buttonHover} transition-colors shadow-sm text-xs flex items-center justify-center gap-1.5 group-hover:shadow-md`}>
                                Select Theme
                                <span className="text-base">→</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThemeShowcase;
