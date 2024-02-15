import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const RobotArmSimulation = () => {
  const containerRef = useRef(null);
  const renderer = useRef(null);

  useEffect(() => {
    // Crear la escena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Crear la cámara
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    // Crear el renderer
    renderer.current = new THREE.WebGLRenderer({ antialias: true });
    renderer.current.setSize(window.innerWidth / 2, window.innerHeight / 2);

    // Agregar el renderer al contenedor
    containerRef.current.appendChild(renderer.current.domElement);
    // Agregar controles de órbita para mover la cámara con el ratón
    const controls = new OrbitControls(camera, renderer.current.domElement);
    controls.enableDamping = true;
    // Crear el brazo robótico
    const armGroup = new THREE.Group();
    scene.add(armGroup);

    //base del robot
    const baseGeometry = new THREE.BoxGeometry(3, 1, 3);
    const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x999933 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    armGroup.add(base);

    //pieza vertical
    const armGeometry = new THREE.BoxGeometry(1, 7, 1);
    const armMaterial = new THREE.MeshBasicMaterial({ color: 0x722277 });
    const arm = new THREE.Mesh(armGeometry, armMaterial);
    arm.position.y = 3;
    armGroup.add(arm);

    //pieza superior
    const endEffectorGeometry = new THREE.BoxGeometry(2, 2, 2);
    const endEffectorMaterial = new THREE.MeshBasicMaterial({
      color: 0xa1111a,
    });
    const endEffector = new THREE.Mesh(
      endEffectorGeometry,
      endEffectorMaterial
    );
    endEffector.position.y = 7; // posicion con respecto al eje
    armGroup.add(endEffector);

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      // Aquí puedes agregar lógica de animación para el brazo robótico

      //armGroup.rotation.x += 0.01;
      //armGroup.rotation.y += 0.01;

      renderer.current.render(scene, camera);
    };
    animate();

    // Manejar el redimensionamiento de la ventana
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight / 4;
      camera.updateProjectionMatrix();
      renderer.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize);

    // Limpiar al desmontar el componente
    return () => {
      window.removeEventListener("resize", onWindowResize);
      containerRef.current.removeChild(renderer.current.domElement);
      controls.dispose();
    };
  }, []);

  return <div ref={containerRef} />;
};

export default RobotArmSimulation;
