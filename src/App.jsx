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
      camera.fov = size.width < 768 ? 80 : 55;
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

  useEffect(() => {
    const sections = document.querySelectorAll('.feature-section');
    const rotations = [
  [0, 0, 0],                      // Intro
  [0.5, Math.PI / 5, 0],          // Design
  [0, Math.PI / 2, -.5],          // Sound
  [0.1, Math.PI * 0.75, 0.1],     // Connectivity
  [0, Math.PI, 0],                // Final
];


    const cleanup = [];

    const setupScroll = () => {
      if (!modelRef.current) {
        requestAnimationFrame(setupScroll);
        return;
      }

      const model = modelRef.current;

      sections.forEach((section, i) => {
        const overlay = section.querySelector('.feature-overlay');

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          onEnter: () => {
            gsap.to(model.rotation, {
              x: rotations[i][0],
              y: rotations[i][1],
              z: rotations[i][2],
              duration: 1.5,
              // ease: 'power2.inOut',
              overwrite: 'auto',
            });

            if (overlay) {
              gsap.to(overlay, {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                // ease: 'power3.out',
              });
            }
          },
          onLeave: () => {
            if (overlay) {
              gsap.to(overlay, {
                autoAlpha: 0,
                y: 50,
                duration: 0.8,
                // ease: 'power2.in',
              });
            }
          },
          onEnterBack: () => {
            gsap.to(model.rotation, {
              x: rotations[i][0],
              y: rotations[i][1],
              z: rotations[i][2],
              duration: 1.5,
              // ease: 'power2.inOut',
              overwrite: 'auto',
            });

            if (overlay) {
              gsap.to(overlay, {
                autoAlpha: 1,
                y: 0,
                duration: 1.5,
                // ease: 'power3.out',
              });
            }
          },
          onLeaveBack: () => {
            if (overlay) {
              gsap.to(overlay, {
                autoAlpha: 0,
                y: 50,
                duration: 1.5,
                // ease: 'power2.in',
              });
            }
          },
        });

        cleanup.push(() => trigger.kill());
      });

      ScrollTrigger.refresh();
    };

    setupScroll();
    return () => cleanup.forEach((dispose) => dispose());
  }, []);

  return (
    <div className="min-h-[600vh] w-screen bg-black text-white relative overflow-x-hidden">
      {/* Canvas */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <ErrorBoundary>
          <Canvas shadows>
            <ResponsiveCamera />
            <fog attach="fog" args={['#000000', 5, 85]} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 20, 10]} intensity={1.5} />

            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[100, 100]} />
              <shadowMaterial opacity={0.25} />
            </mesh>

            <Suspense fallback={null}>
              <Model ref={modelRef} />
              <Environment files="/canada_montreal_loft_max_sunny.exr" />
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

      {/* UI Button */}
      <div className="fixed top-5 left-5 z-10 bg-black/60 text-white p-4 rounded-xl space-y-2">
        <h1 className="text-2xl font-bold">Custom OP-1</h1>
        <p className="text-sm">Explore materials and lighting effects.</p>
        <button
          className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
          onClick={() => window.toggleEmissive?.()}
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
            <div className="feature-overlay opacity-0 translate-y-12 transition-all duration-700">
              <h2 className="text-4xl font-bold mb-4">{label} Feature</h2>
              <p className="text-lg text-gray-300 max-w-xl">
                Detail about {label.toLowerCase()} goes here.
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
