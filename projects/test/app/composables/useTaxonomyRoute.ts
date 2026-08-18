import { computed } from 'vue';
import { resolveTaxonomyRoute } from '@/utils/taxonomy';

/** Resolves taxonomy entities behind dynamic category routes. */
export const useTaxonomyRoute = () => {
  const route = useRoute();
  const resolved = computed(() => resolveTaxonomyRoute(route.params, undefined, route.query));

  return {
    category: computed(() => resolved.value.category),
    subcategory: computed(() => resolved.value.subcategory),
    categoryId: computed(() => resolved.value.categoryId),
    categorySlug: computed(() => resolved.value.categorySlug),
    subcategorySlug: computed(() => resolved.value.subcategorySlug)
  };
};