<template>
  <div class="about content">
    <AboutHead />
    <AboutFounder />
    <AboutPrinciples />
    <AboutContact
      @open-form="modalOpened = true"
    />
    <Dropdown
      :opened="modalOpened"
      @close="modalOpened = false"
    >
      <FormModal
        :opened="modalOpened"
      />
    </Dropdown>
  </div>
</template>

<script setup>
const modalOpened = ref(false)
</script>

<style lang="scss">
.about {
  margin-top: rem(16);
}
</style>
