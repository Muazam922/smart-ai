import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const BlockchainAnimation = () => {
  const nodes = useRef([]);
  
  useFrame(({ clock }) => {
    nodes.current.forEach((node, index) => {
      node.position.y = Math.sin(clock.elapsedTime + index) * 2;
      node.rotation.x += 0.01;
      node.rotation.y += 0.01;
    });
  });

  return (
    <group position={[0, -2, 0]}>
      {[...Array(10)].map((_, i) => (
        <mesh
          key={i}
          position={[i * 2 - 10, 0, 0]}
          ref={(el) => (nodes.current[i] = el)}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={i % 2 ? '#3B82F6' : '#6366F1'} />
        </mesh>
      ))}
    </group>
  );
};

export default BlockchainAnimation;
