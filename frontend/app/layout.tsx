import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'AchaFrio — encontre técnicos e empresas de ar-condicionado',
    template: '%s | AchaFrio',
  },
  description: siteConfig.description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
