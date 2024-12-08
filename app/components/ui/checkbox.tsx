import * as React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean; // Prop pro stav checkboxu (zaškrtnutý/nezaškrtnutý)
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Funkce pro zpracování změny
  className?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, onChange, className, ...props }, ref) => (
    <input
      type="checkbox"
      className={`h-4 w-4 rounded border cursor-pointer bg-white checked:bg-[rgba(250,164,166,0.5)] ${className}`}
      ref={ref}
      checked={checked} // Zaškrtnutý stav
      onChange={onChange} // Funkce změny
      {...props}
    />
  )
);

Checkbox.displayName = "Checkbox";

export { Checkbox };