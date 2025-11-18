// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { useState } from 'react';


// CONTEXTS
import { useContextMain } from '../../contexts/ContextMain';


// GLOBAL_ASSETS
import styles from './page.module.css';


// LOCAL_CSS
import stylesLocal from './page.module.css';


// COMPONENTS
import ComponentTemplate from "../../components/ComponentTemplate/ComponentTemplate"
import LazySection from '../../components/LazySection/LazySection';
import Gallery from '../../components/Gallery/Gallery';
import Modal from '../../components/Modal/Modal';
import HeaderSection from '../../components/HeaderSection/HeaderSection';
import ProductsList from '../../components/ProductsList/ProductsList';


// SUPPORT
import galleriesPaths from '../../components/Gallery/utility/galleriesPaths';


// EXPORT
export default function HomePage() {

    // Test Modal visibility
    const [visibility, setVisibility] = useState(false);

    // CONTEXTS
    const { contextMainValue } = useContextMain();

    const confirmAction = () => {
        console.log("Modal confirmed action executed.");
    }

    // DEBUG
    const GalleryExample = galleriesPaths.groupA;

    return <>

        {/* <HeaderSection
            title="Header Section Title"
            caption="Header Section Caption"
        /> */}

        <ProductsList />

        {/* <p className='debug'>Debug class element</p> */}

        {/* <p className='debug'>{contextMainValue}</p> */}

        {/* <ComponentTemplate /> */}

        {/* <>
            <button className='button' onClick={() => setVisibility(true)}>Open Modal</button>
            <Modal
                visibility={visibility}
                setVisibility={setVisibility}
                title="Modal Title"
                text="This is the modal content. Lorem ipsum dolor si amet, consectetur adipiscing elit.  Lorem ipsum dolor si amet, consectetur adipiscing elit.  Lorem ipsum dolor si amet, consectetur adipiscing elit.  Lorem ipsum dolor si amet, consectetur adipiscing elit.  Lorem ipsum dolor si amet, consectetur adipiscing elit.  Lorem ipsum dolor si amet, consectetur adipiscing elit.  Lorem ipsum dolor si amet, consectetur adipiscing elit.  Lorem ipsum dolor si amet, consectetur adipiscing elit.  Lorem ipsum dolor si amet, consectetur adipiscing elit.  Lorem ipsum dolor si amet, consectetur adipiscing elit.  Lorem ipsum dolor si amet, consectetur adipiscing elit.  Lorem ipsum dolor si amet, consectetur adipiscing elit.  Lorem ipsum dolor si amet, consectetur adipiscing elit.  Lorem ipsum dolor si amet, consectetur adipiscing elit.  Lorem ipsum dolor si amet, consectetur adipiscing elit."
                confirmAction={confirmAction}
            />
        </> */}

        {/* <Gallery imgPaths={GalleryExample} /> */}

        {/* <>
            <LazySection>
                <h3>Lazy Loaded Content 1</h3>
                <p>This content is only visible when it enters the viewport.</p>
            </LazySection>

            <LazySection>
                <h3>Lazy Loaded Content 2</h3>
                <p>This content is only visible when it enters the viewport.</p>
            </LazySection>

            <LazySection>
                <h3>Lazy Loaded Content 3</h3>
                <p>This content is only visible when it enters the viewport.</p>
            </LazySection>

            <LazySection>
                <h3>Lazy Loaded Content 4</h3>
                <p>This content is only visible when it enters the viewport.</p>
            </LazySection>

            <LazySection>
                <h3>Lazy Loaded Content 5</h3>
                <p>This content is only visible when it enters the viewport.</p>
            </LazySection>
        </> */}

    </>
}
