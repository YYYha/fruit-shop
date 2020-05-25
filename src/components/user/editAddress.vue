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
            <input type="text" readonly ref="provinceRef" placeholder="请选择省市区" @click="selectCity" v-model="address.province">
        </div>
        <div>
            <span>详细地址</span>
            <input type="text" placeholder="请输入详细地址" v-model="address.detail">
        </div>
        <div class="btn" @click="keepAddress">
            保存收货信息
        </div>
    </div>
</template>
<script>
import {cityData} from '../../assets/js/city'
import '../../assets/mui/css/mui.picker.css'
import '../../assets/mui/css/mui.poppicker.css'
import '../../assets/mui/js/mui.picker.js'
import '../../assets/mui/js/mui.poppicker'

export default {
    data(){
        return{
            address: {
                phone: null,
                province: 'sf'
            }
        }
    },
    created(){
        this.address = this.$route.params.item || {}
        let mui = this.mui
        console.log(this.address)
    },
    methods: {
        async keepAddress(){
            let Rex = /^1[3456789]\d{9}$/
            if(!Rex.test(this.address.phone)){
                this.mui.alert('请输入正确的电话号码')
                return
            }
            console.log(this.address)
            let result = await this.$http.post('modifyAddress', 
                {address: this.address}
            )
            if(result.status !== 200) return
            this.mui.toast(result.data.msg)
            if(result.data.code === 1) return
            setTimeout(()=>{
                this.$router.go(-1)
            }, 1000)
        },
        selectCity(){
            let picker = new this.mui.PopPicker({
                layer: 3
            })
            picker.setData(cityData)
            picker.show((selectItems)=>{
                
                if(selectItems[0].text === selectItems[1].text && selectItems[2].text){
                    this.address.province = selectItems[0].text + selectItems[2].text
                }else if(!selectItems[2].text){
                    this.address.province = selectItems[0].text + selectItems[1].text 
                }else{
                    this.address.province = selectItems[0].text + selectItems[1].text + selectItems[2].text                    
                }

                this.$nextTick(()=>{
                    this.$refs.provinceRef.value = this.address.province
                })
            })
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
