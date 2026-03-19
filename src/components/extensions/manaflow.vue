<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useRafFn } from '@vueuse/core'

type WaveLayer = {
  bottom: number
  height: number
  amplitude: number
  speed: number
  points: number
  svgHeight: number
}

const props = defineProps({
  paused: { type: Boolean, default: false },
})

const waveLayers: WaveLayer[] = [
  {
    bottom: 100,
    height: 30,
    amplitude: 20,
    speed: 0.3,
    points: 4,
    svgHeight: 170,
  },
  {
    bottom: -20,
    height: 5,
    amplitude: 20,
    speed: 0.15,
    points: 4,
    svgHeight: 170,
  },
]

const wavePaths = ref<string[]>(waveLayers.map(() => ''))

const starRings = Array.from({ length: 15 }, (_, index) => (index + 1) * 3.5)
const starMaskId = `star-trails-mask-${Math.random().toString(36).slice(2)}`

const fixedSize = 2400
const starTrailsStyle = {
  width: `${fixedSize}px`,
  height: `${fixedSize}px`,
}

let elapsed = 0
let lastTime = 0

function createWavePoints(layer: WaveLayer, width: number, step: number) {
  const points: Array<{ x: number; y: number }> = []
  const safePoints = Math.max(layer.points, 1)
  const scale = 100

  for (let i = 0; i <= safePoints; i++) {
    const x = (i / safePoints) * width
    const seed = (step + (i + (i % safePoints))) * layer.speed * scale
    const sinVal = Math.sin(seed / scale)
    const y = sinVal * sinVal * layer.amplitude + layer.height
    points.push({ x, y })
  }

  return points
}

function createWavePath(layer: WaveLayer, width: number, step: number) {
  const points = createWavePoints(layer, width, step)
  if (points.length < 2) return ''

  let path = `M ${points[0].x} ${points[0].y}`
  const initialControl = {
    x: (points[1].x - points[0].x) / 2,
    y: points[1].y - points[0].y + points[0].y + (points[1].y - points[0].y),
  }

  path += ` C ${initialControl.x} ${initialControl.y} ${initialControl.x} ${initialControl.y} ${points[1].x} ${points[1].y}`

  let previousControl = initialControl
  for (let i = 1; i < points.length - 1; i++) {
    const nextControl = {
      x: points[i].x - previousControl.x + points[i].x,
      y: points[i].y - previousControl.y + points[i].y,
    }
    path += ` C ${nextControl.x} ${nextControl.y} ${nextControl.x} ${nextControl.y} ${points[i + 1].x} ${points[i + 1].y}`
    previousControl = nextControl
  }

  path += ` L ${width} ${layer.svgHeight} L 0 ${layer.svgHeight} Z`
  return path
}

const { pause } = useRafFn(
  ({ timestamp }) => {
    if (!lastTime) lastTime = timestamp

    if (!props.paused) {
      elapsed += timestamp - lastTime
    }
    lastTime = timestamp

    const step = (elapsed * Math.PI) / 1000
    wavePaths.value = waveLayers.map((layer) => createWavePath(layer, 100, step))
  },
  { fpsLimit: 30 }
)

onUnmounted(() => {
  pause()
})
</script>

<template>
  <div class="manaflow-root" aria-hidden="true">
    <div class="star-trails" :style="starTrailsStyle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <mask :id="starMaskId">
            <circle
              v-for="radius in starRings"
              :key="radius"
              :r="radius"
              cx="50"
              cy="50"
              fill="none"
              stroke="white"
              stroke-width="0.05"
              stroke-dasharray="100, 5"
            />
          </mask>
        </defs>
        <g :mask="`url(#${starMaskId})`">
          <circle r="70" cx="50" cy="50" />
        </g>
      </svg>
    </div>

    <svg
      v-for="(layer, index) in waveLayers"
      :key="index"
      :class="['wave-layer', index === 0 ? 'wave-layer--back' : 'wave-layer--front']"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      :height="layer.svgHeight"
      viewBox="0 0 100 170"
      preserveAspectRatio="none"
      :style="{
        bottom: `${layer.bottom}px`,
      }"
    >
      <path :class="index === 0 ? 'wave-path-back' : 'wave-path-front'" :d="wavePaths[index]" />
    </svg>
  </div>
</template>

<style scoped lang="sass">
@use '@/assets/styles/_variables' as *

.manaflow-root
  position: absolute
  inset: 0
  overflow: hidden
  pointer-events: none

.star-trails
  position: fixed
  bottom: 0
  left: 50%
  transform: translate(-50%, 50%) translateZ(0)
  display: flex
  justify-content: center
  align-items: center
  overflow: hidden
  filter: drop-shadow(0 0 5px $branding-accent)
  will-change: transform

  svg
    width: 100%
    height: 100%

  g
    fill: #525a85

    circle
      animation: star-rotate 15s linear infinite
      transform-origin: center center
      will-change: transform
      mask-image: conic-gradient(from 0.38deg at 50% 50%, rgba(255, 255, 255, 0) 0deg, rgba(255, 255, 255, 0) 60deg, rgba(255, 255, 255, 0.25) 120deg, rgba(255, 255, 255, 0.5) 180deg, rgba(255, 255, 255, 0.25) 240deg, rgba(255, 255, 255, 0) 300deg, rgba(255, 255, 255, 0) 360deg)

.wave-layer
  position: absolute
  left: 0
  right: 0
  display: flex
  transform: translateZ(0)
  will-change: contents

.wave-layer--back
  filter: drop-shadow(0px -10px 6px $dark-sea)

.wave-layer--front
  filter: drop-shadow(0px -10px 6px $lighter-sea)

.wave-path-back
  fill: $dark-sea

.wave-path-front
  fill: $lighter-sea

@keyframes star-rotate
  100%
    transform: rotate(-360deg)
</style>