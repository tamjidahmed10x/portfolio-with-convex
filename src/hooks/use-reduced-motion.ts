import { useEffect, useState } from 'react'

/**
 * A hook that returns whether the user prefers reduced motion.
 * This is useful for accessibility and performance optimization on mobile devices.
 *
 * On mobile devices, we automatically prefer reduced motion due to performance constraints.
 *
 * @returns boolean - true if reduced motion is preferred
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Check if it's a mobile device (touch device with small screen)
    const isMobileDevice = () => {
      return (
        ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
        window.innerWidth < 768
      )
    }

    const updateMotionPreference = () => {
      // Prefer reduced motion if user explicitly set it OR if it's a mobile device
      setPrefersReducedMotion(mediaQuery.matches || isMobileDevice())
    }

    // Set initial value
    updateMotionPreference()

    // Listen for changes to the media query
    mediaQuery.addEventListener('change', updateMotionPreference)

    // Listen for resize to detect mobile
    window.addEventListener('resize', updateMotionPreference)

    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference)
      window.removeEventListener('resize', updateMotionPreference)
    }
  }, [])

  return prefersReducedMotion
}

/**
 * Check if the device is likely a low-power mobile device
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
          window.innerWidth < 768,
      )
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}
