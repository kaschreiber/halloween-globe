import { Scene } from "./Scene";
import { Canvas } from "@react-three/fiber";
function App() {
  return (
    <Canvas shadows={true}>
      <Scene />
    </Canvas>
  );
}

export default App;
