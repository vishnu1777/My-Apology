import { useRef, useEffect, useState } from 'react';
import { Play, Pause } from 'lucide-react';

export default function DraggableMediaCards({
    mediaCards,
    activeCard,
    isDragging,
    currentPos,
    isVideoPlaying,
    handleMouseDown,
    handleTouchStart,
    handleMouseMove,
    handleTouchMove,
    toggleVideoPlay,
    videoRefs
}) {
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1200
    );

    // Update window width on resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculate max scroll distance based on screen size
    const maxScrollDistance = Math.min(windowWidth / 4, 100); // More restricted on smaller screens

    // Constrain horizontal position within bounds
    const getConstrainedPosition = (pos) => {
        return {
            x: Math.max(-maxScrollDistance, Math.min(maxScrollDistance, pos.x)),
            y: Math.max(-30, Math.min(30, pos.y)) // More restricted vertical movement
        };
    };

    // Get constrained position for cards
    const constrainedPos = getConstrainedPosition(currentPos);

    // Calculate card width based on screen size
    const cardWidth = windowWidth < 640 ? "w-[85%]" : "w-64 md:w-80";

    return (
        <section className="py-16 px-4 bg-indigo-50 overflow-hidden">
            <div className="max-w-5xl mx-auto overflow-hidden">
                <h2 className="text-3xl font-bold text-center mb-2">Our  Memories</h2>
                <p className="text-gray-600 text-center mb-12">Swipe through our favorite moments together</p>

                <div
                    className="relative h-[32rem] sm:h-[28rem] w-full flex items-center justify-center mb-12 overflow-hidden"
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                >
                    {mediaCards.map((card, index) => {
                        // Calculate card positions for shuffle effect
                        const baseZIndex = 10 + mediaCards.length - index;
                        const baseTranslateY = index * -8;
                        // Reduce rotation angle on mobile
                        const baseRotate = (index % 2 === 0 ? 1 : -1) * (windowWidth < 640 ? index * 0.8 : index * 1.5);

                        // Adjust rotation sensitivity based on screen size
                        const rotationSensitivity = windowWidth < 640 ? 0.03 : 0.05;

                        // Active card adjustments with constrained position
                        const isActive = activeCard === card.id;
                        const activeStyles = isActive ? {
                            transform: `translateX(${constrainedPos.x}px) translateY(${constrainedPos.y + baseTranslateY}px) rotate(${baseRotate + (constrainedPos.x * rotationSensitivity)}deg)`,
                            zIndex: 50,
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
                        } : {
                            transform: `translateY(${baseTranslateY}px) rotate(${baseRotate}deg)`,
                            zIndex: baseZIndex
                        };

                        return (
                            <div
                                key={card.id}
                                className={`absolute top-1/2 left-1/2 ${cardWidth} bg-white rounded-xl overflow-hidden shadow-lg cursor-grab active:cursor-grabbing transition-all duration-300 max-w-xs sm:max-w-sm`}
                                style={{
                                    transform: `translateX(-50%) translateY(-50%) translateY(${baseTranslateY}px) rotate(${baseRotate}deg)`,
                                    zIndex: baseZIndex,
                                    ...isActive && activeStyles
                                }}
                                onMouseDown={(e) => handleMouseDown(e, card.id)}
                                onTouchStart={(e) => handleTouchStart(e, card.id)}
                            >
                                <div className="relative h-40 sm:h-48 md:h-56 bg-gray-200">
                                    {card.type === 'image' ? (
                                        <img
                                            src={card.src}
                                            alt={card.caption}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="relative w-full h-full">
                                            <video
                                                ref={el => videoRefs.current[card.id] = el}
                                                poster={card.posterSrc}
                                                className="w-full h-full object-cover"
                                                playsInline
                                                autoPlay
                                                preload="metadata"
                                                muted={card.muted}
                                                loop
                                            >
                                                <source src={card.src} type="video/mp4" />
                                                {card.webmSrc && <source src={card.webmSrc} type="video/webm" />}
                                                Your browser does not support the video tag.
                                            </video>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleVideoPlay(card.id);
                                                }}
                                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-opacity"
                                            >
                                                {isVideoPlaying[card.id] ? (
                                                    <Pause className="text-white w-8 h-8 sm:w-12 sm:h-12" />
                                                ) : (
                                                    <Play className="text-white w-8 h-8 sm:w-12 sm:h-12" />
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="p-3 sm:p-4">
                                    <p className="text-gray-700 text-center text-sm sm:text-base">{card.caption}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <p className="text-center text-gray-500 italic">Drag the cards to shuffle through memories</p>
            </div>
        </section>
    );
}