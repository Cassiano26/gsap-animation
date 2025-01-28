import './app.css'
import { Canvas } from '@react-three/fiber'
import { ConeModel } from './ConeModel'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from "gsap"

gsap.registerPlugin(useGSAP)

type directions = {
  yDirection: "up" | "down" | "ahead"
  xDirection: "left" | "right" | "ahead"
}

export default function App() {
  //const [lastPositionY, setLastPositionY] = useState<number>(0)
  //const [lastPositionX, setLastPositionX] = useState<number>(0)
  const lastPositionY = useRef<number>(500)
  const lastPositionX = useRef<number>(500)

  const [position, setPosition] = useState<directions>({
    yDirection: 'ahead',
    xDirection: 'ahead'
  })

  const timer = useRef<number | NodeJS.Timeout | null>()
  const squareOut = useRef<HTMLDivElement>(null)
  const square = useRef<HTMLDivElement>(null)

  useGSAP(() => {

    function handleMouseMovement(e: MouseEvent) {
      const {clientX, clientY} = e

      if (squareOut.current?.clientWidth) {
        gsap.to(square.current, { 
          duration: 0.3,
          x: clientX - squareOut.current.clientWidth / 2,
          y: clientY - squareOut.current.clientHeight / 2,
        })
      }

      if (clientX > lastPositionX.current) {
        setPosition((prev) => ({
          ...prev,
          xDirection: "right"
        }))
        lastPositionX.current = clientX
      } else if (clientX < lastPositionX.current) {
        setPosition((prev) => ({
          ...prev,
          xDirection: "left"
        }))
        lastPositionX.current = clientX
      } else {
        lastPositionX.current = clientX
      }

      if (clientY > lastPositionY.current) {
        setPosition((prev) => ({
          ...prev,
          yDirection: "down"
        }))
        lastPositionY.current = clientY
      } else if( clientY < lastPositionY.current) {
        setPosition((prev) => ({
          ...prev,
          yDirection: "up"
        }))
        lastPositionY.current = clientY
      } else {
        lastPositionY.current = clientY
      }

      clearTimeout(timer.current)

      timer.current = setTimeout(() => {
        setPosition({
          yDirection: "ahead",
          xDirection: "ahead"
        })
      }, 200)

    }

    document .addEventListener("mousemove", handleMouseMovement)

    return () => {
      document.removeEventListener("mousemove", handleMouseMovement)
    }
  }, [])

  return (
    <div ref={squareOut} className='container'>
      
      <div ref={square}>
        <Canvas camera={{ position: [0, 0, 2] }}>
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} />
        <ConeModel xDirection={position.xDirection} yDirection={position.yDirection}/>
      </Canvas> 
      </div>
    </div>
    
   
  )
}

