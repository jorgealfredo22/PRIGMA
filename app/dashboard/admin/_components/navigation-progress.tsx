"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export function NavigationProgress() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const handleStart = () => {
      timeout = setTimeout(() => setLoading(true), 100)
    }

    const handleComplete = () => {
      clearTimeout(timeout)
      setLoading(false)
    }

    // Listen to Next.js navigation events
    const handleFetchStart = () => setLoading(true)
    const handleFetchFinish = () => setLoading(false)

    // For demonstration - in production you'd use router events
    window.addEventListener("fetchStart", handleFetchStart)
    window.addEventListener("fetchFinish", handleFetchFinish)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener("fetchStart", handleFetchStart)
      window.removeEventListener("fetchFinish", handleFetchFinish)
    }
  }, [pathname])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.5, ease: "linear" }}
          style={{ transformOrigin: "left" }}
        />
      )}
    </AnimatePresence>
  )
}
