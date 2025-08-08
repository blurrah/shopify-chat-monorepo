import { Badge } from "@/components/ui/badge";
import {
	ProductDetails,
	ProductDetailsActions,
	ProductDetailsContent,
	ProductDetailsDescription,
	ProductDetailsDescriptionText,
	ProductDetailsDescriptionTitle,
	ProductDetailsGrid,
	ProductDetailsHeader,
	ProductDetailsImage,
	ProductDetailsImages,
	ProductDetailsLink,
	ProductDetailsMainImage,
	ProductDetailsOption,
	ProductDetailsOptionLabel,
	ProductDetailsOptions,
	ProductDetailsOptionValue,
	ProductDetailsOptionValues,
	ProductDetailsPrice,
	ProductDetailsPriceRange,
	ProductDetailsPricing,
	ProductDetailsThumbnail,
	ProductDetailsThumbnailGrid,
	ProductDetailsThumbnails,
	ProductDetailsTitle,
} from "@/components/ui/product-details";
import { Button } from "./ui/button";

interface ProductImage {
	url: string;
	alt_text?: string | null;
}

interface ProductOption {
	name: string;
	values: string[];
}

interface ProductVariant {
	variant_id: string;
	title: string;
	price: string;
	currency: string;
	image_url: string;
	available: boolean;
}

interface Product {
	product_id: string;
	title: string;
	description: string;
	url: string;
	image_url: string;
	images: ProductImage[];
	options: ProductOption[];
	price_range: {
		min: string;
		max: string;
		currency: string;
	};
	selectedOrFirstAvailableVariant: ProductVariant;
}

interface ProductDetailsServerProps {
	product?: Product;
}

// Mock product data
const mockProduct: Product = {
	product_id: "prod_123",
	title: "Premium Wireless Headphones",
	description:
		"Experience superior sound quality with these premium wireless headphones featuring advanced noise cancellation technology, 30-hour battery life, and premium materials for ultimate comfort during extended listening sessions.",
	url: "https://example.com/headphones",
	image_url:
		"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
	images: [
		{
			url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
			alt_text: "Black headphones front view",
		},
		{
			url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
			alt_text: "Headphones side profile",
		},
		{
			url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
			alt_text: "Headphones detail view",
		},
	],
	options: [
		{
			name: "Color",
			values: ["Black", "White", "Silver"],
		},
		{
			name: "Size",
			values: ["Standard", "Large"],
		},
	],
	price_range: {
		min: "249.99",
		max: "349.99",
		currency: "$",
	},
	selectedOrFirstAvailableVariant: {
		variant_id: "var_123",
		title: "Black / Standard",
		price: "299.99",
		currency: "$",
		image_url:
			"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
		available: true,
	},
};

export function ProductDetailsServerComponent({
	product = mockProduct,
}: ProductDetailsServerProps) {
	// Display the first image as main, or use a default if none exist
	const mainImage = product.images[0] || {
		url: product.image_url,
		alt_text: product.title,
	};

	return (
		<ProductDetails>
			<ProductDetailsHeader>
				<ProductDetailsTitle>
					<ProductDetailsLink href={product.url}>
						{product.title}
					</ProductDetailsLink>
				</ProductDetailsTitle>
				<ProductDetailsPricing>
					<ProductDetailsPrice>
						{product.selectedOrFirstAvailableVariant.currency}
						{product.selectedOrFirstAvailableVariant.price}
					</ProductDetailsPrice>
					<ProductDetailsPriceRange>
						Range: {product.price_range.currency}
						{product.price_range.min} - {product.price_range.currency}
						{product.price_range.max}
					</ProductDetailsPriceRange>
					<Badge
						variant={
							product.selectedOrFirstAvailableVariant.available
								? "default"
								: "secondary"
						}
					>
						{product.selectedOrFirstAvailableVariant.available
							? "In Stock"
							: "Out of Stock"}
					</Badge>
				</ProductDetailsPricing>
			</ProductDetailsHeader>

			<ProductDetailsGrid>
				<ProductDetailsImages>
					<ProductDetailsMainImage>
						<ProductDetailsImage
							src={mainImage.url}
							alt={mainImage.alt_text || product.title}
						/>
					</ProductDetailsMainImage>

					{product.images.length > 1 && (
						<ProductDetailsThumbnails>
							<ProductDetailsThumbnailGrid>
								{product.images.map((image, index) => (
									<ProductDetailsThumbnail key={index} active={index === 0}>
										<ProductDetailsImage
											src={image.url}
											alt={
												image.alt_text || `${product.title} view ${index + 1}`
											}
										/>
									</ProductDetailsThumbnail>
								))}
							</ProductDetailsThumbnailGrid>
						</ProductDetailsThumbnails>
					)}
				</ProductDetailsImages>

				<ProductDetailsContent>
					<ProductDetailsDescription>
						<ProductDetailsDescriptionTitle>
							Description
						</ProductDetailsDescriptionTitle>
						<ProductDetailsDescriptionText>
							{product.description}
						</ProductDetailsDescriptionText>
					</ProductDetailsDescription>

					{product.options.length > 0 && (
						<ProductDetailsOptions>
							{product.options.map((option) => (
								<ProductDetailsOption key={option.name}>
									<ProductDetailsOptionLabel>
										{option.name}
									</ProductDetailsOptionLabel>
									<ProductDetailsOptionValues>
										{option.values.map((value, idx) => (
											<ProductDetailsOptionValue
												key={value}
												selected={idx === 0} // First option selected by default
											>
												{value}
											</ProductDetailsOptionValue>
										))}
									</ProductDetailsOptionValues>
								</ProductDetailsOption>
							))}
						</ProductDetailsOptions>
					)}

					<ProductDetailsActions>
						<Button
							size="lg"
							className="w-full"
							disabled={!product.selectedOrFirstAvailableVariant.available}
						>
							{product.selectedOrFirstAvailableVariant.available
								? "Add to Cart"
								: "Out of Stock"}
						</Button>
						<Button size="lg" variant="outline" className="w-full">
							Find Similar Products
						</Button>
					</ProductDetailsActions>
				</ProductDetailsContent>
			</ProductDetailsGrid>
		</ProductDetails>
	);
}
