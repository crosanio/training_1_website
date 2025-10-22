// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { useState, useEffect, memo } from "react";


// LOCAL_CSS
import styles from './SocialMedia.module.css';


// LOCAL_ASSETS
import { testFunction } from "./functions/testFunction";

import icon_whatsapp from "./utility/socialMediaIcons/icon-white-whatsapp.webp";
import icon_telegram from "./utility/socialMediaIcons/icon-white-telegram.webp";
import icon_facebook from "./utility/socialMediaIcons/icon-white-facebook.webp";
import icon_instagram from "./utility/socialMediaIcons/icon-white-instagram.webp";
import icon_x from "./utility/socialMediaIcons/icon-white-x.webp";
import icon_tiktok from "./utility/socialMediaIcons/icon-white-tiktok.webp";
import icon_linkedin from "./utility/socialMediaIcons/icon-white-linkedin.webp";
import icon_youtube from "./utility/socialMediaIcons/icon-white-youtube.webp";
import icon_trustpilot from "./utility/socialMediaIcons/icon-white-trustpilot.webp";


// EXPORT
function SocialMedia() {

    // USE-STATE
    const [windowWidth, setWindowWidth] = useState(570);
    const [deviceType, setDeviceType] = useState('');

    // SUPPORT

    // Update device type
    const updateDeviceType = w => setDeviceType(w > 768 ? 'desktop' : w > 576 ? 'tablet' : 'mobile');

    // Window size
    const handleWindowResize = () => {
        const width = window.innerWidth;
        setWindowWidth(width);
        updateDeviceType(width);
    };

    // Theme Color
    const themeColor = "dark";

    // INIT USE-EFFECT
    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return <>

        <div className={styles.socialMedia_container}>

            <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src={icon_whatsapp.src}
                    alt="whatsapp icon"
                    loading="lazy"
                    decoding="async"
                />
            </a>
        </div>

    </>
}


// EXPORT MEMO()
export default memo(SocialMedia);