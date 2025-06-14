<template>
  <div>
    <nav class="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between">
      <div class="space-x-4">
        <RouterLink to="/" class="text-blue-600 dark:text-blue-300 font-medium">Catálogo</RouterLink>
        <RouterLink to="/top-five" class="text-blue-600 dark:text-blue-300 font-medium">Mi Top 5</RouterLink>
      </div>
    </nav>
    <main class="p-6">
      <slot />
    </main>
  </div>
</template>