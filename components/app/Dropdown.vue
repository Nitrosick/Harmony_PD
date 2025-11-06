<template>
  <div
    class="dropdown"
    :class="{ 'dropdown-opened': opened }"
  >
    <div class="dropdown-window">
      <slot />
      <button
        class="dropdown-close"
        @click.prevent="emits('close')"
      >
        <Icon name="close" />
      </button>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['close'])

const props = defineProps({
  opened: { type: Boolean, required: true }
})
</script>

<style lang="scss" scoped>
.dropdown {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 2;
  transition: background-color calc($transition-time * 2);
  pointer-events: none;

  @include bp-md {
    display: block;
  }

  &-window {
    position: absolute;
    top: rem(4);
    bottom: rem(4);
    right: 0;
    width: 75%;
    padding: rem(80) rem(40);
    background-color: $color-background;
    border-radius: $border-radius-block 0 0 $border-radius-block;
    border: 2px solid var(--color-extra-light-blue);
    transform: translateX(100%);
    transition: transform calc($transition-time * 2);

    @include bp-sm {
      width: calc(100vw - rem(4));
    }
  }

  &-close {
    position: absolute;
    top: rem(20);
    right: rem(20);
    filter: invert(1);
  }
}

.dropdown-opened {
  pointer-events: all;
  background-color: var(--color-accent-blue-20);

  .dropdown-window {
    transform: translateX(0);
  }
}
</style>
