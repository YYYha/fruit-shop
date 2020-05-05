<template>
  <div>
      <span>name: </span><input type="text" v-model="user.email">
      <span>password: </span><input type="password" v-model="user.password">
    <input @click="login" type="button" value="提交" />

  </div>
</template>
<script>
import Qs from 'qs'
export default {
  data() {
    return {
      data: '',
      user: {email: '', password: ''}
    };
  },
  created() {
   this.submit()
  },
   methods: {
    async submit() {
      let result = await this.$http.get("/");
      console.log(result.data[0])
      this.data = result.data[0];
    },
    async login(){
        let result = await this.$http.post('getCode', Qs.stringify(this.user))
        console.log(result.data)
    }
  }
};
</script>
<style scoped>
</style>