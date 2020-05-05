<template>
    <div class="address">
        <div>
            <span>收货人</span>
            <input type="text" placeholder="请输入收货人姓名" v-model="address.receiver">
        </div> 
        <div>
            <span>手机号</span>
            <input type="text" placeholder="请输入收货人电话" v-model="address.phone">
        </div>
        <div>
            <span>收货地址</span>
            <input type="text" placeholder="请填写详细收货地址" v-model="address.address">
        </div>
        <div class="btn" @click="keepAddress">
            保存收货信息
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            address: {}
        }
    },
    created(){
        this.address = this.$route.params.item || {}
        console.log(this.address)
    },
    methods: {
        async keepAddress(){
            let result = await this.$http.post('modifyAddress', 
                {address: this.address}
            )
            if(result.status !== 200) return
            this.mui.toast(result.data.msg)
            if(result.data.code === 1) return
            setTimeout(()=>{
                this.$router.go(-1)
            }, 1000)
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
