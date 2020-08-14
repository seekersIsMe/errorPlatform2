<template>
  <div>
      这是登陆页面
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
            <el-form ref="form" :model="form" label-width="80px">
                 <el-form-item label="登陆名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.psw" show-password></el-input>
                </el-form-item>
                 <el-form-item label="验证码">
                    <el-input v-model="form.code"></el-input>
                    <img :src="imgcodeSrc" @click="changCode" alt="">
                </el-form-item>
            </el-form>
        </el-col>
      </el-row>
  <el-button @click="login">登陆</el-button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: 'zhanhui',
                psw: '123456',
                code: ''
            },
            imgcodeSrc: '/api/user/getcode'
        }
    },
    created() {
    },
    methods: {
        async login() {
           let data = await this.axios.post('/login',{
               ...this.form, psw: this.md5(this.form.psw)
           })
           if(data.code === 0) {
               this.$message('登陆成功')
               this.$router.push({
                   path: '/list'
               })
           }
        },
        changCode() {
                this.imgcodeSrc = '/api/user/getcode?' + 't=' + new Date().getTime()
            }
    }
}
</script>

<style>

</style>