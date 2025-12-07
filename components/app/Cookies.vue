<template>
  <div
    v-if="main"
    class="cookies"
    :class="{ 'cookies-opened': opened }"
  >
    <div class="cookies-content">
      <h2>{{ main.cookies.title }}</h2>
      <p
        class="cookies-content-description"
        v-html="main.cookies.description"
      />
    </div>
    <Button
      class="cookies-button"
      theme="dark"
      @click="accept"
    >
      {{ main.cookies.accept }}
    </Button>
  </div>
</template>

<script setup>
const { main } = useSiteContent()

const opened = ref(false)

onMounted(() => {
  if (localStorage.getItem('cookies_accepted')) return
  setTimeout(() => { opened.value = true }, 1000);
})

const accept = () => {
  localStorage.setItem('cookies_accepted', true)
  opened.value = false
}
</script>

<style lang="scss">
.cookies {
  position: fixed;
  left: 50%;
  bottom: rem(40);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: fluid(125, 32);
  padding: fluid(72, 45) fluid(40, 32);
  background-color: $color-background;
  border: 1px solid var(--color-light-blue);
  border-radius: $border-radius-block;
  opacity: 0;
  transform: translate(-50%, 100%);
  pointer-events: none;
  transition: all calc($transition-time * 2);
  z-index: 10;

  @include bp-xl {
    left: rem(40);
    right: rem(40);
    transform: translate(0, 100%);
  }

  @include bp-md {
    flex-direction: column;
    align-items: flex-start;
    gap: rem(20);
  }

  &-content {
    &-description {
      margin-top: rem(20);
      white-space: nowrap;

      @include bp-xl {
        white-space: normal;
      }
    }
  }

  &-button {
    @include bp-md {
      align-self: flex-end;
    }
  }
}

.cookies-opened {
  opacity: 1;
  transform: translate(-50%, 0);
  pointer-events: all;

  @include bp-xl {
    transform: translate(0, 0);
  }
}
</style>
