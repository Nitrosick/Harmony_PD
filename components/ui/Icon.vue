<template>
  <div :class="`icon-container icon-${size}`">
    <img
      :src="`/icons/${name}.svg`"
      alt="icon"
      class="icon"
      loading="lazy"
    >
  </div>
</template>

<script setup>
const props = defineProps({
  name: { type: String, required: true },
  size: { type: String, default: 'm' }
})
</script>

<style lang="scss" scoped>
.icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1/1;
}

.icon-s { width: rem(32) }
.icon-m { width: rem(40) }
.icon-l { width: rem(48) }

.icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
