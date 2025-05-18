
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export default function GoboLight() {
  const gobo = useLoader(THREE.TextureLoader, '/GSG_Gobos_Plants_Palm_01.jpg');

  return (
    <spotLight
      position={[5, 10, 5]}
      angle={Math.PI / 6}
      penumbra={1}
      castShadow
      intensity={2}
      map={gobo} // not native prop, see note below
    >
      <primitive attach="map" object={gobo} />
    </spotLight>
  );
}
