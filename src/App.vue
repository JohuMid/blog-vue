<template>
    <div id="app">
        <div id="container">
            <div id="output"></div>
        </div>
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>

  import $ from 'jquery'
  import {Victor} from './plugins/background/vector'

  export default {
    provide() {
      return {
        reload: this.reload
      }
    },
    created() {
      this.initBg()
    },
    data() {
      return {
        style: '',
        isRouterAlive: true
      }
    },
    methods: {
      initBg() {
        $(function () {
          // 初始化 传入dom id
          var victor = new Victor("container", "output");
        });
      },
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(() => (this.isRouterAlive = true))
      }
    },

  }
</script>

<style>

    #app {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }

    * {
        margin: 0;
        padding: 0;
    }

    #container {
        height: 100%;
        width: 100%;
        position: fixed;
    }

    #output {
        width: 100%;
        height: 100%;
    }
</style>
