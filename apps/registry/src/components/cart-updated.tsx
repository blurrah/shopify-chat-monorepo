import { CheckCircleIcon, PlusIcon, MinusIcon, XIcon, ShoppingCartIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
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
} from "@/components/ui/cart-updated";

const mockUpdatedItems = [
	{
		id: "1",
		title: "Premium Wireless Headphones",
		quantity: 2,
		action: "added"
	},
	{
		id: "2",
		title: "Smart Watch Pro",
		quantity: 1,
		action: "removed"
	}
];

const mockCartSummary = {
	totalQuantity: 3,
	checkoutUrl: "https://example.com/checkout"
};

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

function getActionText(action: string, quantity: number) {
	switch (action) {
		case "added":
			return `Added ${quantity} items`;
		case "removed":
			return `Removed ${quantity} items`;
		default:
			return `Updated ${quantity} items`;
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

export function CartUpdatedComponent() {
	return (
		<CartUpdated className="w-[400px]">
			<CartUpdatedHeader>
				<CartUpdatedIcon>
					<CheckCircleIcon className="size-4 text-secondary-foreground" />
				</CartUpdatedIcon>
				<CartUpdatedTitle>Cart Updated Successfully</CartUpdatedTitle>
				<Badge variant="secondary">
					{mockCartSummary.totalQuantity} total items
				</Badge>
			</CartUpdatedHeader>

			{mockUpdatedItems.length > 0 && (
				<CartUpdatedChanges>
					<CartUpdatedChangesTitle>Changes Made</CartUpdatedChangesTitle>
					<CartUpdatedItems>
						{mockUpdatedItems.map((item) => {
							const ActionIcon = getActionIcon(item.action);
							const actionColor = getActionColor(item.action);

							return (
								<CartUpdatedItem key={item.id}>
									<CartUpdatedItemIcon>
										<ActionIcon className={actionColor} />
									</CartUpdatedItemIcon>
									<CartUpdatedItemContent>
										<CartUpdatedItemTitle>{item.title}</CartUpdatedItemTitle>
										<CartUpdatedItemDetails>
											<span>{getActionText(item.action, item.quantity)}</span>
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

			<CartUpdatedActions>
				<CartUpdatedViewCart href={mockCartSummary.checkoutUrl}>
					<ShoppingCartIcon className="size-4" />
					View Updated Cart
				</CartUpdatedViewCart>
			</CartUpdatedActions>
		</CartUpdated>
	);
}