<script setup lang="js">
const { footer } = useSiteContent()

const phoneHref = computed(() => {
  const f = footer.value
  if (f && f.phone) {
    return f.phone.replaceAll(' ', '')
  }
  return ''
})
</script>

<template>
  <footer class="footer content">
    <Logo class="footer-logo" />

    <section
      v-if="footer"
      class="footer-block"
    >
      <span v-html="footer.companyName" />
      <span>
        {{ footer.innLabel }}
        {{ footer.inn }}
      </span>
      <span>
        {{ footer.addressLabel }}
        {{ footer.address }}
      </span>
      <a :href="`tel:${phoneHref}`">
        {{ footer.phone }}
      </a>
    </section>

    <section
      v-if="footer.menu?.length"
      class="footer-block"
    >
      <NuxtLink
        v-for="link in footer.menu"
        :key="link.id"
        :to="link.to"
        v-html="link.text"
      />
    </section>

    <section
      v-if="footer.policyLinks?.length"
      class="footer-block footer-policy"
    >
      <NuxtLink
        v-for="link in footer.policyLinks"
        :key="link.id"
        :to="link.to"
        v-html="link.text"
      />
    </section>
  </footer>
</template>



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