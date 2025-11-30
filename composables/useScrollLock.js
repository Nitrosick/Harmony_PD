export function useScrollLock() {
  const lock = () => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = scrollBarWidth + 'px'
  }

  const unlock = () => {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }

  return { lock, unlock }
}
