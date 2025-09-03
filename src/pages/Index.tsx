import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, lazy, Suspense } from 'react';
import { Menu, X } from 'lucide-react';

// Import HeroSection directly (above the fold content)
import HeroSection from '@/components/HeroSection';

// Lazy load other components for better performance
const AboutSection = lazy(() => import('@/components/AboutSection'));
const SkillsSection = lazy(() => import('@/components/SkillsSection'));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));

// Skeleton component for loading states
const SectionSkeleton = () => (
  <div className="py-12 sm:py-16 lg:py-20">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto animate-pulse">
        <div className="text-center mb-12 sm:mb-16">
          <div className="h-12 bg-muted rounded-lg mb-4 mx-auto w-64"></div>
          <div className="w-20 h-1 bg-muted mx-auto"></div>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-6">
            <div className="h-64 bg-muted rounded-lg"></div>
            <div className="h-32 bg-muted rounded-lg"></div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Reduced loading time for better performance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    console.log('Scrolling to section:', sectionId); // Debug log
    
    // Close mobile menu first
    closeMobileMenu();
    
    // Small delay to ensure menu closes before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        console.log('Element found:', element); // Debug log
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.log('Element not found for section:', sectionId); // Debug log
      }
    }, 100);
  };

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  };

  const pageTransition = {
    duration: 0.8
  };

  const LoadingScreen = () => (
    <motion.div
      className="fixed inset-0 bg-background flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full"></div>
        </motion.div>
        <motion.h1
          className="text-4xl font-bold gradient-text mt-8"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Vishal Murugan
        </motion.h1>
        <motion.p
          className="text-muted-foreground mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Loading Portfolio...
        </motion.p>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loader" />
      ) : (
        <motion.div
          key="content"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="min-h-screen bg-background text-foreground dark"
        >
          {/* Navigation */}
          <motion.nav
            className="fixed top-0 left-0 right-0 z-40 glass-card mx-4 mt-4 rounded-2xl"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="container mx-auto px-4 sm:px-6 py-4">
              <div className="flex items-center justify-between">
                <motion.div
                  className="text-xl sm:text-2xl font-bold gradient-text cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => scrollToSection('home')}
                >
                  Vishal Murugan
                </motion.div>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                  {[
                    { label: "Home", id: "home" },
                    { label: "About", id: "about" },
                    { label: "Skills", id: "skills" },
                    { label: "Projects", id: "projects" },
                    { label: "Contact", id: "contact" }
                  ].map((item, index) => (
                    <motion.button
                      key={item.label}
                      onClick={() => scrollToSection(item.id)}
                      className="text-muted-foreground hover:text-primary transition-colors relative group bg-transparent border-none cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                    </motion.button>
                  ))}
                </div>

                {/* Mobile Menu Button - ONLY visible on mobile */}
                <button
                  className="md:hidden p-3 glass-card rounded-lg touch-manipulation"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleMobileMenu();
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleMobileMenu();
                  }}
                  type="button"
                  aria-label="Toggle mobile menu"
                  aria-expanded={isMobileMenuOpen}
                  style={{ 
                    WebkitTapHighlightColor: 'transparent',
                    WebkitUserSelect: 'none',
                    userSelect: 'none'
                  }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6 text-foreground" />
                  ) : (
                    <Menu className="w-6 h-6 text-foreground" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu - ONLY visible on mobile */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden border-t border-glass-border"
                >
                  <div className="px-4 py-4 space-y-3">
                    {[
                      { label: "Home", id: "home" },
                      { label: "About", id: "about" },
                      { label: "Skills", id: "skills" },
                      { label: "Projects", id: "projects" },
                      { label: "Contact", id: "contact" }
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          scrollToSection(item.id);
                        }}
                        onTouchEnd={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          scrollToSection(item.id);
                        }}
                        className="block w-full text-left text-muted-foreground hover:text-primary active:text-primary transition-colors py-4 px-4 rounded-lg hover:bg-glass/50 active:bg-glass/70 bg-transparent border-none cursor-pointer touch-manipulation min-h-[48px] text-base font-medium"
                        type="button"
                        aria-label={`Navigate to ${item.label} section`}
                        style={{ 
                          WebkitTapHighlightColor: 'transparent',
                          WebkitUserSelect: 'none',
                          userSelect: 'none'
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>

          {/* Main Content */}
          <main className="pt-24 sm:pt-28">
            <section id="home" className="min-h-screen">
              <HeroSection />
            </section>
            
            <section id="about" className="min-h-screen">
              <Suspense fallback={<SectionSkeleton />}>
                <AboutSection />
              </Suspense>
            </section>
            
            <section id="skills" className="min-h-screen">
              <Suspense fallback={<SectionSkeleton />}>
                <SkillsSection />
              </Suspense>
            </section>
            
            <section id="projects" className="min-h-screen">
              <Suspense fallback={<SectionSkeleton />}>
                <ProjectsSection />
              </Suspense>
            </section>
            
            <section id="contact" className="min-h-screen">
              <Suspense fallback={<SectionSkeleton />}>
                <ContactSection />
              </Suspense>
            </section>
          </main>

          {/* Footer */}
          <motion.footer
            className="py-8 sm:py-12 border-t border-border/50"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="container mx-auto px-4">
              <div className="text-center">
                <motion.div
                  className="text-xl sm:text-2xl font-bold gradient-text mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  Vishal Murugan
                </motion.div>
                <p className="text-muted-foreground mb-6">
                  Software Developer
                </p>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
                  {[
                    { platform: "GitHub", url: "https://github.com/vishalmurugan1986" },
                    { platform: "LinkedIn", url: "https://linkedin.com/in/vishalmurugan1986" },
                    { platform: "Twitter", url: "https://twitter.com" },
                    { platform: "Instagram", url: "https://instagram.com" }
                  ].map((social, index) => (
                    <motion.a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-glass/50"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.platform}
                    </motion.a>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  © 2025 Vishal Murugan. All rights reserved.
                </div>
              </div>
            </div>
          </motion.footer>

          {/* Scroll to Top Button */}
          <motion.button
            className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 p-3 sm:p-4 glass-card rounded-full hover:shadow-glow transition-all duration-300 z-30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 text-primary">↑</div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;