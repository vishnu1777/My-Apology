import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MemoriesCarousel({
    memories,
    currentSlide,
    setCurrentSlide,
    nextSlide,
    prevSlide
}) {
    return (
        <section className="py-16 px-4 bg-pink-50">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-2">Our Beautiful Memories</h2>
                <p className="text-gray-600 text-center mb-8">Remember all the wonderful times we've shared</p>

                <div className="relative overflow-hidden rounded-xl shadow-xl">
                    {/* Carousel container with fixed aspect ratio */}
                    <div className="relative w-full h-0 pb-[66.67%]"> {/* 3:2 aspect ratio */}
                        {memories.map((memory, index) => (
                            <div
                                key={memory.id}
                                className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                    }`}
                            >
                                <img
                                    src={memory.src}
                                    alt={memory.alt}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        console.error(`Failed to load image: ${memory.src}`);
                                        e.target.src = "/images/placeholder.jpg"; // Fallback image
                                    }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
                                    <p className="text-lg font-medium">{memory.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md z-20 transition-all"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md z-20 transition-all"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center mt-4">
                    {memories.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 mx-1 rounded-full transition-all ${index === currentSlide ? 'bg-pink-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}