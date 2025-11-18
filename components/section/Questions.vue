<script setup lang="js">
import { ref } from 'vue'
import ContactModal from '~/components/ContactModal.vue'

const isContactOpen = ref(false)

const openModal = () => {
  isContactOpen.value = true
}
</script>

<template>
  <div class="questions">
    <h2>Остались вопросы?</h2>
    <Button
      to="#"
      class="questions-button"
      theme="dark"
      @click.prevent="openModal"
    >
      Свяжитесь с нами
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
