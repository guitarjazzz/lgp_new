<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-gray-200 bg-gray-100 px-5 py-3 text-center text-[13px] text-gray-500">
    <span>&copy; {{ year }} LGP Admin. All rights reserved.</span>
  </footer>
</template>
