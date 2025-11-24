<script setup lang="js">
import { ref, reactive, watch } from 'vue'

const { contactModal } = useSiteContent()

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:open'])

const state = reactive({
  organization: '',
  contact_person: '',
  phone: '',
  email: '',
  request: ''
})

const agree = ref(false)
const loading = ref(false)
const error = ref('')
const success = ref(false)

watch(
  () => props.open,
  (val) => {
    if (!val) {
      error.value = ''
      success.value = false
    }
  }
)

const close = () => {
  emit('update:open', false)
}

const submitForm = async () => {
  const cfg = contactModal.value

  if (!cfg || !cfg.messages) {
    error.value = 'Внутренняя ошибка: конфигурация формы не загружена'
    return
  }

  if (!agree.value) {
    error.value = cfg.messages.errorDefault
    return
  }

  loading.value = true
  error.value = ''
  success.value = false

  try {
    const body = new URLSearchParams()
    body.append('organization', state.organization)
    body.append('contact_person', state.contact_person)
    body.append('phone', state.phone)
    body.append('email', state.email)
    body.append('request', state.request)
    body.append('agree', '1')

    const res = await fetch('/contact.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: body.toString()
    })

    const text = await res.text()

    if (text.startsWith('OK')) {
      success.value = true
      state.organization = ''
      state.contact_person = ''
      state.phone = ''
      state.email = ''
      state.request = ''
      agree.value = false
    } else {
      error.value = text.replace(/^ERR:\s*/i, '') || cfg.messages.errorDefault
    }
  } catch (e) {
    error.value = contactModal.value?.messages?.errorNetwork || 'Ошибка сети при отправке формы.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open && contactModal"
      class="contact-modal-backdrop"
      @click.self="close"
    >
      <div class="contact-modal">
        <button
          class="contact-modal__close"
          type="button"
          @click="close"
          :aria-label="contactModal.closeAriaLabel"
        >
          ✕
        </button>

        <h2 class="contact-modal__title">
          {{ contactModal.title }}
        </h2>

        <form
          class="contact-modal__form"
          @submit.prevent="submitForm"
        >
          <div class="contact-modal__field">
            <input
              v-model="state.organization"
              type="text"
              name="organization"
              :placeholder="contactModal.fields.organization.placeholder"
              required
            />
          </div>

          <div class="contact-modal__field">
            <input
              v-model="state.contact_person"
              type="text"
              name="contact_person"
              :placeholder="contactModal.fields.contact_person.placeholder"
              required
            />
          </div>

          <div class="contact-modal__field">
            <input
              v-model="state.phone"
              type="tel"
              name="phone"
              :placeholder="contactModal.fields.phone.placeholder"
              required
            />
          </div>

          <div class="contact-modal__field">
            <input
              v-model="state.email"
              type="email"
              name="email"
              :placeholder="contactModal.fields.email.placeholder"
              required
            />
          </div>

          <div class="contact-modal__field">
            <textarea
              v-model="state.request"
              name="request"
              rows="3"
              :placeholder="contactModal.fields.request.placeholder"
              required
            ></textarea>
          </div>

          <p
            v-if="contactModal.fields?.request?.hint"
            class="contact-modal__hint"
          >
            {{ contactModal.fields.request.hint }}
          </p>

          <label
            v-if="contactModal.consent"
            class="contact-modal__checkbox"
          >
            <input
              v-model="agree"
              type="checkbox"
              :value="1"
            />
            <span>
              {{ contactModal.consent.prefix }}
              <a
                href="/docs/pdn-consent.pdf"
                target="_blank"
                rel="noopener"
              >
                {{ contactModal.consent.consentText }}
              </a>
              {{ contactModal.consent.and }}
              <a
                href="/docs/privacy-policy.pdf"
                target="_blank"
                rel="noopener"
              >
                {{ contactModal.consent.policyText }}
              </a>
            </span>
          </label>

          <p
            v-if="error"
            class="contact-modal__message contact-modal__message--error"
          >
            {{ error }}
          </p>

          <p
            v-if="success"
            class="contact-modal__message contact-modal__message--success"
          >
            {{ contactModal.messages.success }}
          </p>

          <button
            class="contact-modal__submit"
            type="submit"
            :disabled="loading"
          >
            {{
              loading
                ? contactModal.messages.submitting
                : contactModal.messages.submit
            }}
          </button>
        </form>
      </div>
    </div>
  </Teleport>
</template>




<style scoped lang="scss">
.contact-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(5, 12, 39, 0.45);
}

.contact-modal {
  position: relative;
  max-width: rem(440);
  width: calc(100% - rem(32));
  background: #ffffff;
  border-radius: rem(24);
  padding: rem(32);
  box-shadow: 0 rem(24) rem(60) rgba(15, 23, 42, 0.35);
}

.contact-modal__title {
  text-align: center;
  font-size: rem(24);
  font-weight: 600;
  margin-bottom: rem(24);
}

.contact-modal__close {
  position: absolute;
  top: rem(16);
  right: rem(16);
  border: none;
  background: none;
  font-size: rem(18);
  cursor: pointer;
}

.contact-modal__form {
  display: flex;
  flex-direction: column;
  gap: rem(12);
}

.contact-modal__field input,
.contact-modal__field textarea {
  width: 100%;
  border-radius: rem(28);
  border: 1px solid var(--color-border-light, #dde7f0);
  padding: rem(12) rem(18);
  font-size: rem(14);
  outline: none;
  box-sizing: border-box;
}

.contact-modal__field textarea {
  border-radius: rem(16);
  resize: vertical;
  min-height: rem(80);
}

.contact-modal__field input:focus,
.contact-modal__field textarea:focus {
  border-color: var(--color-accent-blue, #2563eb);
}

.contact-modal__hint {
  font-size: rem(12);
  color: var(--color-text-secondary, #6b7280);
  margin-top: rem(4);
}

.contact-modal__checkbox {
  display: flex;
  align-items: flex-start;
  gap: rem(8);
  font-size: rem(12);
  color: var(--color-text-secondary, #4b5563);

  input {
    margin-top: rem(3);
  }

  a {
    color: var(--color-accent-blue, #2563eb);
    text-decoration: underline;
  }
}

.contact-modal__message {
  font-size: rem(12);
  margin-top: rem(4);

  &--error {
    color: #b91c1c;
  }

  &--success {
    color: #15803d;
  }
}

.contact-modal__submit {
  width: 100%;
  margin-top: rem(12);
  border-radius: rem(999);
  padding: rem(12) rem(16);
  border: none;
  background: var(--color-text-main, #020617);
  color: #ffffff;
  font-size: rem(16);
  cursor: pointer;
}

.contact-modal__submit[disabled] {
  opacity: 0.7;
  cursor: default;
}
</style>
