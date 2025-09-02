import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import * as THREE from 'three';

interface FriendlyPersonProps {
  position?: [number, number, number];
  scale?: number;
  skinColor?: string;
  shirtColor?: string;
}

const FriendlyPerson = ({ 
  position = [0, 0, 0], 
  scale = 1,
  skinColor = "#FDBCB4",
  shirtColor = "#8B5CF6"
}: FriendlyPersonProps) => {
  const groupRef = useRef<Group>(null);
  const headRef = useRef<Mesh>(null);
  const rightArmRef = useRef<Mesh>(null);
  const rightHandRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !headRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Gentle floating motion
    groupRef.current.position.y = position[1] + Math.sin(time * 1.0) * 0.4;
    
    // Slight swaying
    groupRef.current.rotation.z = Math.sin(time * 0.6) * 0.08;
    
    // Head nodding
    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(time * 1.2) * 0.12;
    }
    
    // Waving right hand
    if (rightArmRef.current && rightHandRef.current) {
      const waveAngle = Math.sin(time * 1.8) * 0.6;
      rightArmRef.current.rotation.z = waveAngle;
      rightHandRef.current.rotation.z = waveAngle * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* Body (Shirt) */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.5, 0.7, 1.6, 8]} />
        <meshStandardMaterial 
          color={shirtColor}
          transparent
          opacity={0.9}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.6, 12, 12]} />
        <meshStandardMaterial 
          color={skinColor}
          transparent
          opacity={0.9}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      
      {/* Hair */}
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.65, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial 
          color="#1A202C"
          transparent
          opacity={0.9}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      {/* Left Eye */}
      <mesh position={[-0.18, 1.2, 0.5]}>
        <sphereGeometry args={[0.06, 6, 6]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Right Eye */}
      <mesh position={[0.18, 1.2, 0.5]}>
        <sphereGeometry args={[0.06, 6, 6]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Glasses */}
      <mesh position={[-0.18, 1.2, 0.52]}>
        <torusGeometry args={[0.1, 0.015, 6, 12]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.18, 1.2, 0.52]}>
        <torusGeometry args={[0.1, 0.015, 6, 12]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0, 1.2, 0.52]}>
        <boxGeometry args={[0.12, 0.015, 0.015]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 1.05, 0.6]}>
        <coneGeometry args={[0.04, 0.12, 6]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>
      
      {/* Mustache */}
      <mesh position={[0, 0.9, 0.6]}>
        <boxGeometry args={[0.25, 0.06, 0.04]} />
        <meshStandardMaterial color="#2D3748" />
      </mesh>
      
      {/* Beard */}
      <mesh position={[0, 0.7, 0.6]}>
        <coneGeometry args={[0.2, 0.35, 8]} />
        <meshStandardMaterial color="#2D3748" />
      </mesh>
      
      {/* Smile */}
      <mesh position={[0, 0.85, 0.6]}>
        <torusGeometry args={[0.12, 0.015, 4, 12, Math.PI]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Left Arm */}
      <mesh position={[-0.8, 0.4, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1.0, 6]} />
        <meshStandardMaterial 
          color={shirtColor}
          transparent
          opacity={0.9}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      
      {/* Right Arm */}
      <mesh ref={rightArmRef} position={[0.8, 0.4, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1.0, 6]} />
        <meshStandardMaterial 
          color={shirtColor}
          transparent
          opacity={0.9}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      
      {/* Left Hand */}
      <mesh position={[-0.8, -0.1, 0]}>
        <sphereGeometry args={[0.12, 6, 6]} />
        <meshStandardMaterial 
          color={skinColor}
          transparent
          opacity={0.9}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      
      {/* Right Hand (Waving) */}
      <mesh ref={rightHandRef} position={[0.8, -0.1, 0]}>
        <sphereGeometry args={[0.12, 6, 6]} />
        <meshStandardMaterial 
          color={skinColor}
          transparent
          opacity={0.9}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
};

export default FriendlyPerson;
