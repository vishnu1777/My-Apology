import { create } from 'zustand';

const useReconciliationStore = create((set, get) => ({
    // Current input state
    rating: 0,
    showFeedback: false,
    selectedOptions: [],
    otherOption: '',
    submitted: false,

    // History of submissions
    ratingsHistory: [],
    reconciliationHistory: [],

    // Set the rating and show feedback
    setRating: (rating) => set((state) => ({
        rating,
        showFeedback: true,
        ratingsHistory: [...state.ratingsHistory, rating],
    })),

    // Reset current rating and feedback display
    resetRating: () => set({ rating: 0, showFeedback: false }),

    // Toggle selected reconciliation options
    toggleOption: (optionId) =>
        set((state) => ({
            selectedOptions: state.selectedOptions.includes(optionId)
                ? state.selectedOptions.filter((id) => id !== optionId)
                : [...state.selectedOptions, optionId],
        })),

    // Set the "Other" option text
    setOtherOption: (value) => set({ otherOption: value }),

    // Submit reconciliation and store history
    submitReconciliation: () =>
        set((state) => ({
            submitted: true,
            reconciliationHistory: [
                ...state.reconciliationHistory,
                {
                    selectedOptions: [...state.selectedOptions],
                    otherOption: state.otherOption,
                },
            ],
        })),

    // Reset reconciliation UI state
    resetReconciliation: () =>
        set({
            rating: 0,
            showFeedback: false,
            selectedOptions: [],
            otherOption: '',
            submitted: false,
        }),

    // Getters for history
    getRatingsHistory: () => get().ratingsHistory,
    getReconciliationHistory: () => get().reconciliationHistory,
}));

export default useReconciliationStore;
