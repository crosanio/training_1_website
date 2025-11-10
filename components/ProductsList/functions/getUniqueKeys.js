/*******************************************************************
# GET UNIQUE KEYS
*******************************************************************/

/**
 * Extracts unique Keys names from an array of objects.
 * @param {Array} arr - The input array containing objects.
 * @returns {Array<string>} - An array containing all unique keys.
 */
function getUniqueKeys(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError("[ getUniqueKeys.js ]: The provided parameter must be an array.");
    }

    const keys = new Set();

    arr.forEach(item => {
        if (item && typeof item === "object" && !Array.isArray(item)) {
            Object.keys(item).forEach(key => keys.add(key));
        }
    });

    return [...keys];
}



/*******************************************************************
# EXPORT
*******************************************************************/

export { getUniqueKeys };
