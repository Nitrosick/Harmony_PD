<template>
  <div class="textarea-wrapper">
    <textarea
      v-model="model"
      :rows="rows"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      class="textarea"
      :class="{ 'textarea-incorrect': error }"
    />
    <span
      v-show="model"
      class="textarea-label"
    >
      {{ placeholder }}
    </span>
    <div
      v-if="hint"
      class="textarea-hint"
    >
      {{ hint }}
    </div>
    <div
      v-if="error"
      class="textarea-error"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup>
const model = defineModel()

const props = defineProps({
  placeholder: { type: String, default: '' },
  rows: { type: Number, default: 3 },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  hint: { type: String, default: '' },
  error: { type: String, default: '' }
})
</script>

<style lang="scss">
.textarea-wrapper {
  position: relative;

  &:has(.textarea:disabled) {
    opacity: 0.3;
    pointer-events: none;
  }
}

.textarea {
  width: 100%;
  border: 1px solid var(--color-grey);
  border-radius: $border-radius-card;
  padding: fluid(20, 16);
  font-size: rem(24);

  &::placeholder {
    color: var(--color-dark-grey);
  }
}

.textarea-incorrect {
  border-color: var(--color-red);
}

.textarea-label {
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

.textarea-hint,
.textarea-error {
  font-size: rem(18);
  color: var(--color-dark-grey);
  margin-top: rem(8);
  padding: 0 fluid(20, 16);
}

.textarea-error {
  color: var(--color-red);
}
</style>
