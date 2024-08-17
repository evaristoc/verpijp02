<!-- COMPONE template START -->
<template>
    
    <!-- COMPONENT sidebar START -->
    <div class="sidenav">

    
      <!-- COMPONENT mySidebar START -->
      <div class="childsidenav" id="mySidenav">
        
        <ec-nav-main-sidebar></ec-nav-main-sidebar> <!-- this component managed data; now centralized in corresponding component -->
        
        <router-view></router-view><!-- to GALLERY, ABOUT -->

    </div> <!-- COMPONENT mySidebar END -->
    
    <span class="childsidenav" id="menu-open-test" v-on:click="openNav()" style="display:inline-block; font-size:30px;cursor:pointer;">&#9776<span style="color:#BFACAC;">_</span>VerPijp</span>
  
  </div> <!-- COMPONENT sidebar END -->

</template> <!-- COMPONENT template END -->
<script>
  import Vue from 'vue';
  

  
   
  export default {
   
  
    methods: {

      openNav(){
            document.getElementById("mySidenav").style.width = "100%";
            //document.getElementById("mySidenav").style.display = "block";
            document.getElementById("menu-open-test").style.marginLeft = "100%";
            document.getElementById("menu-open-test").style.visibility = "hidden";
            this.$router.push({path:'/gallery'});
      },
    }
  }


    //REFERENCES:
    //-- MY SITE: https://verpijp.firebaseapp.com/
    //-- https://www.w3schools.com/howto/howto_js_sidenav.asp
    //-- https://blog.jscrambler.com/communicating-between-vue-2-components-and-google-maps/
    // map styling:
    //---- current:
    //------ https://snazzymaps.com/style/252512/grayscale-labeled

</script>
<style>
    .item-title{
        text-transform:capitalize;
    }
    
/*==========================
 *
 *General sidenav (sliding to the sides and styling)
 *
 *==========================*/
.sidenav {
  width: 0px;
  font-family: "Lato";
}

#mySidenav {
    /*display:none;*/
}

.sidenav > #mySidenav {
  height: 100%;
  width: 0px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color:rgba(57,24,25,0.8); /*era 57,51,53 pero este rojo esta cool...*/
  overflow: hidden;
  padding-top: 60px;
  color: #b8bdbf;
  transition: 0.5s;  
}


/*==========================
 *
 *Upper menu additional styling (also bootstrap)
 *
 *==========================*/


#wrap-data-area {
  display: flex;
  flex-direction: column;
  flex-wrap:no-wrap;
  /*min-height:100vh;*/
  height: 100%;
  min-height: 0%;
}

#navbar-area{
  flex: 0 1 0;
  margin-bottom: 10px;
}

#mySidenav #header-brand {
    position: absolute; /*respect to WINDOW!*/
    top: 40px;
    left: 25px; 
}

#nav-ctrls{
    margin-top:30px;
}

#nav-ctrls .btn, #nav-ctrls input{
    margin-left:3px;
}

#nav-ctrls .btn{
    margin-top:3px;
}
/*==========================
 *
 *Gallery
 *
 *==========================*/

#sel-gallery{
    flex: 1 1 0;
    overflow-y:scroll;
    padding-top: 20px;
    padding-bottom: 120px;
}



/*==========================
 *
 *Images
 *
 *==========================*/

 .responsive-image{
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
 }
 
 .responsive-image:hover {opacity: 0.7;}

/*==========================
 *
 *Closing X-icon
 *
 *==========================*/

 
#mySidenav a {
  text-decoration: none;
  font-size: 25px;
  color: #afafaf;
  transition: 0.3s;
}

#mySidenav a:hover {
  color: #f1f1f1;
}
 
#mySidenav #closebtn {
  padding: 8px 8px 8px 32px;
  position: absolute;
  display: block;
  top: 0px;
  right: 15px;
  font-size: 15px;
  margin-left: 50px;
}

/*==========================
 *
 *Table of streets additional styling (also bootstrap)
 *
 *==========================*/

#mySidenav td {
 white-space:nowrap;
 padding: 0 20px;
}

.btn-street{
    padding: 3px;
    margin-left: 5px;
}

/*==========================
 *
 *About section
 *
 *==========================*/

  #about{
   overflow-y:scroll;
      height:80vh;
  }
 
  #myphoto{
    width:150px;
    height:200px;
    float: right;
  }


/*==========================
 *
 *Media styling
 *
 *==========================*/
/*https://www.taniarascia.com/how-to-build-a-responsive-image-gallery-with-flexbox/?utm_source=designernews*/
@media screen and (min-width: 600px) {
  .grid {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
  .cell {
    width: calc(100% / 3);
  }
}

@media screen and (min-width: 1000px) {
  .cell {
    width: calc(100% / 4);
  }
}

@media screen and (max-height: 800px) {

}

@media screen and (max-width: 450px) {
  
  #myphoto{
    width:90px;
    height:120px;
  }
  
  #mySidenav {
    font-size: 20px;
  }

  .btn {
    font-size:20px;
  }
}

</style>