"use client"
import NavBar from "@/components/app-navbar"
import SubjectDropdown from "@/components/subject-dropdown"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

export default function Choice() {
  const [positions, setPositions] = useState([])
  const [center, setCenter] = useState({ x: 0, y: 0 })
  const centerRef = useRef(null)

  function generateRandom(centerX, centerY, minRadius, maxRadius) {
    const angle = Math.random() * 2 * Math.PI
    const r = Math.random() * (maxRadius - minRadius) + minRadius
    const x_pos = centerX + r * Math.cos(angle) - 70
    const y_pos = centerY + r * Math.sin(angle) - 70
    return { x: x_pos, y: y_pos }
  }

  function distance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
  }

  useEffect(() => {
    if (!centerRef.current) return

    const rect = centerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    setCenter({ x: centerX - 70, y: centerY - 70 }) // -70 = половина картинки

    const minRadius = 100
    const maxRadius = 300
    const minDistance = 300

    const newPositions = []
    for (let i = 0; i < 3; i++) {
      let point
      let attempts = 0
      do {
        point = generateRandom(centerX, centerY, minRadius, maxRadius)
        attempts++
        if (attempts > 1000) break
      } while (newPositions.some(p => distance(p, point) < minDistance))

      newPositions.push(point)
    }

    setPositions(newPositions)
  }, [])

  return (
    <div className="relative min-h-screen bg-gray-50">
      <NavBar />
      <div
        ref={centerRef}
        className="relative z-10 flex flex-col justify-center items-center h-[calc(100vh-80px)] space-y-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Выберите предмет</h1>
        <SubjectDropdown />
      </div>

      {positions.length > 0 && (
        <>
          <motion.div
            initial={{ top: center.y, left: center.x, opacity: 0 }}
            animate={{ top: positions[0].y, left: positions[0].x, opacity: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute z-0"
          >
            <Image src="/image/start_img/atom.png" width={140} height={140} alt="atom" />
          </motion.div>

          <motion.div
            initial={{ top: center.y, left: center.x, opacity: 0 }}
            animate={{ top: positions[1].y, left: positions[1].x, opacity: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="absolute z-0"
          >
            <Image src="/image/start_img/comp.png" width={140} height={140} alt="comp" />
          </motion.div>

          <motion.div
            initial={{ top: center.y, left: center.x, opacity: 0 }}
            animate={{ top: positions[2].y, left: positions[2].x, opacity: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            className="absolute z-0"
          >
            <Image src="/image/start_img/sigmoida.png" width={140} height={140} alt="sigmoida" />
          </motion.div>
        </>
      )}
    </div>
  )
}
