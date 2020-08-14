<template>
  <div>
      列表
  </div>
</template>

<script>
export default {
created() {
    this.getList()
},
methods:{
    async getList() {
        let data = await this.axios.get('/getList')
    }
}
}
</script>

<style>

</style>