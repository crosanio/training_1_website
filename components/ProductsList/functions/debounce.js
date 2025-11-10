/*******************************************************************
# DEBOUNCE
*******************************************************************/

/**
 * Creates a debounced version of a function, which delays invoking the action
 * until after a specified delay has passed since the last time the debounced
 * function was called. This is useful to limit the rate at which a function
 * is executed, for example a search input.
 *
 * @param {Function} action - The function to debounce.
 * @param {number} delay - The delay in milliseconds to wait before invoking the action.
 * @returns {Function} A debounced version of the action function.
 */
const debounce = (action, delay) => {
    let timer;
    return value => {
        clearTimeout(timer);
        timer = setTimeout(() => action(value), delay);
    };
};



/*******************************************************************
# EXPORT
*******************************************************************/

export { debounce };