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
      title: "Frontend",
      color: "accent",
      skills: [
        { name: "React", level: 95, icon: "⚛️" },
        { name: "TypeScript", level: 90, icon: "📘" },
        { name: "Next.js", level: 88, icon: "▲" },
        { name: "Tailwind CSS", level: 95, icon: "🎨" },
        { name: "Framer Motion", level: 85, icon: "🎭" },
        { name: "Three.js", level: 75, icon: "🎯" }
      ]
    },
    {
      title: "Backend",
      color: "cyan",
      skills: [
        { name: "Node.js", level: 90, icon: "🟢" },
        { name: "Express", level: 88, icon: "🚄" },
        { name: "Python", level: 85, icon: "🐍" },
        { name: "PostgreSQL", level: 82, icon: "🐘" },
        { name: "MongoDB", level: 80, icon: "🍃" },
        { name: "Redis", level: 75, icon: "🔴" }
      ]
    },
    {
      title: "Tools & Others",
      color: "primary",
      skills: [
        { name: "Git", level: 95, icon: "📝" },
        { name: "Docker", level: 80, icon: "🐳" },
        { name: "AWS", level: 75, icon: "☁️" },
        { name: "Figma", level: 90, icon: "🎨" },
        { name: "Jest", level: 85, icon: "🧪" },
        { name: "GraphQL", level: 78, icon: "📊" }
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
    <section id="skills" className="py-20 relative">
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
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold gradient-text mb-6">
              Skills & Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I've mastered throughout my development journey
            </p>
            <div className="w-24 h-1 bg-gradient-secondary mx-auto mt-6"></div>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="glass-card p-8 hover:shadow-glass transition-all duration-500"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {category.title}
                  </h3>
                  <div className={`w-16 h-1 bg-gradient-to-r ${getGradientClass(category.color)} mx-auto`}></div>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: categoryIndex * 0.2 + skillIndex * 0.1 
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{skill.icon}</span>
                          <span className="font-medium text-foreground">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${getGradientClass(category.color)}`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ 
                            duration: 1.5, 
                            delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5,
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

          {/* Floating Skills Icons */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center gap-8 mt-16 flex-wrap"
          >
            {["⚛️", "🚀", "💻", "🎨", "⚡", "🔥"].map((icon, index) => (
              <motion.div
                key={index}
                className="w-16 h-16 glass-card flex items-center justify-center text-2xl hover:shadow-glow transition-all duration-300"
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{
                  duration: 3,
                  delay: index * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {icon}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;