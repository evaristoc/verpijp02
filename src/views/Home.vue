<template>

      <div id="appcontent">    
            
                  <ec-main-sidebar></ec-main-sidebar>
                  <div>
                       <ec-map-component></ec-map-component>
                  </div>                  
            
            
    </div>
    
  </div>

</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}

</script>

<style>
  /*colors (0to255 -> adobe):
   * background: #BFACAC
   * base: #727272
   * closeto: #7F7F73
   * darker effects: #393D3F
   * mild effects: #ACB8BF
   *
   */
  
      #appcontent {
      /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
      font-family: "Lato", sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      /*text-align: center;*/
      /*color: #2c3e50;
      color: #8b9299;*/
      color: #393D3F;
      padding-top: 20px;
      background-color: #BFACAC;
      height: 100%;
    }
    #menu-open{
      padding-left: 20px;
    }
    
h1, h2 {
  font-weight: normal;
}
</style>

