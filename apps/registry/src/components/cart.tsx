import { ExternalLinkIcon, ShoppingCartIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Cart,
	CartCheckout,
	CartContent,
	CartEmpty,
	CartEmptyIcon,
	CartEmptyText,
	CartHeader,
	CartIcon,
	CartItem,
	CartItemContent,
	CartItemDetails,
	CartItemInfo,
	CartItemPrice,
	CartItems,
	CartItemTitle,
	CartSummary,
	CartSummaryLabel,
	CartSummaryTotal,
	CartTitle,
	CartTitleText,
} from "@/components/ui/cart";

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

interface CartComponentProps {
	instructions?: string;
	cart?: ShopifyCart;
	errors?: any[];
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
					currency: "USD"
				},
				subtotal_amount: {
					amount: "19.95",
					currency: "USD"
				}
			},
			merchandise: {
				id: "gid://shopify/ProductVariant/14574992523362",
				title: "3.5 oz (100g) Tin",
				product: {
					id: "gid://shopify/Product/1614972518498",
					title: "Culinary Grade Matcha Powder"
				}
			}
		}
	],
	delivery: {},
	discounts: {},
	gift_cards: [],
	cost: {
		total_amount: {
			amount: "19.95",
			currency: "USD"
		},
		subtotal_amount: {
			amount: "19.95",
			currency: "USD"
		},
		total_tax_amount: {
			amount: "0.0",
			currency: "USD"
		}
	},
	total_quantity: 1,
	checkout_url: "https://itoen.com/cart/c/hWN1YuVAnGXUipguqgELC4kV?key=c8fe3d5a36146ec30e34c140a072b4bc"
};

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

export function CartComponent({ 
	instructions = "Your shopping cart",
	cart = mockCart,
	errors = []
}: CartComponentProps) {
	const isEmpty = cart.lines.length === 0;
	const totalItems = cart.total_quantity;
	const currencySymbol = formatCurrency(cart.cost.total_amount.currency);
	const hasErrors = errors && errors.length > 0;

	return (
		<Cart className="w-[400px]">
			<CartHeader>
				<CartTitle>
					<CartIcon>
						<ShoppingCartIcon className="size-4 text-muted-foreground" />
					</CartIcon>
					<CartTitleText>{instructions}</CartTitleText>
				</CartTitle>
				{!isEmpty && (
					<Badge variant="secondary">
						{totalItems} {totalItems === 1 ? 'item' : 'items'}
					</Badge>
				)}
			</CartHeader>

			{isEmpty ? (
				<CartEmpty>
					<CartEmptyIcon>
						<ShoppingCartIcon className="size-8 mx-auto mb-2 opacity-50" />
					</CartEmptyIcon>
					<CartEmptyText>Your cart is empty</CartEmptyText>
				</CartEmpty>
			) : (
				<CartContent>
					<CartItems>
						{cart.lines.map((line) => {
							const unitPrice = parseFloat(line.cost.subtotal_amount.amount) / line.quantity;
							return (
								<CartItem key={line.id}>
									<CartItemContent>
										<CartItemTitle>
											{line.merchandise.product.title}
										</CartItemTitle>
										<CartItemDetails>
											<CartItemInfo>
												<span>Qty: {line.quantity}</span>
												{line.merchandise.title !== line.merchandise.product.title && (
													<span>• {line.merchandise.title}</span>
												)}
											</CartItemInfo>
											<CartItemPrice>
												<span>{currencySymbol}</span>
												<span>{line.cost.total_amount.amount}</span>
												{line.quantity > 1 && (
													<span className="text-xs text-muted-foreground ml-1">
														(<span>{currencySymbol}</span>
														<span>{unitPrice.toFixed(2)}</span> each)
													</span>
												)}
											</CartItemPrice>
										</CartItemDetails>
									</CartItemContent>
								</CartItem>
							);
						})}
					</CartItems>

					<CartSummary>
						<CartSummaryLabel>
							<div className="space-y-1">
								<div className="flex justify-between text-sm text-muted-foreground">
									<span>Subtotal</span>
									<span>
										<span>{currencySymbol}</span>
										<span>{cart.cost.subtotal_amount.amount}</span>
									</span>
								</div>
								{cart.cost.total_tax_amount && parseFloat(cart.cost.total_tax_amount.amount) > 0 && (
									<div className="flex justify-between text-sm text-muted-foreground">
										<span>Tax</span>
										<span>
											<span>{currencySymbol}</span>
											<span>{cart.cost.total_tax_amount.amount}</span>
										</span>
									</div>
								)}
								<div className="flex justify-between font-semibold pt-1 border-t">
									<span>Total</span>
									<span>
										<span>{currencySymbol}</span>
										<span>{cart.cost.total_amount.amount}</span>
									</span>
								</div>
							</div>
						</CartSummaryLabel>
						<CartSummaryTotal className="sr-only">
							<span>{currencySymbol}</span>
							<span>{cart.cost.total_amount.amount}</span>
						</CartSummaryTotal>
					</CartSummary>

					{hasErrors && (
						<div className="px-6 py-3 border-t">
							<div className="text-sm text-destructive">
								{errors.map((error, index) => (
									<div key={index}>{JSON.stringify(error)}</div>
								))}
							</div>
						</div>
					)}

					<CartCheckout href={cart.checkout_url}>
						Proceed to Checkout
						<ExternalLinkIcon className="size-4" />
					</CartCheckout>
				</CartContent>
			)}
		</Cart>
	);
}