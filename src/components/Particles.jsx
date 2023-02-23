import { useEffect, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import { MeshWobbleMaterial } from "@react-three/drei";

function Particle({ position, velocity, scale, normal, diff }) {
  const [currentPos, setCurrentPos] = useState(position);
  const { viewport } = useThree();

  useFrame(() => {
    if (currentPos[1] < -viewport.height / 2) {
      setCurrentPos(position);
      return;
    }
    setCurrentPos([
      currentPos[0] + velocity[0],
      currentPos[1] - velocity[1],
      currentPos[2] + velocity[2],
    ]);
  });

  return (
    <mesh position={currentPos}>
      <sphereGeometry args={[scale]} />
      <MeshWobbleMaterial factor={1} speed={5} normalMap={normal} map={diff} />
    </mesh>
  );
}

export const Particles = ({ slimeAmount }) => {
  const { viewport } = useThree();
  const [particles, setParticles] = useState([]);
  const [normal, diff] = useLoader(TextureLoader, [
    process.env.PUBLIC_URL + "/textures/slime-normal.jpeg",
    process.env.PUBLIC_URL + "/textures/slime-diff.jpeg",
  ]);

  useEffect(() => {
    let initParticles = [];
    if (particles.length < slimeAmount) {
      for (let i = 0; i < slimeAmount - particles.length; i++) {
        initParticles.push({
          position: [
            Math.random() * 20 - 10,
            viewport.height / 2 + 5,
            Math.random() * (viewport.width + 10) - (viewport.width + 10) / 2,
          ],
          velocity: [
            (Math.random() * 6 - 3) * 0.003,
            Math.random() * 0.02 + 0.01,
            (Math.random() * 6 - 3) * 0.003,
          ],
          scale: Math.random() * 0.1 + 0.05,
        });
      }
      setParticles([...particles, ...initParticles]);
    }

    if (particles.length > slimeAmount) {
      for (let i = 0; particles.length - slimeAmount; i++) {
        particles.pop();
      }
    }
  }, [slimeAmount]);

  return particles.map(({ position, velocity, scale }, index) => (
    <Particle
      key={index}
      position={position}
      velocity={velocity}
      normal={normal}
      diff={diff}
      scale={scale}
    />
  ));
};
