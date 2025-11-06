<template>
  <div class="questions">
    <h2>Остались вопросы?</h2>
    <Button
      to="#"
      class="questions-button"
      theme="dark"
    >
      Свяжитесь с нами
    </Button>
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
