<template>
  <footer class="footer content">
    <Logo class="footer-logo" />
    <section class="footer-block">
      <span>ООО&nbsp;«Harmony&nbsp;Technologies»</span>
      <span>ИНН {{ data.inn }}</span>
      <span>Юридический адрес {{ data.address }}</span>
      <a :href="`tel:${phoneHref}`">{{ data.phone }}</a>
    </section>

    <section class="footer-block">
      <NuxtLink to="#">О&nbsp;компании</NuxtLink>
      <NuxtLink to="/#services">Услуги</NuxtLink>
      <NuxtLink to="/#maintenance">Комплексное сопровождение</NuxtLink>
    </section>

    <section class="footer-block footer-policy">
      <NuxtLink to="#">Политика обработки персональных данных</NuxtLink>
      <NuxtLink to="#">Согласие на&nbsp;обработку персональных данных</NuxtLink>
      <NuxtLink to="#">Стандарт обращения с&nbsp;персональными данными</NuxtLink>
    </section>
  </footer>
</template>

<script setup>
import data from '@/content/footer'

const phoneHref = computed(() => data.phone.replaceAll(' ', ''))
</script>

<style lang="scss">
.footer {
  margin-top: fluid(100, 75);
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: fluid(62, 48);
  background-color: $primary;
  padding: fluid(72, 48) fluid(40, 32);
  border-radius: fluid(40, 32);

  @include bp-lg {
    grid-template-columns: repeat(3, auto);
  }

  @include bp-sm {
    grid-template-columns: 1fr;
  }

  &-block {
    display: flex;
    flex-direction: column;
    gap: rem(16);
    font-size: fluid(16, 12);
    line-height: 1.1;
    color: $color-background;

    a {
      color: $color-background;
    }
  }

  &-logo {
    @include bp-lg {
      grid-column: 1/-1;
    }
  }

  &-policy {
    @include bp-md {
      grid-column: 1/-1;
    }
  }
}
</style>
