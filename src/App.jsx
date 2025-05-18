import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Model from './components/Model';
import ErrorBoundary from './components/ErrorBoundary';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    if (camera) {
      camera.fov = size.width < 768 ? 50 : 35;
      camera.position.set(6, 6, 40);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }
  }, [camera, size]);
  

  return null;
}

export default function App() {
  const modelRef = useRef();
  const controlsRef = useRef();

  const handleHighlight = () => {
    if (modelRef.current) {
      window.toggleEmissive?.();
    }
  };
// Scroll Trigger
  useEffect(() => {
  let scrollTriggerInstance;

  const trySetupScrollTrigger = () => {
    const scrollGroup = modelRef.current; // outer group in <Model />
    if (!scrollGroup) {
      requestAnimationFrame(trySetupScrollTrigger);
      return;
    }

    scrollTriggerInstance = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        scrollGroup.rotation.y = self.progress * Math.PI * 2;
      },
      onRefresh: (self) => {
        scrollGroup.rotation.y = self.progress * Math.PI * 2;
      },
    });

    ScrollTrigger.refresh();
  };

  setTimeout(trySetupScrollTrigger, 50); // Delay ensures layout + model is ready

  return () => {
    if (scrollTriggerInstance) scrollTriggerInstance.kill();
  };
}, []);




  // Just to confirm it's linked properly
  useEffect(() => {
    if (modelRef.current) {
      console.log("✅ modelRef is correctly linked:", modelRef.current);
    }
  }, []);

  // Ensure canvas is interactive
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.style.pointerEvents = 'auto';
    }
  }, []);

  return (
    <div className="min-h-[300vh] w-screen bg-black text-white relative overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <ErrorBoundary>
          <Canvas shadows>
            <ResponsiveCamera />
            <fog attach="fog" args={['#000000', 5, 85]} />

            <ambientLight intensity={0.15} />
            <spotLight
              position={[10, 15, 10]}
              angle={0.3}
              penumbra={0.8}
              intensity={2}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <directionalLight position={[-10, 10, 5]} intensity={1} />

            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[100, 100]} />
              <shadowMaterial opacity={0.25} />
            </mesh>

            <Suspense fallback={null}>
              <Model ref={modelRef} />
              <Environment files="/studio_small_08_2k.hdr" />
            </Suspense>

            <OrbitControls
              ref={controlsRef}
              enableDamping
              enableZoom={false}
              minPolarAngle={Math.PI / 3.5}
              maxPolarAngle={Math.PI / 3.5}
            />
          </Canvas>
        </ErrorBoundary>
      </div>

      <div className="absolute top-5 left-5 z-10 bg-black/60 text-white p-4 rounded-xl space-y-2">
        <h1 className="text-2xl font-bold">Custom OP-1</h1>
        <p className="text-sm">Explore materials and lighting effects.</p>
        <button
          className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
          onClick={handleHighlight}
        >
          Toggle Emissive
        </button>
      </div>

      {/* Scroll Sections */}
<div className="relative z-10">
  {['Intro', 'Design', 'Sound', 'Connectivity', 'Final'].map((label, i) => (
    <section
      key={i}
      className="feature-section h-screen flex flex-col items-center justify-center px-10 text-center"
    >
      <h2 className="text-4xl font-bold mb-4">{label} Feature</h2>
      <p className="text-lg text-gray-300 max-w-xl">
        Detailed explanation about {label.toLowerCase()} feature goes here.
      </p>
    </section>
  ))}
</div>

    </div>
  );
}
