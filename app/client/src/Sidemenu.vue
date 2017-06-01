<template lang="pug">
#sidemenu
    |{{ msg }}
</template>

<script>
  export default {
    name: 'sidemenu',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style lang="scss">
    #sidemenu {
        background-color: #cccccc;
    }
</style>
