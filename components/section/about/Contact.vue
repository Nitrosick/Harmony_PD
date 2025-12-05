<template>
  <div
    v-if="about"
    class="about-contact content"
  >
    <h2 v-html="about.help_title" />
    <p
      class="about-contact-description"
      v-html="about.help_description"
    />

    <Button
      class="about-contact-button"
      theme="dark"
      @click="emits('open-form')"
    >
      {{ about.apply }}
    </Button>
  </div>
</template>

<script setup>
const emits = defineEmits(['open-form'])

const { about } = useSiteContent()
</script>

<style lang="scss">
.about-contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: var(--color-extra-light-blue);
  border-radius: $border-radius-block;
  padding: fluid(72, 32) fluid(85, 48);

  &-description {
    margin-top: rem(20);
    margin-bottom: rem(60);
    max-width: rem(950);
  }
}
</style>
