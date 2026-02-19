"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { useHistory } from "@/components/history-context"
import { cn } from "@/lib/utils"

const WHEEL_COLORS = [
  "oklch(0.75 0.12 220)",
  "oklch(0.82 0.1 340)",
  "oklch(0.85 0.08 80)",
  "oklch(0.7 0.1 180)",
  "oklch(0.78 0.12 300)",
  "oklch(0.8 0.1 140)",
  "oklch(0.75 0.15 20)",
  "oklch(0.82 0.08 260)",
]

const DEFAULT_OPTIONS = ["吃火锅", "看电影", "逛街", "在家宅"]

export function WheelPage() {
  const [options, setOptions] = useState<string[]>(DEFAULT_OPTIONS)
  const [newOption, setNewOption] = useState("")
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)
  const [showPresets, setShowPresets] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { addHistory, history, pendingPreset, clearPendingPreset } = useHistory()

  // Load pending preset from history page
  useEffect(() => {
    if (pendingPreset && pendingPreset.length >= 2) {
      setOptions(pendingPreset)
      setResult(null)
      clearPendingPreset()
    }
  }, [pendingPreset, clearPendingPreset])

  // Get unique wheel presets from history
  const wheelPresets = history
    .filter((item) => item.type === "wheel" && item.options && item.options.length >= 2)
    .reduce<{ options: string[]; key: string; lastUsed: number }[]>((acc, item) => {
      const key = [...(item.options || [])].sort().join("|")
      if (!acc.some((p) => p.key === key)) {
        acc.push({ options: item.options!, key, lastUsed: item.timestamp })
      }
      return acc
    }, [])
    .slice(0, 5)

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || options.length === 0) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1
    const displaySize = 280
    canvas.width = displaySize * dpr
    canvas.height = displaySize * dpr
    canvas.style.width = `${displaySize}px`
    canvas.style.height = `${displaySize}px`
    ctx.scale(dpr, dpr)

    const center = displaySize / 2
    const radius = center - 8
    const sliceAngle = (2 * Math.PI) / options.length

    ctx.clearRect(0, 0, displaySize, displaySize)

    // Draw shadow
    ctx.save()
    ctx.shadowColor = "rgba(0,0,0,0.15)"
    ctx.shadowBlur = 20
    ctx.shadowOffsetY = 4
    ctx.beginPath()
    ctx.arc(center, center, radius, 0, 2 * Math.PI)
    ctx.fillStyle = "#fff"
    ctx.fill()
    ctx.restore()

    // Draw slices - slice 0 starts at top (12 o'clock)
    options.forEach((option, i) => {
      const startAngle = i * sliceAngle - Math.PI / 2
      const endAngle = startAngle + sliceAngle

      ctx.beginPath()
      ctx.moveTo(center, center)
      ctx.arc(center, center, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = WHEEL_COLORS[i % WHEEL_COLORS.length]
      ctx.fill()

      ctx.strokeStyle = "rgba(255,255,255,0.6)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw text
      ctx.save()
      ctx.translate(center, center)
      ctx.rotate(startAngle + sliceAngle / 2)
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = "#fff"
      ctx.font = `bold ${Math.min(16, 140 / options.length)}px Nunito, sans-serif`
      ctx.shadowColor = "rgba(0,0,0,0.3)"
      ctx.shadowBlur = 4
      const textRadius = radius * 0.6
      const text = option.length > 6 ? option.slice(0, 5) + ".." : option
      ctx.fillText(text, textRadius, 0)
      ctx.restore()
    })

    // Center circle
    ctx.beginPath()
    ctx.arc(center, center, 20, 0, 2 * Math.PI)
    ctx.fillStyle = "#fff"
    ctx.fill()
    ctx.strokeStyle = "oklch(0.72 0.12 220)"
    ctx.lineWidth = 3
    ctx.stroke()

    // Heart in center
    ctx.save()
    ctx.translate(center, center)
    ctx.scale(0.6, 0.6)
    ctx.beginPath()
    ctx.moveTo(0, -5)
    ctx.bezierCurveTo(-10, -18, -22, -5, 0, 12)
    ctx.moveTo(0, -5)
    ctx.bezierCurveTo(10, -18, 22, -5, 0, 12)
    ctx.fillStyle = "oklch(0.82 0.1 340)"
    ctx.fill()
    ctx.restore()
  }, [options])

  useEffect(() => {
    drawWheel()
  }, [drawWheel])

  const spin = useCallback(() => {
    if (isSpinning || options.length < 2) return
    setIsSpinning(true)
    setResult(null)

    const targetIndex = Math.floor(Math.random() * options.length)
    const sliceAngle = 360 / options.length

    // Pointer is at top (12 o'clock). In canvas, slice 0 starts at -90° and goes clockwise.
    // Slice i occupies angles from (i * sliceAngle - 90) to ((i+1) * sliceAngle - 90).
    // Slice i center is at: i * sliceAngle - 90 + sliceAngle/2 = i * sliceAngle + sliceAngle/2 - 90
    // When wheel rotates by R degrees (CSS rotate), the slice center moves to: sliceCenter + R
    // We want slice center to align with pointer at -90°:
    // (i * sliceAngle + sliceAngle/2 - 90 + R) mod 360 = -90 mod 360 = 270
    // So: R mod 360 = 270 - (i * sliceAngle + sliceAngle/2 - 90) = 360 - i * sliceAngle - sliceAngle/2
    const targetAngle = (360 - targetIndex * sliceAngle - sliceAngle / 2) % 360
    const currentAngle = ((rotation % 360) + 360) % 360
    let needed = (targetAngle - currentAngle + 360) % 360
    const extraRotations = 5 + Math.floor(Math.random() * 5)
    const totalRotation = rotation + extraRotations * 360 + needed

    setRotation(totalRotation)

    setTimeout(() => {
      setIsSpinning(false)
      const selectedOption = options[targetIndex]
      setResult(selectedOption)
      addHistory({
        type: "wheel",
        question: `选项: ${options.join(", ")}`,
        result: selectedOption,
        options: [...options],
      })
    }, 4000)
  }, [isSpinning, options, rotation, addHistory])

  const addOption = useCallback(() => {
    const trimmed = newOption.trim()
    if (trimmed && options.length < 8) {
      setOptions((prev) => [...prev, trimmed])
      setNewOption("")
    }
  }, [newOption, options.length])

  const removeOption = useCallback((index: number) => {
    setOptions((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const loadPreset = useCallback((presetOptions: string[]) => {
    setOptions(presetOptions)
    setResult(null)
    setShowPresets(false)
  }, [])

  return (
    <div className="flex flex-col items-center px-4 pt-6 pb-4">
      {/* Header */}
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-extrabold text-foreground">
          {"幸运转盘"}
        </h1>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          {"添加选项，转动转盘，让命运来决定~"}
        </p>
      </div>

      {/* Wheel */}
      <div className="relative mb-6">
        {/* Pointer at top center */}
        <div className="absolute -top-2 left-1/2 z-20 -translate-x-1/2">
          <svg width="28" height="32" viewBox="0 0 28 32">
            <polygon
              points="14,32 0,12 14,0 28,12"
              fill="oklch(0.82 0.1 340)"
              stroke="#fff"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Canvas wheel */}
        <div
          style={{
            transform: `rotate(${rotation}deg)`,
            transitionDuration: isSpinning ? "4s" : "0s",
            transitionTimingFunction: "cubic-bezier(0.17, 0.67, 0.12, 0.99)",
            transitionProperty: "transform",
          }}
        >
          <canvas
            ref={canvasRef}
            className="h-[280px] w-[280px]"
          />
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="mb-4 animate-bounce-soft rounded-2xl bg-card px-6 py-3 text-center shadow-md ring-1 ring-border">
          <p className="text-sm font-semibold text-muted-foreground">{"结果是"}</p>
          <p className="text-xl font-extrabold text-primary">{result}</p>
        </div>
      )}

      {/* Spin button */}
      <button
        onClick={spin}
        disabled={isSpinning || options.length < 2}
        className={cn(
          "mb-6 rounded-2xl px-10 py-3.5 text-lg font-bold shadow-lg transition-all duration-300",
          "bg-primary text-primary-foreground",
          "hover:shadow-xl hover:scale-105 active:scale-95",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
          isSpinning && "animate-pulse-glow"
        )}
      >
        {isSpinning ? "转动中..." : "开始转动"}
      </button>

      {/* Options manager */}
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-bold text-foreground">{"选项列表"}</h3>
          {wheelPresets.length > 0 && (
            <button
              onClick={() => setShowPresets(!showPresets)}
              className={cn(
                "flex items-center gap-1 rounded-xl px-3 py-1 text-xs font-bold transition-all hover:scale-105 active:scale-95",
                showPresets
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              {"历史选项"}
            </button>
          )}
        </div>

        {/* Presets dropdown */}
        {showPresets && wheelPresets.length > 0 && (
          <div className="mb-3 rounded-xl border border-border bg-muted/50 p-3">
            <p className="mb-2 text-xs font-semibold text-muted-foreground">
              {"点击即可加载之前用过的选项:"}
            </p>
            <div className="flex flex-col gap-2">
              {wheelPresets.map((preset) => (
                <button
                  key={preset.key}
                  onClick={() => loadPreset(preset.options)}
                  className="flex items-center gap-2 rounded-xl bg-card p-2.5 text-left shadow-sm ring-1 ring-border transition-all hover:scale-[1.02] hover:ring-primary/30 active:scale-[0.98]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <polyline points="9 11 12 14 22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {preset.options.join("、")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {`${preset.options.length} 个选项`}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add option */}
        <div className="mb-3 flex gap-2">
          <input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addOption()}
            placeholder="输入新选项..."
            maxLength={20}
            className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={addOption}
            disabled={!newOption.trim() || options.length >= 8}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          >
            {"添加"}
          </button>
        </div>

        {/* Options list */}
        <div className="flex flex-wrap gap-2">
          {options.map((option, i) => (
            <div
              key={`${option}-${i}`}
              className="group flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:scale-105"
              style={{ backgroundColor: WHEEL_COLORS[i % WHEEL_COLORS.length] }}
            >
              <span>{option}</span>
              <button
                onClick={() => removeOption(i)}
                className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary-foreground/20 text-xs text-primary-foreground opacity-60 transition-opacity hover:opacity-100"
                aria-label={`删除${option}`}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {options.length < 2 && (
          <p className="mt-2 text-xs font-medium text-destructive">
            {"至少需要添加 2 个选项才能转动哦~"}
          </p>
        )}
      </div>
    </div>
  )
}
