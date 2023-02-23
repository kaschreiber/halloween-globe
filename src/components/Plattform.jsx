import { useLoader } from "@react-three/fiber";
import { Color, TextureLoader, Vector2 } from "three";
import { MeshReflectorMaterial } from "@react-three/drei";

export function Plattform({ size, position }) {
  const [roughness, normal, diff] = useLoader(TextureLoader, [
    process.env.PUBLIC_URL + "/textures/stone-rough.jpg",
    process.env.PUBLIC_URL + "/textures/stone-normal.jpg",
    process.env.PUBLIC_URL + "/textures/stone-diff.jpg",
  ]);

  return (
    <>
      <mesh position={position}>
        <cylinderGeometry attach="geometry" args={size} />
        <MeshReflectorMaterial
          envMapIntensity={0}
          normalMap={normal}
          normalScale={new Vector2(0.15, 0.15)}
          roughnessMap={roughness}
          dithering={true}
          map={diff}
          color={new Color(0.1, 0.1, 0.1)}
          roughness={0.9}
          mixBlur={30}
          mixStrength={80}
          resolution={1024}
          mirror={0}
          depthScale={0.01}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          reflectorOffset={0.2}
        />
      </mesh>
    </>
  );
}
