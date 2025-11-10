"use client";

import * as React from "react";
import { Slot as SlotPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[hsl(0_0%_3.9%)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
                    "bg-[hsl(0_0%_9%)] text-[hsl(0_0%_98%)] shadow-sm hover:bg-[hsl(0_0%_14.9%)]",
                destructive:
                    "bg-[hsl(0_84.2%_60.2%)] text-[hsl(0_0%_98%)] shadow-xs hover:bg-[hsl(0_84.2%_55%)]",
                outline:
                    "border border-[hsl(0_0%_89.8%)] bg-[hsl(0_0%_96.1%)] text-[hsl(0_0%_9%)] hover:bg-[hsl(0_0%_45.1%)] hover:text-[hsl(0_0%_98%)]",
                secondary:
                    "bg-[hsl(0_0%_96.1%)] text-[hsl(0_0%_9%)] shadow-xs hover:bg-[hsl(0_0%_89.8%)]",
                ghost:
                    "text-[hsl(0_0%_9%)] hover:bg-[hsl(0_0%_96.1%)] hover:text-[hsl(0_0%_3.9%)]",
                link:
                    "text-[hsl(0_0%_9%)] underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-full px-3 text-xs",
                lg: "h-12 rounded-full px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? SlotPrimitive.Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
    