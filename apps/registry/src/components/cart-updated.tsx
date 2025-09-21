"use client";

import {
	CheckCircleIcon,
	MinusIcon,
	PlusIcon,
	ShoppingCartIcon,
	XIcon,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
	CartUpdated,
	CartUpdatedActions,
	CartUpdatedChanges,
	CartUpdatedChangesTitle,
	CartUpdatedHeader,
	CartUpdatedIcon,
	CartUpdatedItem,
	CartUpdatedItemBadge,
	CartUpdatedItemContent,
	CartUpdatedItemDetails,
	CartUpdatedItemIcon,
	CartUpdatedItems,
	CartUpdatedItemTitle,
	CartUpdatedTitle,
	CartUpdatedViewCart,
} from "@/components/ui/cart-updated";

// Shopify cart types
interface ShopifyCartLine {
	id: string;
	quantity: number;
	cost: {
		total_amount: {
			amount: string;
			currency: string;
		};
		subtotal_amount: {
			amount: string;
			currency: string;
		};
	};
	merchandise: {
		id: string;
		title: string;
		product: {
			id: string;
			title: string;
		};
	};
}

interface ShopifyCart {
	id: string;
	created_at: string;
	updated_at: string;
	lines: ShopifyCartLine[];
	delivery: Record<string, any>;
	discounts: Record<string, any>;
	gift_cards: any[];
	cost: {
		total_amount: {
			amount: string;
			currency: string;
		};
		subtotal_amount: {
			amount: string;
			currency: string;
		};
		total_tax_amount?: {
			amount: string;
			currency: string;
		};
	};
	total_quantity: number;
	checkout_url: string;
}

// Simplified update item for display
interface UpdatedItem {
	id: string;
	title: string;
	quantity: number;
	action: string;
	variant?: string;
	previousQuantity?: number;
}

interface CartUpdatedComponentProps {
	instructions?: string;
	cart?: ShopifyCart;
	errors?: any[];
	updatedItems?: UpdatedItem[];
}

// Mock Shopify cart data based on the example provided
const mockCart: ShopifyCart = {
	id: "gid://shopify/Cart/hWN1YuVAnGXUipguqgELC4kV?key=c8fe3d5a36146ec30e34c140a072b4bc",
	created_at: "2025-08-08T12:23:51.696Z",
	updated_at: "2025-08-08T12:23:51.696Z",
	lines: [
		{
			id: "gid://shopify/CartLine/05aff3c5-d3fe-4dd8-b257-327c607ad906?cart=hWN1YuVAnGXUipguqgELC4kV",
			quantity: 1,
			cost: {
				total_amount: {
					amount: "19.95",
					currency: "USD",
				},
				subtotal_amount: {
					amount: "19.95",
					currency: "USD",
				},
			},
			merchandise: {
				id: "gid://shopify/ProductVariant/14574992523362",
				title: "3.5 oz (100g) Tin",
				product: {
					id: "gid://shopify/Product/1614972518498",
					title: "Culinary Grade Matcha Powder",
				},
			},
		},
	],
	delivery: {},
	discounts: {},
	gift_cards: [],
	cost: {
		total_amount: {
			amount: "19.95",
			currency: "USD",
		},
		subtotal_amount: {
			amount: "19.95",
			currency: "USD",
		},
		total_tax_amount: {
			amount: "0.0",
			currency: "USD",
		},
	},
	total_quantity: 1,
	checkout_url:
		"https://itoen.com/cart/c/hWN1YuVAnGXUipguqgELC4kV?key=c8fe3d5a36146ec30e34c140a072b4bc",
};

// Mock updated items to show what changed
const mockUpdatedItems: UpdatedItem[] = [
	{
		id: "1",
		title: "Culinary Grade Matcha Powder",
		variant: "3.5 oz (100g) Tin",
		quantity: 1,
		action: "added",
	},
];

function getActionIcon(action: string) {
	switch (action) {
		case "added":
			return PlusIcon;
		case "removed":
			return XIcon;
		default:
			return MinusIcon;
	}
}

function getActionColor(action: string) {
	switch (action) {
		case "added":
			return "text-secondary-foreground";
		case "removed":
			return "text-destructive";
		default:
			return "text-muted-foreground";
	}
}

