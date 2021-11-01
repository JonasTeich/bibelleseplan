export { default as BibleText } from '../..\\components\\BibleText.vue'
export { default as Challenge } from '../..\\components\\Challenge.vue'
export { default as CheckBox } from '../..\\components\\CheckBox.vue'
export { default as Container } from '../..\\components\\Container.vue'
export { default as Dialog } from '../..\\components\\Dialog.vue'
export { default as Footer } from '../..\\components\\Footer.vue'
export { default as Introduction } from '../..\\components\\Introduction.vue'
export { default as Logo } from '../..\\components\\Logo.vue'
export { default as NavBar } from '../..\\components\\NavBar.vue'
export { default as Pray } from '../..\\components\\Pray.vue'
export { default as ReadText } from '../..\\components\\ReadText.vue'
export { default as Think } from '../..\\components\\Think.vue'
export { default as Thoughts } from '../..\\components\\Thoughts.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
