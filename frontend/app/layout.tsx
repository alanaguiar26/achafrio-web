import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { siteConfig } from '@/lib/site'

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-heading', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'AchaFrio — climatização e refrigeração com presença profissional',
    template: '%s | AchaFrio',
  },
  description: siteConfig.description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${manrope.variable}`}>
        <div className="page-shell min-h-screen">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
