<template>
  <div
    v-if="about"
    class="about-founder content"
  >
    <div class="about-founder-photo">
      <img
        src="/images/mark.webp"
        alt="founder photo"
        width="300"
        height="300"
        loading="lazy"
      >
    </div>
    <div class="about-founder-content">
      <h1 class="about-founder-name">
        {{ about.founder_name }}
      </h1>
      <h3>{{ about.founder_position }}</h3>
      <div
        class="about-founder-text"
        v-html="about.text"
      />
    </div>
  </div>
</template>

<script setup>
const { about } = useSiteContent()
</script>

<style lang="scss">
.about-founder {
  display: flex;
  align-items: flex-start;
  gap: fluid(60, 45);
  background-color: $primary;
  color: $color-background;
  border-radius: $border-radius-block;
  padding: fluid(72, 48) fluid(60, 32);
  margin-bottom: fluid(100, 75);
  background-image: url(/images/squares-2.webp);
  background-position: fluid(60, 32) calc(100% - fluid(72, 48));
  background-repeat: no-repeat;
  background-size: fluid(320, 240) fluid(320, 240);

  @include bp-lg {
    flex-direction: column;
  }

  @include bp-md {
    align-items: center;
  }

  &-photo {
    width: rem(300);
    min-width: rem(300);
    aspect-ratio: 1/1;
    border-radius: 50%;
    overflow: hidden;

    @include bp-sm {
      min-width: auto;
      max-width: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-name {
    text-transform: uppercase;
  }

  &-text {
    display: flex;
    flex-direction: column;
    gap: rem(16);
    margin-top: rem(20);
  }
}
</style>
