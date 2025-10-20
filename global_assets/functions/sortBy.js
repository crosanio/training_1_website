/*******************************************************************
# SORT BY
*******************************************************************/

/**
 * Function to handle the sorting of an array of strings or objects
 * 
 * @param {string|number} criteria - Current sort order (object property for array of objects)
 * @param {string|number} newCriteria - New sorting criteria requested
 * @param {Function} setSortCriteria - Function to update the sort criteria in state
 * @param {number} sortOrder - Current sort order (0 = ascending, 1 = descending)
 * @param {Function} setSortOrder - Function to update the sort order in state
 * @param {Array} list - Array to sort (can contain strings or objects)
 * @param {Function} setList - Function to update the sorted array in state
 */
function sortBy({
    criteria,
    newCriteria,
    setSortCriteria,
    sortOrder,
    setSortOrder,
    list,
    setList
}) {
    if (!Array.isArray(list) || !setList || !setSortOrder) return;

    const isStringArray = list.every(item => typeof item === 'string');
    const isObjectArray = list.every(item => typeof item === 'object' && item !== null);

    if (!isStringArray && !isObjectArray) return;
    if (criteria !== undefined && typeof criteria !== 'string' && typeof criteria !== 'number') return;
    if (newCriteria !== undefined && typeof newCriteria !== 'string' && typeof newCriteria !== 'number') return;

    const equalCriteria = (a, b) => a === b;

    let newSortOrder = sortOrder;
    if (criteria !== undefined && newCriteria !== undefined) {
        if (!equalCriteria(criteria, newCriteria)) {
            setSortCriteria?.(newCriteria);
            newSortOrder = 0;
            setSortOrder(0);
        } else {
            newSortOrder = sortOrder === 0 ? 1 : 0;
            setSortOrder(newSortOrder);
        }
    }

    const sortedList = [...list].sort((a, b) => {
        if (isStringArray) {
            return newSortOrder === 0 ? a.localeCompare(b) : b.localeCompare(a);
        }
        if (isObjectArray && typeof criteria === 'string') {
            const aVal = a[criteria];
            const bVal = b[criteria];
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return newSortOrder === 0
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }
            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return newSortOrder === 0 ? aVal - bVal : bVal - aVal;
            }
        }
        return 0;
    });

    setList(sortedList);
}



/*******************************************************************
# EXPORT
*******************************************************************/

export { sortBy };