<script setup>
import { ref, onMounted } from 'vue'

const games = ref([])
const page = ref(1)
const loading = ref(false)
const error = ref(null)

const API_KEY = import.meta.env.VITE_RAWG_API_KEY
const PAGE_SIZE = 20

const fetchGames = async () => {
  loading.value = true
  error.value = null

  try {
    const res = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page.value}&page_size=${PAGE_SIZE}`)
    const data = await res.json()
    games.value.push(...data.results)
  } catch (err) {
    error.value = 'Hubo un error al cargar los juegos.'
  } finally {
    loading.value = false
  }
}

const handleScroll = () => {
  const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
  if (bottom && !loading.value) {
    page.value++
    fetchGames()
  }
}

onMounted(() => {
  fetchGames()
  window.addEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Top Juegos Populares</h1>

    <div v-if="error" class="text-red-500">{{ error }}</div>
    <div v-if="loading && games.length === 0">Cargando juegos...</div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-[90%] max-w-[1440px] mx-auto">
      <div v-for="game in games" :key="game.id" class="border rounded p-4 shadow">
        <img :src="game.background_image" :alt="game.name" class="w-full h-48 object-cover mb-2 rounded" />
        <h2 class="text-lg font-semibold">{{ game.name }}</h2>
        <p><strong>Rating:</strong> {{ game.rating }}</p>
        <p><strong>Plataformas:</strong> {{ game.platforms.map(p => p.platform.name).join(', ') }}</p>
        <p><strong>Géneros:</strong> {{ game.genres.map(g => g.name).join(', ') }}</p>
      </div>
    </div>

    <div v-if="loading && games.length > 0" class="mt-4 text-gray-500">Cargando más...</div>
  </div>
</template>

