import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import gsap from "gsap";

export default function CameraController() {
  const { camera } = useThree();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window

      const x = (event.clientX / innerWidth) * 2 - 1;
      const y = (event.clientY / innerHeight) * 2 - 1;

      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [])

  useEffect(() => {
    gsap.to(camera.position, {
      x: - mousePos.x,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => camera.lookAt(0, 0, 0),
    })
  }, [mousePos, camera])

  return null
};

