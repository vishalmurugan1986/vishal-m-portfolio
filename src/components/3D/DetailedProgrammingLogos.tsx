import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import * as THREE from 'three';

interface DetailedProgrammingLogosProps {
  position?: [number, number, number];
  logoType?: 'java' | 'javascript' | 'python' | 'html' | 'css' | 'sql' | 'react' | 'nodejs';
  scale?: number;
}

const DetailedProgrammingLogos = ({ 
  position = [0, 0, 0], 
  logoType = 'javascript',
  scale = 1
}: DetailedProgrammingLogosProps) => {
  const groupRef = useRef<Group>(null);
  const logoRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !logoRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Floating motion
    groupRef.current.position.y = position[1] + Math.sin(time * 1.2) * 0.5;
    
    // Rotation
    groupRef.current.rotation.y = time * 0.3;
    groupRef.current.rotation.x = Math.sin(time * 0.6) * 0.15;
    
    // Pulsing scale
    const pulse = 1 + Math.sin(time * 1.8) * 0.15;
    logoRef.current.scale.setScalar(pulse);
  });

  const renderJavaLogo = () => (
    <group>
      {/* Java cup shape */}
      <mesh>
        <cylinderGeometry args={[0.6, 0.4, 0.8, 8]} />
        <meshStandardMaterial color="#ED8B00" emissive="#FF6B00" emissiveIntensity={0.3} />
      </mesh>
      {/* Java handle */}
      <mesh position={[0.5, 0, 0]}>
        <torusGeometry args={[0.15, 0.05, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#ED8B00" emissive="#FF6B00" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );

  const renderJavaScriptLogo = () => (
    <group>
      {/* JavaScript shield shape */}
      <mesh>
        <octahedronGeometry args={[0.7]} />
        <meshStandardMaterial color="#F7DF1E" emissive="#FFE135" emissiveIntensity={0.3} />
      </mesh>
      {/* JS text representation */}
      <mesh position={[0, 0, 0.4]}>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );

  const renderPythonLogo = () => (
    <group>
      {/* Python snake-like shape */}
      <mesh>
        <torusGeometry args={[0.5, 0.2, 8, 16]} />
        <meshStandardMaterial color="#3776AB" emissive="#4A90E2" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.3, 0.3, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#FFD43B" emissive="#FFE135" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );

  const renderHtmlLogo = () => (
    <group>
      {/* HTML tag shape */}
      <mesh>
        <boxGeometry args={[0.8, 1, 0.2]} />
        <meshStandardMaterial color="#E34F26" emissive="#FF6B47" emissiveIntensity={0.3} />
      </mesh>
      {/* HTML brackets */}
      <mesh position={[-0.4, 0, 0.15]}>
        <boxGeometry args={[0.1, 0.6, 0.05]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.4, 0, 0.15]}>
        <boxGeometry args={[0.1, 0.6, 0.05]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );

  const renderCssLogo = () => (
    <group>
      {/* CSS shield shape */}
      <mesh>
        <coneGeometry args={[0.6, 1, 6]} />
        <meshStandardMaterial color="#1572B6" emissive="#2E8BCC" emissiveIntensity={0.3} />
      </mesh>
      {/* CSS styling lines */}
      <mesh position={[0, 0.2, 0.1]}>
        <boxGeometry args={[0.4, 0.05, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, -0.1, 0.1]}>
        <boxGeometry args={[0.3, 0.05, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );

  const renderSqlLogo = () => (
    <group>
      {/* SQL database shape */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 0.8, 8]} />
        <meshStandardMaterial color="#336791" emissive="#4A7C9A" emissiveIntensity={0.3} />
      </mesh>
      {/* SQL lines */}
      <mesh position={[0, 0.5, 0.1]}>
        <boxGeometry args={[0.6, 0.05, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, 0.3, 0.1]}>
        <boxGeometry args={[0.4, 0.05, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );

  const renderReactLogo = () => (
    <group>
      {/* React atom shape */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#61DAFB" emissive="#7DE8FF" emissiveIntensity={0.4} />
      </mesh>
      {/* React orbits */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.6, 0.02, 8, 16]} />
        <meshStandardMaterial color="#61DAFB" emissive="#7DE8FF" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[Math.PI/3, 0, 0]}>
        <torusGeometry args={[0.6, 0.02, 8, 16]} />
        <meshStandardMaterial color="#61DAFB" emissive="#7DE8FF" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI/3, 0, 0]}>
        <torusGeometry args={[0.6, 0.02, 8, 16]} />
        <meshStandardMaterial color="#61DAFB" emissive="#7DE8FF" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );

  const renderNodejsLogo = () => (
    <group>
      {/* Node.js hexagon shape */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 0.6, 6]} />
        <meshStandardMaterial color="#339933" emissive="#4CAF50" emissiveIntensity={0.3} />
      </mesh>
      {/* Node.js text representation */}
      <mesh position={[0, 0, 0.35]}>
        <boxGeometry args={[0.2, 0.1, 0.05]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );

  const renderLogo = () => {
    switch (logoType) {
      case 'java':
        return renderJavaLogo();
      case 'javascript':
        return renderJavaScriptLogo();
      case 'python':
        return renderPythonLogo();
      case 'html':
        return renderHtmlLogo();
      case 'css':
        return renderCssLogo();
      case 'sql':
        return renderSqlLogo();
      case 'react':
        return renderReactLogo();
      case 'nodejs':
        return renderNodejsLogo();
      default:
        return renderJavaScriptLogo();
    }
  };

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      <group ref={logoRef}>
        {renderLogo()}
      </group>
      
      {/* Floating particles around the logo */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 1.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <mesh key={i} position={[x, Math.sin(angle * 2) * 0.3, z]}>
            <sphereGeometry args={[0.03, 6, 6]} />
            <meshStandardMaterial 
              color="#FFFFFF"
              transparent
              opacity={0.7}
              emissive="#FFFFFF"
              emissiveIntensity={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default DetailedProgrammingLogos;
