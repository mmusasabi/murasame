<template lang="pug">
#console
  sidemenu
  #main-console
    ul.logs
      li(v-for="log in logs")
        span.timestamp {{ log.timestamp }}
        span.host {{ log.host }}
        span.message {{ log.message }}

</template>

<script>
  import Sidemenu from "./Sidemenu.vue"
  import Axios from 'axios'

  export default {
    name: 'console',
    data () {
      return {
        service_id: "",
        logs: []
      }
    },
    beforeMount () {
      this.service_id = this.$route.params.service_id
    },
    mounted () {
      this.load_logs()
    },
    beforeRouteUpdate (to, from, next) {
      this.service_id = to.params.service_id
      this.logs = []
      this.load_logs()

      next()
    },
    sockets: {
      connect() {
        console.log('io connect')
      },
      disconnect() {
        console.log('io disconnect')
      },
      log_tail(data) {
        this.logs.push(data.log)
      }
    },
    methods: {
      load_logs() {

        this.$socket.emit("switch_service", {
          service_id: this.service_id
        })

//        Axios.get('/api/logs/' + this.service_id)
//          .then((res) => {
//            this.logs = res.data
//          })
//          .catch((err) => {
//            console.log(err)
//          })
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
  .logs {
    font-family: Monaco,'Lucida Console',Courier,monospace;
    font-size: 10px;
    -webkit-font-smoothing: none;
    line-height: 1.5;
    li {
      background-color: #333333;
      padding: 3px 5px;
      &:nth-child(odd) {
        background-color: #555555;
      }
    }

    span {
      padding: 0 5px;
    }
    .timestamp {
      color: #b0d7ff;
    }
    .host {
      color: #8ee478;
    }
    .message {
      color: #eeeeee;
    }
  }
</style>
