<template>
  <div class="main-card">
    <Icon :name="icon" size="l" />
    <p v-html="text" />
  </div>
</template>

<script setup>
const props = defineProps({
  icon: { type: String, required: true },
  text: { type: String, required: true }
})
</script>

<style lang="scss" scoped>
.main-card {
  background-color: $color-background;
  border-radius: $border-radius-card;
  border: 1px solid var(--color-light-blue);
  padding: fluid(28, 20);
  display: flex;
  flex-direction: column;
  gap: rem(8);
  align-items: center;
  text-align: center;
}
</style>
