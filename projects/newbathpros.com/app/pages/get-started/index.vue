<template>
  <div>Get started <span class="text-lg text-purple-600 font-bold">{{ zipcode }}</span>
    <div>{{ data.category }} / {{ data.subcategory }}</div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const zipcode = route.query.zipcode as string || '';
const data = collectData();
// direct/refreshed entry has no in-memory state, so fall back to the query
if (!data.value.subcategory && route.query.subcategory) {
  data.value.subcategory = route.query.subcategory as string;
}
</script>
