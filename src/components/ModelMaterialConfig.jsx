// ModelMaterialConfig.jsx
import * as THREE from 'three';
import gsap from 'gsap';

// MATERIALS
export const createMattePlasticMaterial = (color = '#e0e0e0') =>
  new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.85,
    metalness: 0.1,
    clearcoat: 0.3,
    clearcoatRoughness: 0.9,
    reflectivity: 0.2,
    envMapIntensity: 1.0,
  });

export const createSoftBlackMaterial = () =>
  new THREE.MeshPhysicalMaterial({
    color: '#111111',
    roughness: 0.8,
    metalness: 0.2,
    clearcoat: 0.1,
    envMapIntensity: 1.0,
  });

export const createEmissiveKnobMaterial = () =>
  new THREE.MeshStandardMaterial({
    color: '#222',
    emissive: new THREE.Color('#ff0400'),
    emissiveIntensity: 0.5,
    metalness: 0.2,
    roughness: 0.6,
    envMapIntensity: 1.0,
  });

export const createReflectiveScreenMaterial = () =>
  new THREE.MeshPhysicalMaterial({
    color: '#111',
    roughness: 0.2,
    metalness: 0.8,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
    reflectivity: 0.8,
    envMapIntensity: 1.0,
  });

export const createKeyMaterial = () =>
  new THREE.MeshPhysicalMaterial({
    color: '#5e5e5e',
    roughness: 0.7,
    metalness: 0.1,
    reflectivity: 0.1,
    envMapIntensity: 1.0,
  });

export const createSpeakerMaterial = () =>
  new THREE.MeshPhysicalMaterial({
    color: '#333',
    roughness: 0.9,
    metalness: 0.2,
    envMapIntensity: 1.0,
  });


// TEXT ANIMATION (optional helper)
export const animateFeatureText = (selector) => {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el, i) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        delay: i * 0.2,
        ease: 'power3.out',
      }
    );
  });
};
