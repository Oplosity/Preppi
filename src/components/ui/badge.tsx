import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-default",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        lightOrange: "font-bold border-none bg-[#FFDFDB] hover:bg-[#FFDFDB]/80 text-neutral-600 hover:text-neutral-900",
        lightGreen: "font-bold border-none bg-[#CCFFE0] hover:bg-[#CCFFE0]/80 text-neutral-600 hover:text-neutral-900",
        lightYellow: "font-bold border-none bg-[#F8FFA6] hover:bg-[#F8FFA6]/80 text-neutral-600 hover:text-neutral-900",
        lightPink: "font-bold border-none bg-[#F5CFFF] hover:bg-[#F5CFFF]/80 text-neutral-600 hover:text-neutral-900",
        lightPurple: "font-bold border-none bg-[#C1A4F0] hover:bg-[#C1A4F0]/80 text-neutral-600 hover:text-neutral-900",
        lightBlue: "font-bold border-none bg-[#B2FFED] hover:bg-[#B2FFED]/80 text-neutral-600 hover:text-neutral-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
