import React from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Model } from "../../assets/model/BrazoEnteroV2";

const RobotArmPeacetolero = () => {
  return (
    <Canvas className="RobotArm" camera={{ fov: 3 }}>
      <ambientLight intensity={1.25} />
      <Physics gravity={[0, -20, 0]}>
        <Model />
      </Physics>
      <Environment
        files="./img/syferfontein_18d_clear_puresky_2k.hdr"
        background
      />
      <axesHelper />
      <OrbitControls />
    </Canvas>
  );
};
export default RobotArmPeacetolero;
