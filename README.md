# 🎹 OP-1 3D Viewer

A 3D interactive product landing page of the Teenage Engineering OP-1 Synthesizer, built with **React Three Fiber**, **GSAP ScrollTrigger**, and **Three.js**. The project highlights advanced motion design, immersive user interaction, and real-time 3D visuals directly in the browser.

## 🚀 Live Demo
[Visit Live Project](https://seal-over-the-walls.vercel.app/)

## 🧰 Tech Stack

- **React** – UI Framework
- **React Three Fiber** – Three.js renderer for React
- **Drei** – Useful helpers and abstractions for R3F
- **GSAP & ScrollTrigger** – Smooth scroll-based animations
- **Three.js** – Core 3D rendering library
- **Vite** – Fast bundler and dev server

## ✨ Features

- Scroll-based 3D transitions and rotations
- Realistic OP-1 model rendered in real-time
- Custom lighting, camera controls, and material transitions
- Animated UI overlays and responsive layout
- Suspense and loader integration for optimized loading

## 📂 Folder Structure

op-1/
├── public/ # Static assets (e.g. 3D model, icons)
├── src/
│ ├── assets/ # Images, textures
│ ├── components/ # Reusable React components (Loader, UI, etc.)
│ ├── models/ # GLTF 3D models
│ ├── App.jsx # Main scene logic and scroll triggers
│ ├── index.jsx # React entry point
├── package.json
├── vite.config.js
└── README.md

## 🛠 Setup & Installation

1. **Clone this repository**
   ```bash
   git clone https://github.com/Khomgrit-Phi/op-1.git
   cd op-1
Install dependencies


npm install
Run the development server

npm run dev
Build for production


npm run build
🧠 Learning Points
Building performant 3D experiences in React

Managing scroll-based animations with GSAP + ScrollTrigger

Working with GLTF models and custom camera angles

Scene composition with lighting and interactivity

📦 Deployment
This project is deployed using Vercel. For redeployment:


# If using GitHub integration:
git push origin main

# Or use Vercel CLI:
vercel --prod
🙌 Credits
Model Source: Teenage Engineering OP-1 (custom optimized GLTF)

Libraries: React Three Fiber, GSAP, Drei

Created by Khomgrit Phinitkitti — Motion Designer turned Full-stack Developer
