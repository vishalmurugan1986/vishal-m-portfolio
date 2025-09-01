import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Palette, Rocket, Users } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      transition: { duration: 0.6 }
    }
  };

  const stats = [
    { number: "10+", label: "Projects Completed", icon: Code },
    { number: "1+", label: "Years Experience", icon: Rocket },
    { number: "20+", label: "Happy Clients", icon: Users },
    { number: "5+", label: "Technologies", icon: Palette }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold gradient-text mb-6">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass-card p-8 space-y-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Passionate Software Developer
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm a passionate Software Developer specializing in the MERN stack, currently exploring the exciting world of Generative AI. I love building interactive, scalable applications and solving real-world problems through code. Open to opportunities that challenge me to innovate and grow.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                </p>
                
                {/* Skills Progress */}
                <div className="space-y-4 pt-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground">Frontend Development</span>
                      <span className="text-accent">50%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="bg-gradient-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "95%" } : { width: 0 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground">Backend Development</span>
                      <span className="text-cyan">50%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="bg-gradient-secondary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "88%" } : { width: 0 }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground">UI/UX Design</span>
                      <span className="text-accent">20%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="bg-gradient-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "92%" } : { width: 0 }}
                        transition={{ duration: 1.5, delay: 0.9 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="glass-card p-6 text-center hover:shadow-glow transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 group-hover:shadow-glow transition-all duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <motion.div
                    className="text-3xl font-bold gradient-text mb-2"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1 + 1,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-muted-foreground text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;