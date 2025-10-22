/* NOTES
# VISIBILITY: Social Media icons can be hidden by setting "visible: false" in the socialMedia array below.
# COLOR (dark/light): icons color can switch to light version by changing the "themeColor" variable to a value other than 'dark'.
# ADD SOCIAL: a new 48x48 pixels image is required and must be imported to add a new social media icon. The array must be expanded too, adding the new social's infos. */


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
    const socialMedia = [
        {
            icon: icon_whatsapp,
            alt: "WhatsApp icon",
            account: 391234567890,
            hrefMobile: 'whatsapp://send?phone=',
            hrefDesktop: 'https://wa.me/',
            visible: true,
        },
        {
            icon: icon_telegram,
            alt: "Telegram icon",
            account: "telegram-username",
            hrefMobile: 'tg://resolve?domain=',
            hrefDesktop: 'https://t.me/',
            visible: true,
        },
        {
            icon: icon_facebook,
            alt: "Facebook icon",
            account: "facebook-profile_or_id_(number)",
            hrefMobile: 'fb://profile/',
            hrefDesktop: 'https://www.facebook.com/',
            visible: true,
        },
        {
            icon: icon_instagram,
            alt: "Instagram icon",
            account: "instagram-username",
            hrefMobile: 'instagram://user?username=',
            hrefDesktop: 'https://www.instagram.com/',
            visible: true,
        },
        {
            icon: icon_x,
            alt: "X icon",
            account: "x-username",
            hrefMobile: 'twitter://user?screen_name=',
            hrefDesktop: 'https://x.com/',
            visible: true,
        },
        {
            icon: icon_tiktok,
            alt: "TikTok icon",
            account: "tiktok-username",
            hrefMobile: 'tiktok://@',
            hrefDesktop: 'https://www.tiktok.com/@',
            visible: true,
        },
        {
            icon: icon_linkedin,
            alt: "LinkedIn icon",
            account: "linkedin-profile-name",
            hrefMobile: 'linkedin://profile/',
            hrefDesktop: 'https://www.linkedin.com/in/',
            visible: true,
        },
        {
            icon: icon_youtube,
            alt: "YouTube icon",
            account: "youtube-channel-id",
            hrefMobile: 'vnd.youtube://channel/',
            hrefDesktop: 'https://www.youtube.com/channel/',
            visible: true,
        },
        {
            icon: icon_trustpilot,
            alt: "Trustpilot icon",
            account: "business.domain",
            hrefMobile: 'trustpilot://review/',
            hrefDesktop: 'https://www.trustpilot.com/review/',
            visible: true,
        },
    ];

    return <>

        <div className={styles.socialMedia_container}>

            {socialMedia.map((item, index) =>
                item.visible && (
                    <a
                        key={index}
                        className={styles.socialMedia_iconContainer}
                        href={deviceType === 'desktop' ? item.hrefDesktop + item.account : item.hrefMobile + item.account}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            className={`${styles.socialMedia_icon} ${themeColor !== 'dark' ? styles.light : ''}`}
                            src={item.icon.src}
                            alt={item.alt}
                            loading="lazy"
                            decoding="async"
                        />
                    </a>
                )
            )}

        </div>

    </>
}


// EXPORT MEMO()
export default memo(SocialMedia);
