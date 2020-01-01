<template>
    <div id="search">
        <h1>我是搜索结构</h1>
        <h1>我是搜索结构</h1><h1>我是搜索结构</h1><h1>我是搜索结构</h1><h1>我是搜索结构</h1><h1>我是搜索结构</h1><h1>我是搜索结构</h1><h1>我是搜索结构</h1><h1>我是搜索结构</h1>
    </div>
</template>

<script>
  export default {
    name: "Search",
    created() {
      this.search()
    },
    methods:{
      search(){
        console.log('卧槽');
        // 加载防止闪烁
        this.$emit('func', '我好了')
      }
    }
  }
</script>

<style scoped>
    #search{
        width: 100%;
        height: 100%;
    }

</style>