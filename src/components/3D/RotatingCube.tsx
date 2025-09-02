import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface RotatingCubeProps {
  position?: [number, number, number];
  size?: number;
  color?: string;
  wireframe?: boolean;
}

const RotatingCube = ({ 
  position = [0, 0, 0], 
  size = 2, 
  color = "#8B5CF6",
  wireframe = false 
}: RotatingCubeProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Smooth rotation
    meshRef.current.rotation.x = time * 0.5;
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.rotation.z = time * 0.2;
    
    // Subtle floating animation
    meshRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={wireframe}
        transparent
        opacity={0.8}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

export default RotatingCube;