function getActionText(
	action: string,
	quantity: number,
	previousQuantity?: number,
) {
	switch (action) {
		case "added":
			return `Added ${quantity} ${quantity === 1 ? "item" : "items"}`;
		case "removed":
			return `Removed ${quantity} ${quantity === 1 ? "item" : "items"}`;
		case "updated":
			if (previousQuantity) {
				return `Changed quantity from ${previousQuantity} to ${quantity}`;
			}
			return `Updated to ${quantity} ${quantity === 1 ? "item" : "items"}`;
		default:
			return `Updated ${quantity} ${quantity === 1 ? "item" : "items"}`;
	}
}

function getActionBadgeText(action: string) {
	switch (action) {
		case "added":
			return "Added";
		case "removed":
			return "Removed";
		default:
			return "Updated";
	}
}

function formatCurrency(currency: string): string {
	// Map common currency codes to symbols
	const currencySymbols: Record<string, string> = {
		USD: "$",
		EUR: "€",
		GBP: "£",
		CAD: "$",
		AUD: "$",
		JPY: "¥",
	};
	return currencySymbols[currency] || currency;
}

export function CartUpdatedComponent({
	instructions = "Cart updated successfully",
	cart = mockCart,
	errors = [],
	updatedItems = mockUpdatedItems,
}: CartUpdatedComponentProps) {
	useState("hello");
	const hasErrors = errors && errors.length > 0;
	const currencySymbol = formatCurrency(cart.cost.total_amount.currency);

	return (
		<CartUpdated className="w-[400px]">
			<CartUpdatedHeader>
				<CartUpdatedIcon>
					<CheckCircleIcon className="size-4 text-secondary-foreground" />
				</CartUpdatedIcon>
				<CartUpdatedTitle>{instructions}</CartUpdatedTitle>
				<Badge variant="secondary">
					{cart.total_quantity} total{" "}
					{cart.total_quantity === 1 ? "item" : "items"}
				</Badge>
			</CartUpdatedHeader>

			{updatedItems.length > 0 && (
				<CartUpdatedChanges>
					<CartUpdatedChangesTitle>Changes Made</CartUpdatedChangesTitle>
					<CartUpdatedItems>
						{updatedItems.map((item, index) => {
							const ActionIcon = getActionIcon(item.action);
							const actionColor = getActionColor(item.action);

							return (
								<CartUpdatedItem key={item.id || index}>
									<CartUpdatedItemIcon>
										<ActionIcon className={actionColor} />
									</CartUpdatedItemIcon>
									<CartUpdatedItemContent>
										<CartUpdatedItemTitle>
											{item.title}
											{item.variant && (
												<span className="text-muted-foreground text-sm ml-2">
													({item.variant})
												</span>
											)}
										</CartUpdatedItemTitle>
										<CartUpdatedItemDetails>
											{getActionText(
												item.action,
												item.quantity,
												item.previousQuantity,
											)}
										</CartUpdatedItemDetails>
									</CartUpdatedItemContent>
									<CartUpdatedItemBadge>
										<Badge variant="outline" className={actionColor}>
											{getActionBadgeText(item.action)}
										</Badge>
									</CartUpdatedItemBadge>
								</CartUpdatedItem>
							);
						})}
					</CartUpdatedItems>
				</CartUpdatedChanges>
			)}

			{/* Show cart summary */}
			{cart.lines.length > 0 && (
				<div className="px-6 py-3 border-t space-y-1">
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Subtotal</span>
						<span>
							<span>{currencySymbol}</span>
							<span>{cart.cost.subtotal_amount.amount}</span>
						</span>
					</div>
					{cart.cost.total_tax_amount &&
						parseFloat(cart.cost.total_tax_amount.amount) > 0 && (
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Tax</span>
								<span>
									{currencySymbol}
									{cart.cost.total_tax_amount.amount}
								</span>
							</div>
						)}
					<div className="flex justify-between font-semibold">
						<span>Total</span>
						<span>
							<span>{currencySymbol}</span>
							<span>{cart.cost.total_amount.amount}</span>
						</span>
					</div>
				</div>
			)}

			{hasErrors && (
				<div className="px-6 py-3 border-t">
					<div className="text-sm text-destructive">
						{errors.map((error, index) => (
							<div key={index}>{JSON.stringify(error)}</div>
						))}
					</div>
				</div>
			)}

			<CartUpdatedActions>
				<CartUpdatedViewCart href={cart.checkout_url}>
					<ShoppingCartIcon className="size-4" />
					View Updated Cart
				</CartUpdatedViewCart>
			</CartUpdatedActions>
		</CartUpdated>
	);
}
