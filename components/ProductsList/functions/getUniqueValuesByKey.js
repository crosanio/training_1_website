/*******************************************************************
# GET UNIQUE VALUES BY KEY
*******************************************************************/

/**
 * Extracts all unique values for a given key from an array of objects.
 *
 * @param {Object[]} array - The array of objects to extract values from.
 * @param {string} key - The key whose values should be extracted.
 * @returns {string[]} An array of unique values (as strings) corresponding to the given key.
 */
function getUniqueValuesByKey(array, key) {
    const values = array
        .map(item => item[key])        // Extract the value for the given key
        .filter(value => value !== undefined && value !== null); // Remove undefined/null

    const uniqueValues = [...new Set(values.map(String))]; // Convert to string and get unique

    return uniqueValues;
}



/*******************************************************************
# EXPORT
*******************************************************************/

export { getUniqueValuesByKey };
