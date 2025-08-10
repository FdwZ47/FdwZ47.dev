<script setup>
import { RouterView } from 'vue-router';
import navbar from '@/components/pages/navbar.vue'
import light from '@/components/extensions/lighter.vue'
import Manaflow from './components/extensions/manaflow.vue';


</script>


<template>

     <div class="container grain">
         <light/>
 
         <RouterView/>
        
    </div>
    
    <div class="background"></div>
  
          <navbar />     
                <Manaflow/>

</template>


