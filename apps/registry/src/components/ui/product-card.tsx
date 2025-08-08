import type * as React from "react";

import { cn } from "@/lib/utils";

function ProductCard({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="product-card"
			className={cn(
				"rounded-lg border p-4 hover:bg-muted/50 transition-colors h-full flex flex-col",
				className,
			)}
			{...props}
		/>
	);
}

function ProductCardImage({ className, ...props }: React.ComponentProps<"img">) {
	return (
		<img
			data-slot="product-card-image"
			className={cn("w-full h-48 rounded-md object-cover mb-3", className)}
			{...props}
		/>
	);
}

function ProductCardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="product-card-content"
			className={cn("space-y-2 flex-1 flex flex-col", className)}
			{...props}
		/>
	);
}

function ProductCardTitle({ className, ...props }: React.ComponentProps<"h5">) {
	return (
		<h5
			data-slot="product-card-title"
			className={cn("font-medium text-sm line-clamp-2", className)}
			{...props}
		/>
	);
}

function ProductCardPrice({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="product-card-price"
			className={cn("flex items-center justify-between", className)}
			{...props}
		/>
	);
}

function ProductCardPriceText({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="product-card-price-text"
			className={cn("font-semibold text-base", className)}
			{...props}
		/>
	);
}

function ProductCardDescription({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="product-card-description"
			className={cn("text-muted-foreground text-xs line-clamp-3", className)}
			{...props}
		/>
	);
}

function ProductCardActions({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="product-card-actions"
			className={cn("flex flex-col gap-2 mt-auto", className)}
			{...props}
		/>
	);
}

function ProductCardLink({ className, ...props }: React.ComponentProps<"a">) {
	return (
		<a
			data-slot="product-card-link"
			className={cn(
				"text-primary hover:underline text-sm font-medium inline-block",
				className,
			)}
			target="_blank"
			rel="noopener noreferrer"
			{...props}
		/>
	);
}

export {
	ProductCard,
	ProductCardImage,
	ProductCardContent,
	ProductCardTitle,
	ProductCardPrice,
	ProductCardDescription,
	ProductCardActions,
	ProductCardLink,
};