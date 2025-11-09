<template>
  <div class="main content">
    <div class="main-about">
      <h1 class="main-title">
        Персональные данные ваших
        клиентов, сотрудников
        и&nbsp;посетителей&nbsp;— под&nbsp;защитой
      </h1>
      <p class="main-text">
        Harmony Technologies обеспечивает правовую,
        организационную и&nbsp;техническую защиту персональных
        данных компаний в&nbsp;соответствии с&nbsp;требованиями закона
        №&nbsp;152-ФЗ и&nbsp;нормативами ФСТЭК и&nbsp;Роскомнадзора
      </p>
    </div>

    <div class="main-complience">
      <h3>
        Комплаенс персональных
        данных: анализ процессов
        и&nbsp;документов по&nbsp;152-ФЗ
      </h3>
      <Button
        to="/#maintenance"
        class="main-button"
      >
        Оставить заявку
      </Button>
    </div>

    <div
      v-if="data"
      class="main-cards"
    >
      <MainCard
        v-for="(card, i) in cards"
        :key="i"
        :icon="card.icon"
        :text="card.text"
      />
    </div>
  </div>
</template>

<script setup>
// import { cards } from '@/content/main'
const { data } = await useFetch('https://harmonytec.ru/content/main.json')
const cards = computed(() => data?.cards || [])
</script>

<style lang="scss">
.main {
  margin-top: rem(16);
  background-color: var(--color-extra-light-blue);
  border-radius: $border-radius-block;
  padding: fluid(72, 48) fluid(42, 32);
  display: grid;
  gap: fluid(90, 60) fluid(40, 20);
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;

  @include bp-lg {
    display: flex;
    flex-direction: column;
    gap: fluid(60, 48);
  }

  &-about {
    max-width: rem(720);
  }

  &-complience {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: rem(540);
    background-color: $primary;
    color: $color-background;
    border-radius: $border-radius-card;
    padding: fluid(40, 32);

    @include bp-lg {
      align-self: center;
    }
  }

  &-cards {
    grid-column: 1/-1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(rem(160), 1fr));
    gap: fluid(20, 16);

    @include bp-lg {
      grid-template-columns: repeat(auto-fit, minmax(rem(230), 1fr));
    }
  }

  &-title {
    margin-bottom: fluid(37, 32);
  }

  &-text {
    max-width: rem(630);
  }

  &-button {
    width: 100%;
    margin-top: rem(32);
  }
}
</style>
