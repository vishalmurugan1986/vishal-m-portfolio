import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import ParticleBackground from './ParticleBackground';

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
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

const skillCategories = [
    {
      title: "Programming",
      color: "cyan",
      skills: [
        { name: "Java", level: 50, icon: "☕" },
        { name: "JavaScript", level: 70, icon: "🟨" },
        { name: "Python", level: 50, icon: "🐍" },
        { name: "HTML", level: 80, icon: "🌐" },
        { name: "CSS", level: 80, icon: "🎨" },
        { name: "SQL", level: 50, icon: "🗄" }
      ]
    },
    {
      title: "Frontend",
      color: "cyan",
      skills: [
        { name: "React", level: 50, icon: "⚛" },
        { name: "Tailwind CSS", level: 50, icon: "🌬" }
      ]
    },
    {
      title: "Backend",
      color: "cyan",
      skills: [
        { name: "Node.js", level: 50, icon: "🟢" },
        { name: "Express.js", level: 50, icon: "🚄" },
        { name: "MongoDB", level: 50, icon: "🍃" }
      ]
    },
    {
      title: "Tools & Others",
      color: "cyan",
      skills: [
        { name: "Git", level: 80, icon: "📝" },
        { name: "GitHub", level: 80, icon: "🐙" },
        { name: "Vercel", level: 40, icon: "⬆" }
      ]
    }
  ];

  const getGradientClass = (color: string) => {
    switch (color) {
      case 'accent': return 'from-accent to-accent-glow';
      case 'cyan': return 'from-cyan to-cyan-glow';
      case 'primary': return 'from-primary to-primary-glow';
      default: return 'from-primary to-primary-glow';
    }
  };

  const getShadowClass = (color: string) => {
    switch (color) {
      case 'accent': return 'hover:shadow-accent';
      case 'cyan': return 'hover:shadow-cyan';
      case 'primary': return 'hover:shadow-glow';
      default: return 'hover:shadow-glow';
    }
  };

  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-20 relative">
      <ParticleBackground id="skills-particles" variant="skills" />
      
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold gradient-text mb-4 sm:mb-6">
              Skills & Technologies
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-primary mx-auto"></div>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and proficiency levels across various technologies and tools.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="glass-card p-4 sm:p-6 space-y-4 sm:space-y-6"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    {category.title}
                  </h3>
                  <div className={`w-12 h-1 bg-gradient-to-r ${getGradientClass(category.color)} mx-auto rounded-full`}></div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.1 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg sm:text-xl">{skill.icon}</span>
                          <span className="text-sm sm:text-base text-foreground font-medium">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full bg-gradient-to-r ${getGradientClass(category.color)}`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ 
                            duration: 1.5, 
                            delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.05,
                            ease: "easeOut"
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills Info */}
          <motion.div
            variants={itemVariants}
            className="mt-12 sm:mt-16 lg:mt-20 text-center"
          >
            <div className="glass-card p-6 sm:p-8 max-w-4xl mx-auto">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text mb-4 sm:mb-6">
                Continuous Learning
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                I'm constantly expanding my skill set and staying updated with the latest technologies. Currently focused on mastering Generative AI, advanced React patterns, and cloud deployment strategies.
              </p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { skill: "Generative AI", status: "Learning", icon: "🤖" },
                  { skill: "Advanced React", status: "Improving", icon: "⚛️" },
                  { skill: "Cloud Deployment", status: "Exploring", icon: "☁️" }
                ].map((item, index) => (
                                      <motion.div
                      key={item.skill}
                      className="flex items-center gap-3 p-3 sm:p-4 glass-card rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    >
                    <span className="text-2xl">{item.icon}</span>
                    <div className="text-left">
                      <div className="text-sm sm:text-base font-medium text-foreground">
                        {item.skill}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        {item.status}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;