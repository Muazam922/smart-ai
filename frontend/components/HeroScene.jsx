import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

const HeroScene = () => {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <mesh rotation={[0, 0, 0]}>
          <icosahedronGeometry args={[3, 1]} />
          <meshStandardMaterial color="#4F46E5" wireframe />
        </mesh>

        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Stars radius={100} depth={50} count={5000} factor={4} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
