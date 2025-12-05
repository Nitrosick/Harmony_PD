<template>
  <div class="sphere-card">
    <div class="sphere-card-content">
      <div class="sphere-card-head">
        <div class="sphere-card-icon">
          <Icon :name="icon" />
        </div>
        <b v-html="title" />
      </div>
      <p v-html="text" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true }
})
</script>

<style lang="scss" scoped>
.sphere-card {
  flex-shrink: 0;
  width: 50%;
  padding: 0 rem(10);

  @include bp-lg {
    width: 100%;
  }

  &-content {
    height: 100%;
    background-color: $color-background;
    border-radius: $border-radius-card;
    border: 2px solid var(--color-grey);
    padding: fluid(32, 24);
    text-align: left;
  }

  &-head {
    display: flex;
    align-items: center;
    gap: rem(12);
    margin-bottom: rem(20);
  }

  &-icon {
    min-width: rem(56);
    min-height: rem(56);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-extra-light-blue);
    border-radius: rem(12);
  }
}
</style>
