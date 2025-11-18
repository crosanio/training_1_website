/*******************************************************************
# SORT BY
*******************************************************************/

/**
 * sortBy: ordina un array di stringhe o di oggetti per una chiave.
 *
 * @param {string|number} sortKey - current sort key
 * @param {string|number} newSortKey - new sort key requested (optional)
 * @param {Function} setSortKey - setter for sortKey (useState)
 * @param {number} sortDirection - 0 = ascending, 1 = descending
 * @param {Function} setSortDirection - setter for sortDirection (useState)
 * @param {Array} list - array to sort
 * @param {Function} setList - setter for list (useState)
 */
function sortBy({
    sortKey,
    newSortKey,
    setSortKey,
    sortDirection,
    setSortDirection,
    list,
    setList
}) {
    if (!Array.isArray(list) || typeof setList !== 'function') return;

    const isStringArray = list.every(item => typeof item === 'string');
    const isObjectArray = list.every(item => typeof item === 'object' && item !== null);

    if (!isStringArray && !isObjectArray) return;
    if (sortKey !== undefined && typeof sortKey !== 'string' && typeof sortKey !== 'number') return;
    if (newSortKey !== undefined && typeof newSortKey !== 'string' && typeof newSortKey !== 'number') return;

    // determine effective key: if newSortKey provided use it, otherwise use sortKey
    const effectiveKey = newSortKey !== undefined ? newSortKey : sortKey;

    // compute new direction and update state
    let newDirection = sortDirection;
    if (newSortKey !== undefined) {
        if (sortKey === undefined || sortKey !== newSortKey) {
            setSortKey?.(newSortKey);
            newDirection = 0; // default to ascending when switching key
            setSortDirection?.(0);
        } else {
            newDirection = sortDirection === 0 ? 1 : 0;
            setSortDirection?.(newDirection);
        }
    }

    const sortedList = [...list].sort((a, b) => {
        if (isStringArray) {
            // localeCompare for strings
            return newDirection === 0 ? String(a).localeCompare(String(b)) : String(b).localeCompare(String(a));
        }

        if (isObjectArray && typeof effectiveKey === 'string') {
            const aVal = a?.[effectiveKey];
            const bVal = b?.[effectiveKey];

            // both strings
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return newDirection === 0 ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
            }

            // both numbers
            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return newDirection === 0 ? aVal - bVal : bVal - aVal;
            }

            // fallback: convert to string and compare
            return newDirection === 0
                ? String(aVal ?? '').localeCompare(String(bVal ?? ''))
                : String(bVal ?? '').localeCompare(String(aVal ?? ''));
        }

        return 0;
    });

    setList(sortedList);
}



/*******************************************************************
# EXPORT
*******************************************************************/

export { sortBy };
