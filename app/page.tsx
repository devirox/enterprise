import NavbarHero from '@/components/layout/Navbar'
import ContactUs1 from '@/components/mvpblocks/contact-us-1'
import FeatureSteps from '@/components/mvpblocks/feature-2'
import React from 'react'
import FooterComplex from 'src/components/smoothui/footer-2'
import HeroProduct from 'src/components/smoothui/header-2'
import LogoCloudAnimated from 'src/components/smoothui/logo-cloud-2'
import ScrollableCardStack from 'src/components/smoothui/scrollable-card-stack'
import { HeroHeader } from 'src/components/smoothui/shared/hero-header'



export default function HomePage() {

const cardData = [
  {
    id: "ai-dashboard",
    name: "AI Analytics Dashboard",
    handle: "@enterprise",
    avatar:
      "https://res.cloudinary.com/dmqlqwxze/image/upload/v1/portfolio/avatars/ai-dashboard.png",
    video:
      "https://res.cloudinary.com/dmqlqwxze/video/upload/v1/portfolio/previews/ai-dashboard.mp4",
    href: "https://devirox.vercel.app/projects/ai-dashboard",
  },
  {
    id: "fintech-platform",
    name: "FinTech Micro-Finance App",
    handle: "@fintech",
    avatar:
      "https://res.cloudinary.com/dmqlqwxze/image/upload/v1/portfolio/avatars/fintech.png",
    video:
      "https://res.cloudinary.com/dmqlqwxze/video/upload/v1/portfolio/previews/fintech.mp4",
    href: "https://devirox.vercel.app/projects/fintech-platform",
  },
  {
    id: "marketplace",
    name: "Multi-vendor Marketplace",
    handle: "@marketplace",
    avatar:
      "https://res.cloudinary.com/dmqlqwxze/image/upload/v1/portfolio/avatars/marketplace.png",
    video:
      "https://res.cloudinary.com/dmqlqwxze/video/upload/v1/portfolio/previews/marketplace.mp4",
    href: "https://devirox.vercel.app/projects/marketplace",
  },
  {
    id: "real-estate",
    name: "Real Estate Listing Platform",
    handle: "@realestate",
    avatar:
      "https://res.cloudinary.com/dmqlqwxze/image/upload/v1/portfolio/avatars/real-estate.png",
    video:
      "https://res.cloudinary.com/dmqlqwxze/video/upload/v1/portfolio/previews/real-estate.mp4",
    href: "https://devirox.vercel.app/projects/real-estate",
  },
];

return (
  <>
  <HeroHeader />
  <main className="p-8">
      <div className="h-full w-full">
        <HeroProduct />
      </div>
      <section>
        <FeatureSteps />
      </section>
       <div className="mx-auto w-full max-w-md">
      <ScrollableCardStack
        cardHeight={420}
        className="mx-auto"
        items={cardData}
        perspective={1200}
        transitionDuration={200}
      />
    </div>
    <section>
      <ContactUs1 />
    </section>
     <div className="h-full w-full">
    <LogoCloudAnimated />
  </div>
      <div className="max-w-3xl mt-12 text-center mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to DeviroxN Enterprise</h1>
        <p className="text-lg text-gray-700">
          This is the enterprise app scaffold for Finance, Marketplace, and Real Estate applications.
        </p>
      </div>
    </main>
    <FooterComplex/>
    </>
  );
}

