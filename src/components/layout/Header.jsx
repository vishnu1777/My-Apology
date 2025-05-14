import { Heart } from 'lucide-react';

export default function Header({ setShowLetter }) {
    return (
        <header className="py-12 px-4 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-rose-600">I'm Sorry</h1>
            <div className="flex items-center mb-6">
                <div className="h-px bg-rose-300 w-16"></div>
                <Heart className="mx-2 text-rose-500 animate-pulse" />
                <div className="h-px bg-rose-300 w-16"></div>
            </div>
            <p className="text-lg md:text-xl max-w-2xl mb-8">I made a mistake and I'm asking for your forgiveness. This site is a small token of how much you mean to me.</p>
            <button
                onClick={() => setShowLetter(true)}
                className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center"
            >
                Read My Letter
            </button>
        </header>
    );
}