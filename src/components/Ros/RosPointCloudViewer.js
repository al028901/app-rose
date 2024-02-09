import React, { useEffect, useRef } from "react";
import * as ROSLIB from "roslib";
import * as THREE from "three";

const RosPointCloudViewer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Conéctate a ROS
    const ros = new ROSLIB.Ros({
      url: "ws://192.168.92.128:9090", // Cambia la URL según tu configuración ROS
    });

    // Crea un objeto PointCloud2
    const pointCloud = new ROSLIB.Topic({
      ros: ros,
      name: "/point_cloud", // Cambia el nombre del topic según tu configuración ROS
      messageType: "sensor_msgs/PointCloud2",
    });

    // Configura Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);
    // Crear nube de puntos
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([-3, -3, -3, 0, 0, 0, 1, 1, 1, 2, 2, 2]);

    const material = new THREE.PointsMaterial({ color: 0x00ff00, size: 0.1 });
    const points = new THREE.Points(geometry, material);

    // Agrega un cubo como marcador de posición
    // const geometry = new THREE.BoxGeometry();
    //const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    //const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // Actualiza la posición del cubo cuando se recibe un mensaje PointCloud2
    pointCloud.subscribe((message) => {
      console.log("data" + message.data);
      const vertices = new Float32Array(message.data);
      geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
      const points = new THREE.Points(geometry, material);
      scene.add(points);
      // Puedes procesar los datos del mensaje y actualizar la posición del cubo aquí
      // Por ejemplo, puedes usar 'message.data' para obtener los datos del punto en la nube
    });

    // Configura la cámara
    camera.position.z = 5;

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);

      // Actualiza aquí la escena según tus necesidades

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Desconecta cuando el componente se desmonta
      pointCloud.unsubscribe();
    };
  }, []); // El segundo argumento [] asegura que este efecto se ejecute solo una vez al montar el componente

  return <div ref={canvasRef} />;
};

export default RosPointCloudViewer;
