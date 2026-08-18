<script setup lang="ts">
import { baseConfig } from '../../../../../../app/utils/page-flow';
import { findCategoryBySlug, findSubcategoryBySlug } from '../../../../../../app/utils/taxonomy-routes';

const route = useRoute();
const answers = useFlowAnswers();
const { goNext } = usePageFlow('subcategories');

const category = findCategoryBySlug(baseConfig.taxonomy.categories, String(route.params.category));
const subcategory = category && findSubcategoryBySlug(category, String(route.params.subcategory));

if (!category || !subcategory) {
  throw createError({ statusCode: 404, statusMessage: 'Subcategory not found' });
}

answers.value.category = category.name;
answers.value.subcategory = subcategory;

await goNext();
</script>

<template>
  <p class="mx-auto max-w-2xl py-14 text-center text-gray-500">Continuing…</p>
</template>
