<template>
  <div class="services content">
    <h2>Услуги Harmony Technologies</h2>
    <p  class="services-subtitle">
      Комплексная помощь в&nbsp;обеспечении законной и&nbsp;безопасной обработки персональных данных
    </p>

    <div class="services-content">
      <div
        v-if="cards.technical.length"
        class="services-row"
      >
        <h3>Технические услуги</h3>
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
        <h3>Правовые услуги</h3>
        <ServicesCard
          v-for="(card, i) in cards.legal"
          :key="i"
          :icon="card.icon"
          :title="card.title"
          :text="card.text"
        />
      </div>

      <div class="services-row">
        <h3>Аутсорсинг ответственного (DPO)</h3>
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

<script setup>
import { cards } from '@/content/services'
</script>

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
