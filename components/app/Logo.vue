<template>
  <NuxtLink to="/">
    <img
      src="/images/logo.svg"
      alt="logo"
      class="logo"
      loading="lazy"
      width="224"
      height="48"
    >
  </NuxtLink>
</template>

<style lang="scss" scoped>
.logo {
  max-width: fluid(224, 112);
  max-height: fluid(48, 24);
}
</style>
