// components/Model.jsx
import React, { forwardRef, useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Model = forwardRef((props, ref) => {
  const group = useRef();
  const { scene } = useGLTF('/op-1_teenage_engineering.glb');
  const [showEmissive, setShowEmissive] = useState(true);

  const materialConfig = {
    knob: () => {
      const mat = new THREE.MeshStandardMaterial({
        color: '#222',
        emissive: new THREE.Color('#ff0000'),
        emissiveIntensity: 0.5,
        metalness: 0.3,
        roughness: 0.5,
      });
      gsap.to(mat, {
        emissiveIntensity: 1,
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
      return mat;
    },
  };

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.castShadow = true;
        child.receiveShadow = true;

        const isKnob = child.name.toLowerCase().includes('knob');

        if (isKnob && showEmissive) {
          child.material = materialConfig.knob();
        } else {
          child.material.needsUpdate = true;
        }
      }
    });

    if (ref) ref.current = scene;
  }, [scene, ref, showEmissive]);

  useEffect(() => {
    if (!group.current) return;

    gsap.to(group.current.rotation, {
      y: Math.PI * 2,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
      ease: 'none',
    });
  }, []);

  useEffect(() => {
    window.toggleEmissive = () => setShowEmissive((prev) => !prev);
  }, []);

  return (
    <group ref={group} position={[0, -1.2, 0]}>
      <primitive object={scene} scale={[1.5, 1.5, 1.5]} />
    </group>
  );
});

export default Model;
