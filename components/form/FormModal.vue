<template>
  <div
    v-if="success"
    class="form-modal-sended"
  >
    <h3>{{ contactModal.messages.success }}</h3>
  </div>
  <form
    v-else-if="contactModal.title"
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
    />
    <Input
      v-model="state.contact_person"
      :placeholder="contactModal.fields.contact_person.placeholder"
      :disabled="loading"
      required
    />
    <Input
      v-model="state.phone"
      type="tel"
      :placeholder="contactModal.fields.phone.placeholder"
      :disabled="loading"
      required
    />
    <Input
      v-model="state.email"
      type="email"
      :placeholder="contactModal.fields.email.placeholder"
      :disabled="loading"
      required
    />
    <Textarea
      v-model="state.request"
      :placeholder="contactModal.fields.request.placeholder"
      :hint="contactModal.fields.request.hint"
      :disabled="loading"
      required
    />
    <Checkbox
      v-model="agreement"
      :label="contactModal.consent"
      :disabled="loading"
    />

    <div class="form-modal-control">
      <div
        v-if="error"
        class="form-modal-error"
      >
        {{ error }}
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
const error = ref(null)
const success = ref(false)
const agreement = ref(false)

watch(() => state, () => { error.value = null }, { deep: true })
watch(agreement, () => { error.value = null })
watch(() => props.opened, () => { reset() })

const onSubmit = async () => {
  const cfg = contactModal.value

  if (!agreement.value) {
    error.value = cfg.messages.errorDefault
    return
  }

  loading.value = true
  error.value = null

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
      error.value = text.replace(/^ERR:\s*/i, '') || cfg.messages.errorDefault
    }
  } catch (e) {
    error.value = contactModal.value?.messages?.errorNetwork || 'Ошибка'
  } finally {
    loading.value = false
  }
}

const reset = () => {
  success.value = false
  error.value = null
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
