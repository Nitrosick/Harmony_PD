<template>
  <ClientOnly>
    <button
      class="slider-button"
      @click.prevent="emits('click')"
    >
      <Icon
        name="arrow-left"
        size="s"
        :class="{ 'icon-right': direction === 'right' }"
      />
    </button>
  </ClientOnly>
</template>

<script setup>
const emits = defineEmits(['click'])

const props = defineProps({
  direction: { type: String, required: true }
})
</script>

<style lang="scss" scoped>
.slider-button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: rem(44);
  min-height: rem(44);
  border-radius: 50%;
  border: 1px solid var(--color-grey);
  transition: background-color $transition-time;

  &:hover {
    background-color: var(--color-light-blue);
  }

  .icon-right {
    transform: rotate(180deg);
  }
}
</style>
