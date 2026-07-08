import type { Metadata } from 'next'
import "./globals.css"

export const metadata: Metadata = {
  title: 'PlayStake | Claim Your Bonus',
  description: 'Claim your bonus from Stake.com',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}

