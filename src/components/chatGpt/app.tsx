import '../app.css'
import { Canvas } from '@react-three/fiber'
import Earth from './Earth'
import Airplane from './AirPlane'

export default function App() {

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Earth />
      <Airplane />
  </Canvas>
  )
}

