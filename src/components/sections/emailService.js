import useReconciliationStore from '../../store/apologyStore';

// Load EmailJS script
const loadEmailJS = async () => {
    return new Promise((resolve, reject) => {
        // Check if EmailJS is already loaded
        if (window.emailjs) {
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            // Initialize with public key from .env file
            window.emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
            resolve();
        };

        script.onerror = () => {
            reject(new Error('Failed to load EmailJS'));
        };
    });
};

// Format store data for email
const formatStoreDataForEmail = () => {
    const store = useReconciliationStore.getState();
    const ratingsHistory = store.getRatingsHistory();
    const reconciliationHistory = store.getReconciliationHistory();

    // Format ratings history
    const ratingsSection = ratingsHistory.length > 0
        ? `Anger Ratings: ${ratingsHistory.join(', ')}/10`
        : 'No anger ratings provided';

    // Format reconciliation requests
    let reconciliationSection = 'No reconciliation requests provided';

    if (reconciliationHistory.length > 0) {
        reconciliationSection = 'Reconciliation Requests:\n';
        reconciliationHistory.forEach((entry, index) => {
            reconciliationSection += `\nRequest ${index + 1}:\n`;

            if (entry.selectedOptions && entry.selectedOptions.length > 0) {
                entry.selectedOptions.forEach(option => {
                    reconciliationSection += `- ${option}\n`;
                });
            }

            if (entry.otherOption) {
                reconciliationSection += `- Other: ${entry.otherOption}\n`;
            }
        });
    }

    return `${ratingsSection}\n\n${reconciliationSection}`;
};

// Send reconciliation email
export const sendReconciliationEmail = async (selectedLabels, otherOption) => {
    try {
        // Load EmailJS if not already loaded
        await loadEmailJS();

        // Get all the data from the store
        const storeData = formatStoreDataForEmail();

        // Format the latest selection for the email
        let selectionText = 'Latest Selection:\n';

        if (selectedLabels.length > 0) {
            selectedLabels.forEach(label => {
                selectionText += `- ${label}\n`;
            });
        }

        if (otherOption) {
            selectionText += `- Other: ${otherOption}\n`;
        }

        // Prepare email content
        const emailSubject = "New Reconciliation Request";
        const emailBody = `
            A new reconciliation request has been submitted.
            
            ${selectionText}
            
            Complete History:
            ${storeData}
        `;

        // Using EmailJS to send the email
        const templateParams = {
            to_email: "vappu5429@gmail.com", // Replace with your actual email address
            subject: emailSubject,
            message: emailBody,
            from_name: "Sahithya",
        };

        // Send the email using EmailJS with env variables
        return await window.emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            templateParams
        );
    } catch (error) {
        console.error("Email error:", error);
        throw error;
    }
};