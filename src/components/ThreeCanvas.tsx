"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// Dynamically create a canvas-based radial gradient glow texture
const createGlowTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.8)");
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  return new THREE.CanvasTexture(canvas);
};

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Detect if mobile device
    const isMobile = window.innerWidth < 768;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 80;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Dynamic Glow texture
    const glowTexture = createGlowTexture();

    // Theme detection
    const isDark = document.documentElement.classList.contains("dark");
    const fadeColor = new THREE.Color(isDark ? 0x000000 : 0xffffff);

    // Responsive Node Count
    const particleCount = isMobile ? 50 : 120;
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    const baseVelocities: { x: number; y: number; z: number }[] = [];

    // Luminous Color Palette
    const colorsPool = [
      new THREE.Color(isDark ? 0x818cf8 : 0x4f46e5), // Indigo
      new THREE.Color(isDark ? 0x22d3ee : 0x0891b2), // Cyan
      new THREE.Color(isDark ? 0xc084fc : 0x7c3aed), // Purple
    ];

    // Initialize particles in a 3D bounding region
    const r = 50;
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * r * 2.2;
      const y = (Math.random() - 0.5) * r * 1.5;
      const z = (Math.random() - 0.5) * r * 1.5;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const baseVel = {
        x: (Math.random() - 0.5) * 0.1,
        y: (Math.random() - 0.5) * 0.1,
        z: (Math.random() - 0.5) * 0.1,
      };
      velocities.push({ ...baseVel });
      baseVelocities.push(baseVel);

      // Distribute colors among particles
      const color = colorsPool[Math.floor(Math.random() * colorsPool.length)];
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    // Particle Geometry & Luminous Points Material
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: isMobile ? 2.8 : 3.4,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, pMaterial);
    scene.add(particles);

    // Pre-allocated Line Segment Buffers for Connections (zero-allocation rendering)
    const maxLines = isMobile ? 180 : 400;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.45 : 0.25,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      linewidth: 1,
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // Flowing Data Packets
    const maxPackets = isMobile ? 12 : 30;
    const packetPositions = new Float32Array(maxPackets * 3);
    const packetColors = new Float32Array(maxPackets * 3);

    interface Packet {
      active: boolean;
      fromNode: number;
      toNode: number;
      progress: number;
      speed: number;
      color: THREE.Color;
    }

    const packets: Packet[] = [];
    for (let i = 0; i < maxPackets; i++) {
      packetPositions[i * 3] = 9999;
      packetPositions[i * 3 + 1] = 9999;
      packetPositions[i * 3 + 2] = 9999;

      packets.push({
        active: false,
        fromNode: 0,
        toNode: 0,
        progress: 0,
        speed: 0.01,
        color: new THREE.Color(0xffffff),
      });
    }

    const packetGeometry = new THREE.BufferGeometry();
    const packetPosAttribute = new THREE.BufferAttribute(packetPositions, 3);
    const packetColorAttribute = new THREE.BufferAttribute(packetColors, 3);
    packetGeometry.setAttribute("position", packetPosAttribute);
    packetGeometry.setAttribute("color", packetColorAttribute);

    const packetMaterial = new THREE.PointsMaterial({
      size: isMobile ? 4.0 : 4.8,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });

    const packetPoints = new THREE.Points(packetGeometry, packetMaterial);
    scene.add(packetPoints);

    // Track mouse coordinates
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Track scroll positioning
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    const posAttribute = particleGeometry.getAttribute("position") as THREE.BufferAttribute;
    const linePositionsAttribute = lineGeometry.getAttribute("position") as THREE.BufferAttribute;
    const lineColorsAttribute = lineGeometry.getAttribute("color") as THREE.BufferAttribute;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Lerp mouse target for smooth movements
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // 3D Parallax camera shift based on mouse positioning
      const targetCamX = mouseRef.current.x * 16;
      const targetCamY = mouseRef.current.y * 10;
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Map mouse to particles' coordinate space
      const mouseX = mouseRef.current.x * 60;
      const mouseY = mouseRef.current.y * 40;

      const posArray = posAttribute.array as Float32Array;

      // Update particle physics (drift + repulsion)
      for (let i = 0; i < particleCount; i++) {
        let x = posArray[i * 3];
        let y = posArray[i * 3 + 1];
        let z = posArray[i * 3 + 2];

        // 2D Distance between cursor and particle
        const dx = x - mouseX;
        const dy = y - mouseY;
        const distSq2D = dx * dx + dy * dy;
        const repulsionRadius = 25;
        const repulsionRadiusSq = repulsionRadius * repulsionRadius;

        if (distSq2D < repulsionRadiusSq) {
          const dist = Math.sqrt(distSq2D) || 0.001;
          const force = ((repulsionRadius - dist) / repulsionRadius) * 0.28;
          velocities[i].x += (dx / dist) * force;
          velocities[i].y += (dy / dist) * force;
        }

        // Apply friction and restore to base drift velocity
        velocities[i].x = velocities[i].x * 0.93 + baseVelocities[i].x * 0.07;
        velocities[i].y = velocities[i].y * 0.93 + baseVelocities[i].y * 0.07;
        velocities[i].z = velocities[i].z * 0.93 + baseVelocities[i].z * 0.07;

        x += velocities[i].x;
        y += velocities[i].y;
        z += velocities[i].z;

        // Bounding box limits with organic bounces
        const boundX = 65;
        const boundY = 45;
        const boundZ = 45;

        if (Math.abs(x) > boundX) {
          x = Math.sign(x) * boundX;
          baseVelocities[i].x *= -1;
          velocities[i].x *= -1;
        }
        if (Math.abs(y) > boundY) {
          y = Math.sign(y) * boundY;
          baseVelocities[i].y *= -1;
          velocities[i].y *= -1;
        }
        if (Math.abs(z) > boundZ) {
          z = Math.sign(z) * boundZ;
          baseVelocities[i].z *= -1;
          velocities[i].z *= -1;
        }

        posArray[i * 3] = x;
        posArray[i * 3 + 1] = y;
        posArray[i * 3 + 2] = z;
      }
      posAttribute.needsUpdate = true;

      // Draw connection lines between nearby particles
      let activeLines = 0;
      const activeConnections: { from: number; to: number }[] = [];
      const maxDistSq = 550; // ~23.4 units threshold

      const linePosArray = linePositionsAttribute.array as Float32Array;
      const lineColArray = lineColorsAttribute.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const ix = posArray[i * 3];
          const iy = posArray[i * 3 + 1];
          const iz = posArray[i * 3 + 2];

          const jx = posArray[j * 3];
          const jy = posArray[j * 3 + 1];
          const jz = posArray[j * 3 + 2];

          const dx = ix - jx;
          const dy = iy - jy;
          const dz = iz - jz;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistSq) {
            activeConnections.push({ from: i, to: j });

            if (activeLines < maxLines) {
              const dist = Math.sqrt(distSq);
              const intensity = Math.max(0, 1.0 - dist / 23.4);
              const easedIntensity = intensity * intensity;

              const idx = activeLines * 6;
              linePosArray[idx] = ix;
              linePosArray[idx + 1] = iy;
              linePosArray[idx + 2] = iz;
              linePosArray[idx + 3] = jx;
              linePosArray[idx + 4] = jy;
              linePosArray[idx + 5] = jz;

              // Node color values
              const r1 = particleColors[i * 3];
              const g1 = particleColors[i * 3 + 1];
              const b1 = particleColors[i * 3 + 2];

              const r2 = particleColors[j * 3];
              const g2 = particleColors[j * 3 + 1];
              const b2 = particleColors[j * 3 + 2];

              const fr = fadeColor.r;
              const fg = fadeColor.g;
              const fb = fadeColor.b;

              // Lerp individual node colors to fade target (creating distance fading effect)
              lineColArray[idx] = fr + (r1 - fr) * easedIntensity;
              lineColArray[idx + 1] = fg + (g1 - fg) * easedIntensity;
              lineColArray[idx + 2] = fb + (b1 - fb) * easedIntensity;

              lineColArray[idx + 3] = fr + (r2 - fr) * easedIntensity;
              lineColArray[idx + 4] = fg + (g2 - fg) * easedIntensity;
              lineColArray[idx + 5] = fb + (b2 - fb) * easedIntensity;

              activeLines++;
            }
          }
        }
      }

      lineGeometry.setDrawRange(0, activeLines * 2);
      linePositionsAttribute.needsUpdate = true;
      lineColorsAttribute.needsUpdate = true;

      // Update Flowing Data Streams (Packets traversing connected path lines)
      const pPosArray = packetPosAttribute.array as Float32Array;
      const pColArray = packetColorAttribute.array as Float32Array;

      for (let i = 0; i < maxPackets; i++) {
        const packet = packets[i];

        // Activate idle packets along active connection paths
        if (!packet.active && activeConnections.length > 0) {
          const conn = activeConnections[Math.floor(Math.random() * activeConnections.length)];
          packet.fromNode = conn.from;
          packet.toNode = conn.to;
          packet.progress = 0;
          packet.speed = 0.007 + Math.random() * 0.015;
          packet.active = true;

          // Assign particle starting color
          const colorIdx = conn.from * 3;
          packet.color.setRGB(
            particleColors[colorIdx],
            particleColors[colorIdx + 1],
            particleColors[colorIdx + 2]
          );
        }

        // Animate packets along line paths
        if (packet.active) {
          packet.progress += packet.speed;
          if (packet.progress >= 1) {
            packet.active = false;
            pPosArray[i * 3] = 9999;
            pPosArray[i * 3 + 1] = 9999;
            pPosArray[i * 3 + 2] = 9999;
          } else {
            const p = packet.progress;
            const fx = posArray[packet.fromNode * 3];
            const fy = posArray[packet.fromNode * 3 + 1];
            const fz = posArray[packet.fromNode * 3 + 2];
            const tx = posArray[packet.toNode * 3];
            const ty = posArray[packet.toNode * 3 + 1];
            const tz = posArray[packet.toNode * 3 + 2];

            pPosArray[i * 3] = fx + (tx - fx) * p;
            pPosArray[i * 3 + 1] = fy + (ty - fy) * p;
            pPosArray[i * 3 + 2] = fz + (tz - fz) * p;

            pColArray[i * 3] = packet.color.r;
            pColArray[i * 3 + 1] = packet.color.g;
            pColArray[i * 3 + 2] = packet.color.b;
          }
        } else {
          pPosArray[i * 3] = 9999;
          pPosArray[i * 3 + 1] = 9999;
          pPosArray[i * 3 + 2] = 9999;
        }
      }
      packetPosAttribute.needsUpdate = true;
      packetColorAttribute.needsUpdate = true;

      // Scroll-based rotation overlay
      scene.rotation.y = scrollY * 0.0003;
      scene.rotation.x = scrollY * 0.00015;

      // Pulse glows slightly
      const time = Date.now() * 0.001;
      pMaterial.size = (isMobile ? 2.5 : 3.2) + Math.sin(time * 3.0) * 0.4;
      packetMaterial.size = (isMobile ? 3.8 : 4.6) + Math.sin(time * 5.0) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Theme changes updates (observer)
    const observer = new MutationObserver(() => {
      const isDarkNow = document.documentElement.classList.contains("dark");
      fadeColor.setHex(isDarkNow ? 0x000000 : 0xffffff);

      const newPool = [
        new THREE.Color(isDarkNow ? 0x818cf8 : 0x4f46e5), // Indigo
        new THREE.Color(isDarkNow ? 0x22d3ee : 0x0891b2), // Cyan
        new THREE.Color(isDarkNow ? 0xc084fc : 0x7c3aed), // Purple
      ];

      // Reassign colors based on theme contrast rules
      for (let i = 0; i < particleCount; i++) {
        const color = newPool[Math.floor(Math.random() * newPool.length)];
        particleColors[i * 3] = color.r;
        particleColors[i * 3 + 1] = color.g;
        particleColors[i * 3 + 2] = color.b;
      }
      particleGeometry.getAttribute("color").needsUpdate = true;

      // Adjust blending & opacities
      const blendingMode = isDarkNow ? THREE.AdditiveBlending : THREE.NormalBlending;
      pMaterial.blending = blendingMode;
      lineMaterial.blending = blendingMode;
      packetMaterial.blending = blendingMode;

      lineMaterial.opacity = isDarkNow ? 0.45 : 0.25;

      pMaterial.needsUpdate = true;
      lineMaterial.needsUpdate = true;
      packetMaterial.needsUpdate = true;
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Handle resizing responsiveness
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup WebGL buffers & listeners
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      particleGeometry.dispose();
      lineGeometry.dispose();
      packetGeometry.dispose();
      pMaterial.dispose();
      lineMaterial.dispose();
      packetMaterial.dispose();
      glowTexture.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto" />;
}
