import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

interface LabelProps { className?: string; }

const Label = React.forwardRef(({...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }