import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Check on mount (client-side)
    checkSize()

    // Add event listener for window resize
    window.addEventListener("resize", checkSize)

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", checkSize)
  }, [])

  return isMobile
}
