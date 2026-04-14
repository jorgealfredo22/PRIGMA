"use client"

import { useEffect, useState } from "react"

export function PageLoadingIndicator() {
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Auto-hide after page loads (covers cold loads and navigations)
    let timer: NodeJS.Timeout

    const handleLoad = () => {
      setLoading(true)
      timer = setTimeout(() => setLoading(false), 800)
    }

    window.addEventListener("load", handleLoad)
    
    // For Next.js navigation, the page typically loads within 2-3 seconds
    // Set a safety net
    timer = setTimeout(() => setLoading(false), 5000)

    return () => {
      window.removeEventListener("load", handleLoad)
      clearTimeout(timer)
    }
  }, [mounted])

  // Don't render anything on first mount to avoid hydration mismatch
  if (!mounted) return null

  if (!loading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-primary/20">
      <div className="h-full bg-primary animate-pulse" />
    </div>
  )
}
