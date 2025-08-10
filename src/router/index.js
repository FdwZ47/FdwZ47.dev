import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/pages/about.vue";
import ContactPage from "@/components/pages/contacts.vue";
import projectpage from "@/components/pages/projects.vue";
import notfound from "@/components/pages/notfound.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/Contacts',
        name: 'Contacts',
        component: ContactPage,
    },
    {
        path: '/Projects',
        name: 'Projects',
        component: projectpage,
    },
    {
        path: '/:catchAll(.*)',
        name: 'Not-Found',
        component: notfound,
    },
],
});


export default router