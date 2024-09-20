export const handleApiError = (err) => {
    if (err.response && err.response.status === 500) {
        return 'Server error. Please try again later.';
    } else if (err.response && err.response.status === 400) {
        return 'Bad request. Please check your input.';
    }
    return 'An unexpected error occurred.';
};