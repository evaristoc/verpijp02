<template>
    <div class="modal fade" id="myModal_map" style="background-color: rgba(0, 0, 0, 0.6);">
          <!-- REFERENCES -->
          <!--https://www.w3schools.com/bootstrap4/tryit.asp?filename=trybs_modal&stacked=h-->
          <!--https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal_img-->
        <div class="modal-dialog modal-dialog-centered modal-sm">
          <div class="modal-content mb-0 p-0" style="background-color: rgba(255, 255, 255, 0.6);">
            <!-- Modal body -->
            <div class="modal-body">
              <div class="container-fluid">
                <button type="button" class="btn btn-warning close-modal" @click="closeModal(ddd)">&times;</button>
                <!--OBS https://stackoverflow.com/questions/56083044/how-to-pass-image-url-as-props-vue :(
                {{picture}} {{dd}}
                -->
                <img class="img-fluid" id="img01_map" style="height:100%; width:100%;" :src= "picture">
                <ul v-for="park in parklist">
                    <li><a href="#" @click="sendData(park.coords)">{{park.name}}</a></li>
                </ul>
              </div>
            </div>
            <!-- Modal Footer -->
            <div class="modal-footer">
              <h5 id="modal-title_map" style="color:blue"></h5>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
    var parklistdata = [
     {id:1, name: "Sarphatipark", coords:{lat:52.354444,lng:4.896389, zoom:16}, info:""},
     {id:2, name: "Oosterpark", coords:{lat:52.360278,lng:4.919722, zoom:16}, info:""},
     {id:3, name: "Wertheimpark", coords:{lat:52.368056,lng:4.909167, zoom:17.5}, info:""},
     {id:4, name: "Erasmuspark", coords:{lat:52.374722,lng:4.851667, zoom:16}, info:""},
     {id:5, name: "Martin Luther Kingpark", coords:{lat:52.339444,lng:4.906667, zoom:17}, info:""},
     {id:6, name: "Beatrixpark", coords:{lat:52.342778,lng:4.881944, zoom:16}, info:""},
     {id:7, name: "Weesperzijde", coords:{lat:52.354739,lng:4.910053, zoom:16}, info:""},
     {id:8, name: "F. Hendrikplatsoen", coords:{lat:52.378833,lng:4.877028, zoom:17.5}, info:""},
     {id:9, name: "Frederiksplein", coords:{lat:52.359722,lng:4.898889, zoom:17.5}, info:""},
    ];
    
    import Vue from 'vue';
    export default {
        data(){
            return{
                //d: $el,
                parklist: parklistdata,
                dd:this.picture,
                ddd:"",
            };   
        },
        props:[
            "picture",
        ],
        created(){
            //console.log(this.$attrs);
            this.ddd = this.$attrs.id;
            //this.ddd = this.$data;
        },
        methods:{
            closeModal(elemid){
                      //let span = document.getElementsByClassName("close-modal")[0];
                      let modal = document.getElementById(elemid);
                      modal.classList.remove('show');
                      modal.style.display = "none";
                  },
            sendData(args){
                this.$emit('datafromModal', args)
            }
        }
    }
</script>