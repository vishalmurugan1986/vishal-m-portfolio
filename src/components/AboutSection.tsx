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
    <section id="about" className="py-12 sm:py-16 lg:py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold gradient-text mb-4 sm:mb-6">
              About Me
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-primary mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
              <div className="glass-card p-6 sm:p-8 space-y-4 sm:space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                  Passionate Software Developer
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  I'm a passionate Software Developer specializing in the MERN stack, currently exploring the exciting world of Generative AI. I love building interactive, scalable applications and solving real-world problems through code. Open to opportunities that challenge me to innovate and grow.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                </p>
                
                {/* Skills Progress */}
                <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-2">
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
                    <div className="flex justify-between text-xs sm:text-sm mb-2">
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
                    <div className="flex justify-between text-xs sm:text-sm mb-2">
                      <span className="text-foreground">Problem Solving</span>
                      <span className="text-accent">85%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="bg-gradient-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "85%" } : { width: 0 }}
                        transition={{ duration: 1.5, delay: 0.9 }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-2">
                      <span className="text-foreground">Team Collaboration</span>
                      <span className="text-cyan">90%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="bg-gradient-secondary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "90%" } : { width: 0 }}
                        transition={{ duration: 1.5, delay: 1.1 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Stats Grid */}
            <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="glass-card p-4 sm:p-6 text-center space-y-3"
                    whileHover={{ scale: 1.05, y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                      <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                    </div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Additional Info Card */}
                             <motion.div
                 className="glass-card p-4 sm:p-6 space-y-3 sm:space-y-4"
                 whileHover={{ scale: 1.02 }}
                 initial={{ opacity: 0, y: 20 }}
                 animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                 transition={{ duration: 0.3, delay: 0.6 }}
               >
                <h4 className="text-lg sm:text-xl font-semibold text-foreground">
                  What I'm Looking For
                </h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  I'm seeking opportunities to work on challenging projects that involve cutting-edge technologies, particularly in the realm of Generative AI and full-stack development. I'm excited to collaborate with teams that value innovation and continuous learning.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;