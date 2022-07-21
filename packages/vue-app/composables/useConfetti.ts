import confetti from 'canvas-confetti'

export function useConfetti() {
  const playConfetti = () => {
    return confetti({
      angle: 90,
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      scalar: 1.2,
    })
  }
  const playSnow = () => {
    const duration = 15 * 1000
    const animationEnd = Date.now() + duration
    let skew = 1
    const timeLeft = animationEnd - Date.now()
    const ticks = Math.max(200, 500 * (timeLeft / duration))
    skew = Math.max(0.8, skew - 0.001)
    return confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks,
      origin: {
        x: Math.random(),
        y: Math.random() * skew - 0.2,
      },
      colors: ['#ffffff'],
      shapes: ['circle'],
    })
  }

  return { playConfetti, playSnow }
}
