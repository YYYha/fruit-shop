<template>
    <div class="mui-content">
        <div class="search-box">
            <input type="text" placeholder="请输入要搜索的商品" v-model="inputSearch">
            <div class="fa fa-search" @click="search"></div>
        </div>
        <div class="search-history">
            <div class="search-history-text">
                <span>历史搜索</span>
                <span class="fa fa-trash-o" @click="del"></span>
            </div>
            <div class="search-list" >
                <span
                 v-for="(item, index) in history" :key="index"
                >{{item}}</span>
               
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            inputSearch: '',
            history: []
        }
    },
    created(){
        this.$store.commit('modifyTitle', '搜索中心')
        this.history = JSON.parse(localStorage.getItem('history'))
    },
    methods: {
        async search(){
            console.log(this.inputSearch)
            if(this.inputSearch.length === 0) return
            let result = await this.$http.get(`search?content=${this.inputSearch}`)
            if(result.status !== 200){
                this.mui.toast('网络请求失败')
                return
            }
            if(result.data.length === 0){
                this.mui.toast('暂无查询结果')
                return
            }
            this.$store.commit('modifySearchList', result.data)
            this.$router.push('/search-result')


            let historyArr = JSON.parse(localStorage.getItem('history')) || []
            historyArr.push(this.inputSearch)
            localStorage.setItem('history', JSON.stringify(historyArr))
        },
        del(){
            localStorage.removeItem('history')
            this.history = JSON.parse(localStorage.getItem('history'))
        }
    }
}
</script>
<style scoped>
    .mui-content{
        padding: 50px 10px 55px 10px;
        font-family: "微软雅黑";
    }
    .search-box{
        align-items: center;
        border: 1px solid #9a51ff;
        height: 43px;
        border-radius: 5px;
        overflow: hidden;
    }
    .search-box input{
        display: inline-block;
        width: 80%;
        border: none;
        color: rgb(255, 72, 145);
        font-size: 15px;
    }
    .search-box input::placeholder{
        color: rgb(255, 72, 145);
    }
    .search-box div{
        width: 20%;
        display: inline-block;
        border-left: 1px solid #9a51ff;
        height: 43px;
        background: white;
        line-height: 43px;
        text-align: center;
        color: rgb(255, 72, 145);
    }
    .search-history-text{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        margin-top: 15px;
        height: 30px;
        border-bottom: 1px solid #ccc;
    }
    .search-history-text span:first-child{
        font-size: 16px;
        font-weight: 600;
    }
    .search-history ul li{
        list-style: none;
        padding-inline-start: 10px;
    }
    .search-list{
        padding: 10px;
    }
    .search-list span{
        display: inline-block;
        margin: 3px 3px;
        font-size: 14px;
        background: rgb(255, 72, 145);
        border-radius: 5px;
        padding: 5px 8px;
        color: white;
    }
</style>