import { getProductBySlug, getProducts } from '@/lib/api';
import { ProductDetail } from '@/components/products/product-detail';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const products = await getProducts({});
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}

export async function generateMetadata({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  return {
    title: product ? `${product.name} - Linunaura` : 'Bedsheet - Linunaura',
    description: product?.description || 'Premium bedsheet by Linunaura',
  };
}
