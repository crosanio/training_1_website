import styles from './page.module.css';


import ComponentTemplate from "../../components/ComponentTemplate/ComponentTemplate"
import LazySection from '../../components/LazySection/LazySection';
import SocialMedia from '../../components/SocialMedia/SocialMedia';



export default function HomePage() {
    return <>

        <p className='debug'>Debug class element</p>

        <SocialMedia />

        <ComponentTemplate />

        <LazySection>
            <h2>Lazy Loaded Content 1</h2>
            <p>This content is only visible when it enters the viewport.</p>
        </LazySection>

        <LazySection>
            <h2>Lazy Loaded Content 2</h2>
            <p>This content is only visible when it enters the viewport.</p>
        </LazySection>

        <LazySection>
            <h2>Lazy Loaded Content 3</h2>
            <p>This content is only visible when it enters the viewport.</p>
        </LazySection>

        <LazySection>
            <h2>Lazy Loaded Content 4</h2>
            <p>This content is only visible when it enters the viewport.</p>
        </LazySection>

        <LazySection>
            <h2>Lazy Loaded Content 5</h2>
            <p>This content is only visible when it enters the viewport.</p>
        </LazySection>


    </>
}
