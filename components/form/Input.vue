<template>
  <div class="input-wrapper">
    <input
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      class="input"
      :class="{ 'input-incorrect': error }"
      @input="emits('input', $event)"
    >
    <span
      v-show="model"
      class="input-label"
    >
      {{ placeholder }}
    </span>
    <div
      v-if="hint"
      class="input-hint"
    >
      {{ hint }}
    </div>
    <div
      v-if="error"
      class="input-error"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup>
const model = defineModel()
const emits = defineEmits(['input'])

const props = defineProps({
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  hint: { type: String, default: '' },
  error: { type: String, default: '' }
})
</script>

<style lang="scss">
.input-wrapper {
  position: relative;

  &:has(.input:disabled) {
    opacity: 0.3;
    pointer-events: none;
  }
}

.input {
  width: 100%;
  border: 1px solid var(--color-grey);
  border-radius: $border-radius-card;
  padding: fluid(20, 16);
  font-size: rem(24);

  &::placeholder {
    color: var(--color-dark-grey);
  }
}

.input-incorrect {
  border-color: var(--color-red);
}

.input-label {
  position: absolute;
  top: 0;
  left: rem(16);
  transform: translateY(-50%);
  display: inline-block;
  font-size: rem(18);
  color: var(--color-dark-grey);
  background-color: $color-background;
  padding: 0 rem(4);
}

.input-hint,
.input-error {
  font-size: rem(18);
  color: var(--color-dark-grey);
  margin-top: rem(8);
  padding: 0 fluid(20, 16);
}

.input-error {
  color: var(--color-red);
}
</style>
