import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import * as THREE from 'three';

interface ProgrammingLogosProps {
  position?: [number, number, number];
  logoType?: 'java' | 'javascript' | 'python' | 'html' | 'css' | 'sql' | 'react' | 'nodejs';
  scale?: number;
}

const ProgrammingLogos = ({ 
  position = [0, 0, 0], 
  logoType = 'javascript',
  scale = 1
}: ProgrammingLogosProps) => {
  const groupRef = useRef<Group>(null);
  const logoRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !logoRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Floating motion
    groupRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.4;
    
    // Rotation
    groupRef.current.rotation.y = time * 0.5;
    groupRef.current.rotation.x = Math.sin(time * 0.8) * 0.1;
    
    // Pulsing scale
    const pulse = 1 + Math.sin(time * 2) * 0.1;
    logoRef.current.scale.setScalar(pulse);
  });

  const getLogoGeometry = () => {
    switch (logoType) {
      case 'java':
        return <boxGeometry args={[1, 1, 0.2]} />;
      case 'javascript':
        return <sphereGeometry args={[0.6, 16, 16]} />;
      case 'python':
        return <cylinderGeometry args={[0.6, 0.6, 0.3, 6]} />;
      case 'html':
        return <octahedronGeometry args={[0.7]} />;
      case 'css':
        return <coneGeometry args={[0.6, 1, 6]} />;
      case 'sql':
        return <torusGeometry args={[0.5, 0.2, 8, 16]} />;
      case 'react':
        return <sphereGeometry args={[0.5, 12, 12]} />;
      case 'nodejs':
        return <cylinderGeometry args={[0.4, 0.4, 0.8, 8]} />;
      default:
        return <boxGeometry args={[1, 1, 0.2]} />;
    }
  };

  const getLogoColor = () => {
    switch (logoType) {
      case 'java':
        return '#ED8B00'; // Java orange
      case 'javascript':
        return '#F7DF1E'; // JavaScript yellow
      case 'python':
        return '#3776AB'; // Python blue
      case 'html':
        return '#E34F26'; // HTML red
      case 'css':
        return '#1572B6'; // CSS blue
      case 'sql':
        return '#336791'; // SQL blue
      case 'react':
        return '#61DAFB'; // React cyan
      case 'nodejs':
        return '#339933'; // Node.js green
      default:
        return '#8B5CF6';
    }
  };

  const getLogoEmissive = () => {
    switch (logoType) {
      case 'java':
        return '#FF6B00';
      case 'javascript':
        return '#FFE135';
      case 'python':
        return '#4A90E2';
      case 'html':
        return '#FF6B47';
      case 'css':
        return '#2E8BCC';
      case 'sql':
        return '#4A7C9A';
      case 'react':
        return '#7DE8FF';
      case 'nodejs':
        return '#4CAF50';
      default:
        return '#8B5CF6';
    }
  };

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      <mesh ref={logoRef}>
        {getLogoGeometry()}
        <meshStandardMaterial 
          color={getLogoColor()}
          transparent
          opacity={0.9}
          emissive={getLogoEmissive()}
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* Add some floating particles around the logo */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 1.2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial 
              color={getLogoColor()}
              transparent
              opacity={0.6}
              emissive={getLogoEmissive()}
              emissiveIntensity={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default ProgrammingLogos;
