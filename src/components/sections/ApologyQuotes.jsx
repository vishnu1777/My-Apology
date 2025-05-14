import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ApologyQuotes({
    quotes,
    currentQuote,
    setCurrentQuote,
    nextQuote,
    prevQuote
}) {
    return (
        <section className="py-16 px-4 bg-rose-50 overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-2">From My Heart To Yours</h2>
                <p className="text-gray-600 text-center mb-12">Swipe to read how I feel</p>

                <div className="relative h-64 md:h-72 flex items-center justify-center">
                    {quotes.map((quote, index) => (
                        <div
                            key={index}
                            className={`absolute w-full max-w-lg bg-white p-8 rounded-xl shadow-xl transform transition-all duration-500 ${index === currentQuote
                                ? 'scale-100 opacity-100 rotate-0 z-10'
                                : index < currentQuote
                                    ? 'scale-90 opacity-0 -rotate-6 -translate-x-full'
                                    : 'scale-90 opacity-0 rotate-6 translate-x-full'
                                }`}
                        >
                            <p className="text-gray-800 text-lg md:text-xl font-medium italic text-center">"{quote}"</p>
                        </div>
                    ))}

                    {/* Controls for quote cards */}
                    <button
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-rose-500 text-white p-2 rounded-full shadow hover:bg-rose-600 transition-all z-20"
                        onClick={prevQuote}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-rose-500 text-white p-2 rounded-full shadow hover:bg-rose-600 transition-all z-20"
                        onClick={nextQuote}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Indicators */}
                <div className="flex justify-center mt-6 space-x-2">
                    {quotes.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentQuote(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentQuote ? 'bg-rose-500 scale-125' : 'bg-rose-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}