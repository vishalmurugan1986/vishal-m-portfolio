import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface MorphingShapeProps {
  position?: [number, number, number];
  size?: number;
  color?: string;
}

const MorphingShape = ({ 
  position = [0, 0, 0], 
  size = 2,
  color = "#8B5CF6"
}: MorphingShapeProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Morphing animation - changes shape over time
    const morphFactor = (Math.sin(time * 0.5) + 1) / 2; // 0 to 1
    
    // Update geometry based on morph factor
    if (meshRef.current.geometry) {
      const positions = meshRef.current.geometry.attributes.position;
      const originalPositions = positions.array;
      
      for (let i = 0; i < originalPositions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];
        const z = originalPositions[i + 2];
        
        // Create morphing effect
        const newX = x * (1 + Math.sin(time + x) * 0.2 * morphFactor);
        const newY = y * (1 + Math.cos(time + y) * 0.2 * morphFactor);
        const newZ = z * (1 + Math.sin(time + z) * 0.2 * morphFactor);
        
        positions.setXYZ(i / 3, newX, newY, newZ);
      }
      
      positions.needsUpdate = true;
    }
    
    // Rotation
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.5;
    meshRef.current.rotation.z = time * 0.2;
    
    // Pulsing scale
    const scale = 1 + Math.sin(time * 2) * 0.1;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[size, 2]} />
      <meshStandardMaterial 
        color={color}
        transparent
        opacity={0.8}
        emissive={color}
        emissiveIntensity={0.2}
        roughness={0.3}
        metalness={0.7}
        wireframe={false}
      />
    </mesh>
  );
};

export default MorphingShape;
