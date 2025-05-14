export default function CallToAction() {
    return (
        <section className="py-24 px-4 bg-rose-500 text-white text-center">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Can We Start Fresh?</h2>
                <p className="text-xl opacity-90 mb-8">I'm begging for one more chance to be the person you fell in love with.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-white text-rose-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transition-all">
                        I Forgive You ❤️
                    </button>
                    <button className="bg-transparent border-2 border-white hover:bg-white hover:text-rose-600 font-bold py-3 px-8 rounded-full shadow-lg transition-all">
                        Let's Talk More
                    </button>
                </div>
            </div>
        </section>
    );
}