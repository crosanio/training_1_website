/*******************************************************************
# SPLIT QUERY
*******************************************************************/

/**
 * Splits a string query into an array of words, trimming any leading or
 * trailing whitespace. If the query is empty or contains only whitespace,
 * it returns an array with a single empty string.
 *
 * @param {string} query - The input string to split.
 * @returns {string[]} An array of words extracted from the query.
 */
const splitQuery = query => query.trim() === '' ? [''] : query.trim().split(/\s+/);



/*******************************************************************
# EXPORT
*******************************************************************/

export { splitQuery };