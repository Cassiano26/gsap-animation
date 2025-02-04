import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

export default function Airplane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const previousY = useRef(0)
  const previousX = useRef(0)
  const rotAnimation = useRef<GSAPTween>()
  const coldAnimation = useRef<GSAPTween>()

  useEffect(() => {

    function onMouseMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1

      if (coldAnimation.current) coldAnimation.current.kill()

      coldAnimation.current = gsap.to(meshRef.current!.position, {
        x: x * 6,
        y: y * 5,
        duration: 1,
        ease: 'power2.out'
      })

      const deltaY = e.clientY - previousY.current
      previousY.current = e.clientY

      const deltaX = e.clientX - previousX.current
      previousX.current = e.clientX

      const newRotationX = - Math.PI * (0.1 + 0.4 * (Math.tanh(deltaY / 15) + 1))
      const newRotationY = Math.PI * (0.8 + ((deltaX + 50) * 0.4 / 100))

      if (rotAnimation.current) rotAnimation.current.kill()

      rotAnimation.current = gsap.to(meshRef.current!.rotation, {
        x: newRotationX,
        y: newRotationY,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])


  return (
    <mesh castShadow ref={meshRef} position={[0, 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
      <coneGeometry args={[0.3, 1, 3]} />
      <meshStandardMaterial color="red" />
    </mesh>
  )
}
