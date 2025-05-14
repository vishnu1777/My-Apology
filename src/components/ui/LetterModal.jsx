import { X } from 'lucide-react';

export default function LetterModal({ showLetter, setShowLetter }) {
    if (!showLetter) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 relative">
                <button
                    onClick={() => setShowLetter(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-rose-600 mb-4">My Heartfelt Apology</h2>
                <div className="prose text-gray-700">
                    <p>My dearest,</p>
                    <p>They say actions speak louder than words, which is why I've created this site for you. But I also know that sometimes, words are needed too.</p>
                    <p>I've been reflecting deeply on what happened, and I want you to know that I take full responsibility for my actions. I understand why you're hurt, and your feelings are completely valid.</p>
                    <p>What we have is special—rare even. I realize now how careless I was with something so precious. The thought of losing you has made me understand just how important you are in my life.</p>
                    <p>I promise to learn from this mistake. I'm committed to being a better person and a better partner because you deserve nothing less.</p>
                    <p>I hope you can find it in your heart to forgive me, but I also understand if you need time. Either way, I want you to know that you are loved, valued, and irreplaceable in my life.</p>
                    <p className="mt-6">With all my love and deepest apologies,</p>
                    <p>[Your Name]</p>
                </div>
            </div>
        </div>
    );
}