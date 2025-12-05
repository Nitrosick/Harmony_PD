<template>
  <div
    class="maintenance-card"
    :class="{ 'maintenance-card-dark': dark }"
  >
    <h4
      class="maintenance-card-title"
      v-html="title"
    />
    <ul
      v-if="Array.isArray(text)"
      class="maintenance-card-text"
    >
      <li
        v-for="(item, i) in text"
        :key="i"
        v-html="item"
      />
    </ul>
    <p
      v-else
      class="maintenance-card-text"
      v-html="text"
    />
    <Button
      class="maintenance-card-button"
      :theme="dark ? 'light' : 'dark'"
      @click="emits('open-form')"
    >
      Оставить заявку
    </Button>
  </div>
</template>

<script setup>
const emits = defineEmits(['open-form'])
// FIXME: Можно передавать параметр для уровня сопровождения

const props = defineProps({
  title: { type: String, required: true },
  text: { type: [String, Array], required: true },
  dark: { type: Boolean, default: false }
})
</script>

<style lang="scss">
.maintenance-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $color-background;
  border-radius: $border-radius-card;
  border: 2px solid var(--color-grey);
  padding: fluid(32, 24);
  margin: fluid(16, 8) 0;

  @include bp-lg {
    margin: 0;
  }

  &-title {
    text-align: center;
    padding-bottom: rem(20);
    margin: 0;
    margin-bottom: rem(20);
    border-bottom: 2px solid var(--color-grey);
  }

  &-text {
    flex-grow: 1;
  }

  &-button {
    margin-top: rem(40);
  }
}

.maintenance-card-dark {
  background-color: $primary;
  padding: fluid(48, 32) fluid(32, 24);
  margin: 0;
  color: $color-background;
  border: none;

  @include bp-lg {
    padding: fluid(32, 24);
  }
}
</style>
