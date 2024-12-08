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
      className="relative w-4 h-4 rounded-full border-2 border-[#faa4a6] bg-white inline-block
        before:content-[''] before:block before:w-2 before:h-2 before:rounded-full 
        before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
        data-[state=checked]:before:bg-[#faa4a6]
        focus:outline-none focus:ring-2 focus:ring-[#faa4a6] focus:ring-offset-2"
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div className="h-2.5 w-2.5 rounded-full bg-[#faa4a6]" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }