import { ShoppingCartIcon, ExternalLinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
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
} from "@/components/ui/cart";

const mockCartItems = [
	{
		id: "1",
		title: "Premium Wireless Headphones",
		quantity: 1,
		variant: "Black - Standard",
		price: 299.99,
		currency: "$"
	},
	{
		id: "2", 
		title: "Smart Watch Pro",
		quantity: 2,
		variant: "Silver - 42mm",
		price: 399.99,
		currency: "$"
	}
];

const mockTotal = {
	amount: 1099.97,
	currency: "$"
};

export function CartComponent() {
	const isEmpty = mockCartItems.length === 0;
	const totalItems = mockCartItems.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<Cart className="w-[400px]">
			<CartHeader>
				<CartTitle>
					<CartIcon>
						<ShoppingCartIcon className="size-4 text-muted-foreground" />
					</CartIcon>
					<CartTitleText>Shopping Cart</CartTitleText>
				</CartTitle>
				{!isEmpty && (
					<Badge variant="secondary">
						{totalItems} items
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
						{mockCartItems.map((item) => (
							<CartItem key={item.id}>
								<CartItemContent>
									<CartItemTitle>{item.title}</CartItemTitle>
									<CartItemDetails>
										<CartItemInfo>
											<span>Qty: {item.quantity}</span>
											<span>• Variant: {item.variant}</span>
										</CartItemInfo>
										<CartItemPrice>
											{item.currency}{(item.price * item.quantity).toFixed(2)}
										</CartItemPrice>
									</CartItemDetails>
								</CartItemContent>
							</CartItem>
						))}
					</CartItems>

					<CartSummary>
						<CartSummaryLabel>Total</CartSummaryLabel>
						<CartSummaryTotal>
							{mockTotal.currency}{mockTotal.amount.toFixed(2)}
						</CartSummaryTotal>
					</CartSummary>

					<CartCheckout href="https://example.com/checkout">
						Proceed to Checkout
						<ExternalLinkIcon className="size-4" />
					</CartCheckout>
				</CartContent>
			)}
		</Cart>
	);
}