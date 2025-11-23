"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import logo from "../../../images/logo.png";



const menuItems = [
  { id: "finance", name: "Finance", href: "/finance" },
  { id: "marketplace", name: "Marketplace", href: "/marketplace" },
  { id: "real-estate", name: "Real Estate", href: "/real-estate" },
  { id: "design-system", name: "Design System", href: "/design-system" },
];

// Animation constants
const ANIMATION_DURATION = 0.2;
const STAGGER_DELAY = 0.05;
const EASE: any = [0.22, 1, 0.36, 1];
const ROTATION_ANGLE = 180;
const SCALE_MIN = 0;
const SCALE_MAX = 1;
const TRANSLATE_Y_OFFSET = -10;
const TRANSLATE_X_OFFSET = -10;

export const HeroHeader = () => {
  const [menuState, setMenuState] = useState(false);

  return (
    <div className="relative">
      <header>
        <nav className="absolute top-0 left-0 z-20 w-full transition-all duration-300">
          <div className="mx-auto max-w-6xl px-6">
            <div className="relative flex flex-wrap items-center justify-between gap-6 transition-all duration-200 lg:gap-0">
              
              {/* Left: Logo + Desktop Navigation */}
              <div className="flex w-full justify-between gap-6 lg:w-auto">
                {/* Logo */}
                <a
                  aria-label="DeviroxN Enterprise home"
                  className="flex items-center gap-2"
                  href="/"
                >
                  <span className="sr-only">DeviroxN</span>
                  <Image
                    alt="DeviroxN logo"
                    className={cn("h-24 w-auto", "dark:filter dark:invert")}
                    height={48}
                    src={logo}
                    width={160}
                  />
                </a>

                {/* Mobile Menu Toggle */}
                <button
                  aria-label={menuState ? "Close Menu" : "Open Menu"}
                  className="-m-2.5 -mr-4 block p-2.5 lg:hidden relative z-20"
                  onClick={() => setMenuState(!menuState)}
                >
                  <AnimatePresence mode="wait">
                    {menuState ? (
                      <motion.div
                        key="close"
                        initial={{ opacity: 0, rotate: ROTATION_ANGLE, scale: SCALE_MIN }}
                        animate={{ opacity: 1, rotate: 0, scale: SCALE_MAX }}
                        exit={{ opacity: 0, rotate: -ROTATION_ANGLE, scale: SCALE_MIN }}
                        transition={{ duration: ANIMATION_DURATION, ease: EASE }}
                      >
                        <X className="size-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ opacity: 0, rotate: -ROTATION_ANGLE, scale: SCALE_MIN }}
                        animate={{ opacity: 1, rotate: 0, scale: SCALE_MAX }}
                        exit={{ opacity: 0, rotate: ROTATION_ANGLE, scale: SCALE_MIN }}
                        transition={{ duration: ANIMATION_DURATION, ease: EASE }}
                      >
                        <Menu className="size-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                {/* Desktop Menu */}
                <div className="hidden lg:block m-auto">
                  <ul className="flex gap-1">
                    {menuItems.map((item) => (
                      <li key={item.id}>
                        <Button asChild size="sm" variant="ghost">
                          <a className="text-base font-medium" href={item.href}>
                            {item.name}
                          </a>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mobile Menu Drawer */}
              <AnimatePresence>
                {menuState && (
                  <motion.div
                    className="mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border bg-background p-6 shadow-xl shadow-zinc-300/20 
                               lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none"
                    initial={{ opacity: 0, y: TRANSLATE_Y_OFFSET, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: SCALE_MAX }}
                    exit={{ opacity: 0, y: TRANSLATE_Y_OFFSET, scale: 0.95 }}
                    transition={{ duration: ANIMATION_DURATION, ease: EASE }}
                  >
                    {/* Mobile list items */}
                    <div className="lg:hidden">
                      <ul className="space-y-6 text-base">
                        {menuItems.map((item, i) => (
                          <motion.li
                            key={item.id}
                            initial={{ opacity: 0, x: TRANSLATE_X_OFFSET }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: i * STAGGER_DELAY,
                              duration: ANIMATION_DURATION,
                              ease: EASE,
                            }}
                          >
                            <a
                              className="block text-muted-foreground hover:text-foreground transition"
                              href={item.href}
                              onClick={() => setMenuState(false)}
                            >
                              {item.name}
                            </a>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Buttons */}
                    <motion.div
                      className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: menuItems.length * STAGGER_DELAY + STAGGER_DELAY,
                        duration: ANIMATION_DURATION,
                        ease: EASE,
                      }}
                    >
                      <Button asChild size="sm" variant="ghost" onClick={() => setMenuState(false)}>
                        <a href="/login">Login</a>
                      </Button>
                      <Button asChild size="sm" onClick={() => setMenuState(false)}>
                        <a href="/register">Sign Up</a>
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
