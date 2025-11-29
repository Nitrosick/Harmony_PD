<template>
  <label
    class="checkbox"
    :class="{ 'checkbox-disabled': disabled }"
  >
    <input
      v-model="model"
      type="checkbox"
      :disabled="disabled"
      class="checkbox-input"
    >
    <div class="checkbox-custom">
      <div class="checkbox-custom-point" />
    </div>
    <p
      v-if="label"
      class="checkbox-label"
      v-html="label"
    />
  </label>
</template>

<script setup>
const model = defineModel()

const props = defineProps({
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
})
</script>

<style lang="scss">
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: rem(16);
  font-size: rem(18);
  cursor: pointer;

  &-input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  &-custom {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: rem(30);
    height: rem(30);
    min-width: rem(30);
    min-height: rem(30);
    border: 1px solid var(--color-grey);
    border-radius: rem(4);
    transition: all $transition-time;

    &-point {
      width: rem(10);
      height: rem(10);
      border-radius: rem(2);
      background-color: $color-background;
      transition: transform $transition-time;
      transform: scale(0);
    }
  }

  &-input:checked + .checkbox-custom {
    background-color: $primary;
    border-color: $primary;

    .checkbox-custom-point {
      transform: scale(1);
    }
  }

  &:hover {
    .checkbox-custom {
      border-color: $primary;
    }
  }
}

.checkbox-disabled {
  opacity: 0.3;
  pointer-events: none;
}
</style>
