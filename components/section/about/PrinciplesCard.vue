<template>
  <div class="principles-card">
    <Icon :name="icon" />
    <h4 class="principles-card-title">
      {{ title }}
    </h4>
    <p class="principles-card-description">
      {{ text }}
    </p>
    <ul class="principles-card-list">
      <li
        v-for="(item, i) in list"
        :key="i"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  list: { type: Array, required: true }
})
</script>

<style lang="scss">
.principles-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid var(--color-grey);
  border-radius: $border-radius-block;
  padding: fluid(40, 24) fluid(32, 24);

  &-title {
    margin-top: rem(12);
    margin-bottom: fluid(40, 32);
    text-align: center;
  }

  &-description {
    width: 100%;
  }

  &-list {
    width: 100%;
    margin-top: fluid(20, 16);
  }
}
</style>
