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

        <LazySection>
            <h2>Lazy Loaded Content 6</h2>
            <p>This content is only visible when it enters the viewport.</p>
        </LazySection>

        <LazySection>
            <h2>Lazy Loaded Content 7</h2>
            <p>This content is only visible when it enters the viewport.</p>
        </LazySection>

        <LazySection>
            <h2>Lazy Loaded Content 8</h2>
            <p>This content is only visible when it enters the viewport.</p>
        </LazySection>

        <LazySection>
            <h2>Lazy Loaded Content 9</h2>
            <p>This content is only visible when it enters the viewport.</p>
        </LazySection>

        <LazySection>
            <h2>Lazy Loaded Content 10</h2>
            <p>This content is only visible when it enters the viewport.</p>
        </LazySection>

        <LazySection>
            <h2>Lazy Loaded Content 11</h2>
            <p>This content is only visible when it enters the viewport.</p>
        </LazySection>

        <LazySection>
            <h2>Lazy Loaded Content 12</h2>
            <p>This content is only visible when it enters the viewport.</p>
        </LazySection>

        <LazySection>
            <h2>Lazy Loaded Content 13</h2>
            <p>This content is only visible when it enters the viewport.</p>
        </LazySection>

        <LazySection>
            <h2>Lazy Loaded Content 14</h2>
            <p>This content is only visible when it enters the viewport.</p>
        </LazySection>

        <LazySection>
            <h2>Lazy Loaded Content 15</h2>
            <p>This content is only visible when it enters the viewport.</p>
        </LazySection>

    </>
}
