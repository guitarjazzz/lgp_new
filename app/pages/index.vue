<template>
  <div>Dashboard {{ zip }}</div>
</template>
<script setup lang="ts">
import {useNuxtApp} from "#app";
const {vueApp} = useNuxtApp();
const zipcode = vueApp.config.globalProperties.validation.zipcode;
const zip = ref(await zipcode("99505"));
</script>