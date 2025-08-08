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

interface CartItemData {
	id: string;
	title: string;
	quantity: number;
	variant?: string;
	price: number;
	currency?: string;
}

interface CartTotal {
	amount: number | string;
	currency: string;
}

interface CartData {
	items?: CartItemData[];
	total?: CartTotal;
	checkoutUrl?: string;
}

interface CartComponentProps {
	cart?: CartData;
}

const mockCartItems: CartItemData[] = [
	{
		id: "1",
		title: "Premium Wireless Headphones",
		quantity: 1,
		variant: "Black - Standard",
		price: 299.99,
		currency: "$",
	},
	{
		id: "2",
		title: "Smart Watch Pro",
		quantity: 2,
		variant: "Silver - 42mm",
		price: 399.99,
		currency: "$",
	},
];

const mockTotal: CartTotal = {
	amount: 1099.97,
	currency: "$",
};

const mockCart: CartData = {
	items: mockCartItems,
	total: mockTotal,
	checkoutUrl: "https://example.com/checkout",
};

export function CartComponent({ cart = mockCart }: CartComponentProps) {
	const items = cart.items || [];
	const total = cart.total || { amount: 0, currency: "$" };
	const checkoutUrl = cart.checkoutUrl || "https://example.com/checkout";
	const isEmpty = items.length === 0;
	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<Cart className="w-[400px]">
			<CartHeader>
				<CartTitle>
					<CartIcon>
						<ShoppingCartIcon className="size-4 text-muted-foreground" />
					</CartIcon>
					<CartTitleText>Shopping Cart</CartTitleText>
				</CartTitle>
				{!isEmpty && <Badge variant="secondary">{totalItems} items</Badge>}
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
						{items.map((item) => (
							<CartItem key={item.id}>
								<CartItemContent>
									<CartItemTitle>{item.title}</CartItemTitle>
									<CartItemDetails>
										<CartItemInfo>
											<span>Qty: {item.quantity}</span>
											{item.variant && <span>• Variant: {item.variant}</span>}
										</CartItemInfo>
										<CartItemPrice>
											<span>{item.currency || "$"}</span>
											<span>{(item.price * item.quantity).toFixed(2)}</span>
										</CartItemPrice>
									</CartItemDetails>
								</CartItemContent>
							</CartItem>
						))}
					</CartItems>

					<CartSummary>
						<CartSummaryLabel>Total</CartSummaryLabel>
						<CartSummaryTotal>
							<span>{total.currency}</span>
							<span>
								{typeof total.amount === "number"
									? total.amount.toFixed(2)
									: total.amount}
							</span>
						</CartSummaryTotal>
					</CartSummary>

					<CartCheckout href={checkoutUrl}>
						Proceed to Checkout
						<ExternalLinkIcon className="size-4" />
					</CartCheckout>
				</CartContent>
			)}
		</Cart>
	);
}
