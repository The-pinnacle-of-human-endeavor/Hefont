<template>
<div v-show="isShowCover" style = "position:fixed;background:transparent;background:rgba(0,0,0,0.5);margin:auto;top:0;bottom:0;left:0;right:0">
          <img src="../../pic/rotatePic.png" style="width:200px;height:200px;margin:auto;top:0;bottom:0;left:0;right:0">
   <el-col :span="1">   
    <el-menu
      :default-active="this.$route.path" 
      router mode="horizontal"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        <template slot="title">
          <i class="el-icon-s-platform"></i>
          <span> {{ item.navItem }}</span>
        </template>
      </el-menu-item>  
    </el-menu>
  </el-col>
  
  <router-view     class="menu-right"/>

  </div>
</template>
<script>
  export default {
  	data() { 
  		return { 
  			navList:[ 
  			{name:'/components/Video',navItem:'视频资源管理中心'}, 
        {name:'/components/Document',navItem:'文件资源管理中心'},
        {name:'/components/Document1',navItem:'留言拍卖综合系统'},
        {name:'/components/Document2',navItem:'匿名评议综合系统'},
        {name:'/components/Document3',navItem:'尚未完成等待施工'},
        {name:'/components/Document4',navItem:'尚未完成等待施工'},
        {name:'/components/Document5',navItem:'尚未完成等待施工'},
        {name:'/components/Document6',navItem:'尚未完成等待施工'},
        {name:'/components/Document7',navItem:'尚未完成等待施工'},
        {name:'/components/Document8',navItem:'尚未完成等待施工'},
        {name:'/components/Document9',navItem:'尚未完成等待施工'}
  			] } 
    },
     mounted() {
    let self = this; // 这里
    window.addEventListener(
      "onorientationchange" in window ? "orientationchange" : "resize",
      function() {
        if (window.orientation === 90 || window.orientation === -90) {
            //想把下面的alert换成能够控制v-show的代码
            
          alert(
            self.$options.methods.showCover() +
              "横屏可能导致页面异常，建议竖屏操作！"
          ); // 这里用 this 作用域就不对了.
          //alert("123");仅alert纯文本可以正常运行
        }
        //window.location.reload();
      },
      false
      );
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
</style>
