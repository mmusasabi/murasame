<template lang="pug">
#console
  sidemenu
  #main-console
    ul.logs
      li(v-for="log in logs")
        span.timestamp {{ log.timestamp }}
        span.host(@click="filter_host(log.host)") {{ log.host }}
        span.message {{ log.message }}

    #bottom-dummy
      |&nbsp;

    .console-panel

      .filtered-panel
        .filtered-box.filtered-hostname(v-if="hostname")
          span.value Host: {{ hostname }}
          span.cancel(@click="filter_host_cancel")
            icon(name="close")

        input.filtered-box(type="text" autofocus="autofocus")
</template>

<script>
  import Sidemenu from "./Sidemenu.vue"
  import Axios from 'axios'

  export default {
    name: 'console',
    data () {
      return {
        service_id: "",
        hostname: "",
        logs: []
      }
    },
    beforeMount () {
      this.service_id = this.$route.params.service_id
    },
    mounted () {
      this.load_logs()
    },
    updated () {
//      $('#main-console').scrollTop($("#bottom-dummy").offset().top)
      $('#main-console').scrollTop($('.logs').height())
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
        this.$socket.emit('disconnect')
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
      },
      filter_host(hostname) {
        this.logs = []
        this.hostname = hostname
        this.$socket.emit("filter_host", {
          service_id: this.service_id,
          hostname: hostname
        })
      },
      filter_host_cancel() {
        this.hostname = ""
        this.$socket.emit("switch_service", {
          service_id: this.service_id
        })
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
    height: 100%;
    overflow: auto;
  }
  .logs {
    font-family: Monaco,'Lucida Console',Courier,monospace;
    font-size: 10px;
    -webkit-font-smoothing: none;
    line-height: 1.5;
    li {
      background-color: #333333;
      padding: 3px 5px;
      white-space: pre;
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
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    .message {
      color: #eeeeee;
    }
  }
  #bottom-dummy {
    height: 40px;
  }
  .console-panel {
    background-color: #333333;
    position: fixed;
    left: 201px;
    bottom: 0;
    right: 0;
    height: 40px;
    border-top: 1px solid #666666;
    .filtered-panel {
      padding: 0 0 0 10px;
      .filtered-box {
        display: inline-block;
      }
      .filtered-hostname {
        background-color: #8ee478;
        padding: 3px 5px;
        border-radius: 3px;
        color: #333333;
        .value {
          vertical-align: middle;
        }
        svg {
          vertical-align: middle;
          margin: 0 0 0 5px;
          cursor: pointer;
        }
      }
    }
    input {
      display: inline-block;
      color: #ffffff;
      margin: 5px;
      padding: 5px;
      border: none;
      background-color: #555555;
      border-radius: 5px;
      &:focus {
        outline: none;
      }
    }
  }
</style>
