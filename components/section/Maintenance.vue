<template>
  <div class="maintenance content">
    <h2>Уровни комплексного сопровождения</h2>

    <div
      v-if="data"
      class="maintenance-list"
    >
      <MaintenanceCard
        v-for="(card, i) in cards"
        :key="i"
        :title="card.title"
        :text="card.text"
        :dark="card.dark"
      />
    </div>
  </div>
</template>

<script setup>
// import { cards } from '@/content/maintenance'
const { data } = await useFetch('https://harmonytec.ru/content/maintenance.json')
const cards = computed(() => data?.cards || [])
</script>

<style lang="scss" scoped>
.maintenance {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: fluid(100, 75);

  &-list {
    margin-top: rem(48);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: rem(20);

    @include bp-lg {
      grid-template-columns: 1fr;
    }
  }
}
</style>
