import { useState, useEffect } from "react";

export default function CallToAction() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("");

    // Initialize EmailJS
    useEffect(() => {
        // Load EmailJS script
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            // Initialize with your public key
            window.emailjs.init("szSalG_viF7M7-ywd"); // Replace with your actual EmailJS public key
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleEmailNotification = async (action) => {
        setIsSubmitting(true);

        try {
            // Email content based on which button was clicked
            const emailSubject = action === "forgive" ? "You Have Been Forgiven" : "Let's Talk More";
            const emailBody = action === "forgive"
                ? "Good news! You've been forgiven."
                : "She wants to talk more about the situation.";

            // Using EmailJS to send the email
            const templateParams = {
                to_email: "vappu5429@gmail.com", // Replace with your actual email address
                subject: emailSubject,
                message: emailBody,
                from_name: "Sahithya",
            };

            // Send the email using EmailJS
            await window.emailjs.send(
                "service_mv0kt1m", // Replace with your EmailJS service ID
                "template_t21zg0m", // Replace with your EmailJS template ID
                templateParams
            );

            setIsSuccess(true);
            setMessage(action === "forgive"
                ? "Thank you for your forgiveness. Email notification sent."
                : "We'll be in touch soon. Email notification sent.");
        } catch (error) {
            setMessage("Failed to send notification. Please try again.");
            console.error("Email error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <section className="py-24 px-4 bg-rose-500 text-white text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Thank You</h2>
                    <p className="text-xl opacity-90 mb-4">{message}</p>
                    <button
                        onClick={() => setIsSuccess(false)}
                        className="bg-white text-rose-600 hover:bg-gray-100 font-bold py-2 px-6 rounded-full shadow-lg transition-all"
                    >
                        Back
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 px-4 bg-rose-500 text-white text-center">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Can We Start Fresh?</h2>
                <p className="text-xl opacity-90 mb-8">I'm begging for one more chance to be the person you fell in love with.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        className="bg-white text-rose-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transition-all"
                        onClick={() => handleEmailNotification("forgive")}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Sending..." : "I Forgive You ❤️"}
                    </button>
                    <button
                        className="bg-transparent border-2 border-white hover:bg-white hover:text-rose-600 font-bold py-3 px-8 rounded-full shadow-lg transition-all"
                        onClick={() => handleEmailNotification("talk")}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Sending..." : "Let's Talk More"}
                    </button>
                </div>
                {message && !isSuccess && (
                    <p className="mt-4 text-white bg-rose-600 py-2 px-4 rounded-lg inline-block">{message}</p>
                )}
            </div>
        </section>
    );
}