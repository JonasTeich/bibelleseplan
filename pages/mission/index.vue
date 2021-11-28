<template>
  <div class="p-4">
    <h1 class="text-4xl py-4">Missionare</h1>
    <nuxt-link :to="'/mission/' + item.id" v-for="item in missions" :key="item.id" class="w-full rounded p-2 bg-gray-100 inline-block text-center py-5 my-2">
      {{ item.missionary }}, {{ item.location }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data: () => ({
    missions: [
      {
        id: 1,
        missionary: 'Arthur',
        location: 'Krim'
      },
      {
        id: 2,
        missionary: 'Robert & Anika',
        location: 'Tschechien'
      }
    ]
  })
}
</script>
