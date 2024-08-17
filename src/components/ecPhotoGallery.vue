<template>
     <!-- COMPONENT wrap-data-area START --> 
     <div id="wrap-data-area">
        <!-- COMPONENT Modal START-->
        <div class="modal fade" id="myModal" style="background-color: rgba(0, 0, 0, 0.6);">
              <!-- REFERENCES -->
              <!--https://www.w3schools.com/bootstrap4/tryit.asp?filename=trybs_modal&stacked=h-->
              <!--https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal_img-->
            <div class="modal-dialog modal-dialog-centered modal-sm">
              <div class="modal-content mb-0 p-0" style="background-color: rgba(255, 255, 255, 0.6);">
                <!-- Modal body -->
                <div class="modal-body">
                  <div class="container-fluid">
                    <button type="button" class="btn btn-warning close-modal" @click="closeModal()">&times;</button>
                    <img class="img-fluid" id="img01" style="height:100%; width:100%;">
                  </div>
                </div>
                <!-- Modal Footer -->
                <div class="modal-footer">
                  <h5 id="modal-title" style="color:blue"></h5>
                </div>
              </div>
            </div>
        </div><!-- COMPONENT Modal END-->


        <!-- COMPONENT toggler-nav START -->
        <div id="toggler-nav">
            <a href="javascript:void(0)" id="closebtn" @click="closeNav()">Go to Map</a>
        </div> <!-- COMPONENT toggler-nav END -->
                  <div id="nav-ctrls" class="container">
                    <div class="row">
                        <div id="upperctr">
                            <input id="searchfilter" class="sidebar-upperctr-elem" type="text" v-model="search" placeholder="Search street and/or year">
                        </div>
                        <div>
                            <button @click="selAllMarkers" class="btn btn-outline-warning sidebar-upperctr-elem" id="clearingbtn">Select all</button>
                            <button @click="clearAllMarkers" class="btn btn-outline-warning sidebar-upperctr-elem" id="clearingbtn">Clear all</button>
                        </div>
                        <button id="trackingbtn" class="btn btn-outline-warning" @click=trackingAllowed() style="margin-left:5px;">Tracking?</button>
                    </div>
                </div><!-- COMPONENT nav-ctrls END -->
            <!-- COMPONENT gallery START -->
            <div id="sel-gallery" class="content-fluid">
                  <div class="grid">
                      <div class="cell" v-for="loc in filteredLocations">
                          <div class="item-title">
                              <img style="width:100px;height:100px;margin-left:20px;" @click="openModal(loc)" :id="idConcat(loc.itemid+'_img')" :src=loc.picture class="responsive-image">
                              </br>
                              <button @click="cltMarker($event)" type="button" :id="idConcat(loc.itemid)" :value="loc.itemid" class="btn btn-street" :class="loc.sel? 'btn-outline-secondary':'btn-outline-info'">{{loc.street}}, {{loc.year}}</button>
                          </div>
                      </div>
                  </div>
              </div><!-- COMPONENT gallery END -->
      </div> <!-- COMPONENT wrap-data-area END -->
</template>
<script>
    import Vue from 'vue';

    import {verdata} from '../assets/verpijptest.js'
    for(let i=0; i < verdata.output.length; i++){
        verdata.output[i].currentclass = "'btn btn-outline-info btn-street'";
        verdata.output[i].sel = false;
    }
    
    export default {
      
      data(){
          return {
                    
                  cl1: "'btn btn-outline-info btn-street'",
                  center: window.EventBus.depijpcenter,
                  locations: verdata.output,
                  transLocation:[],
                  search: '',
                  racking: false,
                };
        },
       
      mounted(){
            this.locations;
            this.filteredLocations;
      },
       
        computed:{
            filteredLocations(){ //filtered items/markers
                let l;
                if (!this.locations.length) {
                    return [];
                }
                l = this.locations.filter(loc => {
                        //console.log(loc)
                        let nosearch = this.search ==='' || this.search ===' '
                        if (nosearch) {
                            return true
                        }
                        return [loc.street +' '+ loc.year][0].toLowerCase().includes(this.search.toLowerCase())
                    })
        
               
                return l;
                
            },
            

            
        },
        
        methods:{
            cltMarker(e){ //an emiter only; currently duplicated between NavMain.. and PhotoGal.. to facilitate redoing
                let idx = e.target.value;
                if (document.getElementById("btnaddmark_"+idx)) {
                    if (document.getElementById("btnaddmark_"+idx).classList.contains("btn-outline-info")) {
                        this.locations[idx].sel = true;
                       
                    }else if(document.getElementById("btnaddmark_"+idx).classList.contains("btn-outline-secondary")) {
                        this.locations[idx].sel = false;
                        
                    }
        
                    window.EventBus.$emit('clt-marker', this.locations[idx]);
          
                }
              },
            idConcat(idx){
                return "btnaddmark_"+idx
              },
              
                closeNav() {
                   document.getElementById("mySidenav").style.width = "0px";
                   document.getElementById("menu-open-test").style.marginLeft = "0px";
                   document.getElementById("menu-open-test").style.visibility = "visible";
                   this.$router.push({name:'home'});
                  },
                selAllMarkers(){ //based on filtered data!!!
                  
                  for(let idx = 0; idx < this.filteredLocations.length; idx++){
                      let jdx = this.filteredLocations[idx].itemid;
                      if ((this.locations[jdx].hasOwnProperty("sel") && this.locations[jdx].sel === false) || !this.locations[jdx].hasOwnProperty("sel")) {
                          let e = {target:{value:jdx}};
                          this.cltMarker(e);
                      }
                  }
                }, 
                clearAllMarkers(){ //based on filtered data!!!
                  for(let idx = 0; idx < this.filteredLocations.length; idx++){
                      let l = this.locations.filter((v)=>{return v.itemid === this.filteredLocations[idx].itemid})[0]
                      if (l.hasOwnProperty("sel") && l.sel === true) {
                          let e = {target:{value:l.itemid}};
                          this.cltMarker(e)
                      }
                  }
                },
                cltMarker(e){ //an emiter only; currently duplicated between NavMain.. and PhotoGal.. to facilitate redoing
                  let idx = e.target.value;
                  if (document.getElementById("btnaddmark_"+idx)) {
                      if (document.getElementById("btnaddmark_"+idx).classList.contains("btn-outline-info")) {
                          this.locations[idx].sel = true;
                         
                      }else if(document.getElementById("btnaddmark_"+idx).classList.contains("btn-outline-secondary")) {
                          this.locations[idx].sel = false;
                          
                      }
          
                      window.EventBus.$emit('clt-marker', this.locations[idx]);
            
                  }
          
          
                },
                trackingAllowed(){
                  if (this.tracking==false) {
                      this.tracking = true
                  }else{
                      this.tracking = false
                  }
                  window.EventBus.$emit('tracking',{tr:this.tracking})
                },
              
            openModal(loc){
                  let modal = document.getElementById('myModal');
                  let img = document.getElementById(this.idConcat(loc.itemid+'_img'));
                  let captionText = document.getElementById("modal-title");
                  let modalImg = document.getElementById("img01");
                  modal.style.display = "block";
                  modalImg.src = img.src;
                  captionText.innerHTML = loc.street+", "+loc.year;
                  modal.classList.add('show');
            },
            

            closeModal(){
              let modal = document.getElementById('myModal');
              modal.classList.remove('show');
              modal.style.display = "none";
            }            

        }
    }
</script>