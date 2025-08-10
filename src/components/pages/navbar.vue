<script setup>
import { RouterLink } from 'vue-router';
</script>


<template>
    
    <div class="navbar-container">
            <nav class="menu">
                <RouterLink  to="/contacts" class="menulink" active-class="menulink-active">Contacts</RouterLink>

                       <div class="divider"></div>

                <RouterLink to="/" class="menulink" active-class="menulink-active">Home</RouterLink>

                        <div class="divider"></div>

                <RouterLink  to="/Projects" class="menulink" active-class="menulink-active">Projects</RouterLink>
            </nav>
    </div>
</template>