<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const x = ref(0);
const y = ref(0);
const isMouseDown = ref(false);

const handleMouseMove = (e) => {
  x.value = e.clientX;
  y.value = e.clientY;
};

const handleMouseDown = () => {
  isMouseDown.value = true; 
};

const handleMouseUp = () => {
  isMouseDown.value = false; 
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mousedown', handleMouseDown); 
  window.addEventListener('mouseup', handleMouseUp);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mousedown', handleMouseDown);
  window.removeEventListener('mouseup', handleMouseUp);
});


</script>

<template>


      <div class="light-wrapper">
    <div
      class="light-dot"
      :style="{
        left: `${x}px`,
        top: `${y}px`,
        '--opacity': isMouseDown ? 1 : 0.7, 
      }"
    />
  </div>


</template>


<style scoped>
.light-wrapper {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1; 
}

.light-dot {
  position: absolute;
  width: 25px;
  height: 25px;
  transform: translate(-50%, -50%);
}

.light-dot::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(165, 56, 96, 0.604);
  opacity: var(--opacity);
  box-shadow: 0 0 30px 15px rgba(165, 56, 96, 0.704);
  mix-blend-mode: screen; 
  transition: all 0.2s ease; 
}
</style>