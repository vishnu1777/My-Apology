import { useState, useEffect } from 'react';
import { Star, Gift, Heart, Coffee, Utensils, ShoppingBag, Smile, Frown } from 'lucide-react';
import useReconciliationStore from '../../store/apologyStore';
import { sendReconciliationEmail } from './emailService'; // We'll create this file

export const SiteRatingComponent = () => {
    const {
        rating,
        setRating,
        showFeedback,
    } = useReconciliationStore();
    const [hoverRating, setHoverRating] = useState(0);

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    return (
        <section className="py-12 px-4 bg-white rounded-xl shadow-lg max-w-xl mx-auto my-8">
            <h2 className="text-2xl font-bold text-center mb-4">How Angry Are You With Me?</h2>
            <p className="text-gray-600 text-center mb-6">Please rate from 1-10 how upset you are</p>

            <div className="flex justify-center mb-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                    <button
                        key={star}
                        className="mx-1 transition-transform hover:scale-110"
                        onMouseEnter={() => setHoverRating(star)}
                        onClick={() => handleStarClick(star)}
                    >
                        <Star
                            size={28}
                            className={`${(hoverRating || rating) >= star
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                                } transition-colors`}
                        />
                    </button>
                ))}
            </div>

            <div className="flex justify-center" onMouseLeave={handleMouseLeave}>
                <p className="text-gray-700 font-medium">
                    {rating === 0 ? 'Select a rating' : `You selected: ${rating}/10`}
                </p>
            </div>

            {showFeedback && (
                <div className="mt-6 text-center animate-fade-in">
                    {rating > 5 ? (
                        <div className="flex flex-col items-center">
                            <div className="text-5xl mb-4 animate-bounce">😢</div>
                            <p className="text-gray-700">I'm so sorry you're feeling this upset.
                                I promise to make it up to you!</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="text-5xl mb-4 animate-pulse">❤️</div>
                            <p className="text-gray-700">Thank you for not being too upset.
                                I'll still work hard to earn back your trust.</p>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};



export const ReconciliationOptionsComponent = () => {
    const {
        selectedOptions,
        toggleOption,
        otherOption,
        setOtherOption,
        submitted,
        submitReconciliation,
    } = useReconciliationStore();
    const [isEmailSending, setIsEmailSending] = useState(false);
    const [emailStatus, setEmailStatus] = useState('');

    const reconciliationOptions = [
        { id: 'chocolates', label: 'Chocolates', icon: <Gift size={20} /> },
        { id: 'dress', label: 'New Dress', icon: <ShoppingBag size={20} /> },
        { id: 'food', label: 'Favorite Food', icon: <Utensils size={20} /> },
        { id: 'date', label: 'Special Date', icon: <Heart size={20} /> },
        { id: 'coffee', label: 'Coffee Date', icon: <Coffee size={20} /> },
        { id: 'hugs', label: 'Warm Hugs', icon: <Smile size={20} /> },
    ];

    const handleSubmit = async () => {
        submitReconciliation();

        setIsEmailSending(true);
        try {
            await sendReconciliationEmail(
                reconciliationOptions
                    .filter(option => selectedOptions.includes(option.id))
                    .map(option => option.label),
                otherOption
            );
            setEmailStatus('Email sent successfully!');
        } catch (error) {
            console.error('Failed to send email:', error);
            setEmailStatus('Failed to send email. Please try again.');
        } finally {
            setIsEmailSending(false);
        }
    };

    return (
        <section className="py-12 px-4 bg-rose-50 rounded-xl shadow-lg max-w-xl mx-auto my-8">
            <h2 className="text-2xl font-bold text-center mb-4">What Would Help Us Reconcile?</h2>
            <p className="text-gray-600 text-center mb-8">Select what would make you feel better (choose all that apply)</p>

            {!submitted ? (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        {reconciliationOptions.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => toggleOption(option.id)}
                                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${selectedOptions.includes(option.id)
                                    ? 'border-rose-500 bg-rose-100'
                                    : 'border-gray-200 hover:border-rose-300'
                                    }`}
                            >
                                <div className={`p-2 rounded-full mb-2 ${selectedOptions.includes(option.id)
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-gray-100 text-gray-500'
                                    }`}>
                                    {option.icon}
                                </div>
                                <span className="text-gray-700 font-medium">{option.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="otherOption" className="block text-gray-700 mb-2 font-medium">
                            Other (please specify) You can add any links too:
                        </label>
                        <input
                            type="text"
                            id="otherOption"
                            value={otherOption}
                            onChange={(e) => setOtherOption(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                            placeholder="Tell me what you want..."
                        />
                    </div>

                    <div className="text-center">
                        <button
                            onClick={handleSubmit}
                            disabled={isEmailSending || (selectedOptions.length === 0 && !otherOption)}
                            className={`px-8 py-3 rounded-full font-bold shadow-md transition-all ${isEmailSending || (selectedOptions.length === 0 && !otherOption)
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-rose-500 text-white hover:bg-rose-600'
                                }`}
                        >
                            {isEmailSending ? "Sending..." : "Submit My Wishes"}
                        </button>

                        {emailStatus && (
                            <p className={`mt-4 py-2 px-4 rounded-lg inline-block ${emailStatus.includes('Failed')
                                ? 'bg-red-100 text-red-700'
                                : 'bg-green-100 text-green-700'
                                }`}>
                                {emailStatus}
                            </p>
                        )}
                    </div>
                </>
            ) : (
                <div className="text-center py-6 animate-fade-in">
                    <div className="text-5xl mb-6">❤️</div>
                    <h3 className="text-xl font-bold text-rose-600 mb-3">Your Wish Is My Command</h3>
                    <p className="text-gray-700 mb-4">
                        I've received your wishes and promise to fulfill them. From the bottom of my heart, I apologize for hurting you.
                        You deserve better, and I'll do everything to make things right again.
                    </p>

                    <div className="my-6 p-4 bg-purple-100 rounded-lg border border-purple-300 text-purple-800">
                        <span className="block text-2xl mb-2">✨ The apology genie has heard your wish! ✨</span>
                        <p>Your message has been sent to your lover's heart. Consider it done.</p>
                    </div>

                    <p className="italic text-rose-700 mt-4">
                        "Every beat of my heart calls your name. Every thought in my mind seeks your forgiveness.
                        My arms feel empty without you, and I promise to cherish and respect you every single day forward.
                        Your love is the greatest gift, and I won't take it for granted again."
                    </p>

                    {(selectedOptions.length > 0 || otherOption) && (
                        <div className="mt-6">
                            <p className="font-medium text-gray-700">You selected:</p>
                            <ul className="mt-2 flex flex-wrap justify-center gap-2">
                                {selectedOptions.map(id => (
                                    <li key={id} className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full">
                                        {reconciliationOptions.find(option => option.id === id)?.label}
                                    </li>
                                ))}
                                {otherOption && (
                                    <li className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full">
                                        {otherOption}
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}

                    <p className="mt-6 text-sm text-gray-500">
                        Because true love means saying "I'm sorry" and proving it with actions, not just words.
                    </p>
                </div>
            )}
        </section>
    );
};


const SummaryComponent = () => {
    const ratingsHistory = useReconciliationStore(state => state.getRatingsHistory());
    const reconciliationHistory = useReconciliationStore(state => state.getReconciliationHistory());

    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
            <h3 className="text-xl font-bold mb-4 text-center">Reconciliation Summary</h3>

            <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">All Ratings:</h4>
                <ul className="flex flex-wrap gap-2">
                    {ratingsHistory.map((rating, index) => (
                        <li key={index} className="px-3 py-1 bg-yellow-100 rounded-full text-yellow-800">
                            {rating}/10
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Reconciliation Requests:</h4>
                {reconciliationHistory.length === 0 ? (
                    <p className="text-gray-500">No requests yet.</p>
                ) : (
                    reconciliationHistory.map((entry, index) => (
                        <ul key={index} className="mb-3 border rounded-lg p-3 bg-rose-50">
                            {entry.selectedOptions.map((option, i) => (
                                <li key={i} className="text-rose-700">• {option}</li>
                            ))}
                            {entry.otherOption && (
                                <li className="text-rose-500 italic">• {entry.otherOption}</li>
                            )}
                        </ul>
                    ))
                )}
            </div>
        </div>
    );
};

// Add some CSS animations
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
`;

// Export both components
export default function RatingAndReconciliationComponents() {
    return (
        <>
            <style>{styles}</style>
            <SiteRatingComponent />
            <ReconciliationOptionsComponent />
            {/* <SummaryComponent /> */}
        </>
    );
}