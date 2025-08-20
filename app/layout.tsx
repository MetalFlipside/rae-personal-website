import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const roboto = localFont({
  src: [
    { path: "../public/fonts/roboto/Roboto/Roboto-VariableFont_wdth,wght.ttf", weight: "100 900", style: "normal" },
    { path: "../public/fonts/roboto/Roboto/Roboto-Italic-VariableFont_wdth,wght.ttf", weight: "100 900", style: "italic" },
  ],
  variable: "--font-roboto",
  display: "swap",
})

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
    <html lang="en" className={`${roboto.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
