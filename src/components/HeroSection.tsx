import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import FloatingIcon from './3D/FloatingIcon';
import TypingAnimation from './TypingAnimation';
import ParticleBackground from './ParticleBackground';
import useMobile from '@/hooks/use-mobile';

const HeroSection = () => {
  const { isMobile, isTablet } = useMobile();
  const shouldShow3D = !isMobile && !isTablet; // Hide 3D on mobile/tablet for better performance

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
        <div className={`grid ${shouldShow3D ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-8 lg:gap-12 items-center`}>
          
          {/* Left Column - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`text-center ${shouldShow3D ? 'lg:text-left' : 'text-center'} space-y-6 lg:space-y-8 ${shouldShow3D ? 'order-2 lg:order-1' : 'order-1'}`}
          >
            <motion.div variants={itemVariants} className="space-y-3 lg:space-y-4">
              <div className="text-base sm:text-lg text-accent font-medium">
                Hello, I'm
              </div>
              <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold gradient-text leading-tight">
                Vishal M
              </h2>
              <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-muted-foreground">
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
              className={`text-base sm:text-lg text-muted-foreground max-w-lg ${shouldShow3D ? 'mx-auto lg:mx-0' : 'mx-auto'} leading-relaxed`}
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
          {shouldShow3D && (
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
                
                {/* Primary floating icons */}
                <FloatingIcon position={[0, 3, 0]} icon="⚛️" color="#61DAFB" speed={1.2} />
                <FloatingIcon position={[-4, 1, 0]} icon="🚀" color="#8B5CF6" speed={0.8} />
                <FloatingIcon position={[4, 1, 0]} icon="💻" color="#EC4899" speed={1.5} />
                <FloatingIcon position={[0, -1, 0]} icon="⚡" color="#06B6D4" speed={1.0} />
                
                {/* Additional geometric shapes for background */}
                <FloatingIcon position={[-6, 3, -3]} icon="⚛️" color="#8B5CF6" speed={0.6} />
                <FloatingIcon position={[6, -2, -3]} icon="⚡" color="#EC4899" speed={0.9} />
                <FloatingIcon position={[-2, -3, -2]} icon="💻" color="#06B6D4" speed={1.3} />
                <FloatingIcon position={[5, 3, -4]} icon="🚀" color="#61DAFB" speed={0.7} />
                <FloatingIcon position={[-5, -1, -5]} icon="⚛️" color="#EC4899" speed={1.1} />
                
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.3}
                />
              </Canvas>
            </motion.div>
          )}

          {/* Mobile Alternative - Static Icon Grid */}
          {!shouldShow3D && (
            <motion.div
              variants={itemVariants}
              className="flex justify-center items-center order-2"
            >
              <div className="grid grid-cols-2 gap-6 sm:gap-8">
                {[
                  { icon: "⚛️", color: "#61DAFB" },
                  { icon: "🚀", color: "#8B5CF6" },
                  { icon: "💻", color: "#EC4899" },
                  { icon: "⚡", color: "#06B6D4" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="w-16 h-16 sm:w-20 sm:h-20 glass-card rounded-full flex items-center justify-center text-2xl sm:text-3xl"
                    style={{ color: item.color }}
                    animate={{
                      y: [0, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 3,
                      delay: index * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {item.icon}
                  </motion.div>
                ))}
              </div>
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