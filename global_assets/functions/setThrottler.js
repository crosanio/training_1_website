/*******************************************************************
# SET THROTTLER
*******************************************************************/

/**
 * Creates a throttled function that only invokes the provided action at most once 
 * per every specified delay period. Subsequent calls during the delay period are ignored.
 * Useful for limiting the rate of function execution, especially for performance-sensitive 
 * operations like API calls, scroll handlers, or resize events.
 * 
 * @param {Function} action - The function to throttle
 * @param {number} [delay=3000] - The number of milliseconds to throttle executions to (must be >= 0). Defaults to 3000ms if not provided.
 * @returns {Function} Returns the new throttled function that accepts any number of arguments and returns the action result or undefined
 * @throws {Error} Throws error if action is not a function or delay is not a valid number
 */
const setThrottler = (action, delay = 3000) => {
    if (typeof action !== 'function') {
        throw new Error('Action must be a function');
    }

    if (typeof delay !== 'number' || delay < 0 || !isFinite(delay)) {
        throw new Error('Delay must be a non-negative finite number');
    }

    let lastCall = 0;

    return (...args) => {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return action(...args);
        }
        return undefined;
    };
};



/*******************************************************************
# EXPORT
*******************************************************************/

export { setThrottler };