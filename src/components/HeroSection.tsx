import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import FloatingIcon from './3D/FloatingIcon';
import TypingAnimation from './TypingAnimation';
import ParticleBackground from './ParticleBackground';

const HeroSection = () => {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground id="hero-particles" variant="hero" />
      
      {/* Social Links - Fixed Left Side */}
      <motion.div
        variants={socialVariants}
        initial="hidden"
        animate="visible"
        className="fixed left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-6"
      >
        <motion.a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 glass-card hover:shadow-glow transition-all duration-300 hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Github className="w-6 h-6 text-primary" />
        </motion.a>
        <motion.a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 glass-card hover:shadow-cyan transition-all duration-300 hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Linkedin className="w-6 h-6 text-cyan" />
        </motion.a>
        <motion.a
          href="mailto:contact@portfolio.com"
          className="p-3 glass-card hover:shadow-accent transition-all duration-300 hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Mail className="w-6 h-6 text-accent" />
        </motion.a>
      </motion.div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="text-lg text-accent font-medium">
                Hello, I'm
              </div>
              <h1 className="text-6xl lg:text-8xl font-bold gradient-text">
                John Doe
              </h1>
              <div className="text-2xl lg:text-3xl text-muted-foreground">
                <TypingAnimation 
                  text="Full Stack Developer & UI/UX Designer"
                  speed={80}
                  delay={1000}
                  className="gradient-text-secondary"
                />
              </div>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0"
            >
              I create exceptional digital experiences through cutting-edge technology 
              and innovative design solutions.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button 
                variant="hero" 
                size="lg" 
                className="group"
                asChild
              >
                <motion.a
                  href="/resume.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Download Resume
                </motion.a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="group"
                asChild
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore My Work
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Scene */}
          <motion.div
            variants={itemVariants}
            className="h-96 lg:h-[600px] relative"
          >
            <Canvas className="w-full h-full">
              <PerspectiveCamera makeDefault position={[0, 0, 8]} />
              <Environment preset="night" />
              
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={0.8} />
              <pointLight position={[-10, -10, -5]} color="#8B5CF6" intensity={0.5} />
              <pointLight position={[10, -10, -5]} color="#EC4899" intensity={0.5} />
              
              <FloatingIcon position={[0, 2, 0]} icon="⚛️" color="#61DAFB" speed={1.2} />
              <FloatingIcon position={[-3, 0, 0]} icon="🚀" color="#8B5CF6" speed={0.8} />
              <FloatingIcon position={[3, 0, 0]} icon="💻" color="#EC4899" speed={1.5} />
              <FloatingIcon position={[0, -2, 0]} icon="⚡" color="#06B6D4" speed={1.0} />
              
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;