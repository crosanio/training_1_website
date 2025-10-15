import './globals.css'

export const metadata = {
    title: 'Training Website',
    description: 'A modern Next.js website',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
}
