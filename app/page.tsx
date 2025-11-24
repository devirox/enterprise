import AboutUs2 from '@/components/mvpblocks/about-us-2'
import ContactUs1 from '@/components/mvpblocks/contact-us-1'
import FeatureSteps from '@/components/mvpblocks/feature-2'
import React from 'react'
import FooterComplex from 'src/components/smoothui/footer-2'
import HeroProduct from 'src/components/smoothui/header-2'
import LogoCloudAnimated from 'src/components/smoothui/logo-cloud-2'
import ScrollableCardStack from 'src/components/smoothui/scrollable-card-stack'
import HeroHeader from 'src/components/smoothui/shared/hero-header'
import { cardData } from 'src/data/card-data'


export default function HomePage() {
return (
  <>
  <HeroHeader />
  <main className="p-8">
      <div className="h-full w-full">
        <HeroProduct />
      </div>
     <div className="h-full w-full">
    <LogoCloudAnimated />
  </div>
      <section>
        <FeatureSteps />
      </section>
       <div className="mx-auto w-full max-w-md">
      <ScrollableCardStack
        cardHeight={400}
        className="mx-auto"
        items={cardData}
        perspective={1200}
        transitionDuration={200}
      />
    </div>
    <section>
      <ContactUs1 />
      <AboutUs2 />
    </section>
    </main>
    <FooterComplex/>
    </>
  );
}

