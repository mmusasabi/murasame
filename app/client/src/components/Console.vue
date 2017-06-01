<template lang="pug">
#console
  sidemenu
  #main-console
    |{{ msg }}
</template>

<script>
  import Sidemenu from "./Sidemenu.vue"
  export default {
    name: 'console',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {
      Sidemenu
    }
  }
</script>

<style lang="scss">
  #main-console {
    background-color: #333333;
    color: #ffffff;
  }
</style>
