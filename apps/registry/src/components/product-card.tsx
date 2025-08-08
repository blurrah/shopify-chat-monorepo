import { Button } from "@/components/ui/button";
import {
    ProductCard,
    ProductCardImage,
    ProductCardContent,
    ProductCardTitle,
    ProductCardPrice,
    ProductCardDescription,
    ProductCardActions,
    ProductCardLink,
} from "@/components/ui/product-card";


const mockProduct = {
	title: "Premium Wireless Headphones",
	image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
	description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
	price_range: {
		min: 199,
		max: 299,
		currency: "$"
	},
	url: "https://example.com/product",
	product_id: "prod_123"
};

export function ProductCardComponent() {
    return (
        <ProductCard className="w-[350px]">
				<ProductCardImage 
					src={mockProduct.image_url}
					alt={mockProduct.title}
				/>
				<ProductCardContent>
					<ProductCardTitle>{mockProduct.title}</ProductCardTitle>
					<ProductCardPrice>
						Between {mockProduct.price_range.currency}{mockProduct.price_range.min} and {mockProduct.price_range.currency}{mockProduct.price_range.max}
					</ProductCardPrice>
					<ProductCardDescription>
						{mockProduct.description}
					</ProductCardDescription>
					<ProductCardActions>
						<ProductCardLink href={mockProduct.url}>
							View Product →
						</ProductCardLink>
						<Button 
							size="sm" 
							className="w-full"
						>
							Add to Cart
						</Button>
						<Button 
							size="sm" 
							className="w-full" 
							variant="outline"
						>
							Get product details
						</Button>
					</ProductCardActions>
				</ProductCardContent>
			</ProductCard>
    );
}