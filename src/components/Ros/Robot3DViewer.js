import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import ROSLIB from "roslib";
import robot from "../../assets/3d/HospitalRobotPliedAssembly.stl";
const Robot3DViewer = () => {
  const rendererRef = useRef(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    const loader = new THREE.STLLoader();
    loader.load({ robot }, (geometry) => {
      const material = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa,
        specular: 0x111111,
        shininess: 200,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      rendererRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={rendererRef} />;
};

export default Robot3DViewer;
