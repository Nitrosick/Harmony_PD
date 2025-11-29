<template>
  <ClientOnly>
    <NuxtLink
      v-if="to"
      :to="to"
      class="button"
      :class="{
        'button-light': theme === 'light',
        'button-dark': theme === 'dark'
      }"
    >
      <div class="button-text">
        <slot />
        <Icon
          v-if="icon"
          :name="icon"
        />
      </div>
    </NuxtLink>
    <Component
      v-else
      :is="href ? 'a' : 'button'"
      :href="href"
      :to="to"
      :download="download"
      :target="target"
      :type="type"
      class="button"
      :class="{
        'button-light': theme === 'light',
        'button-dark': theme === 'dark'
      }"
    >
      <div class="button-text">
        <slot />
        <Icon
          v-if="icon"
          :name="icon"
        />
      </div>
    </Component>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: 'button' },
  theme: { type: String, default: 'light' },
  icon: { type: String, default: null },
  href: { type: String, default: undefined },
  to: { type: String, default: undefined },
  download: { type: [String, Boolean], default: undefined },
  adaptable: { type: Boolean, default: true }
})

const target = computed(() => {
  const { href } = props
  if (!href || href.startsWith('#')) return undefined
  return '_blank'
})
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: $font-main;
  font-weight: 500;
  border-radius: $border-radius-card;
  padding: fluid(20, 16) fluid(40, 32);
  overflow: hidden;
  transition: color $transition-time, background-color $transition-time;

  &-text {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: fluid(24, 18);
    white-space: nowrap;
  }
}

.button-light {
  background-color: $color-background;
  color: $color-text;

  &:hover,
  &:focus,
  &:active {
    color: var(--color-accent-blue);
  }
}

.button-dark {
  background-color: $primary;
  color: $color-background;

  &:hover,
  &:focus,
  &:active {
    background-color: var(--color-accent-blue);
    color: $color-background;
  }
}
</style>
