<template>
  <div
    v-if="about"
    class="about-head"
  >
    <Tag :text="about.tag" />
    <h1
      class="about-head-title"
      v-html="about.title"
    />
    <p
      class="about-head-description"
      v-html="about.description"
    />
  </div>
</template>

<script setup>
const { about } = useSiteContent()
</script>

<style lang="scss">
.about-head {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: rem(28);
  padding: fluid(72, 60) fluid(40, 32);
  margin-bottom: fluid(100, 75);
  background-image: url(/images/squares-1.webp);
  background-position: 100% 100%;
  background-repeat: no-repeat;
  background-size: fluid(400, 300) fluid(320, 240);

  @include bp-md {
    padding: rem(45) 0;
    background: none;
  }

  &-title {
    max-width: rem(720);
  }

  &-description {
    max-width: rem(490);
  }
}
</style>
