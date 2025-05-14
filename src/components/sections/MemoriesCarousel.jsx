import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MemoriesCarousel({
    memories,
    currentSlide,
    setCurrentSlide,
    nextSlide,
    prevSlide
}) {
    return (
        <section className="py-16 px-4 bg-white overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-2">Our Beautiful Memories</h2>
                <p className="text-gray-600 text-center mb-8">The moments that remind me how lucky I am to have you</p>

                <div className="relative overflow-hidden rounded-xl shadow-xl">
                    {/* Carousel */}
                    <div className="relative h-64 md:h-96">
                        {memories.map((memory, index) => (
                            <div
                                key={memory.id}
                                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                    }`}
                            >
                                <img
                                    src={memory.src}
                                    alt={memory.alt}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-3 text-white">
                                    <p className="text-center">{memory.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Controls */}
                    <button
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow hover:bg-opacity-100 transition-all"
                        onClick={prevSlide}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow hover:bg-opacity-100 transition-all"
                        onClick={nextSlide}
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-14 left-0 right-0 flex justify-center space-x-2">
                        {memories.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}