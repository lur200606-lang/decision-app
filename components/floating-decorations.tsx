"use client"

export function FloatingDecorations() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      {/* Floating hearts */}
      <div className="animate-float-heart absolute top-[10%] left-[8%] text-2xl opacity-40" style={{ animationDelay: '0s' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-pink">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      <div className="animate-float-heart absolute top-[25%] right-[12%] text-lg opacity-30" style={{ animationDelay: '1s' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      <div className="animate-float-heart absolute top-[60%] left-[5%] text-sm opacity-25" style={{ animationDelay: '2s' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-pink">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      <div className="animate-float-heart absolute top-[45%] right-[6%] text-xl opacity-20" style={{ animationDelay: '0.5s' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      <div className="animate-float-heart absolute bottom-[20%] left-[15%] text-base opacity-35" style={{ animationDelay: '1.5s' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-pink">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>

      {/* Floating clouds */}
      <div className="animate-float-cloud absolute top-[5%] left-[20%] opacity-20" style={{ animationDelay: '0s' }}>
        <svg width="80" height="40" viewBox="0 0 80 40" fill="currentColor" className="text-primary">
          <ellipse cx="40" cy="25" rx="30" ry="14"/>
          <ellipse cx="25" cy="18" rx="18" ry="12"/>
          <ellipse cx="55" cy="18" rx="20" ry="13"/>
          <ellipse cx="40" cy="14" rx="15" ry="10"/>
        </svg>
      </div>
      <div className="animate-float-cloud absolute top-[15%] right-[10%] opacity-15" style={{ animationDelay: '3s' }}>
        <svg width="60" height="30" viewBox="0 0 80 40" fill="currentColor" className="text-sky">
          <ellipse cx="40" cy="25" rx="30" ry="14"/>
          <ellipse cx="25" cy="18" rx="18" ry="12"/>
          <ellipse cx="55" cy="18" rx="20" ry="13"/>
          <ellipse cx="40" cy="14" rx="15" ry="10"/>
        </svg>
      </div>
      <div className="animate-float-cloud absolute bottom-[30%] right-[20%] opacity-10" style={{ animationDelay: '1.5s' }}>
        <svg width="70" height="35" viewBox="0 0 80 40" fill="currentColor" className="text-pink-light">
          <ellipse cx="40" cy="25" rx="30" ry="14"/>
          <ellipse cx="25" cy="18" rx="18" ry="12"/>
          <ellipse cx="55" cy="18" rx="20" ry="13"/>
          <ellipse cx="40" cy="14" rx="15" ry="10"/>
        </svg>
      </div>

      {/* Stars */}
      <div className="animate-bounce-soft absolute top-[35%] left-[85%] opacity-30" style={{ animationDelay: '0.5s' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-warm">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div className="animate-bounce-soft absolute top-[70%] left-[90%] opacity-25" style={{ animationDelay: '1.2s' }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-warm">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div className="animate-bounce-soft absolute top-[80%] left-[10%] opacity-20" style={{ animationDelay: '2s' }}>
        <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-warm">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
    </div>
  )
}
