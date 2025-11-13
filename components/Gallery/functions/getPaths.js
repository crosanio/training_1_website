/*******************************************************************
# GET PATHS — versione aggiornata
*******************************************************************/

/**
 * Returns an array of public URLs for all image files located anywhere
 * inside /public/Gallery (including subfolders).
 */
export function getPaths() {
    try {
        const context = require.context(
            // Main folder
            "/public/Gallery",
            // Include subfolders
            true,
            /\.(jpg|jpeg|png|gif|webp|svg)$/i
        );

        const images = context.keys().map((key) => `/Gallery/${key.replace("./", "")}`);
        return Array.isArray(images) ? images : [];
    } catch (error) {
        console.warn("Gallery: Folder missing or no valid images found.");
        return [];
    }
}
