import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Coding Tools Landscape',
  description: 'Comprehensive overview of AI coding tools and platforms',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}