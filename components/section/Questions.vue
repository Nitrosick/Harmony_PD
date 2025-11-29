<script setup>
import ContactModal from '@/components/section/ContactModal.vue'

const { questions } = useSiteContent()

const isContactOpen = ref(false)

const openModal = () => {
  isContactOpen.value = true
}
</script>

<template>
  <div
    v-if="questions"
    class="questions"
  >
    <h2 v-html="questions.title" />

    <Button
      v-if="questions.button"
      to="#"
      class="questions-button"
      theme="dark"
      @click.prevent="openModal"
    >
      {{ questions.button.label }}
    </Button>

    <ContactModal v-model:open="isContactOpen" />
  </div>
</template>


<style lang="scss">
.questions {
  margin-top: fluid(100, 75);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: rem(48);

  &-button {
    min-width: rem(350);
  }
}
</style>
