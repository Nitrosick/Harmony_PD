<script setup>
const { services } = useSiteContent()

const cards = computed(() => {
  const c = services.value?.cards || {}
  return {
    technical: c.technical || [],
    legal: c.legal || [],
    outsourcing: c.outsourcing || []
  }
})
</script>

<template>
  <div
    v-if="services"
    class="services content"
  >
    <h2 v-html="services.title" />
    <p
      v-if="services.subtitle"
      class="services-subtitle"
      v-html="services.subtitle"
    />

    <div class="services-content">
      <div
        v-if="cards.technical.length"
        class="services-row"
      >
        <h3 v-html="services.sections?.technical?.title" />
        <ServicesCard
          v-for="(card, i) in cards.technical"
          :key="i"
          :icon="card.icon"
          :title="card.title"
          :text="card.text"
        />
      </div>

      <div
        v-if="cards.legal.length"
        class="services-row"
      >
        <h3 v-html="services.sections?.legal?.title" />
        <ServicesCard
          v-for="(card, i) in cards.legal"
          :key="i"
          :icon="card.icon"
          :title="card.title"
          :text="card.text"
        />
      </div>

      <div
        v-if="cards.outsourcing.length"
        class="services-row"
      >
        <h3 v-html="services.sections?.outsourcing?.title" />
        <ServicesCard
          v-for="(card, i) in cards.outsourcing"
          :key="i"
          :icon="card.icon"
          :title="card.title"
          :text="card.text"
        />
        <div class="services-bg">
          <img
            src="/images/squares.webp"
            alt="background"
            width="400"
            height="320"
            loading="lazy"
          >
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.services {
  margin-top: fluid(100, 75);
  background-color: $primary;
  border-radius: $border-radius-block;
  padding: fluid(72, 48) fluid(40, 32);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: rem(20);
  color: $color-background;

  &-subtitle {
    text-align: center;
  }

  &-content {
    margin-top: rem(28);
    display: flex;
    flex-direction: column;
    gap: rem(60);
  }

  &-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: fluid(40, 32);

    @include bp-md {
      grid-template-columns: 1fr;
      gap: rem(48);
    }

    h3 {
      grid-column: 1/-1;
    }
  }

  &-bg {
    text-align: right;
    max-height: rem(320);

    @include bp-md {
      display: none;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
