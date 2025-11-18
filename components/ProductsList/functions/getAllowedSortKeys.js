/*******************************************************************
# GET ALLOWED SORT KEYS
*******************************************************************/

/**
 * Calculates the set of allowed keys, which is the intersection of sortByKeys and uniqueKeys.
 * It implements a fallback: if sortByKeys is undefined, false, or an empty array, 
 * it returns all uniqueKeys.
 * @param {Array<string> | undefined | false} sortByKeys - The array of primary keys to check against.
 * @param {Array<string>} uniqueKeys - The array of all known unique keys.
 * @returns {Array<string>} The array of allowed keys (either the intersection or uniqueKeys).
 */
const getAllowedSortKeys = (sortByKeys, uniqueKeys) => {
    if (!sortByKeys || sortByKeys.length === 0) {
        return uniqueKeys;
    }

    const uniqueKeysSet = new Set(uniqueKeys);

    const allowedKeys = sortByKeys.filter(key => uniqueKeysSet.has(key));

    return allowedKeys;
}



/*******************************************************************
# EXPORT
*******************************************************************/

export { getAllowedSortKeys };