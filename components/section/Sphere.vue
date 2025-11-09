<template>
  <div class="sphere content">
    <h2>Типовые зоны риска при&nbsp;обработке персональных данных</h2>
    <p>Основные области, где&nbsp;компании сталкиваются с&nbsp;нарушениями 152-ФЗ</p>

    <div class="sphere-slider-container">
      <SliderButton
        direction="left"
        @click="scrollLeft"
      />
      <div class="sphere-slider">
        <div
          v-if="data"
          ref="slider"
          class="sphere-slider-items"
        >
          <SphereCard
            v-for="(card, i) in cards"
            :key="i"
            :icon="card.icon"
            :title="card.title"
            :text="card.text"
          />
        </div>
      </div>
      <SliderButton
        direction="right"
        @click="scrollRight"
      />
    </div>

    <Button
      to="#"
      class="sphere-button"
      theme="dark"
    >
      Проверить процесс обработки ПДн
    </Button>
  </div>
</template>

<script setup>
// import { cards } from '@/content/sphere'
const { data } = await useFetch('https://harmonytec.ru/content/sphere.json')
const cards = computed(() => data?.cards || [])

const slider = ref(null)

const scrollLeft = () => {
  slider.value.scrollBy({ left: -slider.value.clientWidth, behavior: 'smooth' })
}

const scrollRight = () => {
  slider.value.scrollBy({ left: slider.value.clientWidth, behavior: 'smooth' })
}

const resetScroll = () => {
  if (slider.value) slider.value.scrollTo({ left: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('resize', resetScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resetScroll)
})
</script>

<style lang="scss">
.sphere {
  margin-top: fluid(100, 75);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: rem(20);
  text-align: center;

  &-slider-container {
    width: 100%;
    margin-top: rem(28);
    display: flex;
    align-items: center;
    gap: fluid(54, 0);
  }

  &-slider {
    flex-grow: 1;
    position: relative;
    overflow: hidden;

    &-items {
      display: flex;
      overflow-x: auto;
      scroll-behavior: smooth;
      -ms-overflow-style: none;
      scrollbar-width: none;

      ::-webkit-scrollbar {
        display: none;
      }
    }
  }

  &-button {
    margin-top: rem(50);
  }
}
</style>
