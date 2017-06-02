<template lang="pug">
#sidemenu
  ul.menu
    li(v-for="service in services")
      router-link(:to="'/services/'+service.id")
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
      Axios.get('/api/services')
        .then((res) => {
          this.services = res.data
        }).catch((err) => {
          console.log(err)
        })
    },
    methods: {
    }
  }
</script>

<style lang="scss">
  #sidemenu {
    background-color: #171214;
    border-right: 1px solid #666666;
    .menu {
      padding: 10px;
      li {
        padding: 5px 0;
      }
      a {
        cursor: pointer;
        color: #ff3399;
        text-decoration: underline;
        &:hover {
          text-decoration: none;
        }
      }
    }
  }
</style>
