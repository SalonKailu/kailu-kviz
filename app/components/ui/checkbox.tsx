import * as React from "react"

interface CheckboxProps { className?: string; }

const Checkbox = React.forwardRef(({...props }, ref) => (
  <input
    type="checkbox"
    className="h-4 w-4 rounded border cursor-pointer bg-white checked:bg-[rgba(250,164,166,0.5)]"
    ref={ref}
    checked={checked}
    onChange={onChange}
    {...props}
  />
))

Checkbox.displayName = "Checkbox"

export { Checkbox }