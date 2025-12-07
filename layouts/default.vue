<template>
  <div class="layout">
    <!-- <Loader :on="loading" /> -->
    <Header />
    <main class="layout-content">
      <slot />
    </main>
    <Footer />
    <Cookies />
  </div>
</template>

<script setup>
// const loading = ref(true)

// onMounted(() => {
//   setTimeout(() => { loading.value = false }, 500);
// })
</script>

<style lang="scss" scoped>
.layout {
  min-height: calc(100vh - rem(40));
  min-width: $min-width;
  display: flex;
  flex-direction: column;

  &-content {
    flex-grow: 1;
  }
}
</style>
