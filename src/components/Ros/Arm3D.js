import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//import { THREERobot } from "../robot/robot.js";
const Arm3D = () => {
  const containerRef = useRef(null);
  const renderer = useRef(null);
  const [armGroup, setArmGroup] = useState("");

  function createCube(x, y, z, w, h, d, min, max, jointNumber) {
    const thicken = 1;
    const colors = [0xaaaaaa, 0xbbbbbb, 0xbcbcbc, 0xcbcbcb, 0xcccccc, 0x0];
    const w_thickened = Math.abs(w) + thicken;
    const h_thickened = Math.abs(h) + thicken;
    const d_thickened = Math.abs(d) + thicken;

    const material = new THREE.MeshLambertMaterial({
      color: colors[jointNumber],
    });
    const geometry = new THREE.BoxGeometry(
      w_thickened,
      h_thickened,
      d_thickened
    );

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(w / 2, h / 2, d / 2);
    const group = new THREE.Object3D();
    group.position.set(x, y, z);
    group.add(mesh);

    console.log(min, max);
    // min = min / 180 * Math.PI
    // max = max / 180 * Math.PI

    const jointGeo1 = new THREE.CylinderGeometry(
      0.8,
      0.8,
      0.8 * 2,
      32,
      32,
      false,
      -min,
      2 * Math.PI - max + min
    );
    const jointGeoMax = new THREE.CylinderGeometry(
      0.8,
      0.8,
      0.8 * 2,
      32,
      32,
      false,
      -max,
      max
    );
    const jointGeoMin = new THREE.CylinderGeometry(
      0.8,
      0.8,
      0.8 * 2,
      32,
      32,
      false,
      0,
      -min
    );
    const jointMesh1 = new THREE.Mesh(
      jointGeo1,
      new THREE.MeshBasicMaterial({
        color: 0xffbb00,
      })
    );
    const jointMeshMax = new THREE.Mesh(
      jointGeoMax,
      new THREE.MeshBasicMaterial({
        color: 0x009900,
      })
    );
    const jointMeshMin = new THREE.Mesh(
      jointGeoMin,
      new THREE.MeshBasicMaterial({
        color: 0xdd2200,
      })
    );

    const joint = new THREE.Group();
    // joint.add(jointMesh1, jointMesh2)
    joint.add(jointMeshMax, jointMeshMin, jointMesh1);

    //joints.push(joint);

    switch (jointNumber) {
      case 0:
        joint.rotation.x = Math.PI / 2;
        break;
      case 1:
        // joint.rotation.x = Math.PI / 2
        break;
      case 2:
        // joint.rotation.x = Math.PI / 2
        break;
      case 3:
        joint.rotation.z = Math.PI / 2;
        // joint.rotation.y = Math.PI
        break;
      case 4:
        // joint.rotation.x = Math.PI / 2
        joint.rotation.y = Math.PI / 2;
        break;
      case 5:
        joint.rotation.x = Math.PI / 2;
        group.rotation.y = Math.PI / 2;
        // group.rotation.z = Math.PI
        // group.rotation.z = -Math.PI / 2
        // group.rotation.y += Math.PI
        // joint.rotation.z = +Math.PI / 2
        // const axisHelper = new THREE.AxisHelper(3)
        // axisHelper.rotation.x = Math.PI
        // group.add(axisHelper)
        const arrowZ = new THREE.ArrowHelper(
          new THREE.Vector3(0, 0, 1),
          new THREE.Vector3(0, 0, 0),
          3,
          0x0000ff
        );
        arrowZ.line.material.linewidth = 4;
        group.add(arrowZ);
        const arrowY = new THREE.ArrowHelper(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3(0, 0, 0),
          3,
          0x00ff00
        );
        arrowY.line.material.linewidth = 4;
        group.add(arrowY);
        const arrowX = new THREE.ArrowHelper(
          new THREE.Vector3(1, 0, 0),
          new THREE.Vector3(0, 0, 0),
          3,
          0xff0000
        );
        arrowX.line.material.linewidth = 4;
        group.add(arrowX);
        // joint.add(getVectorArrow([0,0,0],[0,0,5]))
        break;
    }

    group.add(joint);
    return group;
  }

  useEffect(() => {
    const arm = new THREE.Group();

    const jointLimits = Object.values({
      J0: [(-190 / 180) * Math.PI, (190 / 180) * Math.PI],
      J1: [(-90 / 180) * Math.PI, (90 / 180) * Math.PI],
      J2: [(-135 / 180) * Math.PI, (45 / 180) * Math.PI],
      J3: [(-90 / 180) * Math.PI, (75 / 180) * Math.PI],
      J4: [(-139 / 180) * Math.PI, (90 / 180) * Math.PI],
      J5: [(-188 / 180) * Math.PI, (181 / 180) * Math.PI],
    });
    const geo = [
      [2.5 + 2.3, 0, 4],
      [0, 0, 8.0],
      [1, 0, 2],
      [4, 0, 0],
      [3.6, 0, 0],
      [0, 0, 0],
    ];
    const geometryCalc = Object.values({
      V0: {
        x: geo[0][0],
        y: geo[0][1],
        z: geo[0][2],
      },
      V1: {
        x: geo[1][0],
        y: geo[1][1],
        z: geo[1][2],
      },
      V2: {
        x: geo[2][0],
        y: geo[2][1],
        z: geo[2][2],
      },
      V3: {
        x: geo[3][0],
        y: geo[3][1],
        z: geo[3][2],
      },
      V4: {
        x: geo[4][0],
        y: geo[4][1],
        z: geo[4][2],
      },
    });

    const geometryValues = Object.values(geometryCalc).map((val) => [
      val.x,
      val.y,
      val.z,
    ]);
    let ThreeGroup = new THREE.Group();
    let angles = [0, 0, 0, 0, 0, 0];

    let robotBones = [];

    let parentObject = ThreeGroup;

    const colors = [0xaa111a, 0xb444bb, 0xbcbcbc, 0xcbcbcb, 0xcccccc, 0x0];

    let x = 0,
      y = 0,
      z = 0;
    geometryValues.push([0, 0, 0]); // add a 6th pseudo link for 6 axis
    for (let i = 0; i < geometryValues.length; i++) {
      const link = geometryValues[i];

      const linkGeo = createCube(
        x,
        y,
        z,
        link[0],
        link[1],
        link[2],
        jointLimits[i][0],
        jointLimits[i][1],
        i
      );
      x = link[0];
      y = link[1];
      z = link[2];

      parentObject.add(linkGeo);
    }

    setArmGroup(parentObject);
  }, []);

  useEffect(() => {
    if (armGroup !== "") {
      // Crear una escena
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);
      // Crear una cámara
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // Crear un WebGLRenderer
      renderer.current = new THREE.WebGLRenderer({ antialias: true });
      renderer.current.setSize(window.innerWidth / 2, window.innerHeight / 2);

      // Agregar el renderer al contenedor
      containerRef.current.appendChild(renderer.current.domElement);

      // Agregar controles de órbita para mover la cámara con el ratón
      const controls = new OrbitControls(camera, renderer.current.domElement);
      controls.enableDamping = true;

      scene.add(armGroup);

      // Función de animación
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        //armGroup.rotation.x += 0.01;
        //armGroup.rotation.y += 0.01;
        renderer.current.render(scene, camera);
      };
      animate();

      // Manejar el redimensionamiento de la ventana
      const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight / 2;
        camera.updateProjectionMatrix();
        renderer.current.setSize(window.innerWidth / 2, window.innerHeight / 2);
      };
      window.addEventListener("resize", onWindowResize);

      // Limpiar al desmontar el componente
      return () => {
        window.removeEventListener("resize", onWindowResize);
        containerRef.current.removeChild(renderer.current.domElement);
        controls.dispose();
      };
    }
  }, [armGroup]);

  return <div ref={containerRef} />;
};
export default Arm3D;
