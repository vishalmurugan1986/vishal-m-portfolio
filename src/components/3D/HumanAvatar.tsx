import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import * as THREE from 'three';

interface HumanAvatarProps {
  position?: [number, number, number];
  scale?: number;
  skinColor?: string;
  hoodieColor?: string;
}

const HumanAvatar = ({ 
  position = [0, 0, 0], 
  scale = 1,
  skinColor = "#FDBCB4",
  hoodieColor = "#4A5568"
}: HumanAvatarProps) => {
  const groupRef = useRef<Group>(null);
  const headRef = useRef<Mesh>(null);
  const leftArmRef = useRef<Mesh>(null);
  const rightArmRef = useRef<Mesh>(null);
  const leftHandRef = useRef<Mesh>(null);
  const rightHandRef = useRef<Mesh>(null);
  const leftGlassesRef = useRef<Mesh>(null);
  const rightGlassesRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !headRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Gentle floating motion
    groupRef.current.position.y = position[1] + Math.sin(time * 1.2) * 0.3;
    
    // Slight swaying
    groupRef.current.rotation.z = Math.sin(time * 0.8) * 0.05;
    
    // Head nodding
    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(time * 1.5) * 0.1;
    }
    
    // Waving right hand
    if (rightArmRef.current && rightHandRef.current) {
      const waveAngle = Math.sin(time * 2) * 0.8;
      rightArmRef.current.rotation.z = waveAngle;
      rightHandRef.current.rotation.z = waveAngle * 0.5;
    }
    
    // Glasses slight movement
    if (leftGlassesRef.current && rightGlassesRef.current) {
      leftGlassesRef.current.rotation.z = Math.sin(time * 1.8) * 0.02;
      rightGlassesRef.current.rotation.z = Math.sin(time * 1.8) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* Body (Hoodie) */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 1.8, 8]} />
        <meshStandardMaterial 
          color={hoodieColor}
          transparent
          opacity={0.95}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial 
          color={skinColor}
          transparent
          opacity={0.95}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      {/* Hair */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.75, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial 
          color="#2D3748"
          transparent
          opacity={0.95}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      
      {/* Left Eye */}
      <mesh position={[-0.2, 1.3, 0.6]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Right Eye */}
      <mesh position={[0.2, 1.3, 0.6]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Left Glasses Frame */}
      <mesh ref={leftGlassesRef} position={[-0.2, 1.3, 0.65]}>
        <torusGeometry args={[0.12, 0.02, 8, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Right Glasses Frame */}
      <mesh ref={rightGlassesRef} position={[0.2, 1.3, 0.65]}>
        <torusGeometry args={[0.12, 0.02, 8, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Glasses Bridge */}
      <mesh position={[0, 1.3, 0.65]}>
        <boxGeometry args={[0.15, 0.02, 0.02]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 1.1, 0.7]}>
        <coneGeometry args={[0.05, 0.15, 6]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>
      
      {/* Mustache */}
      <mesh position={[0, 0.95, 0.7]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.08, 0.05]} />
        <meshStandardMaterial color="#2D3748" />
      </mesh>
      
      {/* Beard */}
      <mesh position={[0, 0.7, 0.7]}>
        <coneGeometry args={[0.25, 0.4, 8]} />
        <meshStandardMaterial color="#2D3748" />
      </mesh>
      
      {/* Mouth */}
      <mesh position={[0, 0.9, 0.7]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.15, 0.02, 4, 16, Math.PI]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Left Arm */}
      <mesh ref={leftArmRef} position={[-0.9, 0.3, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 1.2, 8]} />
        <meshStandardMaterial 
          color={hoodieColor}
          transparent
          opacity={0.95}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      
      {/* Right Arm */}
      <mesh ref={rightArmRef} position={[0.9, 0.3, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 1.2, 8]} />
        <meshStandardMaterial 
          color={hoodieColor}
          transparent
          opacity={0.95}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      
      {/* Left Hand */}
      <mesh ref={leftHandRef} position={[-0.9, -0.3, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial 
          color={skinColor}
          transparent
          opacity={0.95}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      {/* Right Hand (Waving) */}
      <mesh ref={rightHandRef} position={[0.9, -0.3, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial 
          color={skinColor}
          transparent
          opacity={0.95}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      {/* Hoodie Hood */}
      <mesh position={[0, 1.8, -0.2]}>
        <sphereGeometry args={[0.8, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
        <meshStandardMaterial 
          color={hoodieColor}
          transparent
          opacity={0.95}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      
      {/* Hoodie Strings */}
      <mesh position={[-0.3, 1.4, 0.5]}>
        <cylinderGeometry args={[0.01, 0.01, 0.3, 4]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.3, 1.4, 0.5]}>
        <cylinderGeometry args={[0.01, 0.01, 0.3, 4]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
};

export default HumanAvatar;
