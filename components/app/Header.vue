<template>
  <header class="header content">
    <Logo />
    <div class="header-menu">
      <HeaderMenu @close="menuOpened = false" />
    </div>
    <button
      class="header-menu-switcher"
      @click.prevent="menuOpened = !menuOpened"
    >
      <Icon
        :name="menuOpened ? 'close' : 'burger'"
        size="l"
      />
    </button>
  </header>

  <Dropdown
    :opened="menuOpened"
    @close="menuOpened = false"
  >
    <HeaderMenu @close="menuOpened = false" />
  </Dropdown>
</template>

<script setup>
const menuOpened = ref(false)

watch(menuOpened, (value) => {
  if (value) document.body.classList.add('lock-scroll');
  else document.body.classList.remove('lock-scroll');
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: fluid(28, 20);
  background-color: $primary;
  padding: fluid(28, 20) fluid(40, 32);
  border-radius: fluid(40, 32);

  &-menu {
    @include bp-md {
      display: none;
    }
  }

  &-menu-switcher {
    display: none;
    width: rem(40);
    height: rem(40);

    @include bp-md {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
