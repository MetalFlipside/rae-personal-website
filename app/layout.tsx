import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Rae - AI & Growth Operations Specialist",
  description: "Personal website showcasing my journey in AI and growth operations",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="font-sans">{children}</body>
    </html>
  )
}
