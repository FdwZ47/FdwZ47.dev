<script setup>
import { ref } from 'vue';
import Paths from '../Icons/iconpaths'
import { useClipboard } from '@vueuse/core'

const MyNumber = ref(91790882)
const { copy } = useClipboard()
const Copied = ref(false)


const copyToClipboard = async (num) => {
  await copy(num.toString())
  Copied.value = true 
  setTimeout(() => (Copied.value = false), 2000) 
}

</script>




<template>
    <div class="contact">
            <div class="contact-info">
            <a class="head">
                Contact
            </a>
            <a class="sub">Need to get in touch? DM me on Instagram or Discord. Hit me up on WhatsApp if you need a fast reply.</a>
            </div>


            <div class="divider-line"></div>


            <div class="contact-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"  viewBox="0 0 17 17">
                  <path :d="Paths.Whatsapp"/>
                </svg>
                <a class="link-info dial">+968</a>
                <div class="divider"></div>
                <a  class="link-info" @click="copyToClipboard(MyNumber)"> {{  MyNumber }}
                <span v-if="Copied" class="copied-msg">Copied!</span>    
                </a>
            </div>


                <div class="contact-link">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="blue" xmlns="http://www.w3.org/2000/svg">
                <path :d="Paths.Discord"/>
            </svg>
            <a href="https://discordapp.com/users/755767643331362916" class="link-info"  target="_blank"> @4dw.     
                </a>
                </div>


                <div class="contact-link">
            <svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
    <path :d="Paths.Instagram"/>
                </svg>
            <a href="https://www.instagram.com/fdwz.4/" class="link-info" target="_blank">
                    @fdwz.4
              </a>
            </div>
        </div>
</template>