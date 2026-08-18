<script setup lang="ts">
import { ref, computed } from 'vue';
import baseConfigRaw from '@/base.conf?raw';
import SectionHero from '@/components/sections/SectionHero.vue';
import SectionFeaturedItems from '@/components/sections/SectionFeaturedItems.vue';
import SectionGallery from '@/components/sections/SectionGallery.vue';
import SectionFeatures from '@/components/sections/SectionFeatures.vue';
import SectionCTA from '@/components/sections/SectionCTA.vue';
import SectionTestimonials from '@/components/sections/SectionTestimonials.vue';

type TaxonomyCategory = { id?: string; name: string; subcategories?: string[] };

const slugify = (value: string) => value
  .trim()
  .toLowerCase()
  .replace(/&/g, ' and ')
  .replace(/[_\s]+/g, '-')
  .replace(/[^a-z0-9-]+/g, '')
  .replace(/-+/g, '-')
  .replace(/^-+|-+$/g, '');

const baseConfig = JSON.parse(baseConfigRaw) as { taxonomy?: { categories?: TaxonomyCategory[] } };
const categories = baseConfig.taxonomy?.categories ?? [];

const heroImages: Record<string, string> = {
  'kitchen-remodel': 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=85',
  'bathroom-remodeling': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
  flooring: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
  roofing: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=85'
};
const defaultHeroImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85';

const route = useRoute();
const categorySlug = computed(() => String(route.params.category_slug ?? ''));

const category = computed(() => categories.find(
  (item) => slugify(item.name) === categorySlug.value || item.id === categorySlug.value
));

const categoryData = computed(() => {
  const name = category.value?.name ?? 'Home Improvement';
  return {
    name,
    description: `Compare trusted local pros for your ${name.toLowerCase()} project.`,
    heroImage: heroImages[slugify(name)] ?? defaultHeroImage
  };
});

const featuredItems = ref([
  {
    id: 1,
    title: 'Modern Kitchen Design',
    image: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=400&q=85',
    description: 'Contemporary style kitchen renovation'
  },
  {
    id: 2,
    title: 'Classic Renovation',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=85',
    description: 'Timeless design elements'
  },
  {
    id: 3,
    title: 'Open Concept',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e9e90d?auto=format&fit=crop&w=400&q=85',
    description: 'Spacious and bright layout'
  }
]);

const galleryImages = ref([
  'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=400&q=85',
  'https://images.unsplash.com/photo-1600573472550-8090b5e9e90d?auto=format&fit=crop&w=400&q=85',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=400&q=85',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=85',
  'https://images.unsplash.com/photo-1609184285897-49953e39b3ac?auto=format&fit=crop&w=400&q=85',
  'https://images.unsplash.com/photo-1584568694244-14fbbc83bd30?auto=format&fit=crop&w=400&q=85'
]);

const features = ref([
  {
    icon: '✓',
    title: 'Expert Guidance',
    description: 'Work with certified professionals'
  },
  {
    icon: '★',
    title: 'Quality Materials',
    description: 'Premium finishes and fixtures'
  },
  {
    icon: '⚙',
    title: 'Custom Solutions',
    description: 'Tailored to your needs'
  }
]);

const testimonials = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=85',
    text: 'The team transformed our kitchen beautifully. Highly recommend!',
    rating: 5
  },
  {
    id: 2,
    name: 'Mike Chen',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=85',
    text: 'Professional service from start to finish. Great value!',
    rating: 5
  }
]);
</script>

<template>
  <div class="category-page">
    <!-- Hero Section -->
    <SectionHero
      :title="categoryData.name"
      :description="categoryData.description"
      :image="categoryData.heroImage"
    />

    <!-- Featured Items Section -->
    <SectionFeaturedItems
      title="Featured Projects"
      :items="featuredItems"
    />

    <!-- Features Section -->
    <SectionFeatures
      title="Why Choose Our Services"
      :features="features"
    />

    <!-- Gallery Section -->
    <SectionGallery
      title="Browse Our Work"
      :images="galleryImages"
    />

    <!-- Testimonials Section -->
    <SectionTestimonials
      title="What Our Clients Say"
      :testimonials="testimonials"
    />

    <!-- CTA Section -->
    <SectionCTA
      title="Ready to Get Started?"
      description="Connect with our experts today"
      buttonText="Schedule Consultation"
    />
  </div>
</template>

<style scoped lang="css">
.category-page {
  width: 100%;
}
</style>
