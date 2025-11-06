<template>
  <nav class="menu">
    <NuxtLink
      v-for="item in menuItems"
      :key="item.id"
      :to="item.to"
      class="menu-item caption"
      @click="emits('close')"
    >
      {{ item.text }}
    </NuxtLink>
  </nav>
</template>

<script setup>
const emits = defineEmits(['close'])

const menuItems = [
  { id: 1, to: '/#services', text: 'Услуги' },
  { id: 2, to: '/#support', text: 'Комплексное сопровождение' },
  { id: 3, to: '/#contacts', text: 'Контакты' }
]
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  align-items: center;

  &-item {
    padding: rem(12) rem(20);
    color: $color-background;
    transition: color $transition-time;

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
