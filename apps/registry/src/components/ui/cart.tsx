import type * as React from "react";
import { cn } from "@/lib/utils";

function Cart({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart"
			className={cn("space-y-4", className)}
			{...props}
		/>
	);
}

function CartHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-header"
			className={cn("flex items-center justify-between", className)}
			{...props}
		/>
	);
}

function CartTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-title"
			className={cn("flex items-center gap-2", className)}
			{...props}
		/>
	);
}

function CartTitleText({ className, ...props }: React.ComponentProps<"h4">) {
	return (
		<h4
			data-slot="cart-title-text"
			className={cn("font-medium text-sm", className)}
			{...props}
		/>
	);
}

function CartIcon({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-icon"
			className={cn("size-4 text-muted-foreground", className)}
			{...props}
		/>
	);
}

function CartEmpty({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-empty"
			className={cn("text-center py-6 text-muted-foreground", className)}
			{...props}
		/>
	);
}

function CartEmptyIcon({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-empty-icon"
			className={cn("size-8 mx-auto mb-2 opacity-50", className)}
			{...props}
		/>
	);
}

function CartEmptyText({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="cart-empty-text"
			className={cn("text-sm", className)}
			{...props}
		/>
	);
}

function CartContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-content"
			className={cn("space-y-3", className)}
			{...props}
		/>
	);
}

function CartItems({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-items"
			className={cn("grid gap-2", className)}
			{...props}
		/>
	);
}

function CartItem({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-item"
			className={cn("flex gap-3 rounded-lg border p-3 bg-muted/20", className)}
			{...props}
		/>
	);
}

function CartItemContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-item-content"
			className={cn("flex-1 min-w-0", className)}
			{...props}
		/>
	);
}

function CartItemTitle({ className, ...props }: React.ComponentProps<"h5">) {
	return (
		<h5
			data-slot="cart-item-title"
			className={cn("font-medium text-sm truncate", className)}
			{...props}
		/>
	);
}

function CartItemDetails({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-item-details"
			className={cn("flex items-center justify-between mt-1", className)}
			{...props}
		/>
	);
}

function CartItemInfo({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-item-info"
			className={cn("flex items-center gap-2 text-xs text-muted-foreground", className)}
			{...props}
		/>
	);
}

function CartItemPrice({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="cart-item-price"
			className={cn("font-semibold text-sm", className)}
			{...props}
		/>
	);
}

function CartSummary({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-summary"
			className={cn("flex items-center justify-between pt-2 border-t", className)}
			{...props}
		/>
	);
}

function CartSummaryLabel({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="cart-summary-label"
			className={cn("font-medium text-sm", className)}
			{...props}
		/>
	);
}

function CartSummaryTotal({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="cart-summary-total"
			className={cn("font-bold text-lg", className)}
			{...props}
		/>
	);
}

function CartCheckout({ className, ...props }: React.ComponentProps<"a">) {
	return (
		<a
			data-slot="cart-checkout"
			className={cn(
				"flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors",
				className
			)}
			target="_blank"
			rel="noopener noreferrer"
			{...props}
		/>
	);
}

export {
	Cart,
	CartHeader,
	CartTitle,
	CartTitleText,
	CartIcon,
	CartEmpty,
	CartEmptyIcon,
	CartEmptyText,
	CartContent,
	CartItems,
	CartItem,
	CartItemContent,
	CartItemTitle,
	CartItemDetails,
	CartItemInfo,
	CartItemPrice,
	CartSummary,
	CartSummaryLabel,
	CartSummaryTotal,
	CartCheckout,
};
