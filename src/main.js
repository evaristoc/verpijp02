// jshint esversion:6
import Vue from 'vue';
import App from './App.vue';

//plugins*******************
//routers*******************
import VueRouter from 'vue-router';
import { routes } from './routes'

Vue.use(VueRouter);
const router = new VueRouter({ routes });


//global components*****************
import ecMapComponent from './components/ecMapComponent';
import ecMainSidebar from './components/ecMainSidebar';
import ecPhotoGallery from './components/ecPhotoGallery';
import ecNavMainSidebar from './components/ecNavMainSidebar';
import ecGeneralAbout from './components/ecGeneralAbout';
import ecCamInterf from './components/ecCameraInterface.vue'

Vue.component('ecMapComponent', ecMapComponent);
Vue.component('ecMainSidebar', ecMainSidebar);
Vue.component('ecPhotoGallery', ecPhotoGallery);
Vue.component('ecNavMainSidebar', ecNavMainSidebar);
Vue.component('ecGeneralAbout', ecGeneralAbout);
Vue.component('ecCamInterf', ecCamInterf);

//third-party components*****************
import VueDraggableResizable from 'vue-draggable-resizable';
Vue.component('VueDraggableResizable', VueDraggableResizable);

const elem = document.documentElement;
if (elem.RequestFullscreen) { /* not listed */
    elem.RequestFullscreen();
} else if (elem.mozRequestFullScreen) { /* Mozilla */
    elem.mozRequestFullScreen();
} else if (elem.msRequestFullscreen) { /* MicroSoft */
    elem.msRequestFullscreen();
} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
}

window.EventBus = new Vue({
    data() {
        return {
            depijpcenter: { "lat": 52.354200, "lng": 4.896411 }
        };
    }
});


export const loadedGoogleMapsAPI = new Promise((resolve, reject) => {
    if (!document) { reject };
    window.GoogleMapsInit = resolve; //E: save in window as global
    let GMap = document.createElement('script'); //E: create a script
    GMap.setAttribute('src',
        "https://maps.googleapis.com/maps/api/js?key=" + process.env.VUE_APP_GOOMAPS_KEY5 + "&callback=GoogleMapsInit"
    );
    document.body.appendChild(GMap);
});


new Vue({
    router, //OJO: https://stackoverflow.com/questions/44618761/vue-router-error-typeerror-cannot-read-property-matched-of-undefined
    el: '#app',
    render: h => h(App)
});


//webpack:
//-- also remember to keep node version as 7