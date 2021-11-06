<template>
  <div class="p-4">
    <h1 class="text-4xl py-4">Kalender</h1>
    <calendar/>
  <tab-bar/>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
}
</script>
