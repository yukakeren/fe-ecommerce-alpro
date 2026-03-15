"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { CheckCircle } from "lucide-react"

interface Toast {
  id: number
  msg: string
}

interface ToastContextType {
  show: (msg: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const playPing = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(800, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1)
      gainNode.gain.setValueAtTime(0, ctx.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
      osc.connect(gainNode)
      gainNode.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.3)
    } catch (e) {
      console.warn("Audio play failed", e)
    }
  }

  const show = (msg: string) => {
    const newToast = { id: Date.now(), msg }
    setToasts((prev) => [...prev, newToast])
    playPing()

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed top-24 right-6 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 rounded-xl border border-border bg-background/95 px-4 py-3 shadow-lg backdrop-blur animate-in slide-in-from-right-10 fade-in duration-300"
          >
            <CheckCircle className="text-green-500" size={20} />
            <span className="text-sm font-medium text-foreground">{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within ToastProvider")
  return ctx
}