// NOTES
/*
This component is designed to render IF AND ONLY IF it enters the field of view.
For example, the content isn't rendered unless the user scrolls down the page to reach it.
Only when it enters the field of view does it render the passed { children }; otherwise, it only renders the <div> used as a PLACEHOLDER.
It can be used with STATIC content (pure HTML) or any React component.
*/


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { useEffect, useRef, useState, memo } from 'react';


// EXPORT
function LazySection({
    children = null,
    rootMargin = '0px 0px 100px 0px',
    extraClass,
}) {

    // USE-STATE
    const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [showMinHeight, setShowMinHeight] = useState(true);

    // USE-REF
    const ref = useRef(null);

    // USE-EFFECT

    // Section is in Viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    observer.disconnect();
                    setHasEnteredViewport(true);
                }
            },
            { rootMargin, threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    // Fade-in
    useEffect(() => {
        if (hasEnteredViewport) {
            const fadeTimer = setTimeout(() => setFadeIn(true), 10);
            const minHeightTimer = setTimeout(() => setShowMinHeight(false), 200);
            return () => {
                clearTimeout(fadeTimer);
                clearTimeout(minHeightTimer);
            };
        }
    }, [hasEnteredViewport]);

    // SUPPORT

    const inlineStyle = {
        opacity: fadeIn ? 1 : 0,
        transform: fadeIn ? 'none' : 'translateY(20px)',
        transition: 'opacity 1s ease, transform 1s ease',
        ...(showMinHeight && { minHeight: '50vh' })
    }

    return (
        <section ref={ref} style={inlineStyle} className={extraClass}>
            {/* PLACEHOLDER DIV */}
            {!hasEnteredViewport && (
                <div style={{ height: '20vh' }}>
                </div>
            )}

            {/* STATIC CONTENT */}
            {hasEnteredViewport && children}
        </section>
    );
}


// EXPORT MEMO()
export default memo(LazySection);