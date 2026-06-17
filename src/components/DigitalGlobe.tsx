"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function DigitalGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDragging: false });
  const mouseRef = useRef({ startX: 0, startY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 150;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Dotted Globe representation
    const radius = 50;
    const dotDensity = 900;
    const dotPositions: number[] = [];

    // Generate coordinates on a sphere
    for (let i = 0; i < dotDensity; i++) {
      const phi = Math.acos(-1 + (2 * i) / dotDensity);
      const theta = Math.sqrt(dotDensity * Math.PI) * phi;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      dotPositions.push(x, y, z);
    }

    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute("position", new THREE.Float32BufferAttribute(dotPositions, 3));

    // Dynamic color depending on active theme
    const isDark = document.documentElement.classList.contains("dark");
    const dotColor = isDark ? 0x06b6d4 : 0x0284c7; // Cyan in dark, blue in light
    const arcColor = isDark ? 0xec4899 : 0xdb2777; // Pink / Magenta for connections

    const dotMaterial = new THREE.PointsMaterial({
      color: dotColor,
      size: 1.2,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const globePoints = new THREE.Points(dotGeometry, dotMaterial);
    globeGroup.add(globePoints);

    // Create glowing arcs representing traffic pathways
    const arcCount = 10;
    const arcs: THREE.Line[] = [];

    const createArc = (p1: THREE.Vector3, p2: THREE.Vector3) => {
      // Generate points on a bezier curve arching above the sphere
      const midPoint = new THREE.Vector3()
        .addVectors(p1, p2)
        .multiplyScalar(0.5);
      
      const distance = p1.distanceTo(p2);
      midPoint.normalize().multiplyScalar(radius + distance * 0.35); // Peak height

      const curve = new THREE.QuadraticBezierCurve3(p1, midPoint, p2);
      const curvePoints = curve.getPoints(30);

      const arcGeom = new THREE.BufferGeometry().setFromPoints(curvePoints);
      
      // Arc material
      const arcMat = new THREE.LineBasicMaterial({
        color: arcColor,
        transparent: true,
        opacity: 0.45,
      });

      const arcLine = new THREE.Line(arcGeom, arcMat);
      globeGroup.add(arcLine);
      arcs.push(arcLine);
    };

    // Generate random connection points on the sphere
    const getSpherePoint = () => {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    for (let k = 0; k < arcCount; k++) {
      createArc(getSpherePoint(), getSpherePoint());
    }

    // Drag-to-rotate interaction
    const handleMouseDown = (e: MouseEvent) => {
      rotationRef.current.isDragging = true;
      mouseRef.current.startX = e.clientX;
      mouseRef.current.startY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!rotationRef.current.isDragging) return;
      const deltaX = e.clientX - mouseRef.current.startX;
      const deltaY = e.clientY - mouseRef.current.startY;

      rotationRef.current.targetY += deltaX * 0.005;
      rotationRef.current.targetX += deltaY * 0.005;

      mouseRef.current.startX = e.clientX;
      mouseRef.current.startY = e.clientY;
    };

    const handleMouseUp = () => {
      rotationRef.current.isDragging = false;
    };

    // Add drag listeners (only within container)
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!rotationRef.current.isDragging) {
        // Auto-rotation when not dragging
        globeGroup.rotation.y += 0.003;
        globeGroup.rotation.x += 0.001;
      } else {
        // Smooth transition (lerp) to target drag rotation
        globeGroup.rotation.y += (rotationRef.current.targetY - globeGroup.rotation.y) * 0.1;
        globeGroup.rotation.x += (rotationRef.current.targetX - globeGroup.rotation.x) * 0.1;
      }

      // Pulse connection lines opacity
      const time = Date.now() * 0.002;
      arcs.forEach((arc, i) => {
        const mat = arc.material as THREE.LineBasicMaterial;
        mat.opacity = 0.2 + Math.abs(Math.sin(time + i)) * 0.4;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Theme sync
    const observer = new MutationObserver(() => {
      const isDarkNow = document.documentElement.classList.contains("dark");
      dotMaterial.color.setHex(isDarkNow ? 0x06b6d4 : 0x0284c7);
      arcs.forEach((arc) => {
        const mat = arc.material as THREE.LineBasicMaterial;
        mat.color.setHex(isDarkNow ? 0xec4899 : 0xdb2777);
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Handle resizing
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      arcs.forEach((arc) => {
        globeGroup.remove(arc);
        arc.geometry.dispose();
        (arc.material as THREE.Material).dispose();
      });
      dotGeometry.dispose();
      dotMaterial.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto"
    />
  );
}
