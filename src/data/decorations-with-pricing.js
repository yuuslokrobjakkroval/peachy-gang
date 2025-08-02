import { decorationsData } from "./decorations.js";
import shopData from "./shop.json";

// Helper function to format price from cents to dollars
const formatPrice = (amount, currencyExponent = 2) => {
  const price = amount / Math.pow(10, currencyExponent);
  return `$${price.toFixed(2)}`;
};

// Helper function to find shop item by name or slug
const findShopItem = (decorationName, decorationSlug) => {
  return shopData.find((item) => {
    const shopName = item.sku?.name?.toLowerCase();
    const shopSlug = item.sku?.slug?.toLowerCase();
    const decorName = decorationName.toLowerCase();
    const decorSlug = decorationSlug?.toLowerCase();

    // Try to match by name first, then by slug
    return (
      shopName === decorName ||
      shopSlug === decorSlug ||
      shopSlug === decorName.replace(/\s+/g, "-") ||
      shopName === decorName
    );
  });
};

// Function to merge decorations with pricing data
const mergeDecorationsWithPricing = () => {
  return decorationsData.map((category) => ({
    ...category,
    data: category.data.map((section) => ({
      ...section,
      i: section.i.map((decoration) => {
        // Find matching shop item
        const shopItem = findShopItem(decoration.n, decoration.f);

        // Create enhanced decoration object
        const enhancedDecoration = {
          ...decoration,
          // Add pricing information if found
          ...(shopItem && {
            price: {
              amount: shopItem.sku.price.amount,
              formatted: formatPrice(
                shopItem.sku.price.amount,
                shopItem.sku.price.currency_exponent
              ),
              currency: shopItem.sku.price.currency,
              premium: shopItem.sku.price.premium,
              // Format premium price if available
              ...(shopItem.sku.price.premium && {
                premiumFormatted: formatPrice(
                  shopItem.sku.price.premium["2"]?.amount ||
                    shopItem.sku.price.amount,
                  shopItem.sku.price.currency_exponent
                ),
              }),
            },
            shopId: shopItem.id,
            slug: shopItem.sku.slug,
            published: shopItem.published,
          }),
        };

        return enhancedDecoration;
      }),
    })),
  }));
};

// Export the merged data
export const decorationsDataWithPricing = mergeDecorationsWithPricing();

// Export helper functions for use in components
export { formatPrice, findShopItem };
