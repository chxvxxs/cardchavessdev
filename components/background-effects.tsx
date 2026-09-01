"use client"

import { useEffect, useRef } from "react"

function TechRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let streams: {
      x: number
      y: number
      speed: number
      length: number
      opacity: number
      depth: number
    }[] = []

    const initStreams = () => {
      streams = []
      const numStreams = Math.floor(window.innerWidth / 10) // Density based on width
      for (let i = 0; i < numStreams; i++) {
        addStream(true)
      }
    }

    const addStream = (randomY = false) => {
      const depth = Math.random() * 0.8 + 0.2 // Depth for parallax
      streams.push({
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : -Math.random() * 500,
        speed: (Math.random() * 3 + 2) * depth, // Speed scales with depth
        length: Math.random() * 100 + 50,
        opacity: (Math.random() * 0.3 + 0.1) * depth, // Fainter when further
        depth: depth,
      })
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStreams()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate parallax based on mouse position relative to center
      const parallaxX = (mouseRef.current.x - window.innerWidth / 2) * 0.05
      const parallaxY = (mouseRef.current.y - window.innerHeight / 2) * 0.05

      streams.forEach((stream, i) => {
        // Movement
        stream.y += stream.speed

        // Reset if off screen
        if (stream.y > canvas.height + stream.length) {
          stream.y = -stream.length
          stream.x = Math.random() * canvas.width
        }

        // Draw
        const offsetX = parallaxX * stream.depth
        const offsetY = parallaxY * stream.depth

        const x = stream.x + offsetX
        const y = stream.y + offsetY

        // Gradient for the trail
        const gradient = ctx.createLinearGradient(x, y, x, y + stream.length)
        gradient.addColorStop(0, "rgba(104, 0, 124, 1)")
        gradient.addColorStop(1, `rgba(182, 0, 255, ${stream.opacity})`)

        ctx.fillStyle = gradient
        ctx.fillRect(x, y, 2 * stream.depth, stream.length) // Width scales with depth

        // Glowing "head" of the stream
        ctx.shadowBlur = 5
        ctx.shadowColor = "rgba(255, 0, 255, 0.74)"
        ctx.fillStyle = `rgba(182, 0, 255, ${stream.opacity * 1.5})`
        ctx.fillRect(x, y + stream.length, 2 * stream.depth, 5)
        ctx.shadowBlur = 0
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
}

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/10 to-zinc-900/20" />
      <TechRain />
    </div>
  )
}
