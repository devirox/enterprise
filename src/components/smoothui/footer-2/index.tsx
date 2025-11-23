"use client";

import { motion } from "motion/react";

const ANIMATION_DURATION = 0.6;
const DELAY_INCREMENT = 0.1;
const HOVER_SCALE = 1.1;
const TAP_SCALE = 0.9;
const BUTTON_HOVER_SCALE = 1.02;
const BUTTON_TAP_SCALE = 0.98;
const DELAY_PRODUCT = DELAY_INCREMENT * 2;
const DELAY_COMPANY = DELAY_INCREMENT * 3;
const DELAY_SUPPORT = DELAY_INCREMENT * 4;
const DELAY_LEGAL = DELAY_INCREMENT * 5;
const DELAY_COPYRIGHT = DELAY_INCREMENT * 6;

type FooterComplexProps = {
  companyName?: string;
  description?: string;
  newsletter?: {
    title: string;
    description: string;
    placeholder: string;
    buttonText: string;
  };
  links?: {
    product?: Array<{ name: string; url: string }>;
    company?: Array<{ name: string; url: string }>;
    support?: Array<{ name: string; url: string }>;
    legal?: Array<{ name: string; url: string }>;
  };
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    discord?: string;
    youtube?: string;
  };
  copyright?: string;
};

