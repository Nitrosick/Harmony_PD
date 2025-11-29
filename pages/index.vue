<template>
  <div>
    <Main
      @open-form="modalOpened = true"
    />
    <Sphere id="sphere" />
    <Services id="services" />
    <Maintenance
      id="maintenance"
      @open-form="modalOpened = true"
    />
    <Questions
      id="questions"
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
