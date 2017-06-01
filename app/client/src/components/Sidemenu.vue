<template lang="pug">
#sidemenu
  ul.menu
    li(v-for="service in services")
      router-link(:to="service.id")
        |{{ service.name }}
</template>

<script>
  import Axios from 'axios'

  export default {
    name: 'sidemenu',
    data () {
      return {
        services: []
      }
    },
    mounted () {
      Axios.get('/services')
        .then((res) => {
          this.services = res.data
        }).catch((err) => {
          console.log(err)
        })
    },
    methods: {
      change_console(service_id) {
        history.pushState({state: 'change_console'}, null, '/?service=' + service_id)
      }
    }
  }
</script>

<style lang="scss">
  #sidemenu {
    background-color: #cccccc;
    .menu {
      a {
        cursor: pointer;
        color: #0066ff;
        text-decoration: underline;
        &:hover {
          text-decoration: none;
        }
      }
    }
  }
</style>
