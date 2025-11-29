<template>
  <div
    v-if="questions"
    class="questions"
  >
    <h2 v-html="questions.title" />

    <Button
      v-if="questions.button"
      class="questions-button"
      theme="dark"
      @click="emits('open-form')"
    >
      {{ questions.button.label }}
    </Button>
  </div>
</template>

<script setup>
const emits = defineEmits(['open-form'])

const { questions } = useSiteContent()
</script>

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
