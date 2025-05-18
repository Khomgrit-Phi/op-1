import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Model from './components/Model';
import ErrorBoundary from './components/ErrorBoundary';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ResponsiveCamera({ cameraRef }) {
  const { camera, size } = useThree();

  useEffect(() => {
    if (camera) {
      const aspect = size.width / size.height;

      // Wider field of view and further back
      camera.fov = size.width < 768 ? 85 : 70;
      camera.position.set(0, 2, size.width < 768 ? 50 : 40);
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

  useEffect(() => {
  if (!modelRef.current) return;

  const model = modelRef.current;
  let initialRotationY = model.rotation.y;

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        model.rotation.y = initialRotationY + progress * Math.PI * 2;
      },
      onRefresh: (self) => {
        // Resync the model’s rotation to avoid jump
        model.rotation.y = initialRotationY + self.progress * Math.PI * 2;
      },
    });
  });

  ScrollTrigger.refresh(); // Ensure latest layout state

  return () => ctx.revert();
}, []);


  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.style.pointerEvents = 'auto';
    }
  }, []);

  return (
    <div className="min-h-[300vh] w-screen bg-black text-white relative overflow-x-hidden">
      {/* Fixed Canvas Layer */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <ErrorBoundary>
          <Canvas shadows>
            <ResponsiveCamera />
            <fog attach="fog" args={['#000000', 5, 65]} />

            {/* Cinematic Lights */}
            <spotLight
              position={[5, 5, 5]}
              angle={0.3}
              penumbra={1}
              intensity={1.5}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[-5, 2, 2]} intensity={0.4} color="#e0e0ff" />
            <directionalLight position={[0, 5, -5]} intensity={1} color="#ffffff" />

            <mesh receiveShadow>
              <planeGeometry args={[100, 100]} />
              <shadowMaterial opacity={0.2} />
            </mesh>

            <Suspense fallback={null}>
              <Model ref={modelRef} />
              <Environment files="/studio_small_08_2k.hdr" />
            </Suspense>

            <OrbitControls ref={controlsRef} enableDamping enableZoom={false} />
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* UI Control */}
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

      {/* Scroll Section */}
      <div className="mt-[120vh] px-10 text-center space-y-10">
        <h2 className="text-4xl font-bold">Scroll Down to Explore</h2>
        <p className="text-lg text-gray-300">
          Interact with the OP-1 3D model and see real-time updates.
        </p>
        <div className="h-[150vh]" />
      </div>
    </div>
  );
}
