import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/results',
            name: 'results',
            component: () => import("./views/results/Results.vue")
        },
        {
            path: '/results/new',
            name: 'newResult',
            component: () => import("./views/results/NewResult.vue")
        },
        {
            path: '/results/:id',
            name: 'result',
            component: () => import("./views/results/Result.vue")
        },

        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        // }
    ]
})
