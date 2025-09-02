import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface AnimatedSphereProps {
  position?: [number, number, number];
  radius?: number;
  color?: string;
}

const AnimatedSphere = ({ 
  position = [0, 0, 0], 
  radius = 1.5, 
  color = "#EC4899"
}: AnimatedSphereProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Complex rotation
    meshRef.current.rotation.x = time * 0.4;
    meshRef.current.rotation.y = time * 0.6;
    
    // Pulsing scale effect
    const scale = 1 + Math.sin(time * 2) * 0.1;
    meshRef.current.scale.setScalar(scale);
    
    // Orbital motion
    meshRef.current.position.x = position[0] + Math.cos(time * 0.5) * 0.5;
    meshRef.current.position.z = position[2] + Math.sin(time * 0.5) * 0.5;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial 
        color={color}
        transparent
        opacity={0.7}
        emissive={color}
        emissiveIntensity={0.3}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

export default AnimatedSphere;
