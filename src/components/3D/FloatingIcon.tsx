import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { Mesh } from 'three';

interface FloatingIconProps {
  position: [number, number, number];
  icon: string;
  color?: string;
  speed?: number;
}

const FloatingIcon = ({ position, icon, color = "#8B5CF6", speed = 1 }: FloatingIconProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.8) * 0.2;
    }
  });

  // Create different geometry based on icon type
  const getGeometry = () => {
    switch (icon) {
      case "⚛️":
        return <sphereGeometry args={[0.8, 16, 16]} />;
      case "🚀":
        return <coneGeometry args={[0.5, 1.5, 8]} />;
      case "💻":
        return <boxGeometry args={[1.2, 0.8, 0.1]} />;
      case "⚡":
        return <tetrahedronGeometry args={[0.8]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <Float
      speed={speed}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      floatingRange={[0, 1]}
    >
      <mesh ref={meshRef} position={position}>
        {getGeometry()}
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          emissive={color}
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

export default FloatingIcon;