import './app.css'
import { Canvas } from '@react-three/fiber'
import { ConeModel } from '../../ConeModel'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from "gsap"
import CameraController  from '../../cameraController'

gsap.registerPlugin(useGSAP)

type directions = {
  yDirection: number
  xDirection: number
}

export default function App() {
  const lastPositionY = useRef<number>(500)
  const lastPositionX = useRef<number>(500)

  const [position, setPosition] = useState<directions>({
    yDirection: 0,
    xDirection: 0
  })

  const timer = useRef<number | NodeJS.Timeout | null>()
  const timerYReturn = useRef<number | NodeJS.Timeout | null>()

  const square = useRef<HTMLDivElement>(null)

  useGSAP(() => {

    function handleMouseMovement(e: MouseEvent) {
      const {clientX, clientY} = e
      const { innerWidth, innerHeight } = window

      if (square.current) {
        gsap.to(square.current, { 
          duration: 1.5,
          x: clientX - (innerWidth / 2) +  Math.cos(clientX * Math.PI / innerWidth) * square.current.clientWidth / 2,
          ease: "power3"
        })

        if (clientY >= innerHeight / 10 && clientY <= innerHeight - innerHeight / 10) {
          gsap.to(square.current, { 
            duration: 3,
            y: (clientY - lastPositionY.current ) * 100,
          })

          setPosition({
            xDirection: clientX - lastPositionX.current,
            yDirection: clientY - lastPositionY.current
          })

          clearInterval(timerYReturn.current)

          timerYReturn.current = setTimeout(() => {
            gsap.to(square.current, { 
              duration: 2,
              y: -200,
              ease: "power3",
            })
          }, 100)
        } else {
          setPosition({
            xDirection: clientX - lastPositionX.current,
            yDirection: 0
          })
        }
      }

      lastPositionX.current = clientX

      lastPositionY.current = clientY

      clearTimeout(timer.current)

      timer.current = setTimeout(() => {
        setPosition({
          yDirection: 0,
          xDirection: 0
        })
      }, 100)

    }

    document .addEventListener("mousemove", handleMouseMovement)

    return () => {
      document.removeEventListener("mousemove", handleMouseMovement)
    }
  }, [])

  return (
    <div className='container'>
      <div ref={square}>
        <Canvas camera={{ position: [0, 0.5, 1.8] }}>
          <CameraController />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} />
        <ConeModel xDirection={position.xDirection} yDirection={position.yDirection}/>
      </Canvas> 
      </div>
    </div>
  )
}

