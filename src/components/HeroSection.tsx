import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import ProgrammingLogos from './3D/ProgrammingLogos';
import DetailedProgrammingLogos from './3D/DetailedProgrammingLogos';
import TypingAnimation from './TypingAnimation';
import ParticleBackground from './ParticleBackground';

const HeroSection = () => {
  // Simple mobile detection - show 3D on screens wider than 768px
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const socialVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 1.5
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
      <ParticleBackground id="hero-particles" variant="hero" />

      <div className="container mx-auto z-10">
        <div className={`grid ${!isMobile ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-8 lg:gap-12 items-center`}>
          
          {/* Left Column - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`text-center ${!isMobile ? 'lg:text-left' : 'text-center'} space-y-6 lg:space-y-8 ${!isMobile ? 'order-2 lg:order-1' : 'order-1'}`}
          >
            <motion.div variants={itemVariants} className="space-y-3 lg:space-y-4">
              <div className="text-base sm:text-lg text-accent font-medium">
                Hello, I'm
              </div>
              <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold gradient-text leading-tight">
                Vishal M
              </h2>
              <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-muted-foreground font-medium">
                <TypingAnimation
                  text="Software Developer | MERN Stack | Generative AI Enthusiast"
                  speed={80}
                  delay={1000}
                  className="gradient-text-secondary"
                />
              </div>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className={`text-base sm:text-lg text-muted-foreground max-w-lg ${!isMobile ? 'mx-auto lg:mx-0' : 'mx-auto'} leading-relaxed`}
            >
              I specialize in building intelligent solutions with Generative AI to optimize workflows, drive automation, and create impactful user experiences.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Button 
                variant="hero" 
                size="lg" 
                className="group w-full sm:w-auto"
                asChild
              >
                <motion.a
                  href="/resume.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:animate-bounce" />
                  Download Resume
                </motion.a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="group w-full sm:w-auto"
                asChild
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore My Work
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </Button>
            </motion.div>

            {/* Social Links - Vertical under buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex gap-3 sm:gap-4 justify-center lg:justify-start mt-6 lg:mt-8"
            >
              <motion.a
                href="https://github.com/vishalmurugan1986"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 glass-card hover:shadow-glow transition-all duration-300 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/vishalmurugan1986"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 glass-card hover:shadow-cyan transition-all duration-300 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-cyan" />
              </motion.a>
              <motion.a
                href="https://leetcode.com/vishalmurugan1986"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 glass-card hover:shadow-accent transition-all duration-300 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 text-accent font-bold text-sm sm:text-base">LC</div>
              </motion.a>
              <motion.a
                href="mailto:vishalxivimcmlxxxvi@gmail.com"
                className="p-2.5 sm:p-3 glass-card hover:shadow-accent transition-all duration-300 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Enhanced 3D Scene (Hidden on Mobile) */}
          {!isMobile && (
            <motion.div
              variants={itemVariants}
              className="h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] relative order-1 lg:order-2"
            >
              <Canvas className="w-full h-full">
                <PerspectiveCamera makeDefault position={[0, 0, 12]} />
                <Environment preset="night" />
                
                {/* Enhanced Lighting */}
                <ambientLight intensity={0.3} />
                <directionalLight position={[10, 10, 5]} intensity={1.2} />
                <pointLight position={[-10, -10, -5]} color="#8B5CF6" intensity={0.8} />
                <pointLight position={[10, -10, -5]} color="#EC4899" intensity={0.8} />
                <pointLight position={[0, 10, -5]} color="#06B6D4" intensity={0.6} />
                <spotLight position={[0, 0, 10]} angle={0.3} penumbra={1} intensity={0.5} />
                
                {/* Main 3D Programming Language Logos */}
                <DetailedProgrammingLogos position={[0, 0, 0]} logoType="react" scale={1.2} />
                <DetailedProgrammingLogos position={[-3, 0, 0]} logoType="javascript" scale={1.0} />
                <DetailedProgrammingLogos position={[3, 0, 0]} logoType="python" scale={1.0} />
                
                {/* Background accent programming logos */}
                <ProgrammingLogos position={[-5, 1, -2]} logoType="java" scale={0.8} />
                <ProgrammingLogos position={[5, -1, -2]} logoType="nodejs" scale={0.8} />
                <ProgrammingLogos position={[0, 2, -3]} logoType="html" scale={0.7} />
                <ProgrammingLogos position={[-2, -2, -2]} logoType="css" scale={0.7} />
                <ProgrammingLogos position={[2, 2, -2]} logoType="sql" scale={0.7} />
                
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.3}
                />
              </Canvas>
            </motion.div>
          )}

          {/* Mobile Alternative - 3D Scene */}
          {isMobile && (
            <motion.div
              variants={itemVariants}
              className="h-64 sm:h-80 relative order-2"
            >
              <Canvas className="w-full h-full">
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <Environment preset="night" />
                
                {/* Simplified lighting for mobile */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />
                <pointLight position={[0, 0, 5]} color="#8B5CF6" intensity={0.6} />
                
                {/* Simplified 3D programming logos for mobile */}
                <DetailedProgrammingLogos position={[0, 0, 0]} logoType="react" scale={1.0} />
                <ProgrammingLogos position={[-2, 0, 0]} logoType="javascript" scale={0.8} />
                <ProgrammingLogos position={[2, 0, 0]} logoType="python" scale={0.8} />
                
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.2}
                />
              </Canvas>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-primary/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 sm:h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;