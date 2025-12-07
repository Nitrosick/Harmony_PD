<template>
  <nav
    v-if="header"
    class="menu"
  >
    <NuxtLink
      v-for="item in menuItems"
      :key="item.id"
      :to="item.to"
      class="menu-item caption"
      @click="emits('close')"
    >
      <span v-html="item.text" />
    </NuxtLink>
  </nav>
</template>

<script setup>
const emits = defineEmits(['close'])

const { header } = useSiteContent()

const menuItems = computed(() => header.value?.menu || [])
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  align-items: center;

  &-item {
    padding: rem(12) rem(20);
    color: $color-background;
    transition: color $transition-time;

    @include bp-md {
      color: $color-text;
      font-size: rem(18);
    }

    &:hover {
      color: var(--color-light-blue);
    }
  }

  @include bp-md {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
