<template>
    <div class="page">
        <div class="page-content">
            <!-- 页面内容 -->
            <div v-bind:style="{height: swipe_height+'px'}">
                <swipe :auto="4000" >
                    <template v-for="item in data.goods_image">
                        <swipe-item>
                            <img :src="item" alt="" style="background-color:#ffffff; width:100%; height:100%;">
                        </swipe-item>
                    </template>

                </swipe>
            </div>







        </div>
    </div>
</template>
<script>


export default{
    data(){
        return{
            init:false,
            goods_id:0,
            data:{
                goods_image:[]
            },
            swipe_height:100,
        }

    },

    created(){

        let id=this.$route.params.id;
        this.goods_id=id;
        this.getData(id);
        this.swipe_height=screen.width;
    },
    methods:{
        getData(){

           this.$api.userGet('goods_info?goods_id='+this.goods_id,res=>{
//                console.log(JSON.stringify(res.data));
                this.data=res.data.data;

           },err=>{
                $toast(err)
            })
        }
    }
}
</script>
<style>

</style>