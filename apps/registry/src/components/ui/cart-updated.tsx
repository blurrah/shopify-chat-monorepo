import type * as React from "react";
import { cn } from "@/lib/utils";

function CartUpdated({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-updated"
			className={cn("space-y-4", className)}
			{...props}
		/>
	);
}

function CartUpdatedHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-updated-header"
			className={cn("flex items-center gap-2", className)}
			{...props}
		/>
	);
}

function CartUpdatedIcon({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-updated-icon"
			className={cn("size-4", className)}
			{...props}
		/>
	);
}

function CartUpdatedTitle({ className, ...props }: React.ComponentProps<"h4">) {
	return (
		<h4
			data-slot="cart-updated-title"
			className={cn("font-medium text-sm", className)}
			{...props}
		/>
	);
}

function CartUpdatedChanges({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-updated-changes"
			className={cn("space-y-2", className)}
			{...props}
		/>
	);
}

function CartUpdatedChangesTitle({ className, ...props }: React.ComponentProps<"h5">) {
	return (
		<h5
			data-slot="cart-updated-changes-title"
			className={cn("text-xs font-medium text-muted-foreground uppercase tracking-wide", className)}
			{...props}
		/>
	);
}

function CartUpdatedItems({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-updated-items"
			className={cn("grid gap-2", className)}
			{...props}
		/>
	);
}

function CartUpdatedItem({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-updated-item"
			className={cn("flex items-center gap-3 rounded-lg border p-2 bg-muted/20", className)}
			{...props}
		/>
	);
}

function CartUpdatedItemIcon({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-updated-item-icon"
			className={cn("size-4", className)}
			{...props}
		/>
	);
}

function CartUpdatedItemContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-updated-item-content"
			className={cn("flex-1 min-w-0", className)}
			{...props}
		/>
	);
}

function CartUpdatedItemTitle({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="cart-updated-item-title"
			className={cn("font-medium text-sm truncate", className)}
			{...props}
		/>
	);
}

function CartUpdatedItemDetails({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-updated-item-details"
			className={cn("flex items-center gap-2 text-xs text-muted-foreground", className)}
			{...props}
		/>
	);
}

function CartUpdatedItemBadge({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-updated-item-badge"
			className={cn("text-xs", className)}
			{...props}
		/>
	);
}

function CartUpdatedActions({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="cart-updated-actions"
			className={cn("pt-2 border-t", className)}
			{...props}
		/>
	);
}

function CartUpdatedViewCart({ className, ...props }: React.ComponentProps<"a">) {
	return (
		<a
			data-slot="cart-updated-view-cart"
			className={cn(
				"flex items-center justify-center gap-2 w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-3 py-2 text-sm transition-colors",
				className
			)}
			target="_blank"
			rel="noopener noreferrer"
			{...props}
		/>
	);
}

export {
	CartUpdated,
	CartUpdatedHeader,
	CartUpdatedIcon,
	CartUpdatedTitle,
	CartUpdatedChanges,
	CartUpdatedChangesTitle,
	CartUpdatedItems,
	CartUpdatedItem,
	CartUpdatedItemIcon,
	CartUpdatedItemContent,
	CartUpdatedItemTitle,
	CartUpdatedItemDetails,
	CartUpdatedItemBadge,
	CartUpdatedActions,
	CartUpdatedViewCart,
};
