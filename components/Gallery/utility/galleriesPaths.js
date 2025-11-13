// LOCAL_ASSETS
import { getPaths } from '../functions/getPaths';


// SUPPORT
const allPaths = getPaths();

// Galleries Object builder
function buildGalleriesList(paths) {
    const galleriesList = {};

    paths.forEach((path) => {
        // Folder name extraction
        const parts = path.split('/').slice(2);
        const folderName = parts.length > 1 ? parts[0] : "Gallery";
        // Properties (folders) segmentation and creation
        if (!galleriesList[folderName]) {
            galleriesList[folderName] = [];
        }

        galleriesList[folderName].push(path);
    });

    return galleriesList;
}

// Result
const galleriesPaths = buildGalleriesList(allPaths);

// EXPORT
export default galleriesPaths;
