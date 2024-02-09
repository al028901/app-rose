import React, { useEffect } from "react";
import demoPointCloud from "../../pointCloud";
import * as THREE from "three";

const PointCloudViewer = () => {
  useEffect(() => {
    // Configuración de Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 600);

    document.getElementById("pointCloud").appendChild(renderer.domElement);

    // Crear nube de puntos
    const geometry = new THREE.BufferGeometry();
    const iterable = (function* () {
      yield* demoPointCloud;
    })();
    const vertices = new Float32Array(iterable);
    console.log(vertices);
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({ color: 0x00ff00, size: 0.1 });
    const points = new THREE.Points(geometry, material);

    // Añadir la nube de puntos a la escena
    scene.add(points);

    // Configurar la cámara
    camera.position.z = 5;

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotar la nube de puntos
      points.rotation.x += 0.005;
      points.rotation.y += 0.005;

      renderer.render(scene, camera);
    };

    animate();

    // Limpiar al desmontar el componente
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []); // Solo ejecuta esto una vez al montar el componente

  return null; // No hay contenido que mostrar directamente en React, todo se renderiza en el canvas de Three.js
};

export default PointCloudViewer;
