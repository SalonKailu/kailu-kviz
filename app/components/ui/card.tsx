import * as React from "react"

interface CardProps { className?: string; }

const Card = React.forwardRef(({...props }, ref) => (
  <div
    ref={ref}
    className="rounded-lg border bg-card text-card-foreground shadow-sm"
    {...props}
  />
))
Card.displayName = "Card"

const CardContent = React.forwardRef(({...props }, ref) => (
  <div ref={ref} className="p-6 pt-0" {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardContent }