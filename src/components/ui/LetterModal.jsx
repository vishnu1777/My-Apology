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
                    <p>I've created this site because words alone didn't seem enough to express how deeply sorry I am for what happened between us.</p>
                    <p>This misunderstanding has caused you pain, and that's the last thing I ever wanted to do. I want you to know that I take full responsibility for my part in it. Your feelings are completely valid, and I understand why you're hurt.</p>
                    <p>I promise you this will be my last mistake. I've learned so much from this experience about what truly matters – you, and the beautiful relationship we've built together.</p>
                    <p>Please don't leave me. What we have is rare and precious. I've always been loyal to you and cared for you with all my heart. That has never changed, not for a single moment.</p>
                    <p>All I'm asking for is one more opportunity to show you how much you mean to me. I'll do whatever it takes to rebuild your trust and make things right again.</p>
                    <p>I'm begging you – please give us another chance. Our love is worth fighting for, and I'm ready to do anything to save what we have.</p>
                    <p className="mt-6">With all my love and deepest apologies,</p>
                    <p>Hubba</p>
                </div>
            </div>
        </div>
    );
}