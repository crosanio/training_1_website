/*******************************************************************
# GET PAGINATION WINDOW
*******************************************************************/

/*******************************************************************
# GET PAGINATION CONTROLS
*******************************************************************/

/**
 * Generates a window of page numbers centered around currentPage.
 *
 * The function always returns:
 * - currentPage
 * - `range` pages before it
 * - `range` pages after it
 *
 * If the current page is near the edges (beginning or end), the window
 * automatically expands to the opposite direction so that the total amount
 * of returned pages stays constant whenever possible.
 *
 * Example for range = 1:
 * - If pages = [1,2,3,4,5] and currentPage = 1 → returns [1,2,3]
 * - If pages = [1,2,3,4,5] and currentPage = 3 → returns [2,3,4]
 * - If pages = [1,2,3,4,5] and currentPage = 5 → returns [3,4,5]
 *
 * @param {Array<number>} pages - Sorted array of available page numbers.
 * @param {number} currentPage - The page currently active.
 * @param {number} range - How many pages before/after the current page to include.
 *
 * @returns {Array<number>} Final ordered list of page numbers to display.
 */
function getPaginationControls(pages, currentPage, range) {
    if (!pages || pages.length === 0) return [];

    const maxPage = Math.max(...pages);
    const minPage = Math.min(...pages);

    // Initial window boundaries
    let start = currentPage - range;
    let end = currentPage + range;

    // Expand right if start is below the minimum page
    if (start < minPage) {
        const diff = minPage - start;
        start = minPage;
        end = Math.min(maxPage, end + diff);
    }

    // Expand left if end is above the maximum page
    if (end > maxPage) {
        const diff = end - maxPage;
        end = maxPage;
        start = Math.max(minPage, start - diff);
    }

    // Build final window
    const result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }

    return result;
}


/*******************************************************************
# EXPORT
*******************************************************************/
export { getPaginationControls };
