// UTILITY
import "./globals.css";


// SUPPORT
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    style: ['normal', 'italic'],
    display: 'swap',
});

export const metadata = {
    metaTitle: 'My Application',
    metaDescription: 'A modern Next.js website',
}


// COMPONENTS
import LazySection from "../../components/LazySection/LazySection";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SocialMedia from "../../components/SocialMedia/SocialMedia";


// EXPORT
export default function RootLayout({ children }) {
    return (
        <html lang="en" className={poppins.className}>
            <head>
                <meta charSet="UTF-8" />
                <link rel="icon" type="image/svg+xml" href="/favicon.webp" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{metadata.metaTitle}</title>
                <meta name="description" content={metadata.metaDescription}></meta>
            </head>


            <body>
                <div className='wrapper'>

                    <Header>
                        <p>Header Logo</p>
                        <p>Header Content</p>
                    </Header>

                    <main>
                        <div className="container">

                            {children}

                        </div>
                    </main>

                    <LazySection>
                        <Footer>
                            <p>Footer Content 1</p>
                            <SocialMedia />
                        </Footer>
                    </LazySection>


                </div>
            </body>

        </html>
    )
}
