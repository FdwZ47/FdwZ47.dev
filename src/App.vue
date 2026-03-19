<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/pages/navbar.vue'
import Light from '@/components/extensions/lighter.vue'
import Manaflow from '@/components/extensions/manaflow.vue'
</script>

<template>
  <div class="grain-overlay"></div>

  <div class="container">
    <Light />
    <RouterView />
  </div>

  <div class="background"></div>

  <Navbar />

  <div class="ManaFlow">
    <Manaflow />
  </div>
</template>
