<script setup lang="js">
const { sphere } = useSiteContent()

const cards = computed(() => sphere.value?.cards || [])

const slider = ref(null)

const scrollLeft = () => {
  if (slider.value) {
    slider.value.scrollBy({ left: -slider.value.clientWidth, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (slider.value) {
    slider.value.scrollBy({ left: slider.value.clientWidth, behavior: 'smooth' })
  }
}

const resetScroll = () => {
  if (slider.value) {
    slider.value.scrollTo({ left: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('resize', resetScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resetScroll)
})
</script>

<template>
  <div
    v-if="sphere"
    class="sphere content"
  >
    <h2 v-html="sphere.title" />
    <p v-html="sphere.subtitle" />

    <div class="sphere-slider-container">
      <SliderButton
        direction="left"
        @click="scrollLeft"
      />
      <div class="sphere-slider">
        <div
          v-if="cards.length"
          ref="slider"
          class="sphere-slider-items"
        >
          <MainSphereCard
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
      v-if="sphere.button"
      class="sphere-button"
      theme="dark"
      :to="sphere.button.to"
    >
      {{ sphere.button.label }}
    </Button>
  </div>
</template>


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
