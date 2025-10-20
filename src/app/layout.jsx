// UTILITY
import "./globals.css";
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

                <header>Header</header>

                {children}

                <footer>Footer</footer>

            </body>

        </html>
    )
}
