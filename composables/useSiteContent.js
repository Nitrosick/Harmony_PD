const loading = ref(false)
const loaded = ref(false)
const error = ref(null)

const main = ref(null)
const sphere = ref(null)
const services = ref(null)
const maintenance = ref(null)
const footer = ref(null)
const header = ref(null)
const questions = ref(null)
const contactModal = ref(null)
const about = ref(null)

const safeJson = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status} ${res.statusText}`)
  return res.json()
}

const loadContent = async () => {
  if (loaded.value) return

  loading.value = true
  error.value = null

  try {
    const [
      mainData,
      sphereData,
      servicesData,
      maintenanceData,
      footerData,
      headerData,
      questionsData,
      contactModalData,
      aboutData
    ] = await Promise.all([
      safeJson('/content/main.json'),
      safeJson('/content/sphere.json'),
      safeJson('/content/services.json'),
      safeJson('/content/maintenance.json'),
      safeJson('/content/footer.json'),
      safeJson('/content/header.json'),
      safeJson('/content/questions.json'),
      safeJson('/content/contactModal.json'),
      safeJson('/content/about.json')
    ])

    main.value = mainData
    sphere.value = sphereData
    services.value = servicesData
    maintenance.value = maintenanceData
    footer.value = footerData
    header.value = headerData
    questions.value = questionsData
    contactModal.value = contactModalData
    about.value = aboutData

    loaded.value = true
  } catch (e) {
    console.error('Failed to load site content:', e)
    error.value = e
  } finally {
    loading.value = false
  }
}

export function useSiteContent () {
  onMounted(loadContent)

  return {
    main: computed(() => main.value),
    sphere: computed(() => sphere.value),
    services: computed(() => services.value),
    maintenance: computed(() => maintenance.value),
    footer: computed(() => footer.value),
    header: computed(() => header.value),
    questions: computed(() => questions.value),
    contactModal: computed(() => contactModal.value),
    about: computed(() => about.value),

    loading: computed(() => loading.value),
    loaded: computed(() => loaded.value),
    error: computed(() => error.value)
  }
}
