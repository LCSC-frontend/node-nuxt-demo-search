<template>
<section>
    <header>
        <input type="text" v-model="keyWord" placeholder="请输入供应商商品编号">
        <input @click="search" class="btn" type="button" value="搜 索">
    </header>

    <section>
        <ul v-if="arrayList.length">
            <li v-for="(item,index) in arrayList" :key="index" style="margin-top: 20px;">
                <h4>{{item.productCodeProvider}}</h4>
                <div class="mt10">
                    <span class="span1">品牌: {{item.productGradePlateName}}</span>
                    <span>封装规格: {{item.encapsulationModel}}</span>
                </div>
                <div class="mt10">
                    <span class="span1">最小起订量: {{item.minBuyNumber}}</span>
                    <span>交期: {{item.deliveryTimeWayDays}}</span>
                </div>
                <div class="mt10">库存: {{item.stockNumber}}</div>
            </li>
        </ul>
        <div style="text-align: center" v-else>没有搜索结果...</div>
    </section>
</section>
</template>

<script>
import axios from 'axios';
import api from "~/config/api.config";

export default {
    asyncData(req) {
        if(req.query.productCodeProvider){
            return axios.get(api.search, {
                params: {productCodeProvider: req.query.productCodeProvider}
            })
            .then((res) => {
                return {
                    arrayList: res.data,
                    keyWord: req.query.productCodeProvider
                }
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            return {
                arrayList: [],
                keyWord: ''
            }
        }
    },
    data() {
        return {
            keyWord: ''
        }
    },
    methods: {
        search() {
            if(!this.keyWord){
                alert('请先输入搜索词！');
                return;
            }
            this.$router.push(`?productCodeProvider=${this.keyWord}`);
            axios.get(api.search, {
                params: {productCodeProvider: this.keyWord}
            })
            .then((res) => {
                this.arrayList = res.data;
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }
};
</script>

<style>
    .mt10{
        margin-top: 10px;
    }
    .span1{
        display: inline-block;
        width: 400px;
    }
    header{
        width: 100%;
        margin: 50px auto;
        text-align: center;
    }
    input{
        padding: 0 5px;
        border: 1px solid #dedede;
        background: #fff;
        height: 36px;
        line-height: 36px;
        width: 400px;
    }
    .btn{
        margin-left: 10px;  
        width: 80px;
        vertical-align: middle;
        background: #ff7800;
        border: 1px solid #ff7800;
        color: #fff;
        line-height: 34px;
        cursor: pointer;
    }
</style>

