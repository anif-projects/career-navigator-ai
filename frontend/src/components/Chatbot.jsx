import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Chatbot = ({ isEmbedded = false }) => {
    const [isOpen, setIsOpen] = useState(isEmbedded);
    // Helper to get the storage key based on current user
    const getStorageKey = () => {
        const username = localStorage.getItem('username');
        return username ? `chat_history_${username}` : 'chat_history_guest';
    };

    // Initialize from localStorage or default
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem(getStorageKey());
        const username = localStorage.getItem('username');
        const greeting = username
            ? `Hi ${username}! I'm your AI Career Assistant. How can I help you today?`
            : "Hi! I'm your AI Career Assistant. How can I help you today?";

        if (saved) {
            const parsed = JSON.parse(saved);
            // If it's just the initial greeting (length 1, from bot), update it to the current personalized one
            if (parsed.length === 1 && parsed[0].isBot) {
                return [{ text: greeting, isBot: true, role: 'model' }];
            }
            return parsed;
        }

        return [{ text: greeting, isBot: true, role: 'model' }];
    });
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
        // Save to localStorage whenever messages change
        localStorage.setItem(getStorageKey(), JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        if (isEmbedded) setIsOpen(true);
    }, [isEmbedded]);

    const clearChat = () => {
        const username = localStorage.getItem('username');
        const greeting = username
            ? `Hi ${username}! I'm your AI Career Assistant. How can I help you today?`
            : "Hi! I'm your AI Career Assistant. How can I help you today?";
        const initialMsg = [{ text: greeting, isBot: true, role: 'model' }];
        setMessages(initialMsg);
        localStorage.removeItem(getStorageKey());
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        const newMessages = [...messages, { text: userMessage, isBot: false, role: 'user' }];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);

        try {
            // Prepare history for backend (exclude the last message which is the current one being sent)
            // Backend expects: [{"role": "user"|"model", "parts": ["message"]}]
            const history = messages.map(msg => ({
                role: msg.role || (msg.isBot ? 'model' : 'user'),
                parts: [msg.text]
            }));

            const response = await fetch('http://localhost:8000/chat/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    history: history,
                    username: localStorage.getItem('username')
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setMessages(prev => [...prev, { text: data.response, isBot: true, role: 'model' }]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting to the server. Please try again later.", isBot: true, role: 'model' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    if (isEmbedded) {
        return (
            <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm text-xl">
                            🤖
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Career Assistant</h3>
                            <p className="text-sm text-blue-100 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                Online
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={clearChat}
                        className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-colors"
                        title="Clear Chat History"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} mb-4`}>
                            {msg.isBot ? (
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm mr-2 mt-1 flex-shrink-0">
                                    🤖
                                </div>
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm ml-2 mt-1 flex-shrink-0 order-2">
                                    👤
                                </div>
                            )}

                            <div className={`flex flex-col ${msg.isBot ? 'items-start' : 'items-end'} max-w-[75%]`}>
                                <span className="text-xs text-gray-400 mb-1 px-1">
                                    {msg.isBot ? 'Career Assistant' : (localStorage.getItem('username') || 'You')}
                                </span>
                                <div className={`
                                    p-3 rounded-2xl text-sm shadow-sm
                                    ${msg.isBot
                                        ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                        : 'bg-blue-600 text-white rounded-tr-none'
                                    }
                                `}>
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            ul: ({ node, ...props }) => <ul className="list-disc ml-4 mt-2 mb-2" {...props} />,
                                            ol: ({ node, ...props }) => <ol className="list-decimal ml-4 mt-2 mb-2" {...props} />,
                                            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                            p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                            strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                                            h1: ({ node, ...props }) => <h1 className="text-xl font-bold mt-4 mb-2" {...props} />,
                                            h2: ({ node, ...props }) => <h2 className="text-lg font-bold mt-3 mb-2" {...props} />,
                                            h3: ({ node, ...props }) => <h3 className="text-base font-bold mt-2 mb-1" {...props} />,
                                            a: ({ node, ...props }) => <a className="underline hover:text-blue-200" {...props} />,
                                        }}
                                    >
                                        {msg.text}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm mr-3 mt-1 flex-shrink-0">
                                🤖
                            </div>
                            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1 items-center">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100">
                    <div className="flex gap-3 max-w-4xl mx-auto w-full">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask about careers, colleges, or courses..."
                            className="flex-1 px-6 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition-all"
                            disabled={isLoading}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={isLoading || !input.trim()}
                            className={`
                                p-3 rounded-full text-white transition-all shadow-sm
                                ${isLoading || !input.trim()
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md active:scale-95'
                                }
                            `}
                        >
                            <svg className="w-6 h-6 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                    <div className="text-center mt-3">
                        <p className="text-xs text-gray-400">Powered by Career Navigator AI</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 border border-gray-200 overflow-hidden flex flex-col animate-fadeIn transition-all duration-300 ease-in-out" style={{ height: '500px' }}>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                🤖
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Career Assistant</h3>
                                <p className="text-xs text-blue-100 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={clearChat}
                                className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors"
                                title="Clear Chat History"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} mb-4`}>
                                {msg.isBot ? (
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs mr-2 mt-1 flex-shrink-0">
                                        🤖
                                    </div>
                                ) : (
                                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs ml-2 mt-1 flex-shrink-0 order-2">
                                        👤
                                    </div>
                                )}

                                <div className={`flex flex-col ${msg.isBot ? 'items-start' : 'items-end'} max-w-[80%]`}>
                                    <span className="text-[10px] text-gray-400 mb-1 px-1">
                                        {msg.isBot ? 'Career Assistant' : (localStorage.getItem('username') || 'You')}
                                    </span>
                                    <div className={`
                                        p-3 rounded-2xl text-sm shadow-sm
                                        ${msg.isBot
                                            ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                            : 'bg-blue-600 text-white rounded-tr-none'
                                        }
                                    `}>
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                ul: ({ node, ...props }) => <ul className="list-disc ml-4 mt-2 mb-2" {...props} />,
                                                ol: ({ node, ...props }) => <ol className="list-decimal ml-4 mt-2 mb-2" {...props} />,
                                                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                                                a: ({ node, ...props }) => <a className="underline hover:text-blue-200" {...props} />,
                                            }}
                                        >
                                            {msg.text}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs mr-2 mt-1 flex-shrink-0">
                                    🤖
                                </div>
                                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1 items-center">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-gray-100">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about careers..."
                                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                                disabled={isLoading}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={isLoading || !input.trim()}
                                className={`
                                    p-2 rounded-full text-white transition-all shadow-sm
                                    ${isLoading || !input.trim()
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md active:scale-95'
                                    }
                                `}
                            >
                                <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <p className="text-[10px] text-gray-400">Powered by Career Navigator AI</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center
                    ${isOpen
                        ? 'bg-gray-700 text-white rotate-90 hover:bg-gray-800'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/30 hover:scale-110'
                    }
                `}
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default Chatbot;
