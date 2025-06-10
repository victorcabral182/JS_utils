import { useState, useCallback, useEffect } from "react"

export const useIntersectionObserver = (
  threshold: number = 0.5,
  id: string
) => {
  const [isIntersecting, setIsIntersecting] = useState(false)

  const observerCallback = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true)
      }
    },
    []
  )

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, { threshold })
    const target = document.getElementById(id)

    if (target) {
      observer.observe(target)
    }

    return () => observer.disconnect()
  }, [observerCallback, threshold, id])

  return isIntersecting
}
