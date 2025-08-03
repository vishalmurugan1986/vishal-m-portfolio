import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-white hover:shadow-glow hover:scale-105 active:scale-95",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-primary/30 bg-transparent text-foreground hover:bg-primary/10 hover:border-primary hover:shadow-glow",
        secondary: "bg-gradient-secondary text-white hover:shadow-accent hover:scale-105",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-primary text-white border-2 border-primary/30 hover:shadow-glow hover:scale-110 hover:border-primary-glow backdrop-blur-xl",
        glass: "glass-card text-foreground hover:bg-glass-border/20 hover:shadow-glass",
        neon: "bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground hover:shadow-accent hover:scale-105",
        cyber: "bg-transparent border-2 border-cyan text-cyan hover:bg-cyan hover:text-cyan-foreground hover:shadow-cyan hover:scale-105"
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-xl px-4 text-sm",
        lg: "h-14 rounded-2xl px-10 text-lg",
        xl: "h-16 rounded-3xl px-12 text-xl",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
