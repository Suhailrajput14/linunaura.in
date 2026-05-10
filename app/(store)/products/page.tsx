import { getProducts, getCategories } from '@/lib/api';
import { ProductListing } from '@/components/products/product-listing';

interface Props {
  searchParams: { category?: string; sort?: string; search?: string };
}

export default async function ProductsPage({ searchParams }: Props) {
  const [products, categories] = await Promise.all([
    getProducts({
      category: searchParams.category,
      sort: searchParams.sort,
      search: searchParams.search,
    }),
    getCategories(),
  ]);

  return <ProductListing products={products} categories={categories} />;
}

export const metadata = {
  title: 'Bedsheets - Linunaura',
  description: 'Browse our premium collection of bedsheets crafted from Egyptian cotton, linen, silk, and more.',
};
