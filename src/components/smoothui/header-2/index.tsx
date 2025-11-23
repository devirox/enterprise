"use client";

import { motion } from "motion/react";
import { AnimatedGroup } from "../shared/animated-group";
import { AnimatedText } from "../shared/animated-text";
import { Button } from "@/components/components/ui/button";
import CarouselPlugin from "../CarouselPlugin";
 

type HeroProductProps = {
  badgeText?: string;
  heading?: string;
  description?: string;
  primaryButton?: {
    text: string;
    url: string;
  };
  secondaryButton?: {
    text: string;
    url: string;
  };
  imageSrc?: string;
  imageAlt?: string;
};

export function HeroProduct({
  badgeText = "Enterprise App Scaffold",
  heading = "Welcome to DeviroxN Enterprise",
  description = "This is the enterprise app scaffold for Finance, Marketplace, and Real Estate applications.",
  primaryButton = {
    text: "Start Building",
    url: "/login",
  },
  secondaryButton = {
    text: "Watch Video",
    url: "#link",
  },
}: HeroProductProps) {
  return (
    <div className="relative">
      <main>
        <motion.section
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden"
          initial={{ opacity: 0, scale: 1.02 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94], // ease-out-quad
          }}
        >
          <div className="py-20 md:py-36">
            <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
              <AnimatedGroup className="space-y-8" preset="blur-slide">
                {/* Badge with animated sparkle */}
                <motion.div
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <a
                    className="mx-auto flex w-fit items-center justify-center gap-2 rounded-md py-0.5 pr-3 pl-1 transition-colors duration-200 ease-out hover:bg-foreground/5"
                    href="#"
                  >

                    <span className="font-medium">{badgeText}</span>
                  </a>
                </motion.div>

                {/* Main heading with staggered animation */}
                <AnimatedText
                  as="h1"
                  className="mx-auto mt-8 max-w-3xl text-balance font-bold text-4xl tracking-tight sm:text-5xl"
                  delay={0.2}
                >
                  {heading}
                </AnimatedText>

                {/* Description */}
                <AnimatedText
                  as="p"
                  className="mx-auto my-6 max-w-xl text-balance text-muted-foreground text-xl"
                  delay={0.3}
                >
                  {description}
                </AnimatedText>

                {/* CTA buttons with staggered animation */}
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <motion.div
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button asChild size="lg" variant="default">
                      <a href={primaryButton.url}>
                        <span className="text-nowrap">
                          {primaryButton.text}
                        </span>
                      </a>
                    </Button>
                  </motion.div>

                  <motion.div
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button asChild size="lg" variant="outline">
                      <a href={secondaryButton.url}>
                        <span className="text-nowrap">
                          {secondaryButton.text}
                        </span>
                      </a>
                    </Button>
                  </motion.div>
                </motion.div>
              </AnimatedGroup>
            </div>

            {/* Image section with parallax-like animation */}
            <motion.div
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="relative"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="relative z-10 mx-auto max-w-5xl px-6">
                <motion.div
                  className="mt-12 md:mt-16"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  whileHover={{
                    scale: 1.02,
                    rotateY: 2,
                  }}
                >
                  <motion.div
                    className="relative mx-auto overflow-hidden rounded-(--radius) border border-transparent bg-background shadow-black/10 shadow-lg ring-1 ring-black/10"
                    initial={{
                      boxShadow:
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1)",
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    whileHover={{
                      boxShadow:
                        "0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <motion.div
                      animate={{ scale: 1 }}
                      initial={{ scale: 1.05 }}
                      transition={{
                        duration: 1.2,
                        delay: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                        <div className="w-full h-full md:h-96">
                          <CarouselPlugin />
                        </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default HeroProduct;
