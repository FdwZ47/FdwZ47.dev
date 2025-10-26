<script setup>
import Paths from '../Icons/iconpaths'

</script>

<template>

<section class="home">
<div class="logo">
        <svg width="433" height="210" viewBox="0 0 43 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :d="Paths.FdwZ"/>
</svg>
</div>

        <div class="content">
            <a class="head">Hey, I'm FdwZ!</a>
            <a class="sub">Web developer and future English teacher.</a>
   </div>
             <div class="Icons">
        <a href="https://discordapp.com/users/755767643331362916" target="_blank" draggable="false" class="icon-link"> 
                <svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
                        <path :d="Paths.Discord"/>
                </svg>           
        </a>
        <a href="https://steamcommunity.com/profiles/76561199138399911/" target="_blank" draggable="false" class="icon-link">  
                <svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
                        <path v-for="(d, i) in Paths.Steam" :key="i" :d="d"/>
                </svg></a>
        <a href="https://www.instagram.com/fdwz.4/" target="_blank" draggable="false" class="icon-link">      
                <svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
                        <path :d="Paths.Instagram"/>
                        </svg>
                        </a>
                <a href="https://github.com/FdwZ47" target="_blank" draggable="false" class="icon-link">

                <svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
                        <path :d="Paths.GitHub"/>
                        </svg>
                </a>
        </div>
                
</section>
               
</template>