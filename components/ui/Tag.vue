<template>
  <div class="tag">
    {{ text }}
  </div>
</template>

<script setup>
const props = defineProps({
  text: { type: String, required: true }
})
</script>

<style lang="scss">
.tag {
  display: inline-block;
  background-color: var(--color-light-blue);
  border-radius: calc($border-radius-card / 2);
  padding: rem(8) rem(12);
  font-size: fluid(18, 16);
}
</style>
