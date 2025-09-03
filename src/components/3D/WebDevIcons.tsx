import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import * as THREE from 'three';

interface WebDevIconsProps {
  position?: [number, number, number];
  iconType?: 'browser' | 'code' | 'database' | 'api' | 'mobile' | 'cloud' | 'git' | 'terminal';
  scale?: number;
}

const WebDevIcons = ({ 
  position = [0, 0, 0], 
  iconType = 'browser',
  scale = 1
}: WebDevIconsProps) => {
  const groupRef = useRef<Group>(null);
  const iconRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !iconRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Floating motion
    groupRef.current.position.y = position[1] + Math.sin(time * 1.2) * 0.5;
    
    // Rotation
    groupRef.current.rotation.y = time * 0.3;
    groupRef.current.rotation.x = Math.sin(time * 0.6) * 0.15;
    
    // Pulsing scale
    const pulse = 1 + Math.sin(time * 1.8) * 0.15;
    iconRef.current.scale.setScalar(pulse);
  });

  const renderBrowserIcon = () => (
    <group>
      {/* Browser window */}
      <mesh>
        <boxGeometry args={[1.2, 0.8, 0.1]} />
        <meshStandardMaterial color="#4A90E2" emissive="#5BA3F5" emissiveIntensity={0.3} />
      </mesh>
      {/* Browser header */}
      <mesh position={[0, 0.3, 0.06]}>
        <boxGeometry args={[1.2, 0.2, 0.02]} />
        <meshStandardMaterial color="#2E5C8A" />
      </mesh>
      {/* Browser dots */}
      <mesh position={[-0.5, 0.3, 0.08]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#FF5F56" emissive="#FF6B62" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-0.4, 0.3, 0.08]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#FFBD2E" emissive="#FFD43B" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-0.3, 0.3, 0.08]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#27CA3F" emissive="#4CAF50" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );

  const renderCodeIcon = () => (
    <group>
      {/* Code brackets */}
      <mesh position={[-0.3, 0, 0]}>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#61DAFB" emissive="#7DE8FF" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-0.3, 0.3, 0]} rotation={[0, 0, Math.PI/4]}>
        <boxGeometry args={[0.1, 0.3, 0.1]} />
        <meshStandardMaterial color="#61DAFB" emissive="#7DE8FF" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-0.3, -0.3, 0]} rotation={[0, 0, -Math.PI/4]}>
        <boxGeometry args={[0.1, 0.3, 0.1]} />
        <meshStandardMaterial color="#61DAFB" emissive="#7DE8FF" emissiveIntensity={0.4} />
      </mesh>
      
      {/* Right bracket */}
      <mesh position={[0.3, 0, 0]}>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#61DAFB" emissive="#7DE8FF" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.3, 0.3, 0]} rotation={[0, 0, -Math.PI/4]}>
        <boxGeometry args={[0.1, 0.3, 0.1]} />
        <meshStandardMaterial color="#61DAFB" emissive="#7DE8FF" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.3, -0.3, 0]} rotation={[0, 0, Math.PI/4]}>
        <boxGeometry args={[0.1, 0.3, 0.1]} />
        <meshStandardMaterial color="#61DAFB" emissive="#7DE8FF" emissiveIntensity={0.4} />
      </mesh>
      
      {/* Code lines */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.4, 0.05, 0.05]} />
        <meshStandardMaterial color="#F7DF1E" emissive="#FFE135" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[0.3, 0.05, 0.05]} />
        <meshStandardMaterial color="#F7DF1E" emissive="#FFE135" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );

  const renderDatabaseIcon = () => (
    <group>
      {/* Database cylinders */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
        <meshStandardMaterial color="#336791" emissive="#4A7C9A" emissiveIntensity={0.3} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
        <meshStandardMaterial color="#336791" emissive="#4A7C9A" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
        <meshStandardMaterial color="#336791" emissive="#4A7C9A" emissiveIntensity={0.3} />
      </mesh>
      {/* Connection lines */}
      <mesh position={[0.35, 0, 0]}>
        <boxGeometry args={[0.02, 0.4, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[-0.35, 0, 0]}>
        <boxGeometry args={[0.02, 0.4, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );

  const renderApiIcon = () => (
    <group>
      {/* API hexagon */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 6]} />
        <meshStandardMaterial color="#FF6B47" emissive="#FF8A65" emissiveIntensity={0.3} />
      </mesh>
      {/* API connections */}
      <mesh position={[0.6, 0, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#4CAF50" emissive="#66BB6A" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-0.6, 0, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#4CAF50" emissive="#66BB6A" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#4CAF50" emissive="#66BB6A" emissiveIntensity={0.4} />
      </mesh>
      {/* Connection lines */}
      <mesh position={[0.3, 0, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[-0.3, 0, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.02, 0.3, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );

  const renderMobileIcon = () => (
    <group>
      {/* Mobile phone */}
      <mesh>
        <boxGeometry args={[0.5, 0.9, 0.1]} />
        <meshStandardMaterial color="#2E2E2E" emissive="#404040" emissiveIntensity={0.2} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[0.4, 0.7, 0.02]} />
        <meshStandardMaterial color="#61DAFB" emissive="#7DE8FF" emissiveIntensity={0.4} />
      </mesh>
      {/* Home button */}
      <mesh position={[0, -0.35, 0.06]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );

  const renderCloudIcon = () => (
    <group>
      {/* Cloud shape */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#F5F5F5" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-0.2, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#F5F5F5" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.2, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#F5F5F5" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#F5F5F5" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );

  const renderGitIcon = () => (
    <group>
      {/* Git branching */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#F05032" emissive="#FF6B47" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-0.3, 0, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#F05032" emissive="#FF6B47" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.3, 0, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#F05032" emissive="#FF6B47" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#F05032" emissive="#FF6B47" emissiveIntensity={0.4} />
      </mesh>
      {/* Branch lines */}
      <mesh position={[-0.15, 0.15, 0]} rotation={[0, 0, Math.PI/4]}>
        <boxGeometry args={[0.3, 0.02, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.15, 0.15, 0]} rotation={[0, 0, -Math.PI/4]}>
        <boxGeometry args={[0.3, 0.02, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.02, 0.3, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );

  const renderTerminalIcon = () => (
    <group>
      {/* Terminal window */}
      <mesh>
        <boxGeometry args={[1, 0.7, 0.1]} />
        <meshStandardMaterial color="#1E1E1E" emissive="#2E2E2E" emissiveIntensity={0.2} />
      </mesh>
      {/* Terminal prompt */}
      <mesh position={[-0.3, 0.1, 0.06]}>
        <boxGeometry args={[0.05, 0.05, 0.02]} />
        <meshStandardMaterial color="#4CAF50" emissive="#66BB6A" emissiveIntensity={0.4} />
      </mesh>
      {/* Command lines */}
      <mesh position={[-0.1, 0.1, 0.06]}>
        <boxGeometry args={[0.3, 0.02, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[-0.2, 0, 0.06]}>
        <boxGeometry args={[0.2, 0.02, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[-0.15, -0.1, 0.06]}>
        <boxGeometry args={[0.25, 0.02, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );

  const renderIcon = () => {
    switch (iconType) {
      case 'browser':
        return renderBrowserIcon();
      case 'code':
        return renderCodeIcon();
      case 'database':
        return renderDatabaseIcon();
      case 'api':
        return renderApiIcon();
      case 'mobile':
        return renderMobileIcon();
      case 'cloud':
        return renderCloudIcon();
      case 'git':
        return renderGitIcon();
      case 'terminal':
        return renderTerminalIcon();
      default:
        return renderBrowserIcon();
    }
  };

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      <group ref={iconRef}>
        {renderIcon()}
      </group>
      
      {/* Floating particles around the icon */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 1.2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <mesh key={i} position={[x, Math.sin(angle * 3) * 0.2, z]}>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshStandardMaterial 
              color="#61DAFB"
              transparent
              opacity={0.8}
              emissive="#7DE8FF"
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default WebDevIcons;
