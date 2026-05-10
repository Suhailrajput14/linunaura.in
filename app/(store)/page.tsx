import { Hero } from '@/components/home/hero';
import { FeaturedProducts } from '@/components/home/featured-products';
import { Categories } from '@/components/home/categories';
import { PromoBanner } from '@/components/home/promo-banner';
import { Testimonials } from '@/components/home/testimonials';
import { Features } from '@/components/home/features';
import { getProducts, getCategories } from '@/lib/api';

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getProducts({ featured: true, limit: 4 }),
    getCategories(),
  ]);

  return (
    <>
      <Hero />
      <FeaturedProducts products={featuredProducts} />
      <Categories categories={categories} />
      <PromoBanner />
      <Testimonials />
      <Features />
    </>
  );
}
