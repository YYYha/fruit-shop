<template>
    <div class="address">
        <div>
            <span>原密码</span>
            <input type="password" placeholder="请输入原密码" v-model="password.oldPass">
        </div> 
        <div>
            <span>新密码</span>
            <input type="password" placeholder="请输入新密码" v-model="password.newPass">
        </div>
        <div>
            <span>确认密码</span>
            <input type="password" placeholder="请再次输入新密码" v-model="password.againPass">
        </div>
        <div class="btn" @click="submit">
            确认修改
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            password:{
                oldPass: '',
                newPass: '',
                againPass: ''
            }
        }
    },
    created(){
        this.$store.commit('modifyTitle', '修改密码')
    },
    methods: {
        async submit(){
            if(this.password.oldPass.length < 6 || this.password.newPass.length < 6){
                this.mui.toast('密码长度不能少于6位')
                return
            }else if(this.password.newPass !== this.password.againPass){
                this.mui.toast('两次输入密码不一致')
                return
            }
            console.log(this.password)
            let result = await this.$http.post('modifyPass', {password: this.password})
            if(result.status !== 200){
                this.mui.toast('网络请求失败')
                return
            }
            this.mui.toast(result.data.msg)
            
        }
    }
}
</script>
<style scoped>
    .address{
       padding: 10px 10px;
       background: #fff;
       height: 600px;
    }
    .address div{
        font-size: 14px;
        display: flex;
        
    }
    .address span{
        width: 80px;
        display: inline-block;
        line-height: 41px;
    }
    .address input{
        border: none;
        margin-left: 10px ;
    }
    .address input::placeholder{
        font-size: 14px;
        color: #ccc;

    }
    .btn{
        width: 100%;
        height: 45px;
        background: rgb(255, 72, 145);
        color: #fff;
        line-height: 45px;
        text-align: center;
        border-radius: 10px;
        margin-top: 5px;
        display: block !important;
        font-size: 16px !important;
    }
</style>
