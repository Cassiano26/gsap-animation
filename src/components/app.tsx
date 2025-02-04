import { Canvas } from '@react-three/fiber'
import Airplane from './AirPlane'
import Earth from './Earth'

import './app.css'

export default function App() {

  return (
    <div className='container'>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <directionalLight 
        position={[10, 10, 5]} 
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={10}
      />
        <ambientLight intensity={0.7} />
        <Airplane />
        <Earth />
        
      </Canvas>
    </div>
  )
}
