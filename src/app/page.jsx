// READY FOR CLIENT SIDE
"use client";


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


// EXPORT
export default function HomePage() {

    // CONTEXTS
    const { contextMainValue } = useContextMain();

    return <>

        <Modal
            text="This is a modal dialog. Are you sure you want to proceed?"
            confirmAction={() => console.log("[ Modal.jsx ] Confirme Action executed.")}
        />

        <HeaderSection
            title="Page Title"
            caption="This is a caption for the header section."
        />

        <p className='debug'>Debug class element</p>

        <p className='debug'>{contextMainValue}</p>

        <ComponentTemplate />

        <Gallery />

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

    </>
}
