import type * as React from "react";
import { cn } from "@/lib/utils";

function ProductDetails({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="product-details"
			className={cn("space-y-6 w-full max-w-4xl mx-auto px-4", className)}
			{...props}
		/>
	);
}

function ProductDetailsHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="product-details-header"
			className={cn("space-y-2", className)}
			{...props}
		/>
	);
}

function ProductDetailsTitle({
	className,
	...props
}: React.ComponentProps<"h2">) {
	return (
		<h2
			data-slot="product-details-title"
			className={cn("text-2xl font-bold", className)}
			{...props}
		/>
	);
}

function ProductDetailsLink({
	className,
	...props
}: React.ComponentProps<"a">) {
	return (
		<a
			data-slot="product-details-link"
			className={cn("text-primary hover:underline", className)}
			target="_blank"
			rel="noopener noreferrer"
			{...props}
		/>
	);
}

function ProductDetailsPricing({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="product-details-pricing"
			className={cn(
				"flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4",
				className,
			)}
			{...props}
		/>
	);
}

function ProductDetailsPrice({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="product-details-price"
			className={cn("text-2xl font-bold", className)}
			{...props}
		/>
	);
}

function ProductDetailsPriceRange({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="product-details-price-range"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

function ProductDetailsGrid({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="product-details-grid"
			className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 min-w-0", className)}
			{...props}
		/>
	);
}

function ProductDetailsImages({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="product-details-images"
			className={cn("space-y-4 min-w-0", className)}
			{...props}
		/>
	);
}

function ProductDetailsMainImage({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="product-details-main-image"
			className={cn(
				"aspect-square w-full rounded-lg overflow-hidden bg-muted",
				className,
			)}
			{...props}
		/>
	);
}

function ProductDetailsImage({
	className,
	...props
}: React.ComponentProps<"img">) {
	return (
		<img
			data-slot="product-details-image"
			className={cn("w-full h-full object-cover", className)}
			{...props}
		/>
	);
}

function ProductDetailsThumbnails({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="product-details-thumbnails"
			className={cn("min-w-0", className)}
			{...props}
		/>
	);
}

function ProductDetailsThumbnailGrid({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="product-details-thumbnail-grid"
			className={cn("flex gap-2 overflow-x-auto pb-2", className)}
			{...props}
		/>
	);
}

function ProductDetailsThumbnail({
	className,
	active,
	...props
}: React.ComponentProps<"button"> & { active?: boolean }) {
	return (
		<button
			data-slot="product-details-thumbnail"
			className={cn(
				"flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden border-2 transition-all",
				active
					? "border-primary shadow-md"
					: "border-border hover:border-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function ProductDetailsContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="product-details-content"
			className={cn("space-y-6", className)}
			{...props}
		/>
	);
}

function ProductDetailsDescription({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="product-details-description"
			className={cn("", className)}
			{...props}
		/>
	);
}

function ProductDetailsDescriptionTitle({
	className,
	...props
}: React.ComponentProps<"h3">) {
	return (
		<h3
			data-slot="product-details-description-title"
			className={cn("font-semibold mb-2", className)}
			{...props}
		/>
	);
}

function ProductDetailsDescriptionText({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="product-details-description-text"
			className={cn("text-muted-foreground leading-relaxed", className)}
			{...props}
		/>
	);
}

function ProductDetailsOptions({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="product-details-options"
			className={cn("flex flex-col gap-5", className)}
			{...props}
		/>
	);
}

function ProductDetailsOption({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="product-details-option"
			className={cn("flex flex-col gap-3", className)}
			{...props}
		/>
	);
}

function ProductDetailsOptionLabel({
	className,
	...props
}: React.ComponentProps<"label">) {
	return (
		<label
			data-slot="product-details-option-label"
			className={cn("text-sm font-medium", className)}
			{...props}
		/>
	);
}

function ProductDetailsOptionValues({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="product-details-option-values"
			className={cn("flex flex-wrap gap-2", className)}
			{...props}
		/>
	);
}

function ProductDetailsOptionValue({
	className,
	selected,
	...props
}: React.ComponentProps<"button"> & { selected?: boolean }) {
	return (
		<button
			data-slot="product-details-option-value"
			className={cn(
				"px-3 py-1 rounded-md border text-sm transition-colors",
				selected
					? "bg-primary text-primary-foreground border-primary"
					: "hover:bg-muted border-input",
				className,
			)}
			{...props}
		/>
	);
}

function ProductDetailsActions({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="product-details-actions"
			className={cn("space-y-3", className)}
			{...props}
		/>
	);
}

export {
	ProductDetails,
	ProductDetailsHeader,
	ProductDetailsTitle,
	ProductDetailsLink,
	ProductDetailsPricing,
	ProductDetailsPrice,
	ProductDetailsPriceRange,
	ProductDetailsGrid,
	ProductDetailsImages,
	ProductDetailsMainImage,
	ProductDetailsImage,
	ProductDetailsThumbnails,
	ProductDetailsThumbnailGrid,
	ProductDetailsThumbnail,
	ProductDetailsContent,
	ProductDetailsDescription,
	ProductDetailsDescriptionTitle,
	ProductDetailsDescriptionText,
	ProductDetailsOptions,
	ProductDetailsOption,
	ProductDetailsOptionLabel,
	ProductDetailsOptionValues,
	ProductDetailsOptionValue,
	ProductDetailsActions,
};
