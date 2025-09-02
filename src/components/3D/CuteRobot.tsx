import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import * as THREE from 'three';

interface CuteRobotProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}

const CuteRobot = ({ 
  position = [0, 0, 0], 
  scale = 1,
  color = "#06B6D4"
}: CuteRobotProps) => {
  const groupRef = useRef<Group>(null);
  const headRef = useRef<Mesh>(null);
  const leftAntennaRef = useRef<Mesh>(null);
  const rightAntennaRef = useRef<Mesh>(null);
  const leftEyeRef = useRef<Mesh>(null);
  const rightEyeRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !headRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Gentle floating motion
    groupRef.current.position.y = position[1] + Math.sin(time * 1.2) * 0.4;
    
    // Slight swaying
    groupRef.current.rotation.z = Math.sin(time * 0.8) * 0.1;
    
    // Head nodding
    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(time * 1.5) * 0.15;
    }
    
    // Antenna bouncing
    if (leftAntennaRef.current && rightAntennaRef.current) {
      leftAntennaRef.current.rotation.x = Math.sin(time * 2) * 0.2;
      rightAntennaRef.current.rotation.x = Math.sin(time * 2 + 0.5) * 0.2;
    }
    
    // Eye blinking
    if (leftEyeRef.current && rightEyeRef.current) {
      const blink = Math.sin(time * 4) > 0.7 ? 0.05 : 1;
      leftEyeRef.current.scale.y = blink;
      rightEyeRef.current.scale.y = blink;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* Body */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[1.2, 1.5, 0.8]} />
        <meshStandardMaterial 
          color={color}
          transparent
          opacity={0.9}
          emissive={color}
          emissiveIntensity={0.1}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>
      
      {/* Head */}
      <mesh ref={headRef} position={[0, 0.8, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={color}
          transparent
          opacity={0.9}
          emissive={color}
          emissiveIntensity={0.1}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>
      
      {/* Left Antenna */}
      <mesh ref={leftAntennaRef} position={[-0.3, 1.8, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 6]} />
        <meshStandardMaterial color="#EC4899" />
      </mesh>
      
      {/* Right Antenna */}
      <mesh ref={rightAntennaRef} position={[0.3, 1.8, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 6]} />
        <meshStandardMaterial color="#EC4899" />
      </mesh>
      
      {/* Antenna Balls */}
      <mesh position={[-0.3, 2.2, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.3, 2.2, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Left Eye */}
      <mesh ref={leftEyeRef} position={[-0.25, 0.9, 0.45]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#00FF00" emissive="#00FF00" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Right Eye */}
      <mesh ref={rightEyeRef} position={[0.25, 0.9, 0.45]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#00FF00" emissive="#00FF00" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Mouth */}
      <mesh position={[0, 0.3, 0.45]}>
        <boxGeometry args={[0.4, 0.1, 0.05]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Left Arm */}
      <mesh position={[-0.8, -0.2, 0]}>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshStandardMaterial 
          color={color}
          transparent
          opacity={0.9}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Right Arm */}
      <mesh position={[0.8, -0.2, 0]}>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshStandardMaterial 
          color={color}
          transparent
          opacity={0.9}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Left Hand */}
      <mesh position={[-0.8, -0.8, 0]}>
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
      <mesh position={[0.8, -0.8, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial 
          color={color}
          transparent
          opacity={0.9}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.3, -1.2, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial 
          color={color}
          transparent
          opacity={0.9}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh position={[0.3, -1.2, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial 
          color={color}
          transparent
          opacity={0.9}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
};

export default CuteRobot;
