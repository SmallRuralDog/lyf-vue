<template>
    <mt-popup
        v-model="popupVisible"
        position="bottom"
        style="width:100%"
    >
        <div class="hm-sheet-close" @click="quit">X</div>
        ccccc<br>ccccc<br>ccccc<br>ccccc<br>cccccccccc<br>ccccc<br>ccccc<br>ccccc


    <div class="lyf-action-sheet hm-core-fixed">


        <div class="hm-sheet-close" @click="quit">X</div>
        <div class="lyf-sheet hm-flex-vertical">
        	<!--商品标题-->
			<div class="lyf-sheet-head">
				<div class="hm-list">
					<div class="hm-list-panel ">
	                    <div class="hm-list-item hm-margin-b">
	                        <div class="hm-list-media">
	                            <!--<img :src="data.spec_image[]">-->
	                        </div>
	                        <div class="hm-list-inner">
								<div class="hm-list-row">
	                                <div class="hm-list-price">
	                                    <span>
                                            <template v-if="pick.price">
                                                ￥<big style="font-size:1.62em;">{{pick.price|price_yuan}}</big>.{{pick.price|price_fen}}
                                            </template>
                                            <template v-else>
                                                ￥<big style="font-size:1.62em;">-</big>
                                            </template>
                                        </span>
	                                    <!-- <del>235.5</del> -->
	                                </div>
	                                <div class="hm-list-right">
	                                    <a @click="quit"><i class="hm-icon-close"></i></a>
	                                </div>
	                            </div>
                                {{pick.none}}
	                            <div v-if="pick.warehouse > 0" class="hm-list-text-1">库存：{{pick.warehouse}}</div>
                                <template v-else>
                                    <div v-if="pick.warehouse!=null" class="hm-list-text-1">没有库存了</div>
                                    <div v-else class="hm-list-text-1">请先选择规格属性</div>
                                </template>
	                        </div>
	                    </div>
	                </div>
				</div>
			</div>

	        <div class="lyf-sheet-body">


				<div class="hm-center">
					<ul class="num hm-border-tb">
						<h5>购买数量</h5>
	                    <hm-button size="s" @click="add">
                            <i class="hm-icon-add"></i>
                        </hm-button>
	                    <a class="total">{{pick.quantity}}</a>
	                    <hm-button size="s" @click="move">
                            <i class="hm-icon-move"></i>
                        </hm-button>
					</ul>
				</div>
         	</div>

	        <div class="lyf-sheet-foot">
                <div class="hm-list" v-show="pick.operation==0">
                    <div class="hm-list-panel">
                    <div class="hm-list-row">
                        <div style="padding-right:5px;">
                            <hm-button theme="theme" :disabled="pick.warehouse!==null&&pick.warehouse<pick.quantity"
                                @click="submit('add')"
                                line full
                            >加入购物车</hm-button>
                        </div>
                        <div style="padding-left:5px;">
                            <hm-button theme="theme" :disabled="pick.warehouse!==null&&pick.warehouse<pick.quantity"
                                @click="submit('buy')"
                                full
                            >立即购买</hm-button>
                        </div>
                    </div>
                    </div>
                </div>

	        	<hm-button theme="theme" v-show="pick.operation==1" :disabled="pick.warehouse!==null&&pick.warehouse<pick.quantity"
                    @click="submit('add')"
                    full
                >加入购物车</hm-button>
	        	<hm-button theme="theme" v-show="pick.operation==2" :disabled="pick.warehouse!==null&&pick.warehouse<pick.quantity"
                    @click="submit('buy')"
                    full
                >立即购买</hm-button>
	        </div>
        </div>
    </div>
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
        init_specid(){
//            return this.data.

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
    ///*@import "../../style/config.scss";*/
    $color-theme: #e02e24;
    .lyf-action-sheet {
        background-color:rgba(0,0,0,.7); text-align:left; height:100%;
        .lyf-sheet,.hm-sheet-close {
            position:absolute; left:0; right:0;
        }
        .lyf-sheet {
            bottom:0; background-color:#fff; height:80%;
        }
        .hm-sheet-close {
            height:20%; top:0;
        }
        .lyf-sheet-body {
            overflow-y:auto;
        ul {padding:.6rem 0; overflow:hidden;}
        li {float:left; padding:.3rem .3rem; background-color:#f9f9f9; color:#051b28; border-radius:5px; margin-right:.4rem; margin-top:.4rem;font-size: 0.65rem;}
        /*background-color:#f2f2f2; color:$color-gray-dark;*/
        li.active {background-color:$color-theme; color:#fff;}
        h5 {margin-bottom:.2rem;}
        i{margin:0;}
        }
        .lyf-sheet-head {height:4.6rem;}
        .lyf-sheet-body {flex:1;}
        .hm-btn {padding:12px 0;}
        .lyf-sheet-foot {height:38px; padding:4px .6rem 12px .6rem;}
        .hm-list .hm-list-panel .hm-list-media {
            width:5rem; padding:0; position:relative; top:-1.5rem; left:-.2rem; margin-right:.3rem;
            background-color:#fff; border:1px solid #ddd; border-radius:10px; overflow:hidden;
        img {display:block;}
        }

        .hm-list .hm-list-panel .hm-list-price {margin-top:.6rem; margin-bottom:.4rem; font-size:.8rem; flex:3;}
        .hm-list .hm-list-panel .hm-list-price big {font-size:1.2em;}
        .num {
            line-height:1.8rem;
        h5 {float:left;}
        .hm-btn-s {width:1.8rem; height:1.8rem; text-align:center; line-height:1.8rem; padding:0; float:right;}
        .total {padding:0 1rem; font-size:.9rem; float:right;}
        }
    }

</style>