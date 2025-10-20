/*******************************************************************
# SET DEBOUNCE
*******************************************************************/

/**
 * Creates a debounced function that delays invoking the provided callback
 * until after the specified delay has elapsed since the last time it was invoked.
 * 
 * @param {Function} callback - The function to debounce
 * @param {number} delay - The number of milliseconds to delay execution
 * @returns {Function} Returns the new debounced function
 */
const setDebounce = (callback, delay) => {
    let timer;
    return value => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(value), delay);
    };
};



/*******************************************************************
# EXPORT
*******************************************************************/

export { setDebounce };