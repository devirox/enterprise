'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Rocket, Code, Paintbrush } from 'lucide-react';

const features = [
  {
    step: 'Step 1',
    title: 'Plan & Architect Your App',
    content:
      'We define the system architecture, database schema, API routes, and cloud infrastructure required for a scalable, secure, and high-performance application.',
    icon: <Rocket className="text-primary h-6 w-6" />,
    image:
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2070&auto=format&fit=crop',
  },
  {
    step: 'Step 2',
    title: 'Develop & Integrate Features',
    content:
      'Using Next.js, React, Prisma, PostgreSQL, and modern cloud tools, we build your core features, dashboards, authentication, and API logic with production-level standards.',
    icon: <Paintbrush className="text-primary h-6 w-6" />,
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
  },
  {
    step: 'Step 3',
    title: 'Deploy & Optimize',
    content:
      'Your application is deployed to Vercel, Netlify, or AWS with CI/CD pipelines, monitoring, caching, security hardening, and full performance optimization.',
    icon: <Code className="text-primary h-6 w-6" />,
    image:
      'https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=2070&auto=format&fit=crop',
  },
  {
    step: 'Step 4',
    title: 'Scale & Maintain',
    content:
      'We continue to optimize, scale infrastructure, add new modules, and provide long-term support as your business grows and your product expands.',
    icon: <Code className="text-primary h-6 w-6" />,
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop',
  },
];


export default function FeatureSteps() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (4000 / 100));
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [progress]);

  return (
    <div className={'p-8 md:p-12'}>
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative mx-auto mb-12 max-w-2xl sm:text-center">
          <div className="relative z-10">
            <h2 className="font-geist text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
                Build Your Web Application in Four Clear Steps
              </h2>

              <p className="font-geist text-foreground/60 mt-3">
                From planning to deployment, I help you build fast, scalable, and high-quality full-stack applications for real businesses.
              </p>

          </div>
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                'linear-gradient(152.92deg, rgba(192, 15, 102, 0.2) 4.54%, rgba(192, 11, 109, 0.26) 34.2%, rgba(192, 15, 102, 0.1) 77.55%)',
            }}
          ></div>
        </div>
        <hr className="bg-foreground/30 mx-auto mb-10 h-px w-1/2" />

        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-10">
          <div className="order-2 space-y-8 md:order-1">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-6 md:gap-8"
                initial={{ opacity: 0.3, x: -20 }}
                animate={{
                  opacity: index === currentFeature ? 1 : 0.3,
                  x: 0,
                  scale: index === currentFeature ? 1.05 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full border-2 md:h-14 md:w-14',
                    index === currentFeature
                      ? 'border-primary bg-primary/10 text-primary scale-110 [box-shadow:0_0_15px_rgba(192,15,102,0.3)]'
                      : 'border-muted-foreground bg-muted',
                  )}
                >
                  {feature.icon}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold md:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              'border-primary/20 relative order-1 h-[200px] overflow-hidden rounded-xl border [box-shadow:0_5px_30px_-15px_rgba(192,15,102,0.3)] md:order-2 md:h-[300px] lg:h-[400px]',
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 overflow-hidden rounded-lg"
                      initial={{ y: 100, opacity: 0, rotateX: -20 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -100, opacity: 0, rotateX: 20 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="h-full w-full transform object-cover transition-transform hover:scale-105"
                        width={1000}
                        height={500}
                      />
                      <div className="from-background via-background/50 absolute right-0 bottom-0 left-0 h-2/3 bg-gradient-to-t to-transparent" />

                      <div className="bg-background/80 absolute bottom-4 left-4 rounded-lg p-2 backdrop-blur-sm">
                        <span className="text-primary text-xs font-medium">
                          {feature.step}
                        </span>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
