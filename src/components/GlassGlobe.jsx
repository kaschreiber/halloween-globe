import { Color } from "three";
import { MeshTransmissionMaterial } from "@react-three/drei";

export function GlassGlobe() {
  return (
    <mesh position={[0, 1.2, 0]}>
      <sphereGeometry args={[2]} />
      <MeshTransmissionMaterial
        distortionScale={0.3}
        temporalDistortion={0.5}
        backside={false}
        samples={10}
        resolution={2048}
        transmission={1}
        roughness={0.0}
        thickness={0.1}
        ior={1.0}
        chromaticAberration={0.06}
        anisotropy={0.1}
        distortion={0.0}
        clearcoat={1}
        attenuationDistance={0.5}
        attenuationColor="#ffffff"
        color="#ffffff"
        background={new Color(0.15, 0.1, 0.3)}
      />
    </mesh>
  );
}
