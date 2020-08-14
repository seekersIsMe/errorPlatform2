<template>
  <div>
      这是注册页面
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                 <el-form-item label="注册邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input v-model="form.psw" show-password></el-input>
                </el-form-item>
                 <el-form-item label="重新输入密码">
                    <el-input v-model="form.psw" show-password></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                    <el-input v-model="form.code"></el-input>
                    <img :src="imgcodeSrc" @click="changCode" alt="">
                </el-form-item>
            </el-form>
        </el-col>
      </el-row>
  <el-button @click="register">注册</el-button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: 'zhanhui',
                psw: '123456',
                code: '123456',
                email: '1213344190@qq.com'
            },
            imgcodeSrc: '/api/user/getcode'
        }
    },
    created() {
    },
    methods: {
        async register () {
            let that = this
            let data = await this.axios.post('/register', {...this.form,psw: that.md5(this.form.psw)})
            if(data.code === 0){
                this.$router.push({
                    path: '/login'
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