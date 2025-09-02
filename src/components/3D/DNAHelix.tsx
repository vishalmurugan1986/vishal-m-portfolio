import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import * as THREE from 'three';

interface DNAHelixProps {
  position?: [number, number, number];
  height?: number;
  radius?: number;
  color1?: string;
  color2?: string;
}

const DNAHelix = ({ 
  position = [0, 0, 0], 
  height = 4,
  radius = 1.5,
  color1 = "#8B5CF6",
  color2 = "#EC4899"
}: DNAHelixProps) => {
  const groupRef = useRef<Group>(null);
  const helix1Ref = useRef<Mesh>(null);
  const helix2Ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !helix1Ref.current || !helix2Ref.current) return;

    const time = state.clock.getElapsedTime();
    
    // Rotate the entire DNA structure
    groupRef.current.rotation.y = time * 0.3;
    
    // Animate individual helix strands
    helix1Ref.current.rotation.y = time * 0.5;
    helix2Ref.current.rotation.y = -time * 0.5;
    
    // Floating animation
    groupRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.5;
  });

  // Create helix geometry
  const createHelixGeometry = (offset: number) => {
    const points = [];
    const segments = 50;
    
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * height;
      const angle = t * Math.PI * 2 + offset;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      points.push(new THREE.Vector3(x, t - height/2, z));
    }
    
    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 200, 0.1, 8, false);
    return geometry;
  };

  return (
    <group ref={groupRef} position={position}>
      {/* First helix strand */}
      <mesh ref={helix1Ref}>
        <primitive object={createHelixGeometry(0)} />
        <meshStandardMaterial 
          color={color1}
          transparent
          opacity={0.9}
          emissive={color1}
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      
      {/* Second helix strand */}
      <mesh ref={helix2Ref}>
        <primitive object={createHelixGeometry(Math.PI)} />
        <meshStandardMaterial 
          color={color2}
          transparent
          opacity={0.9}
          emissive={color2}
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      
      {/* Connecting particles */}
      {Array.from({ length: 8 }, (_, i) => {
        const t = (i / 7) * height;
        const angle1 = t * Math.PI * 2;
        const angle2 = t * Math.PI * 2 + Math.PI;
        const x1 = Math.cos(angle1) * radius;
        const z1 = Math.sin(angle1) * radius;
        const x2 = Math.cos(angle2) * radius;
        const z2 = Math.sin(angle2) * radius;
        
        return (
          <mesh key={i} position={[(x1 + x2) / 2, t - height/2, (z1 + z2) / 2]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial 
              color="#06B6D4"
              transparent
              opacity={0.8}
              emissive="#06B6D4"
              emissiveIntensity={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default DNAHelix;
