import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text3D } from '@react-three/drei';
import { Mesh } from 'three';

interface FloatingIconProps {
  position: [number, number, number];
  icon: string;
  color?: string;
  speed?: number;
}

const FloatingIcon = ({ position, icon, color = "#8B5CF6", speed = 1 }: FloatingIconProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.8) * 0.2;
    }
  });

  return (
    <Float
      speed={speed}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      floatingRange={[0, 1]}
    >
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
      <Text3D
        position={[position[0], position[1] - 2, position[2]]}
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.3}
        height={0.05}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        {icon}
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.9}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </Text3D>
    </Float>
  );
};

export default FloatingIcon;