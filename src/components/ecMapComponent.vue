<template>
    <div>
        <div class="modal fade" id="myModal_map" style="background-color: rgba(0, 0, 0, 0.6);">
              <!-- REFERENCES -->
              <!--https://www.w3schools.com/bootstrap4/tryit.asp?filename=trybs_modal&stacked=h-->
              <!--https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal_img-->
            <div class="modal-dialog modal-dialog-centered modal-sm">
              <div class="modal-content mb-0 p-0" style="background-color: rgba(255, 255, 255, 0.6);">
                <!-- Modal body -->
                <div class="modal-body">
                  <div class="container-fluid">
                    <button type="button" class="btn btn-warning close-modal" @click="closeModal()">&times;</button>
                    <img class="img-fluid" id="img01_map" style="height:100%; width:100%;">
                  </div>
                </div>
                <!-- Modal Footer -->
                <div class="modal-footer">
                  <h5 id="modal-title_map" style="color:blue"></h5>
                </div>
              </div>
            </div>
        </div>
        <!--<h1>VerPijp Project</h1>-->
        <div id="map" class="h-250"></div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {loadedGoogleMapsAPI} from '../main'
    import {style_map} from '../assets/stylingdata'
 
  export default {
    props: {
      'centerlat': {
        type: Number,
        default() {
          return window.EventBus.depijpcenter.lat
        }
      },
      'centerlng': {
        type: Number,
        default() {
          return window.EventBus.depijpcenter.lng
        }
      },
      'zoom': {
        type: Number,
        default() {
          //return 15
          return 17
        }
      },
      'mapstyle': null
    },

    created(){
      window.EventBus.$on('clear-all-markers', ()=>{
        this.clearAllMarkers();
        //this.$markers = {};
      });
      window.EventBus.$on('clt-marker', (d)=>{ //a receiver, where the functionality really resides
        if (d.sel === false) {
            this.clearMarker(d);
        }else if (d.sel === true) {
            let marker = this.makeMarker(d);
            this.$markers[d.itemid] = marker;
        }
      });
      window.EventBus.$on('tracking', (d)=>{
        if (d.tr === true) {
            this.startTrackPosition()
        }else{
            this.stopTrackPosition()
        }
      })
    },

    mounted() {
      this.$markers = {};
      this.$mymarker = {};
      let mymarker = {lat:0,lng:0,street:''};
      loadedGoogleMapsAPI
                    .then(()=>{
                        this.initMap();
                        this.$mymarker = this.makeMarker(mymarker, true);
                    })
                    .catch((err)=>{console.log("RESULT loading GM API", err)});
      Vue.nextTick()
                    .then(()=>{
                        this.clearMarker();
                    });
    },
    data(){
        return {
            posWatchID:null,
        };
    },
    methods: {
      initMap() {
        //console.log(google.maps); //You can now access google maps object here; it is global to this component
        this.$map = new window.google.maps.Map(document.getElementById('map'), {
        center: new window.google.maps.LatLng(this.centerlat, this.centerlng),
        zoom: this.zoom,
        styles: style_map.data
      });
    
      },
      makeInfoWindow(d){
        window.openModal_map = function(picture){
              let modal = document.getElementById('myModal_map');
              //let img = document.getElementById(this.idConcat(loc.itemid+'_img'));
              //let captionText = document.getElementById("modal-title_map");
              //console.log(img.src);
              let modalImg = document.getElementById("img01_map");
              modal.style.display = "block";
              modalImg.src = picture;
              //captionText.innerHTML = loc.street+", "+loc.year;
              modal.classList.add('show');
        };
        
                    
        //I substituted the following for future changes            
        //<tr><td><a href="/#/testcamera?q=${d.picture}"><strong>foto overlap (experimental)</strong></a></td></tr>

        var contentString = `
            <div id="content">
                <div id="siteNotice"></div>
                <table>
                    <tr><td><button onclick="openModal_map('${d.picture}')"><strong>foto</strong></button></td></tr>
                    <tr><td><a href="/#/testcamera?q=TEST"><strong>foto overlap (experimental)</strong></a></td></tr>
                    <tr><td><strong>year</strong></td><td>${d.year}</td></tr>
                    <tr><td><strong>est.address</strong></td><td>${d.street}</td></tr>
                    <tr><td><strong>bron</strong></td><td><a href="https://www.facebook.com/PrentenVanWeleerAmsterdamDePijp/">Postcards from de Pijp</a></td></tr>
                </table>
            <\div>
            `
        
        
        return new window.google.maps.InfoWindow({
          content: contentString
        });
      
      },
        openModal(picture){
              let modal = document.getElementById('myModal_map');
              //let img = document.getElementById(this.idConcat(loc.itemid+'_img'));
              //let captionText = document.getElementById("modal-title_map");
              //console.log(img.src);
              let modalImg = document.getElementById("img01_map");
              modal.style.display = "block";
              modalImg.src = picture;
              //captionText.innerHTML = loc.street+", "+loc.year;
              modal.classList.add('show');
        },
      closeModal(){
        //let span = document.getElementsByClassName("close-modal")[0];
        let modal = document.getElementById('myModal_map');
        modal.classList.remove('show');
        modal.style.display = "none";
      },
      makeMarker(d, mymark=false) {
        let zelf = this;
        let m = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(d.lat, d.lng),
          //icon: require('../assets/googlecamerablue.png'),//
          icon: !mymark?"http://icons.iconarchive.com/icons/designbolts/free-multimedia/32/Dslr-Camera-icon.png":{path: google.maps.SymbolPath.CIRCLE, scale: 7, fillColor: '#00CCFF', fillOpacity: 0.8, strokeWeight: 1},
          map: zelf.$map,
          //title: !mymark?d.street:'ME',
        })
        let iw = zelf.makeInfoWindow(d);
        m.addListener('click', function() {
          iw.open(zelf.$map, this);
        });
      //{path: google.maps.SymbolPath.CIRCLE, scale: 10}
        return m
      },
    clearMarker(d){
        //console.log(this.$markers)
        this.$markers[d.itemid].setMap(null);
        //document.getElementById("btnaddmark_"+idx).disabled = false;
        //console.log(this.$markers)
      },
      clearAllMarkers(){
        let ids = Object.keys(this.$markers);
        //console.log(this.$markers);
        for( let idx = 0; idx < ids.length; idx++ ){
            this.$markers[ids[idx]].setMap(null);
            //document.getElementById("btnaddmark_"+ids[idx]).disabled = false;
            //sel = "unselected";
            document.getElementById("btnaddmark_"+ids[idx]).classList.remove("btn-outline-secondary");
            document.getElementById("btnaddmark_"+ids[idx]).classList.add("btn-outline-info");
        };
      },
      startTrackPosition() {
        if (navigator.geolocation) {
          this.posWatchID = navigator.geolocation.watchPosition(
                       this.successPosition,
                       this.failurePosition, 
                      {
                       enableHighAccuracy: true,
                       timeout:15000,
                       maximumAge: 1000
          });
        }else{
          document.getElementById("resulttest").innerHTML = "Your browser does not support Geolocation API!!!";
        }
      },
      stopTrackPosition(){
            if (!this.posWatchID) {
                return
            }
            navigator.geolocation.clearWatch(this.posWatchID)
            this.$mymarker.setPosition({lat:0,lng:0})            
        },
      successPosition: function(position){
            this.$mymarker.setPosition({lat:position.coords.latitude,lng:position.coords.longitude})
      },
      failurePosition: function(err){
        alert("Error Code: " + err.code + " Error Message: " + err.message);
      },
    }
  }
</script>

<style scoped>
    #map {
        margin: 0 auto;
        background: gray;
    }
    .h-250 {
        /*height:700px;*/
        height:100vh;
    }
    
    @media screen and (max-width: 450px) {
      h1 {
        /*display: none;*/
        margin: 0 100px;
      }
      #map {
        margin: 0px;
        height: 100vh;
        width: 100vw;
        }
    }
    
    @media screen and (max-width: 800px) {
      h1 {
        /*display: none;*/
        margin: 0 50px;
      }
      #map {
        margin: 0px;
        height: 100vh;
        width: 100vw;
        }
    }
    
</style>