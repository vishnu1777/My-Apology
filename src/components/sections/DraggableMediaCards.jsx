import { useRef } from 'react';
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
    // Calculate max scroll distance to prevent scrolling beyond page width
    const maxScrollDistance = window.innerWidth / 3; // Limit to 1/3 of screen width

    // Constrain horizontal position within bounds
    const getConstrainedPosition = (pos) => {
        return {
            x: Math.max(-maxScrollDistance, Math.min(maxScrollDistance, pos.x)),
            y: pos.y
        };
    };

    // Get constrained position for cards
    const constrainedPos = getConstrainedPosition(currentPos);

    return (
        <section className="py-16 px-4 bg-indigo-50 overflow-hidden">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-2">Our Video Memories</h2>
                <p className="text-gray-600 text-center mb-12">Swipe through our favorite moments together</p>

                <div
                    className="relative h-96 w-full flex items-center justify-center mb-8"
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                >
                    {mediaCards.map((card, index) => {
                        // Calculate card positions for shuffle effect
                        const baseZIndex = 10 + mediaCards.length - index;
                        const baseTranslateY = index * -8;
                        const baseRotate = (index % 2 === 0 ? 1 : -1) * (index * 1.5);

                        // Active card adjustments with constrained position
                        const isActive = activeCard === card.id;
                        const activeStyles = isActive ? {
                            transform: `translateX(${constrainedPos.x}px) translateY(${constrainedPos.y + baseTranslateY}px) rotate(${baseRotate + (constrainedPos.x * 0.05)}deg)`,
                            zIndex: 50,
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
                        } : {
                            transform: `translateY(${baseTranslateY}px) rotate(${baseRotate}deg)`,
                            zIndex: baseZIndex
                        };

                        return (
                            <div
                                key={card.id}
                                className="absolute top-1/2 left-1/2 w-64 md:w-80 bg-white rounded-xl overflow-hidden shadow-lg cursor-grab active:cursor-grabbing transition-all duration-300"
                                style={{
                                    transform: `translateX(-50%) translateY(-50%) translateY(${baseTranslateY}px) rotate(${baseRotate}deg)`,
                                    zIndex: baseZIndex,
                                    ...isActive && activeStyles
                                }}
                                onMouseDown={(e) => handleMouseDown(e, card.id)}
                                onTouchStart={(e) => handleTouchStart(e, card.id)}
                            >
                                <div className="relative h-48 md:h-56 bg-gray-200">
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
                                            >
                                                <source src={card.src} type="video/mp4" />
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
                                                    <Pause className="text-white w-12 h-12" />
                                                ) : (
                                                    <Play className="text-white w-12 h-12" />
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-700 text-center">{card.caption}</p>
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