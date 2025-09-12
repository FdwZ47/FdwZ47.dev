<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";

const projects = [

    { 
    title: "Utilities Bot", 
    description: "Versatile Discord bot with moderation and utility commands", 
    date: "2021 May", image: "/utibot.png", link: "https://github.com/FdwZ47/utilities-Bot" 
      },

    { 
    title: "Lorik", 
    description: "Simple customizable cold theme for BetterDiscord", 
    date: "2021 July", image: "/lorik.png", link: "https://github.com/FdwZ47/Lorik" 
      },

    {
    title: "Rem(Re:Zero)", 
    description: "A fan-made Re:Zero-inspired BetterDiscord theme featuring Rem’s colors and style", 
    date: "2021 Oct", image: "/rem.png", link: "https://github.com/FdwZ47/Rem" 
      },

    { 
    title: "UoN Cafe", 
    description: "Fully responsive, modern website for University of Nizwa students, built with Nuxt 4", 
    date: "2025 Sept", image: "/uoncafe.png", link: "https://uoncafe.org/" 
      },

];

const activeIndex = ref(0);
const swiperRef = ref(null);


const onSlideChange = (swiper) => {
  activeIndex.value = swiper.realIndex;
};


</script>



<template>
  <div class="timeline-wrapper">
  
<ul class="timeline-list">
  <li
    v-for="(p,i) in projects"
    :key="i"
    :class="{ active: activeIndex === i }"
  >
    <span>{{ p.date }}</span>
  </li>
</ul>


   
<Swiper
  ref="swiperRef"
  :modules="[Pagination]"
  :slides-per-view="1.2"
  :space-between="20"
  :centered-slides="true"
  direction="horizontal"
  :grab-cursor="true"
  class="swiper-timeline"
  @slideChange="onSlideChange"
>
  <SwiperSlide v-for="(p, i) in projects" :key="i">
    <div class="project-card">
      <img :src="p.image" alt="project preview" />
      <h3>{{ p.title }}</h3>
      <p>{{ p.description }}</p>
      <a v-if="p.link" :href="p.link" target="_blank" class="project-btn">View Project</a>
    </div>
  </SwiperSlide>
</Swiper>

  </div>
</template>

