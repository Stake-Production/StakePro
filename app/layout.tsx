import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stake | Claim Your Bonus',
  description: 'Claim your bonus from Stake.com',
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

