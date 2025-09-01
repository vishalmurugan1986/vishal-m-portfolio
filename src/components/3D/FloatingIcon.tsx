import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import useMobile from '@/hooks/use-mobile';

interface FloatingIconProps {
  position: [number, number, number];
  icon: string;
  color: string;
  speed: number;
}

const FloatingIcon = ({ position, icon, color, speed }: FloatingIconProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { isMobile, isTablet } = useMobile();

  // Reduce complexity on mobile devices
  const isLowPerformanceDevice = isMobile || isTablet;

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Simplified animations for mobile
    if (isLowPerformanceDevice) {
      meshRef.current.position.y = position[1] + Math.sin(time * speed * 0.5) * 0.5;
      meshRef.current.rotation.z = time * speed * 0.2;
    } else {
      // Full animations for desktop
      meshRef.current.position.y = position[1] + Math.sin(time * speed) * 1;
      meshRef.current.rotation.x = time * speed * 0.3;
      meshRef.current.rotation.y = time * speed * 0.2;
      meshRef.current.rotation.z = time * speed * 0.1;
    }
  });

  // Reduce icon size on mobile for better performance
  const iconSize = isLowPerformanceDevice ? 0.8 : 1.2;

  return (
    <mesh ref={meshRef} position={position}>
      <Text
        fontSize={iconSize}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/NotoSansEmoji-Regular.ttf"
        fallbackFont="Arial"
      >
        {icon}
      </Text>
    </mesh>
  );
};

export default FloatingIcon;