<template>
  <div class="p-4">
    <h1 class="text-4xl py-4">Kalender</h1>
    <calendar/>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
}
</script>
