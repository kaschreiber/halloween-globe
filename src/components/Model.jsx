import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { PivotControls } from "@react-three/drei";
import { useControls } from "leva";

export function Model({ modelPath, startPosition }) {
  const pumpkinObj = useLoader(GLTFLoader, modelPath);
  const transformModels = useControls("Transform Models", {
    Enabled: {
      value: false,
    },
  });

  return (
    <>
      <PivotControls
        anchor={[0, 0, 0]}
        activeAxes={
          transformModels.Enabled ? [true, false, true] : [false, false, false]
        }
      >
        <primitive
          object={pumpkinObj.scene}
          scale={0.2}
          position={startPosition}
        />
      </PivotControls>
    </>
  );
}
