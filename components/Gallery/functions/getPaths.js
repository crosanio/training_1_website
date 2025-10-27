/*******************************************************************
# GET PATHS
*******************************************************************/

/**
 * Returns an array of public URLs for all image files located inside:
 * /public/Gallery/
 *
 * Only files with supported image extensions are included.
 * If the folder does not exist OR is empty OR contains no valid images,
 * returns an empty array.
 */
export function getPaths() {
    try {
        const context = require.context(
            "/public/Gallery",
            false,
            /\.(jpg|jpeg|png|gif|webp|svg)$/i
        );

        const images = context.keys().map((key) => `/Gallery/${key.replace("./", "")}`);

        return Array.isArray(images) ? images : [];
    } catch (error) {
        console.warn("Gallery: Folder missing or no valid images found.");
        return [];
    }
}

