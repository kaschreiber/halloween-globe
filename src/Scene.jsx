import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Plattform } from "./components/Plattform";
import { Suspense } from "react";
import { defaulControlModels, ModelData, ModelName } from "./modelData";
import { Model } from "./components/Model";
import { GlassGlobe } from "./components/GlassGlobe";
import { useControls } from "leva";
import { Particles } from "./components/Particles";

export function Scene() {
  const modelControls = useControls("Models: ", defaulControlModels);
  const slimeControls = useControls("Slime", {
    Enabled: {
      value: false,
    },
    "Slime Amount": {
      value: 400,
      min: 100,
      max: 700,
      step: 1,
    },
  });

  const renderModelControls = Object.keys(modelControls).map((key) => {
    const modelPath = ModelName[key];
    if (modelPath && modelControls[key]) {
      const model = ModelData.find((element) => element.name === modelPath);
      return (
        <Model
          key={key}
          modelPath={model.name}
          startPosition={model.position}
        />
      );
    }
    return undefined;
  });

  return (
    <Suspense fallback={null}>
      <ambientLight />
      <OrbitControls
        makeDefault
        target={[0, 1, 0]}
        maxPolarAngle={1.45}
        enableRotate={true}
      />
      <PerspectiveCamera makeDefault fov={50} position={[7, 3, 0]} />
      {renderModelControls}
      <GlassGlobe />
      {slimeControls.Enabled && (
        <Particles slimeAmount={slimeControls["Slime Amount"]} />
      )}
      <Environment background={false} files="night_no_lamp.hdr" />
      <Plattform position={[0, 0, 0]} size={[2, 2, 0.5, 32]} />
      <Plattform position={[0, -0.25, 0]} size={[2.1, 2.1, 0.25, 32]} />
      <spotLight
        color={[0.15, 0.1, 0.3]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow={true}
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow={true}
        shadow-bias={-0.0001}
      />
    </Suspense>
  );
}
