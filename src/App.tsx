import './app.css'
import { Canvas } from '@react-three/fiber'
import { ConeModel } from './ConeModel'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from "gsap"

gsap.registerPlugin(useGSAP)

type directions = {
  yDirection: number
  xDirection: number
}

export default function App() {
  //const [lastPositionY, setLastPositionY] = useState<number>(0)
  //const [lastPositionX, setLastPositionX] = useState<number>(0)
  const lastPositionY = useRef<number>(500)
  const lastPositionX = useRef<number>(500)

  const [position, setPosition] = useState<directions>({
    yDirection: 0,
    xDirection: 0
  })

  const timer = useRef<number | NodeJS.Timeout | null>()
  const timerYReturn = useRef<number | NodeJS.Timeout | null>()


  const squareOut = useRef<HTMLDivElement>(null)
  const square = useRef<HTMLDivElement>(null)

  useGSAP(() => {

    function handleMouseMovement(e: MouseEvent) {
      const {clientX, clientY} = e

      if (squareOut.current && square.current) {
        gsap.to(square.current, { 
          duration: 1,
          x: clientX - (squareOut.current.clientWidth / 2) +  Math.cos(clientX * Math.PI / squareOut.current.clientWidth) * square.current.clientWidth / 2,
          ease: "power3"
        })

        if (clientY >= squareOut.current.clientHeight / 10 && clientY <= squareOut.current.clientHeight - squareOut.current.clientHeight / 10) {
          gsap.to(square.current, { 
            duration: 2,
            y: (clientY - lastPositionY.current ) * 20 ,
            ease: "power3",
          })

          setPosition({
            xDirection: clientX - lastPositionX.current,
            yDirection: clientY - lastPositionY.current
          })

          clearInterval(timerYReturn.current)

          timerYReturn.current = setTimeout(() => {
            gsap.to(square.current, { 
              duration: 2,
              y: 0,
              ease: "power3",
            })
          }, 500)
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
        // setPosition({
        //   yDirection: 0,
        //   xDirection: 0
        // })
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
        <Canvas camera={{ position: [0, 0, 1.8] }}>
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} />
        <ConeModel xDirection={position.xDirection} yDirection={position.yDirection}/>
      </Canvas> 
      </div>
    </div>
  )
}

