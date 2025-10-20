/*******************************************************************
# SET DEBOUNCE
*******************************************************************/

/**
 * Creates a debounced function that delays invoking the provided callback
 * until after the specified delay has elapsed since the last time it was invoked.
 * Supports multiple arguments and includes input validation for better reliability.
 * 
 * @param {Function} callback - The function to debounce
 * @param {number} [delay=500] - The number of milliseconds to delay execution (must be >= 0). Defaults to 500ms if not provided.
 * @returns {Function} Returns the new debounced function that accepts any number of arguments
 * @throws {Error} Throws error if callback is not a function or delay is not a valid number
 */
const setDebounce = (callback, delay = 500) => {
    if (typeof callback !== 'function') {
        throw new Error('Callback must be a function');
    }

    if (typeof delay !== 'number' || delay < 0 || !isFinite(delay)) {
        throw new Error('Delay must be a non-negative finite number');
    }

    let timer;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), delay);
    };
};



/*******************************************************************
# EXPORT
*******************************************************************/

export { setDebounce };