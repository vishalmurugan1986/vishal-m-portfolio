import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import * as THREE from 'three';

interface HelloToyProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}

const HelloToy = ({ 
  position = [0, 0, 0], 
  scale = 1,
  color = "#8B5CF6"
}: HelloToyProps) => {
  const groupRef = useRef<Group>(null);
  const headRef = useRef<Mesh>(null);
  const bodyRef = useRef<Mesh>(null);
  const leftEyeRef = useRef<Mesh>(null);
  const rightEyeRef = useRef<Mesh>(null);
  const leftArmRef = useRef<Mesh>(null);
  const rightArmRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !headRef.current || !bodyRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Gentle bobbing motion
    groupRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.3;
    
    // Slight rotation
    groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
    
    // Head bobbing
    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(time * 2) * 0.1;
    }
    
    // Waving arms
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(time * 1.8) * 0.5;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -Math.sin(time * 1.8) * 0.5;
    }
    
    // Blinking eyes
    if (leftEyeRef.current && rightEyeRef.current) {
      const blink = Math.sin(time * 3) > 0.8 ? 0.1 : 1;
      leftEyeRef.current.scale.y = blink;
      rightEyeRef.current.scale.y = blink;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* Body */}
      <mesh ref={bodyRef} position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.8, 1, 1.5, 8]} />
        <meshStandardMaterial 
          color={color}
          transparent
          opacity={0.9}
          emissive={color}
          emissiveIntensity={0.1}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      
      {/* Head */}
      <mesh ref={headRef} position={[0, 0.8, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial 
          color={color}
          transparent
          opacity={0.9}
          emissive={color}
          emissiveIntensity={0.1}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      
      {/* Left Eye */}
      <mesh ref={leftEyeRef} position={[-0.3, 1, 0.7]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Right Eye */}
      <mesh ref={rightEyeRef} position={[0.3, 1, 0.7]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Smile */}
      <mesh position={[0, 0.5, 0.7]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.4, 0.05, 4, 16, Math.PI]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Left Arm */}
      <mesh ref={leftArmRef} position={[-1.2, -0.2, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
        <meshStandardMaterial 
          color={color}
          transparent
          opacity={0.9}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Right Arm */}
      <mesh ref={rightArmRef} position={[1.2, -0.2, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
        <meshStandardMaterial 
          color={color}
          transparent
          opacity={0.9}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Left Hand */}
      <mesh position={[-1.2, -0.8, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial 
          color={color}
          transparent
          opacity={0.9}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Right Hand */}
      <mesh position={[1.2, -0.8, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial 
          color={color}
          transparent
          opacity={0.9}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Hat */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.3, 8]} />
        <meshStandardMaterial 
          color="#EC4899"
          transparent
          opacity={0.9}
          emissive="#EC4899"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Hat Brim */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.1, 8]} />
        <meshStandardMaterial 
          color="#EC4899"
          transparent
          opacity={0.9}
          emissive="#EC4899"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};

export default HelloToy;
