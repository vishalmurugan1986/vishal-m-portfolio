import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface SpinningTorusProps {
  position?: [number, number, number];
  radius?: number;
  tubeRadius?: number;
  color?: string;
}

const SpinningTorus = ({ 
  position = [0, 0, 0], 
  radius = 1.5,
  tubeRadius = 0.4,
  color = "#06B6D4"
}: SpinningTorusProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Fast spinning
    meshRef.current.rotation.x = time * 1.2;
    meshRef.current.rotation.y = time * 0.8;
    meshRef.current.rotation.z = time * 0.4;
    
    // Breathing effect
    const breathe = 1 + Math.sin(time * 1.5) * 0.2;
    meshRef.current.scale.setScalar(breathe);
    
    // Subtle vertical movement
    meshRef.current.position.y = position[1] + Math.sin(time * 0.6) * 0.4;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[radius, tubeRadius, 16, 100]} />
      <meshStandardMaterial 
        color={color}
        transparent
        opacity={0.8}
        emissive={color}
        emissiveIntensity={0.2}
        wireframe={false}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
};

export default SpinningTorus;
