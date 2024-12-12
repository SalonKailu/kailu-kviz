import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

interface RadioGroupProps { className?: string; }

const RadioGroup = React.forwardRef(({...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className="grid gap-2"
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef(({...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className="aspect-square h-4 w-4 rounded-full border border-slate-900 text-slate-900 ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div className="h-2.5 w-2.5 rounded-full bg-slate-900" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }