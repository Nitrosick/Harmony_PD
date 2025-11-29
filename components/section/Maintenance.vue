<script setup lang="js">
const { maintenance } = useSiteContent()

const cards = computed(() => maintenance.value?.cards || [])
</script>

<template>
  <div class="maintenance content">
    <h2 v-html="maintenance.title" />

    <div
      v-if="cards.length"
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
