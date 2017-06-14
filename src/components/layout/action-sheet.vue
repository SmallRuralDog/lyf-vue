<template>
    <mt-popup
        v-model="popupVisible"
        position="bottom"
        style="width:100%;min-height:8rem"
    >

      <div class="hm-flex">
          <div></div>
      </div>
      <img :src="data.spec_image[init_color_id]">



    </mt-popup>
</template>




<script>
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return{
            popupVisible:false
        }
    },
    props : {
        show : {
            type: Boolean,
            default: false,
        },
        base : {
            type: Object,
            default: null,
        },
        data : {
            type: Object,
            default: null,
        },
        pick : {
            type: Object,
            default: null,
        },
        goodsid : {
            type: String,
            default: null,
        },
        buytype : {
            type: String,
            default: null,
        }
    },
    computed:{
        ...mapState({
            showpicksheet:state=>state.actionsheet.showpicksheet,
        }),
        init_color_id(){
            return this.data.goods_info.color_id
        }
    },
    watch:{
        //同步showpicksheet=popupVisible
        showpicksheet(val,oldVal){
            this.popupVisible=val
        },
        popupVisible(val,oldVal){
            this.$store.commit('ACTIONSHEET_UPDATE',{key:'showpicksheet',value:val})
        }
    },
    methods : {
    	pickattr (key,val){
    		this.$set('pick.value['+key+'].index',val);
            this.$set('pick.value['+key+'].active',this.pick.value[key].tag[this.pick.value[key].index]);
            this.$set('pick.value['+key+'].attr',this.pick.value[key].pack[this.pick.value[key].index]);
         // 判断是否选择完成
            var complete = true;
            var arr = [];
            for(var i=0;i<this.pick.value.length;i++){
                if(this.pick.value[i].index===null) complete = false;
                arr.push(this.pick.value[i].attr);
            }
            this.$set('pick.complete',complete);
            this.$set('pick.post',this.pick.complete ? JSON.stringify(arr) : "");
            if(complete) this.query();
    	},
    	add (){
    		if(this.pick.quantity < 999)
    			this.$set('pick.quantity',this.pick.quantity+1);
    	},
    	move (){
    		if(this.pick.quantity > 1)
    			this.$set('pick.quantity',this.pick.quantity-1);
    	},
        query (){
            this.$root.ajax({
                url     : '/home/goods/getByAttr',
                loading : 3,
                params  : {
                    goods_id : this.goodsid,
                    spec     : this.pick.post,
                },
            },(ret,err)=>{
                if(ret){
                    this.$set('pick.price',ret.result.price);
                    this.$set('pick.warehouse',ret.result.product_number);
                }else{
                    this.$set('pick.complete',false);
                    this.$set('show',false);
                    this.$root.toast(err.msg);
                }
            });
        },
    	submit (control){
            console.log('control=',control);
    		if(this.pick.complete){
    			if(control){
                    if(this.pick.warehouse !== null && this.pick.warehouse < this.pick.quantity){
                        this.$root.toast('商品库存不足');
                    }else{
        				this.$dispatch('goodsControl',control);
                    }
    			}else{
    				this.quit();
    			}
    		}else{
    			this.$root.toast('请选择商品属性');
    		}
    	},

    	quit(){
            this.popupVisible=false
    	}
    }
}
</script>
<style lang="scss">

    $color-theme: #e02e24;




</style>
