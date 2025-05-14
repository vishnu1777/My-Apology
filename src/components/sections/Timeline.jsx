import { Calendar, Heart, Star, Camera, Coffee, Gift, Music, Plane } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Timeline({ timeline }) {
    const [activeIndex, setActiveIndex] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // Animate timeline items on first render
    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    // Get appropriate icon based on event type
    const getEventIcon = (type) => {
        switch (type) {
            case 'date': return <Coffee size={14} />;
            case 'gift': return <Gift size={14} />;
            case 'travel': return <Plane size={14} />;
            case 'photo': return <Camera size={14} />;
            case 'music': return <Music size={14} />;
            case 'milestone': return <Star size={14} />;
            default: return <Heart size={14} />;
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <section className="py-16 px-4 bg-rose-50 overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-2 text-rose-600">Our Love Story</h2>
                <p className="text-gray-600 text-center mb-2">Every moment with you has been a blessing</p>
                <p className="text-rose-400 text-center italic mb-12">I'm sorry for the times I've let you down. This timeline reminds me of how precious our journey is.</p>

                <div className="relative">
                    {/* Vertical line with heart pulse animation */}
                    <div className="absolute left-3 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-rose-200 via-rose-400 to-rose-200 transform -translate-x-1/2">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Heart className="text-rose-500 animate-pulse" size={24} fill="currentColor" />
                        </div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                            <Heart className="text-rose-500 animate-pulse" size={24} fill="currentColor" />
                        </div>
                    </div>

                    {/* Timeline events */}
                    {timeline.map((event, index) => (
                        <div
                            key={index}
                            className={`mb-12 flex flex-col relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                        >
                            {/* Date bubble with pulsing effect on hover */}
                            <div className="absolute left-0 md:left-1/2 flex items-center justify-center transform -translate-x-1/2 z-10">
                                <div className={`bg-rose-500 text-white w-8 h-8 rounded-full flex items-center justify-center 
                                    shadow-md transition-all duration-300 
                                    ${activeIndex === index ? 'scale-125 bg-rose-600' : 'hover:scale-110'}
                                    ${isAnimating ? `animate-fadeIn opacity-0 animation-delay-${index * 2}00` : 'opacity-100'}`}>
                                    {getEventIcon(event.type)}
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`ml-10 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-10' : 'md:pl-10'}
                                ${isAnimating ? `animate-slideIn ${index % 2 === 0 ? 'animate-slideInRight' : 'animate-slideInLeft'} opacity-0 animation-delay-${index * 2}00` : 'opacity-100'}`}>
                                <div className={`bg-white p-5 rounded-lg shadow-md border-l-4 
                                    ${event.isApology ? 'border-amber-400' : 'border-rose-400'}
                                    transition-all duration-300 transform 
                                    ${activeIndex === index ? 'scale-105 shadow-lg' : 'hover:shadow-lg hover:scale-102'}`}>
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="font-bold text-rose-600">{formatDate(event.date)}</h3>
                                        {event.location && (
                                            <span className="text-xs text-gray-500 italic">{event.location}</span>
                                        )}
                                    </div>

                                    <p className="text-gray-700 mb-3">{event.description}</p>

                                    {event.isApology && (
                                        <div className="mt-2 p-3 bg-amber-50 rounded-md italic text-amber-700 text-sm">
                                            "{event.apologyNote}"
                                        </div>
                                    )}

                                    {event.memory && (
                                        <div className="mt-3 flex items-center">
                                            <div className="text-rose-400 mr-2">♥</div>
                                            <p className="text-sm text-rose-500 italic">{event.memory}</p>
                                        </div>
                                    )}

                                    {event.photoUrl && (
                                        <div className="mt-3 overflow-hidden rounded-md">
                                            <img
                                                src={event.photoUrl}
                                                alt={`Memory from ${event.date}`}
                                                className="w-full h-32 object-cover transition-transform duration-700 hover:scale-110"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <p className="text-gray-600 mb-4">This journey continues with each day I get to spend with you</p>
                    <div className="inline-block bg-rose-100 px-6 py-3 rounded-full text-rose-600 font-medium shadow-md hover:shadow-lg transition-shadow duration-300">
                        <Heart className="inline-block mr-2 animate-pulse" size={18} fill="currentColor" />
                        I promise to cherish every moment of our future together
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideInRight {
                    from { transform: translateX(-50px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slideInLeft {
                    from { transform: translateX(50px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 1s forwards;
                }
                
                .animate-slideInRight {
                    animation: slideInRight 1s forwards;
                }
                
                .animate-slideInLeft {
                    animation: slideInLeft 1s forwards;
                }
                
                .animation-delay-100 { animation-delay: 0.1s; }
                .animation-delay-200 { animation-delay: 0.2s; }
                .animation-delay-300 { animation-delay: 0.3s; }
                .animation-delay-400 { animation-delay: 0.4s; }
                .animation-delay-500 { animation-delay: 0.5s; }
                .animation-delay-600 { animation-delay: 0.6s; }
                .animation-delay-700 { animation-delay: 0.7s; }
                .animation-delay-800 { animation-delay: 0.8s; }
                .animation-delay-900 { animation-delay: 0.9s; }
                .animation-delay-1000 { animation-delay: 1s; }
                
                .hover\:scale-102:hover {
                    transform: scale(1.02);
                }
            `}</style>
        </section>
    );
}