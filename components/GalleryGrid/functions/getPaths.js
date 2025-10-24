/*******************************************************************
# GET PATHS
*******************************************************************/

/**
 * Returns an array of public URLs for all image files located inside:
 * /public/GalleryGrid_img/
 *
 * Only files with supported image extensions are included.
 * If the folder does not exist OR is empty OR contains no valid images,
 * returns an empty array.
 */
export function getPaths() {
    try {
        const context = require.context(
            "/public/GalleryGrid_img",
            false,
            /\.(jpg|jpeg|png|gif|webp|svg)$/i
        );

        const images = context.keys().map((key) => `/GalleryGrid_img/${key.replace("./", "")}`);

        return Array.isArray(images) ? images : [];
    } catch (error) {
        console.warn("GalleryGrid: Folder missing or no valid images found.");
        return [];
    }
}

