import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import ParticleBackground from './ParticleBackground';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      details: "Chennai, Tamil Nadu, India",
      color: "accent"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+91 8056424986",
      color: "cyan"
    },
    {
      icon: Mail,
      title: "Email",
      details: "vishalxivimcmlxxxvi@gmail.com",
      color: "primary"
    },
    {
      icon: Calendar,
      title: "Availability",
      details: "Open for opportunities",
      color: "accent"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message Sent! 🚀",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'accent': return 'text-accent';
      case 'cyan': return 'text-cyan';
      case 'primary': return 'text-primary';
      default: return 'text-primary';
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
    <section id="contact" className="py-20 relative">
      <ParticleBackground id="contact-particles" variant="contact" />
      
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
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to turn your ideas into reality? Let's discuss your next project
            </p>
            <div className="w-24 h-1 bg-gradient-secondary mx-auto mt-6"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Let's Connect
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I'm always interested in hearing about new opportunities, 
                  creative projects, and innovative ideas. Whether you're a 
                  company looking to hire, or you're a fellow developer who 
                  wants to connect, I'd love to hear from you.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-xl bg-muted/20 ${getShadowClass(info.color)} transition-all duration-300 hover:scale-105`}
                      whileHover={{ x: 10 }}
                    >
                      <div className={`p-3 bg-gradient-primary rounded-lg ${getShadowClass(info.color)}`}>
                        <info.icon className={`w-6 h-6 text-white`} />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">
                          {info.title}
                        </div>
                        <div className="text-muted-foreground">
                          {info.details}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-border">
                  <h4 className="text-lg font-semibold text-foreground mb-4">
                    Follow Me
                  </h4>
                  <div className="flex gap-4">
                    {[
                      { platform: "GitHub", url: "https://github.com/vishalmurugan1986", icon: "🐙" },
                      { platform: "LinkedIn", url: "https://linkedin.com/in/vishalmurugan1986", icon: "💼" },
                      { platform: "Twitter", url: "https://twitter.com", icon: "🐦" },
                      { platform: "Instagram", url: "https://instagram.com", icon: "📸" }
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 glass-card hover:shadow-glow transition-all duration-300 text-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span className="text-2xl">{social.icon}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Send Message
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Your Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="xxxx"
                      required
                      className="glass-card border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="xxxx"
                      required
                      className="glass-card border-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project Discussion"
                    required
                    className="glass-card border-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..."
                    rows={6}
                    required
                    className="glass-card border-primary/20 focus:border-primary resize-none"
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full group"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    )}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;