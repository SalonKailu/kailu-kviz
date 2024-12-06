import * as React from "react"

interface ButtonProps { className?: string; variant?: string; size?: string; }

const Button = React.forwardRef(({...props }, ref) => {
  return (
    <button
      className="inline-flex items-center justify-center rounded-md text-xs font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-slate-50 hover:bg-slate-900/90 h-10 px-4 py-2"
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }