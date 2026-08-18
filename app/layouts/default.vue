<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader :userName="userName" @signOut="handleSignOut" />
    <div class="flex flex-1">
      <AppSidebar />
      <main class="flex-1 bg-gray-100 p-5">
        <slot />
      </main>
    </div>
    <AppFooter />
  </div>
</template>
<script setup lang="ts">
const userName = 'John Doe'
const handleSignOut = () => {
  console.log('Sign out')
}
</script>