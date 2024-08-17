//https://serversideup.net/building-page-layout-vue-router/

/*
1. define the router-view section, usually a top component, in this case App.vue
2. create a view, which is composed by specific templates, in my case home view include map and sidebar
3. call the view and register it as the routing destination; in my case, home

So it follows:
1. the user check the app
2. it lands in App.vue
3. App.vue brings it to my ROUTER logic (router-view)
4. The first element of my router logic is home

See that path that are NOT taking me to a complete different PAGE, are CHILDREN
In my example, gallery is NOT taking me to a different SIBLING page, but STAYING in this VIEW, only that I have to open
the sidebar to see it

IMPORTANT: If one of the components INSIDE the router-view logic requires data from its CURRENT PARENT,
data MUST be passed (chained) to the router-view for the the components to access it (or use Vuex)

IMPORTANT: home renders because it points to 2 global components that are already registered; otherwise, nothing

References to keep around...
--- https://medium.com/@saidhayani/understand-routing-in-vue-js-with-examples-6da96979c8e3
--- https://regenrek.com/posts/how-to-create-an-animated-vue-sidebar-menu-with-vue-observable/ (check also codepens)
--- https://serversideup.net/building-page-layout-vue-router/
--- https://router.vuejs.org/
--- https://stackoverflow.com/questions/54698133/fixed-sidebar-with-dynamic-content-in-vue-js (dynamic components)

*/

import home from '../views/Home.vue';

import Gallery from '../components/ecPhotoGallery.vue'

import GenAbout from '../components/ecGeneralAbout.vue'

import CamInterf from '../components/ecCameraInterface.vue'

export const routes = [{
        path: '',
        name: 'home',
        component: home,
        children: [{
                path: 'gallery',
                name: 'maingallery',
                component: Gallery
            },

            {
                path: 'about',
                name: 'mainabout',
                component: GenAbout
            },
        ]
    },

    {
        path: '/testcamera',
        name: 'camera',
        component: CamInterf,
    },

    {
        path: '*',
        name: '404',
        redirect: ''
    }
]