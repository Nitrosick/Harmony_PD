<template>
  <div class="services-card">
    <div class="services-card-icon">
      <Icon :name="icon" />
    </div>
    <div>
      <b v-html="title" />
      <ul v-if="Array.isArray(text)">
        <li
          v-for="(item, i) in text"
          :key="i"
          v-html="item"
        />
      </ul>
      <p
        v-else
        v-html="text"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: [String, Array], required: true }
})
</script>

<style lang="scss" scoped>
.services-card {
  display: flex;
  align-items: flex-start;
  gap: rem(20);
  text-align: left;

  b {
    display: block;
    max-width: rem(350);
    margin-bottom: rem(20);
  }

  &-icon {
    min-width: rem(56);
    min-height: rem(56);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-accent-blue-20);
    border-radius: rem(12);
  }
}
</style>
