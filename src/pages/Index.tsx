import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
          John Doe
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
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <motion.div
                  className="text-2xl font-bold gradient-text"
                  whileHover={{ scale: 1.05 }}
                >
                  John Doe
                </motion.div>
                
                <div className="hidden md:flex items-center gap-8">
                  {[
                    { label: "Home", href: "#home" },
                    { label: "About", href: "#about" },
                    { label: "Skills", href: "#skills" },
                    { label: "Projects", href: "#projects" },
                    { label: "Contact", href: "#contact" }
                  ].map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors relative group"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                    </motion.a>
                  ))}
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                  className="md:hidden p-2 glass-card rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-6 h-0.5 bg-foreground mb-1"></div>
                  <div className="w-6 h-0.5 bg-foreground mb-1"></div>
                  <div className="w-6 h-0.5 bg-foreground"></div>
                </motion.button>
              </div>
            </div>
          </motion.nav>

          {/* Main Content */}
          <main>
            <section id="home">
              <HeroSection />
            </section>
            
            <motion.section
              id="about"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <AboutSection />
            </motion.section>
            
            <motion.section
              id="skills"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <SkillsSection />
            </motion.section>
            
            <motion.section
              id="projects"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <ProjectsSection />
            </motion.section>
            
            <motion.section
              id="contact"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <ContactSection />
            </motion.section>
          </main>

          {/* Footer */}
          <motion.footer
            className="py-12 border-t border-border/50"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="container mx-auto px-4">
              <div className="text-center">
                <motion.div
                  className="text-2xl font-bold gradient-text mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  John Doe
                </motion.div>
                <p className="text-muted-foreground mb-6">
                  Full Stack Developer & UI/UX Designer
                </p>
                <div className="flex justify-center gap-6 mb-8">
                  {[
                    { platform: "GitHub", url: "https://github.com" },
                    { platform: "LinkedIn", url: "https://linkedin.com" },
                    { platform: "Twitter", url: "https://twitter.com" },
                    { platform: "Instagram", url: "https://instagram.com" }
                  ].map((social, index) => (
                    <motion.a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.platform}
                    </motion.a>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  © 2024 John Doe. All rights reserved. Built with ❤️ using React & Framer Motion
                </div>
              </div>
            </div>
          </motion.footer>

          {/* Scroll to Top Button */}
          <motion.button
            className="fixed bottom-8 right-8 p-4 glass-card rounded-full hover:shadow-glow transition-all duration-300 z-30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-6 h-6 text-primary">↑</div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;