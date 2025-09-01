import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ParticleBackground from './ParticleBackground';

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState('all');

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

  const projects = [
    {
      id: 1,
      title: "Prime Promise",
      description: "A lightweight promise utility library for JavaScript with modern async/await features.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
      tags: ["JavaScript", "promise", "Async/Await"],
      category: "frontend",
      demoUrl: "https://demo.example.com",
      githubUrl: "https://github.com/vishalmurugan1986/prime-promise"
    }

  ];

  const filters = [
    { label: "All", value: "all" },
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "Full Stack", value: "fullstack" },
    { label: "Mobile", value: "mobile" }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 relative">
      <ParticleBackground id="projects-particles" variant="projects" />
      
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
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my best work across different technologies and domains
            </p>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-primary mx-auto mt-4 sm:mt-6"></div>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8 sm:mb-12">
            <div className="flex flex-wrap gap-2 p-2 glass-card rounded-2xl justify-center">
              {filters.map((filterOption) => (
                <Button
                  key={filterOption.value}
                  variant={filter === filterOption.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter(filterOption.value)}
                  className="transition-all duration-300 text-xs sm:text-sm"
                >
                  {filterOption.value}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="glass-card overflow-hidden group"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
              >
                {/* Project Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="glass-card border-white/20 text-white hover:bg-white/10"
                    >
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="glass-card border-white/20 text-white hover:bg-white/10"
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Projects Message */}
          {filteredProjects.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="text-center py-12 sm:py-16"
            >
              <div className="glass-card p-8 sm:p-12 max-w-md mx-auto">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                  Projects Coming Soon
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  I'm currently working on some exciting projects. Check back soon!
                </p>
              </div>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12 sm:mt-16 lg:mt-20"
          >
            <div className="glass-card p-6 sm:p-8 max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text mb-4 sm:mb-6">
                Have a Project in Mind?
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6">
                I'm always interested in hearing about new project opportunities. Let's discuss how we can work together!
              </p>
              <Button
                variant="hero"
                size="lg"
                asChild
                className="group"
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;