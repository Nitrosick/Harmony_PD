<template>
  <template v-if="contactModal">
    <div
      v-if="success"
      class="form-modal-sended"
    >
      <h3>{{ contactModal.messages.success }}</h3>
    </div>
    <form
      v-else
      class="form-modal"
      @submit.prevent="onSubmit"
    >
      <h3 class="form-modal-title">
        Оставить заявку
      </h3>

      <Input
        v-model="state.organization"
        :placeholder="contactModal.fields.organization.placeholder"
        :disabled="loading"
        required
        :error="errors.organization"
      />
      <Input
        v-model="state.contact_person"
        :placeholder="contactModal.fields.contact_person.placeholder"
        :disabled="loading"
        required
        :error="errors.contact_person"
      />
      <Input
        v-model="state.phone"
        :placeholder="contactModal.fields.phone.placeholder"
        :disabled="loading"
        required
        :error="errors.phone"
        @input="onPhoneInput"
      />
      <Input
        v-model="state.email"
        :placeholder="contactModal.fields.email.placeholder"
        :disabled="loading"
        required
        :error="errors.email"
      />
      <Textarea
        v-model="state.request"
        :placeholder="contactModal.fields.request.placeholder"
        :hint="contactModal.fields.request.hint"
        :disabled="loading"
        required
        :error="errors.request"
      />
      <Checkbox
        v-model="agreement"
        :label="contactModal.consent"
        :disabled="loading"
      />

      <div class="form-modal-control">
        <div
          v-if="errors.common"
          class="form-modal-error"
        >
          {{ errors.common }}
        </div>
        <Button
          class="questions-button"
          type="submit"
          theme="dark"
        >
          {{
            loading
              ? contactModal.messages.submitting
              : contactModal.messages.submit
          }}
        </Button>
      </div>
    </form>
  </template>
</template>

<script setup>
const { contactModal } = useSiteContent()

const props = defineProps({
  opened: { type: Boolean, required: true }
})

const initial = {
  organization: '',
  contact_person: '',
  phone: '',
  email: '',
  request: ''
}

const state = ref({ ...initial })
const loading = ref(false)
const errors = ref({})
const success = ref(false)
const agreement = ref(false)

watch(() => state, () => { errors.value = {} }, { deep: true })
watch(agreement, () => { errors.value = {} })
watch(() => props.opened, () => { reset() })

const onPhoneInput = (e) => {
  const input = e.target
  const allowed = /[0-9()+\- ]/g
  const cleaned = (input.value.match(allowed) || []).join('')
  state.value.phone = cleaned
}

const onSubmit = async () => {
  const cfg = contactModal.value

  if (!agreement.value) {
    errors.value.common = cfg.error.default
    return
  }

  if (!/^[\p{L}0-9._%+-]+@[\p{L}0-9.-]+\.[\p{L}]{2,}$/u.test(state.value.email)) {
    errors.value.email = cfg.error.email
    return
  }

  loading.value = true
  errors.value = {}

  try {
    const body = new URLSearchParams()
    body.append('organization', state.value.organization)
    body.append('contact_person', state.value.contact_person)
    body.append('phone', state.value.phone)
    body.append('email', state.value.email)
    body.append('request', state.value.request)
    body.append('agree', '1')

    const res = await fetch('/contact.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: body.toString()
    })

    const text = await res.text()

    if (text.startsWith('OK')) {
      reset()
      success.value = true
    } else {
      errors.value.common = text.replace(/^ERR:\s*/i, '') || cfg.error.default
    }
  } catch (e) {
    errors.value.common = cfg.error.network
  } finally {
    loading.value = false
  }
}

const reset = () => {
  success.value = false
  errors.value = {}
  state.value = { ...initial }
  agreement.value = false
}
</script>

<style lang="scss">
.form-modal {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: rem(16);
  overflow-y: auto;

  &-title {
    text-align: center;
    margin-bottom: rem(20);
  }

  &-control {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }

  &-error {
    font-size: rem(18);
    color: var(--color-red);
    margin-bottom: rem(8);
  }
}

.form-modal-sended {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
