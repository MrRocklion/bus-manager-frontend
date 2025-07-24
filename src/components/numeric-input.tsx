"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface NumericInputProps {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  placeholder?: string
  disabled?: boolean
  className?: string
}

export default function NumericInput({
  value: controlledValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  placeholder = "0",
  disabled = false,
  className,
}: NumericInputProps) {
  const [internalValue, setInternalValue] = useState<number>(controlledValue || min)

  // Use controlled value if provided, otherwise use internal state
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue

  const handleValueChange = (newValue: number) => {
    // Ensure value is within bounds
    const clampedValue = Math.min(Math.max(newValue, min), max)

    if (controlledValue === undefined) {
      setInternalValue(clampedValue)
    }

    onChange?.(clampedValue)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    // Allow empty string for user to clear input
    if (inputValue === "") {
      handleValueChange(min)
      return
    }

    // Parse and validate number
    const numericValue = Number.parseFloat(inputValue)
    if (!isNaN(numericValue)) {
      handleValueChange(numericValue)
    }
  }

  const increment = () => {
    handleValueChange(currentValue + step)
  }

  const decrement = () => {
    handleValueChange(currentValue - step)
  }

  const canIncrement = currentValue < max && !disabled
  const canDecrement = currentValue > min && !disabled

  return (
    <div className={cn("relative flex items-center", className)}>
      <Input
        type="number"
        value={currentValue}
        onChange={handleInputChange}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        disabled={disabled}
        className="pr-8 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />

      <div className="absolute right-1 flex flex-col">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={increment}
          disabled={!canIncrement}
          className="h-4 w-6 p-0 hover:bg-muted"
        >
          <ChevronUp className="h-3 w-3" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={decrement}
          disabled={!canDecrement}
          className="h-4 w-6 p-0 hover:bg-muted"
        >
          <ChevronDown className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
