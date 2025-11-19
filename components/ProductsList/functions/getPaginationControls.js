/*******************************************************************
# GET PAGINATION WINDOW
*******************************************************************/

/**
 * Returns a simple array containing:
 * - the current page
 * - up to X previous pages
 * - up to X next pages
 *
 * All values are extracted from the input array.
 * Handles all edge cases:
 * - empty array
 * - currentPage not found
 * - only one page
 * - X larger than array length
 * - pages at boundaries (beginning or end)
 *
 * @param {Array<number>} arr - Array of page numbers (sorted ascending)
 * @param {number} currentPage - The page currently active
 * @param {number} X - Number of pages to include before and after the current page
 * @returns {Array<number>} Simple pagination window
 */
function getPaginationControls(arr, currentPage, X) {
    if (!arr || arr.length === 0) return [];

    const currentIndex = arr.indexOf(currentPage);
    if (currentIndex === -1) {
        throw new Error("currentPage not found in the array");
    }

    // Compute start/end indices safely
    const startIndex = Math.max(currentIndex - X, 0);
    const endIndex = Math.min(currentIndex + X, arr.length - 1);

    // Slice the array to include all pages in the window
    const windowArray = arr.slice(startIndex, endIndex + 1);

    return windowArray;
}


/*******************************************************************
# EXPORT
*******************************************************************/
export { getPaginationControls };
