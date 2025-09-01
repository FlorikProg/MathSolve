"use client"
import { useEffect } from "react"
import React from "react"
export default function RedirectPage() {
  useEffect(() => {
    window.location.href = "/choice"
  }, [])

  return (
    <div>
    </div>
  )
}
