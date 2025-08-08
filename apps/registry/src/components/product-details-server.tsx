"use client";
import { Badge } from "@/components/ui/badge";
import {
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
	ProductDetailsOptionLabel, ProductDetailsActions,
	ProductDetailsOptionValue,
	ProductDetailsOptionValues
} from "@/components/ui/product-details";
import { Button } from "./ui/button";

const productImages = [
	{
		url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
		alt: "Black headphones front view"
	},
	{
		url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
		alt: "Headphones side profile"
	},
	{
		url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
		alt: "Headphones detail view"
	}
];

export function ProductDetailsServerComponent() {
	const defaultPrice = 299.99;
	
	return (
		<ProductDetails>
			<ProductDetailsHeader>
				<ProductDetailsTitle>
					<ProductDetailsLink href="https://example.com/headphones">
						Premium Wireless Headphones
					</ProductDetailsLink>
				</ProductDetailsTitle>
				<ProductDetailsPricing>
					<ProductDetailsPrice>{defaultPrice}</ProductDetailsPrice>
					<ProductDetailsPriceRange>
						Range: $249.99 - $349.99
					</ProductDetailsPriceRange>
					<Badge variant="default">
						In Stock
					</Badge>
				</ProductDetailsPricing>
			</ProductDetailsHeader>

			<ProductDetailsGrid>
				<ProductDetailsImages>
					<ProductDetailsMainImage>
						<ProductDetailsImage
							src={productImages[0].url}
							alt={productImages[0].alt}
						/>
					</ProductDetailsMainImage>

					<ProductDetailsThumbnails>
						<ProductDetailsThumbnailGrid>
							{productImages.map((image, index) => (
								<ProductDetailsThumbnail 
									key={index}
									active={index === 0}
								>
									<ProductDetailsImage
										src={image.url}
										alt={image.alt}
									/>
								</ProductDetailsThumbnail>
							))}
						</ProductDetailsThumbnailGrid>
					</ProductDetailsThumbnails>
				</ProductDetailsImages>

				<ProductDetailsContent>
					<ProductDetailsDescription>
						<ProductDetailsDescriptionTitle>Description</ProductDetailsDescriptionTitle>
						<ProductDetailsDescriptionText>
							Experience superior sound quality with these premium wireless headphones featuring advanced noise cancellation technology, 30-hour battery life, and premium materials for ultimate comfort during extended listening sessions.
						</ProductDetailsDescriptionText>
					</ProductDetailsDescription>

					<ProductDetailsOptions>
						<ProductDetailsOption>
							<ProductDetailsOptionLabel>Color</ProductDetailsOptionLabel>
							<ProductDetailsOptionValues>
								{["Black", "White", "Silver"].map(color => (
									<ProductDetailsOptionValue
										key={color}
										selected={color === "Black"}
									>
										{color}
									</ProductDetailsOptionValue>
								))}
							</ProductDetailsOptionValues>
						</ProductDetailsOption>
						<ProductDetailsOption>
							<ProductDetailsOptionLabel>Size</ProductDetailsOptionLabel>
							<ProductDetailsOptionValues>
								{["Standard", "Large"].map(size => (
									<ProductDetailsOptionValue
										key={size}
										selected={size === "Standard"}
									>
										{size}
									</ProductDetailsOptionValue>
								))}
							</ProductDetailsOptionValues>
						</ProductDetailsOption>
					</ProductDetailsOptions>

					<ProductDetailsActions>
						<Button 
							size="lg" 
							className="w-full"
						>
							Add to Cart
						</Button>
						<Button 
							size="lg" 
							variant="outline" 
							className="w-full"
						>
							Find Similar Products
						</Button>
					</ProductDetailsActions>
				</ProductDetailsContent>
			</ProductDetailsGrid>
		</ProductDetails>
	);
}