import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, BufferGeometry, Float32BufferAttribute } from 'three';
import * as THREE from 'three';

interface ParticleSystemProps {
  position?: [number, number, number];
  count?: number;
  color?: string;
}

const ParticleSystem = ({ 
  position = [0, 0, 0], 
  count = 1000,
  color = "#EC4899"
}: ParticleSystemProps) => {
  const pointsRef = useRef<Points>(null);

  // Create particle geometry
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Create a sphere distribution
      const radius = Math.random() * 3 + 1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Color variation
      const colorVariation = Math.random() * 0.5 + 0.5;
      colors[i3] = 0.9 * colorVariation;     // R
      colors[i3 + 1] = 0.3 * colorVariation; // G
      colors[i3 + 2] = 0.6 * colorVariation; // B
    }
    
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Animate particles
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Orbital motion
      const radius = Math.sqrt(positions[i3] ** 2 + positions[i3 + 2] ** 2);
      const angle = Math.atan2(positions[i3 + 2], positions[i3]) + time * 0.1;
      
      positions[i3] = radius * Math.cos(angle);
      positions[i3 + 2] = radius * Math.sin(angle);
      
      // Vertical wave motion
      positions[i3 + 1] += Math.sin(time * 2 + i * 0.01) * 0.01;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate the entire system
    pointsRef.current.rotation.y = time * 0.2;
  });

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleSystem;
