import { Ref, ref, onMounted } from 'vue'

/**
 * @description 监听 html class 变化，从而得出当前主题
 * @returns {Ref<'light'|'dark'>}
 * @example
 */
export function useGetTheme(): Ref<'light' | 'dark'> {
  const isObserve = ref(false)
  const theme = ref<'light' | 'dark'>('light')
  onMounted(() => {
    const html = document.documentElement
    const htmlClassName = (html.className || 'light') as 'light' | 'dark'
    theme.value = htmlClassName
    if (!isObserve.value) {
      var options = {
        // 观察node对象的属性
        attributes: true,
        // 只观察class属性
        attributeFilter: ['class'],
      }
      const mb = new MutationObserver(function (mutationRecord) {
        for (const item of mutationRecord) {
          if (item.attributeName === 'class') {
            const target = item.target as HTMLElement
            const currentTheme = (target.className || 'light') as 'light' | 'dark'
            theme.value = currentTheme
          }
        }
      })
      mb.observe(html, options)
    }
  })
  return theme
}
