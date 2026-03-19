<script setup lang="ts">
import { computed } from 'vue'
import { useMouse, useMousePressed, useEventListener } from '@vueuse/core'
import { ref } from 'vue'

const { x, y } = useMouse({ type: 'client' })
const { pressed } = useMousePressed()
const isOutside = ref(true)

useEventListener(document, 'mouseenter', () => {
  isOutside.value = false
})

useEventListener(document, 'mouseleave', () => {
  isOutside.value = true
})

const opacity = computed(() => {
  if (isOutside.value) return 0
  return pressed.value ? 0.9 : 0.5
})
</script>

<template>
  <div class="light-wrapper">
    <div
      class="light-dot"
      :style="{
        left: `${x}px`,
        top: `${y}px`,
        '--opacity': opacity,
      }"
    />
  </div>
</template>

<style scoped lang="sass">
@use '@/assets/styles/_variables' as *

.light-wrapper
  position: fixed
  inset: 0
  pointer-events: none
  z-index: 5

.light-dot
  position: absolute
  width: 1.875rem
  height: 1.875rem
  transform: translate(-50%, -50%)

.light-dot::before
  content: ''
  position: absolute
  width: 100%
  height: 100%
  border-radius: 50%
  background: $lighter-sea
  opacity: var(--opacity)
  box-shadow: 0 0 30px 15px $lighter-sea
  transition: opacity 0.25s ease
</style>
