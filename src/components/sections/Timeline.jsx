import { Calendar } from 'lucide-react';

export default function Timeline({ timeline }) {
    return (
        <section className="py-16 px-4 bg-rose-50 overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-2">Our Journey</h2>
                <p className="text-gray-600 text-center mb-12">The path we've walked together</p>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-3 md:left-1/2 h-full w-0.5 bg-rose-300 transform -translate-x-1/2"></div>

                    {/* Timeline events */}
                    {timeline.map((event, index) => (
                        <div
                            key={index}
                            className={`mb-12 flex flex-col relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}
                        >
                            {/* Date bubble */}
                            <div className="absolute left-0 md:left-1/2 flex items-center justify-center transform -translate-x-1/2 z-10">
                                <div className="bg-rose-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
                                    <Calendar size={14} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`ml-10 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-10' : 'md:pl-10'
                                }`}>
                                <div className="bg-white p-5 rounded-lg shadow-md">
                                    <h3 className="font-bold text-rose-600 mb-1">{event.date}</h3>
                                    <p className="text-gray-700">{event.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}