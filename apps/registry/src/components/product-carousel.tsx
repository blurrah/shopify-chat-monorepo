import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	ProductCard,
	ProductCardActions,
	ProductCardContent,
	ProductCardDescription,
	ProductCardImage,
	ProductCardLink,
	ProductCardPrice,
	ProductCardTitle,
} from "@/components/ui/product-card";
import { cn } from "@/lib/utils";

interface Product {
	product_id: string;
	title: string;
	image_url?: string;
	description?: string;
	price_range?: {
		min: string | number;
		max: string | number;
		currency: string;
	};
	url?: string;
}

interface ProductCarouselProps {
	products?: Product[];
	className?: string;
}

// Mock products for demo
const mockProducts: Product[] = [
	{
		product_id: "1",
		title: "Premium Wireless Headphones",
		image_url:
			"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
		description:
			"High-quality wireless headphones with noise cancellation and premium sound quality.",
		price_range: { min: 199, max: 299, currency: "$" },
		url: "https://example.com/product/1",
	},
	{
		product_id: "2",
		title: "Smart Watch Pro",
		image_url:
			"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
		description:
			"Advanced fitness tracking and health monitoring in a sleek design.",
		price_range: { min: 399, max: 499, currency: "$" },
		url: "https://example.com/product/2",
	},
	{
		product_id: "3",
		title: "Portable Speaker",
		image_url:
			"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
		description:
			"Waterproof Bluetooth speaker with 360-degree sound and 24-hour battery.",
		price_range: { min: 79, max: 99, currency: "$" },
		url: "https://example.com/product/3",
	},
	{
		product_id: "4",
		title: "Camera Lens Kit",
		image_url:
			"https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=400&h=300&fit=crop",
		description: "Professional photography lens kit for mobile devices.",
		price_range: { min: 149, max: 199, currency: "$" },
		url: "https://example.com/product/4",
	},
	{
		product_id: "5",
		title: "Laptop Stand",
		image_url:
			"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
		description:
			"Ergonomic aluminum laptop stand for better posture and cooling.",
		price_range: { min: 49, max: 69, currency: "$" },
		url: "https://example.com/product/5",
	},
];

export function ProductCarouselComponent({
	products = mockProducts,
	className,
}: ProductCarouselProps) {
	if (products.length === 0) {
		return null;
	}

	return (
		<div className={cn("w-full space-y-4", className)}>
			<div className="flex items-center justify-between mb-4">
				<h3 className="font-medium text-lg">Products</h3>
				<Badge variant="secondary">{products.length} found</Badge>
			</div>

			{/* Scrollable container with scroll snap */}
			<div className="relative">
				<div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:thin] [scrollbar-color:rgb(203_213_225)_transparent] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb:hover]:bg-slate-400">
					{products.map((product) => (
						<div
							key={product.product_id}
							className="flex-none w-[300px] snap-start"
						>
							<ProductCard className="h-full">
								{product.image_url && (
									<ProductCardImage
										src={product.image_url}
										alt={product.title}
									/>
								)}
								<ProductCardContent>
									<ProductCardTitle>{product.title}</ProductCardTitle>
									{product.price_range && (
										<ProductCardPrice>
											Between {product.price_range.currency}
											{product.price_range.min} and{" "}
											{product.price_range.currency}
											{product.price_range.max}
										</ProductCardPrice>
									)}
									{product.description && (
										<ProductCardDescription>
											{product.description}
										</ProductCardDescription>
									)}
									<ProductCardActions>
										{product.url && (
											<ProductCardLink href={product.url}>
												View Product → hello
											</ProductCardLink>
										)}
										<Button size="sm" className="w-full">
											Add to Cart :D
										</Button>
										<Button size="sm" className="w-full" variant="outline">
											Get product details :)
										</Button>
									</ProductCardActions>
								</ProductCardContent>
							</ProductCard>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
