// components/Model.jsx
import React, { forwardRef, useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import {
  createEmissiveKnobMaterial,
  createReflectiveScreenMaterial,
  createKeyMaterial,
  createSpeakerMaterial,
} from './ModelMaterialConfig';


const Model = forwardRef((props, ref) => {
  const group = useRef();
  const { scene } = useGLTF('/op-1_teenage_engineering.glb');
  const [showEmissive, setShowEmissive] = useState(true);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.castShadow = true;
        child.receiveShadow = true;

        const name = child.name.toLowerCase();

        // Manual material assignment by mesh group
        if (name.includes('knob') && showEmissive) {
          child.material = createEmissiveKnobMaterial();
        } else if (name.includes('screen')) {
          child.material = createReflectiveScreenMaterial();
        } else if (name.includes('key')) {
          child.material = createKeyMaterial();
        } else if (name.includes('speaker')) {
          child.material = createSpeakerMaterial();
        }

        // Optional: boost env map intensity
        if (child.material.envMapIntensity === undefined) {
          child.material.envMapIntensity = 1.0;
        }

        child.material.needsUpdate = true;
      }
    });

    if (ref) ref.current = group.current;
  }, [scene, showEmissive, ref]);

  // Optional: toggle emissive knobs
  useEffect(() => {
    window.toggleEmissive = () => setShowEmissive((prev) => !prev);
  }, []);

  return (
    <group
  ref={(node) => {
    group.current = node;
    if (ref) ref.current = node; // 🔥 for App.jsx ScrollTrigger
  }}
  position={[0, -1.2, 0]}
>
  <primitive object={scene} scale={[1.5, 1.5, 1.5]} />
</group>

  );
});

export default Model;
