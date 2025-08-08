
"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
	ProductDetailsOptionLabel,
	ProductDetailsOptionValues,
	ProductDetailsOptionValue,
	ProductDetailsActions,
} from "@/components/ui/product-details";

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

const productVariants = {
	"Black-Standard": { price: 299.99, available: true },
	"Black-Large": { price: 329.99, available: true },
	"White-Standard": { price: 309.99, available: true },
	"White-Large": { price: 339.99, available: false },
	"Silver-Standard": { price: 319.99, available: true },
	"Silver-Large": { price: 349.99, available: true },
};

export function ProductDetailsComponent() {
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const [selectedOptions, setSelectedOptions] = useState({
		Color: "Black",
		Size: "Standard"
	});

	const handleOptionChange = (optionName: string, value: string) => {
		setSelectedOptions(prev => ({
			...prev,
			[optionName]: value
		}));
	};

	const getVariantKey = () => `${selectedOptions.Color}-${selectedOptions.Size}`;
	const currentVariant = productVariants[getVariantKey() as keyof typeof productVariants];
	const formatPrice = (price: number) => `$${price.toFixed(2)}`;

	return (
		<ProductDetails>
			<ProductDetailsHeader>
				<ProductDetailsTitle>
					<ProductDetailsLink href="https://example.com/headphones">
						Premium Wireless Headphones
					</ProductDetailsLink>
				</ProductDetailsTitle>
				<ProductDetailsPricing>
					<ProductDetailsPrice>{formatPrice(currentVariant.price)}</ProductDetailsPrice>
					<ProductDetailsPriceRange>
						Range: $249.99 - $349.99
					</ProductDetailsPriceRange>
					<Badge variant={currentVariant.available ? "default" : "secondary"}>
						{currentVariant.available ? "In Stock" : "Out of Stock"}
					</Badge>
				</ProductDetailsPricing>
			</ProductDetailsHeader>

			<ProductDetailsGrid>
				<ProductDetailsImages>
					<ProductDetailsMainImage>
						<ProductDetailsImage
							src={productImages[selectedImageIndex].url}
							alt={productImages[selectedImageIndex].alt}
						/>
					</ProductDetailsMainImage>

					<ProductDetailsThumbnails>
						<ProductDetailsThumbnailGrid>
							{productImages.map((image, index) => (
								<ProductDetailsThumbnail 
									key={index}
									active={selectedImageIndex === index}
									onClick={() => setSelectedImageIndex(index)}
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
										selected={selectedOptions.Color === color}
										onClick={() => handleOptionChange("Color", color)}
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
										selected={selectedOptions.Size === size}
										onClick={() => handleOptionChange("Size", size)}
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
							disabled={!currentVariant.available}
							onClick={() => {
								console.log(`Adding to cart: ${selectedOptions.Color} ${selectedOptions.Size} - ${formatPrice(currentVariant.price)}`);
							}}
						>
							{currentVariant.available ? "Add to Cart" : "Out of Stock"}
						</Button>
						<Button 
							size="lg" 
							variant="outline" 
							className="w-full"
							onClick={() => {
								console.log("Finding similar products...");
							}}
						>
							Find Similar Products
						</Button>
					</ProductDetailsActions>
				</ProductDetailsContent>
			</ProductDetailsGrid>
		</ProductDetails>
	);
}