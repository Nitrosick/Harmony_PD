<template>
  <div
    v-if="about"
    class="about-principles content"
  >
    <h2>{{ about.principles.title }}</h2>
    <div
      class="about-principles-description"
      v-html="about.principles.description"
    />
    <div
      v-if="about.principles.cards.length"
      class="about-principles-cards"
    >
      <AboutPrinciplesCard
        v-for="card in about.principles.cards"
        :key="card.title"
        :icon="card.icon"
        :title="card.title"
        :text="card.text"
        :list="card.list"
      />
    </div>
  </div>
</template>

<script setup>
const { about } = useSiteContent()
</script>

<style lang="scss">
.about-principles {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: fluid(100, 75);

  &-description {
    margin-top: rem(20);
    margin-bottom: rem(48);
    text-align: center;
    max-width: rem(1000);
  }

  &-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: rem(24);
    padding: 0 fluid(40, 0);

    @include bp-lg {
      grid-template-columns: 1fr;
    }
  }
}
</style>
