import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import * as THREE from 'three';

interface DeveloperToolsProps {
  position?: [number, number, number];
  toolType?: 'vscode' | 'github' | 'docker' | 'npm' | 'webpack' | 'figma' | 'postman' | 'slack';
  scale?: number;
}

const DeveloperTools = ({ 
  position = [0, 0, 0], 
  toolType = 'vscode',
  scale = 1
}: DeveloperToolsProps) => {
  const groupRef = useRef<Group>(null);
  const toolRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current || !toolRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Floating motion
    groupRef.current.position.y = position[1] + Math.sin(time * 1.2) * 0.5;
    
    // Rotation
    groupRef.current.rotation.y = time * 0.3;
    groupRef.current.rotation.x = Math.sin(time * 0.6) * 0.15;
    
    // Pulsing scale
    const pulse = 1 + Math.sin(time * 1.8) * 0.15;
    toolRef.current.scale.setScalar(pulse);
  });

  const renderVSCodeIcon = () => (
    <group>
      {/* VS Code window */}
      <mesh>
        <boxGeometry args={[1.2, 0.9, 0.1]} />
        <meshStandardMaterial color="#007ACC" emissive="#0099FF" emissiveIntensity={0.3} />
      </mesh>
      {/* VS Code sidebar */}
      <mesh position={[-0.4, 0, 0.06]}>
        <boxGeometry args={[0.4, 0.9, 0.02]} />
        <meshStandardMaterial color="#252526" />
      </mesh>
      {/* VS Code logo */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[0.3, 0.3, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      {/* Code lines */}
      <mesh position={[0.2, 0.2, 0.08]}>
        <boxGeometry args={[0.4, 0.03, 0.01]} />
        <meshStandardMaterial color="#569CD6" emissive="#7BB3E6" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.15, 0.1, 0.08]}>
        <boxGeometry args={[0.3, 0.03, 0.01]} />
        <meshStandardMaterial color="#CE9178" emissive="#E8A188" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.25, 0, 0.08]}>
        <boxGeometry args={[0.5, 0.03, 0.01]} />
        <meshStandardMaterial color="#9CDCFE" emissive="#ACECFF" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );

  const renderGitHubIcon = () => (
    <group>
      {/* GitHub cat shape */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#24292e" emissive="#404040" emissiveIntensity={0.2} />
      </mesh>
      {/* GitHub ears */}
      <mesh position={[-0.25, 0.35, 0]}>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshStandardMaterial color="#24292e" emissive="#404040" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.25, 0.35, 0]}>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshStandardMaterial color="#24292e" emissive="#404040" emissiveIntensity={0.2} />
      </mesh>
      {/* GitHub eyes */}
      <mesh position={[-0.15, 0.1, 0.4]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.15, 0.1, 0.4]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      {/* GitHub whiskers */}
      <mesh position={[-0.4, 0, 0.3]} rotation={[0, 0, Math.PI/6]}>
        <boxGeometry args={[0.2, 0.02, 0.01]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.4, 0, 0.3]} rotation={[0, 0, -Math.PI/6]}>
        <boxGeometry args={[0.2, 0.02, 0.01]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );

  const renderDockerIcon = () => (
    <group>
      {/* Docker whale body */}
      <mesh>
        <boxGeometry args={[1, 0.6, 0.4]} />
        <meshStandardMaterial color="#2496ED" emissive="#4AA6FF" emissiveIntensity={0.3} />
      </mesh>
      {/* Docker containers */}
      <mesh position={[-0.3, 0, 0.25]}>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="#0DB7ED" emissive="#2DC7FF" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-0.1, 0, 0.25]}>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="#0DB7ED" emissive="#2DC7FF" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.1, 0, 0.25]}>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="#0DB7ED" emissive="#2DC7FF" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.3, 0, 0.25]}>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="#0DB7ED" emissive="#2DC7FF" emissiveIntensity={0.3} />
      </mesh>
      {/* Docker spout */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );

  const renderNpmIcon = () => (
    <group>
      {/* NPM cube */}
      <mesh>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#CB3837" emissive="#E54B4B" emissiveIntensity={0.3} />
      </mesh>
      {/* NPM letters */}
      <mesh position={[-0.2, 0, 0.42]}>
        <boxGeometry args={[0.1, 0.4, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[-0.2, 0.15, 0.42]}>
        <boxGeometry args={[0.15, 0.1, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, 0, 0.42]}>
        <boxGeometry args={[0.1, 0.4, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, 0.15, 0.42]}>
        <boxGeometry args={[0.15, 0.1, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.2, 0, 0.42]}>
        <boxGeometry args={[0.1, 0.4, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.2, 0.15, 0.42]}>
        <boxGeometry args={[0.15, 0.1, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );

  const renderWebpackIcon = () => (
    <group>
      {/* Webpack cube */}
      <mesh>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#8DD6F9" emissive="#A6E3FF" emissiveIntensity={0.3} />
      </mesh>
      {/* Webpack W pattern */}
      <mesh position={[-0.2, 0.1, 0.42]} rotation={[0, 0, Math.PI/6]}>
        <boxGeometry args={[0.4, 0.05, 0.02]} />
        <meshStandardMaterial color="#1C78C0" />
      </mesh>
      <mesh position={[0.2, 0.1, 0.42]} rotation={[0, 0, -Math.PI/6]}>
        <boxGeometry args={[0.4, 0.05, 0.02]} />
        <meshStandardMaterial color="#1C78C0" />
      </mesh>
      <mesh position={[-0.2, -0.1, 0.42]} rotation={[0, 0, -Math.PI/6]}>
        <boxGeometry args={[0.4, 0.05, 0.02]} />
        <meshStandardMaterial color="#1C78C0" />
      </mesh>
      <mesh position={[0.2, -0.1, 0.42]} rotation={[0, 0, Math.PI/6]}>
        <boxGeometry args={[0.4, 0.05, 0.02]} />
        <meshStandardMaterial color="#1C78C0" />
      </mesh>
    </group>
  );

  const renderFigmaIcon = () => (
    <group>
      {/* Figma circles */}
      <mesh position={[-0.2, 0.3, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#F24E1E" emissive="#FF6B47" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.2, 0.3, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#FF7262" emissive="#FF8A75" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-0.2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#A259FF" emissive="#B569FF" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#1ABCFE" emissive="#4ACCFF" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-0.2, -0.3, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#0ACF83" emissive="#2ADF93" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );

  const renderPostmanIcon = () => (
    <group>
      {/* Postman rocket */}
      <mesh>
        <coneGeometry args={[0.3, 1, 8]} />
        <meshStandardMaterial color="#FF6C37" emissive="#FF8A65" emissiveIntensity={0.3} />
      </mesh>
      {/* Postman body */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.4, 8]} />
        <meshStandardMaterial color="#FF6C37" emissive="#FF8A65" emissiveIntensity={0.3} />
      </mesh>
      {/* Postman fins */}
      <mesh position={[-0.2, -0.4, 0]}>
        <boxGeometry args={[0.1, 0.2, 0.3]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.2, -0.4, 0]}>
        <boxGeometry args={[0.1, 0.2, 0.3]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, -0.4, -0.2]}>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );

  const renderSlackIcon = () => (
    <group>
      {/* Slack hash symbol */}
      <mesh position={[-0.1, 0.2, 0]} rotation={[0, 0, Math.PI/4]}>
        <boxGeometry args={[0.6, 0.1, 0.1]} />
        <meshStandardMaterial color="#4A154B" emissive="#6A256B" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.1, -0.2, 0]} rotation={[0, 0, Math.PI/4]}>
        <boxGeometry args={[0.6, 0.1, 0.1]} />
        <meshStandardMaterial color="#4A154B" emissive="#6A256B" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.2, 0.1, 0]} rotation={[0, 0, -Math.PI/4]}>
        <boxGeometry args={[0.6, 0.1, 0.1]} />
        <meshStandardMaterial color="#ECB22E" emissive="#FFCC44" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-0.2, -0.1, 0]} rotation={[0, 0, -Math.PI/4]}>
        <boxGeometry args={[0.6, 0.1, 0.1]} />
        <meshStandardMaterial color="#ECB22E" emissive="#FFCC44" emissiveIntensity={0.3} />
      </mesh>
      {/* Slack circles */}
      <mesh position={[0.3, 0.3, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#E01E5A" emissive="#FF4A7A" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-0.3, -0.3, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#36C5F0" emissive="#56D5FF" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );

  const renderTool = () => {
    switch (toolType) {
      case 'vscode':
        return renderVSCodeIcon();
      case 'github':
        return renderGitHubIcon();
      case 'docker':
        return renderDockerIcon();
      case 'npm':
        return renderNpmIcon();
      case 'webpack':
        return renderWebpackIcon();
      case 'figma':
        return renderFigmaIcon();
      case 'postman':
        return renderPostmanIcon();
      case 'slack':
        return renderSlackIcon();
      default:
        return renderVSCodeIcon();
    }
  };

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      <group ref={toolRef}>
        {renderTool()}
      </group>
      
      {/* Floating particles around the tool */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 1.4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <mesh key={i} position={[x, Math.sin(angle * 2) * 0.3, z]}>
            <sphereGeometry args={[0.025, 6, 6]} />
            <meshStandardMaterial 
              color="#FFFFFF"
              transparent
              opacity={0.8}
              emissive="#FFFFFF"
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default DeveloperTools;
