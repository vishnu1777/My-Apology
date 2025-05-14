import { Star } from 'lucide-react';

export default function Promises({ promises }) {
    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-2">My Promises To You</h2>
                <p className="text-gray-600 text-center mb-10">Actions I commit to taking moving forward</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {promises.map((promise, index) => (
                        <div
                            key={index}
                            className="bg-rose-50 border-l-4 border-rose-500 p-6 rounded-r-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-start">
                                <div className="bg-rose-500 rounded-full p-1.5 mr-4">
                                    <Star size={18} className="text-white" />
                                </div>
                                <p className="text-gray-700">{promise}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}