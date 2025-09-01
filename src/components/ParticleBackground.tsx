import { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  id: string;
  variant?: 'default' | 'hero' | 'skills' | 'projects' | 'contact';
}

const ParticleBackground = ({ id, variant = 'default' }: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle configuration based on variant
    const getConfig = () => {
      switch (variant) {
        case 'hero':
          return {
            particleCount: 100,
            colors: ['#8B5CF6', '#3B82F6', '#EC4899', '#06B6D4'],
            speed: 0.5,
            size: { min: 1, max: 3 },
            connections: true
          };
        case 'skills':
          return {
            particleCount: 60,
            colors: ['#EC4899', '#06B6D4'],
            speed: 0.3,
            size: { min: 1, max: 2 },
            connections: true
          };
        case 'projects':
          return {
            particleCount: 50,
            colors: ['#8B5CF6', '#06B6D4'],
            speed: 0.4,
            size: { min: 1, max: 4 },
            connections: false
          };
        case 'contact':
          return {
            particleCount: 40,
            colors: ['#3B82F6', '#8B5CF6'],
            speed: 0.2,
            size: { min: 1, max: 3 },
            connections: true
          };
        default:
          return {
            particleCount: 80,
            colors: ['#8B5CF6', '#3B82F6', '#EC4899'],
            speed: 0.4,
            size: { min: 1, max: 3 },
            connections: true
          };
      }
    };

    const config = getConfig();
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < config.particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * config.speed,
        vy: (Math.random() - 0.5) * config.speed,
        size: Math.random() * (config.size.max - config.size.min) + config.size.min,
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Mouse interaction - repulsion
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.x -= dx * force * 0.01;
          particle.y -= dy * force * 0.01;
        }

        // Draw particle
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        if (config.connections) {
          particles.slice(i + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              ctx.globalAlpha = (120 - distance) / 120 * 0.2;
              ctx.strokeStyle = particle.color;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          });
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className="particles-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
};

export default ParticleBackground;