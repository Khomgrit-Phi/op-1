import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Model from './components/Model';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader';
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
      [0, 0, 0],
      [0, Math.PI / 5, 0],
      [0.1, Math.PI / 2, 0.2],
      [0, Math.PI * 1, 0],
      [0, Math.PI, 0],
    ];
    const cameraPositions = [
      [6, 6, 40],
      [2, 2, 15],
      [20, 10, 45],
      [0, 2, 15],
      [2, 0, 45],
    ];

    const cleanup = [];

    const setupScroll = () => {
      if (!modelRef.current || !controlsRef.current) {
        requestAnimationFrame(setupScroll);
        return;
      }

      const model = modelRef.current;
      const camera = controlsRef.current.object;

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
              overwrite: 'auto',
            });

            gsap.to(camera.position, {
              x: cameraPositions[i][0],
              y: cameraPositions[i][1],
              z: cameraPositions[i][2],
              duration: 1.5,
              onUpdate: () => camera.lookAt(0, 0, 0),
            });

            if (overlay) {
              gsap.to(overlay, {
                autoAlpha: 1,
                y: 0,
                duration: 1,
              });
            }
          },
          onLeave: () => {
            if (overlay) {
              gsap.to(overlay, {
                autoAlpha: 0,
                y: 50,
                duration: 0.8,
              });
            }
          },
          onEnterBack: () => {
            gsap.to(model.rotation, {
              x: rotations[i][0],
              y: rotations[i][1],
              z: rotations[i][2],
              duration: 1.5,
              overwrite: 'auto',
            });

            gsap.to(camera.position, {
              x: cameraPositions[i][0],
              y: cameraPositions[i][1],
              z: cameraPositions[i][2],
              duration: 1.5,
              onUpdate: () => camera.lookAt(0, 0, 0),
            });

            if (overlay) {
              gsap.to(overlay, {
                autoAlpha: 1,
                y: 0,
                duration: 1,
              });
            }
          },
          onLeaveBack: () => {
            if (overlay) {
              gsap.to(overlay, {
                autoAlpha: 0,
                y: 50,
                duration: 0.8,
              });
            }
          },
        });

        cleanup.push(() => trigger.kill());
      });

      ScrollTrigger.refresh();
    };

    setupScroll();
    return () => cleanup.forEach(dispose => dispose());
  }, []);

  const featureDescriptions = [
  "Experience the iconic OP-1 from every angle with cinematic lighting and interactive controls.",
  "Customize the design: change materials, textures, and lighting to suit your aesthetic.",
  "Explore its powerful sound engine and effects modules crafted for musicians and creators.",
  "See how the OP-1 connects with your studio or live rig, showcasing versatile I/O and integration.",
  "Thank for exploring! Stay creative with your custom OP-1.",
];


  return (
    <div className="min-h-[600vh] w-screen bg-black text-white relative overflow-x-hidden">
      {/* Canvas */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <ErrorBoundary>
          <Canvas shadows>
            <ResponsiveCamera />
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 20, 10]} intensity={2} />

            <mesh rotation={[-Math.PI / 2, 2, 0]} receiveShadow>
              <planeGeometry args={[100, 100]} />
              <shadowMaterial opacity={0} />
            </mesh>

            <Suspense fallback={<Loader />}>

              <Environment files="/studio_small_08_2k.hdr" background />
              
              <Model ref={modelRef} />
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
        <h1 className="text-4xl font-bold">OP-1</h1>
        <p className="text-m">Explore materials and lighting in React Three Fiber.</p>
      </div>

      {/* Scroll Sections */}
      <div className="relative z-10">
        {['Intro', 'Design', 'Sound', 'Connectivity', 'OP-1'].map((label, i) => (
          <section
            key={i}
            className="text-gray-900  feature-section relative h-screen flex flex-col items-center justify-center px-10 text-center"
          >
            <div className="feature-overlay opacity-0 translate-y-12 transition-all duration-700 z-10">
                <h2 className="text-4xl font-bold mb-4">{label}</h2>
                <p className="text-xl text-gray-800 max-w-xl">
                  {featureDescriptions[i]}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
