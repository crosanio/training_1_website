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
    const [deviceType, setDeviceType] = useState('mobile');

    // SUPPORT

    // Handle window resize and update device type
    const handleWindowResize = () => {
        const width = window.innerWidth;
        setDeviceType(width > 768 ? 'desktop' : width > 576 ? 'tablet' : 'mobile');
    };

    // Theme Color
    const themeColor = "dark";

    // INIT USE-EFFECT
    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    // SOCIAL MEDIA LINKS ARRAY
    const socialMediaLinks = [
        {
            icon: icon_whatsapp,
            alt: "WhatsApp icon",
            href: "#"

        },
        {
            icon: icon_telegram,
            alt: "Telegram icon",
            href: "#"

        },
        {
            icon: icon_facebook,
            alt: "Facebook icon",
            href: "#"

        },
        {
            icon: icon_instagram,
            alt: "Instagram icon",
            href: "#"

        },
        {
            icon: icon_x,
            alt: "X icon",
            href: "#"

        },
        {
            icon: icon_tiktok,
            alt: "TikTok icon",
            href: "#"

        },
        {
            icon: icon_linkedin,
            alt: "LinkedIn icon",
            href: "#"

        },
        {
            icon: icon_youtube,
            alt: "YouTube icon",
            href: "#"

        },
        {
            icon: icon_trustpilot,
            alt: "Trustpilot icon",
            href: "#"

        },
    ];

    return <>

        <div className={styles.socialMedia_container}>

            {socialMediaLinks.map((item, index) => (
                <a
                    key={index}
                    className={styles.socialMedia_iconContainer}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        className={styles.socialMedia_icon}
                        src={item.icon.src}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                    />
                </a>
            ))}

        </div>

    </>
}


// EXPORT MEMO()
export default memo(SocialMedia);
