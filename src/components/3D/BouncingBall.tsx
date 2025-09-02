import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface BouncingBallProps {
  position?: [number, number, number];
  radius?: number;
  color?: string;
}

const BouncingBall = ({ 
  position = [0, 0, 0], 
  radius = 1,
  color = "#EC4899"
}: BouncingBallProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Bouncing motion
    const bounceHeight = Math.abs(Math.sin(time * 3)) * 1.5;
    meshRef.current.position.y = position[1] + bounceHeight;
    
    // Rolling motion
    meshRef.current.rotation.x = time * 3;
    meshRef.current.rotation.z = time * 1.5;
    
    // Squash and stretch effect
    const squash = 1 - Math.abs(Math.sin(time * 3)) * 0.3;
    const stretch = 1 + Math.abs(Math.sin(time * 3)) * 0.2;
    meshRef.current.scale.set(stretch, squash, stretch);
    
    // Color pulsing
    const colorIntensity = 0.5 + Math.sin(time * 2) * 0.3;
    if (meshRef.current.material) {
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = colorIntensity;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial 
        color={color}
        transparent
        opacity={0.9}
        emissive={color}
        emissiveIntensity={0.3}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
};

export default BouncingBall;