export function FooterComplex({
  companyName = "DeviroxN Enterprise",
  description = "Full-stack finance, marketplace, and real-estate platforms built with Next.js, Prisma, and modern cloud infrastructure. I design, build, and deploy production-ready web apps for real businesses.",
  newsletter = {
    title: "Stay in the loop",
    description:
      "Get updates on new case studies, features, and product launches from DeviroxN.",
    placeholder: "Enter your email",
    buttonText: "Notify me",
  },
  links = {
    product: [
      { name: "Finance Suite", url: "/finance" },
      { name: "Marketplace Hub", url: "/marketplace" },
      { name: "Real Estate Cloud", url: "/real-estate" },
      { name: "Design System & UI Kit", url: "/design-system" },
      { name: "Admin Console", url: "/dashboard/admin" },
    ],
    company: [
      { name: "About DeviroxN", url: "/" },
      { name: "Portfolio Overview", url: "/design-system" },
      { name: "Case Studies", url: "#portfolio" },
      { name: "Blog (coming soon)", url: "#" },
      { name: "Contact", url: "#contact" },
    ],
    support: [
      { name: "Help & Docs", url: "/design-system" },
      { name: "Customer Dashboard", url: "/dashboard/customer" },
      { name: "Staff – Finance", url: "/dashboard/staff/finance" },
      { name: "System Status", url: "#status" },
      { name: "Report an Issue", url: "mailto:idowumakinde15@gmail.com" },
    ],
    legal: [
      { name: "Privacy Policy", url: "#privacy" },
      { name: "Terms of Service", url: "#terms" },
      { name: "Cookie Policy", url: "#cookies" },
      { name: "Data & Security", url: "#security" },
    ],
  },
  social = {
    twitter: "https://x.com", // update to your handle when ready
    linkedin: "https://linkedin.com",
    github: "https://github.com/devirox", // adjust to your actual profile
    discord: "",
    youtube: "",
  },
  copyright = "© 2025 DeviroxN Enterprise. All rights reserved.",
}: FooterComplexProps) {
  return (
    <footer className="border-border border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: ANIMATION_DURATION }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {/* Company Info & Newsletter */}
          <div className="lg:col-span-5">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{
                duration: ANIMATION_DURATION,
                delay: DELAY_INCREMENT,
              }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h3 className="mb-4 font-bold text-2xl text-foreground">
                {companyName}
              </h3>
              <p className="mb-8 max-w-md text-foreground/70 text-sm leading-relaxed">
                {description}
              </p>

              {/* Newsletter */}
              <div className="mb-8">
                <h4 className="mb-2 font-semibold text-foreground text-lg">
                  {newsletter.title}
                </h4>
                <p className="mb-4 text-foreground/70 text-sm">
                  {newsletter.description}
                </p>
                <div className="flex gap-2">
                  <input
                    className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm placeholder:text-foreground/50 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                    placeholder={newsletter.placeholder}
                    type="email"
                  />
                  <motion.button
                    className="rounded-lg bg-brand px-6 py-2 font-medium text-background text-sm transition-colors hover:bg-brand/90"
                    whileHover={{ scale: BUTTON_HOVER_SCALE }}
                    whileTap={{ scale: BUTTON_TAP_SCALE }}
                  >
                    {newsletter.buttonText}
                  </motion.button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {social.twitter && (
                  <motion.a
                    aria-label="Twitter"
                    className="text-foreground/60 transition-colors hover:text-brand"
                    href={social.twitter}
                    rel="noopener noreferrer"
                    target="_blank"
                    whileHover={{ scale: HOVER_SCALE }}
                    whileTap={{ scale: TAP_SCALE }}
                  >
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    <span className="sr-only">Twitter</span>
                  </motion.a>
                )}
                {social.linkedin && (
                  <motion.a
                    className="text-foreground/60 transition-colors hover:text-brand"
                    href={social.linkedin}
                    rel="noopener noreferrer"
                    target="_blank"
                    whileHover={{ scale: HOVER_SCALE }}
                    whileTap={{ scale: TAP_SCALE }}
                  >
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="sr-only">LinkedIn</span>
                  </motion.a>
                )}
                {social.github && (
                  <motion.a
                    className="text-foreground/60 transition-colors hover:text-brand"
                    href={social.github}
                    rel="noopener noreferrer"
                    target="_blank"
                    whileHover={{ scale: HOVER_SCALE }}
                    whileTap={{ scale: TAP_SCALE }}
                  >
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="sr-only">GitHub</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:grid-cols-4">
            {links.product && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{
                  duration: ANIMATION_DURATION,
                  delay: DELAY_PRODUCT,
                }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h4 className="mb-4 font-semibold text-foreground text-sm uppercase tracking-wide">
                  Product
                </h4>
                <ul className="space-y-3">
                  {links.product.map((link) => (
                    <li key={link.name}>
                      <a
                        className="text-foreground/70 text-sm transition-colors hover:text-brand"
                        href={link.url}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {links.company && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{
                  duration: ANIMATION_DURATION,
                  delay: DELAY_COMPANY,
                }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h4 className="mb-4 font-semibold text-foreground text-sm uppercase tracking-wide">
                  Company
                </h4>
                <ul className="space-y-3">
                  {links.company.map((link) => (
                    <li key={link.name}>
                      <a
                        className="text-foreground/70 text-sm transition-colors hover:text-brand"
                        href={link.url}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {links.support && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{
                  duration: ANIMATION_DURATION,
                  delay: DELAY_SUPPORT,
                }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h4 className="mb-4 font-semibold text-foreground text-sm uppercase tracking-wide">
                  Support
                </h4>
                <ul className="space-y-3">
                  {links.support.map((link) => (
                    <li key={link.name}>
                      <a
                        className="text-foreground/70 text-sm transition-colors hover:text-brand"
                        href={link.url}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {links.legal && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{
                  duration: ANIMATION_DURATION,
                  delay: DELAY_LEGAL,
                }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h4 className="mb-4 font-semibold text-foreground text-sm uppercase tracking-wide">
                  Legal
                </h4>
                <ul className="space-y-3">
                  {links.legal.map((link) => (
                    <li key={link.name}>
                      <a
                        className="text-foreground/70 text-sm transition-colors hover:text-brand"
                        href={link.url}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 border-border border-t pt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{
            duration: ANIMATION_DURATION,
            delay: DELAY_COPYRIGHT,
          }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="text-foreground/60 text-sm">{copyright}</p>
        </motion.div>
      </div>
    </footer>
  );
}

export default FooterComplex;
