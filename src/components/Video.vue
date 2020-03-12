<template>
  
  <div id="app">
    <!-- 双括号动态显示-->
    <button  @click="showVideo(true)" style="height:100px;width:100%;display:inline-block;background:green"><div style="color:orange;font-size:50px">点击进入下一个视频</div></button>
        <div class="video-box">
              <video-player  class="video-player vjs-custom-skin"
              ref="videoPlayer"
              :playsinline="true"
              :options="playerOptions"
              style="height:80%;width:100%"
              @click="isshow=!isshow"></video-player>
        </div>
  <!-- <div> -->
    <!--设置一个id，用以设置样式-->
    <!-- <input type="file" name="file" id="file-upload" style="height:100px;width:50%;display:inline-block;background:green;float:left"  @change="uploadUp($event)" enctype="multipart/form-data">
    <button style="height:100px;width:50%;display:inline-block;background:green" ><div style="color:orange;font-size:50px">点击这里进行上传</div></button>
  </div> -->
</div>
</template>

<script>
//引入请求
import Axios from 'axios';
export default {
  name: 'App',
  data () {
      return {
        navList:[ 
  			{name:'/components/ServiceHall',navItem:'服务大厅'}, 
  			{name:'/components/Management',navItem:'权限管理'},
  			{name:'/components/User',navItem:'用户管理'}, 
  			{name:'/components/Personnel',navItem:'人员数据'}, 
  			{name:'/components/Alarm',navItem:'报警中心'}, 
  			],
        count:0,
        size:1,
        videoName:"app220200104193055.mp4",
        playerOptions : {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        // sources: [{
        //             type: "video/mp4",
        //             src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        //         }],
        sources: [{
            type: "video/mp4",
            src: "../../static/video/app220200104193056.mp4"
        }],
        poster: "../../static/images/app.jpg", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: { 
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
    }
    }
  },
  methods: {
    uploadUp(event) {
       var files = event.target.files,file;
       let formData = new FormData();
       formData.append('file', files[0]);
       Axios({
          url:"http://49.235.187.75:8600/uploadVideo",
          data:formData,
          method:"post"
       }).then(resp=>{
         console.log(resp);
       })
    },
    showVideo (bol) {
            //查出总个数
              
            this.count++;
            
            let myPlayer = this.$refs.videoPlayer.player;
            
            Axios({
                url:"http://49.235.187.75:8600/querySize",
                method:"post"
            }).then(resp=>{
              //要在里面处理返回数据
              //在回调的时候才进行同步处理
              console.log(resp);
              this.size = resp.data
              if( bol ) {
              //调用的时候不用圆括号
              //本来就是作为计算属性使用
              let result = this.getSource
              console.log("result:"+result);
              //对应性 一致性
              myPlayer.src(result.videoSrc);
              myPlayer.poster(result.postSrc)
              return false
            };
            })

        }
  },
  computed: {
      getSource () {
          let me = this;
          console.log("me.count:"+me.count);

          let formData = new FormData();
          console.log("me.size:"+me.size);        
          //注意不要有冒号 
          formData.append('sortId',(me.count)%me.size+1);
          console.log("(me.count+1)%me.size+1:"+(me.count)%me.size+1);

         let source = {
            //名字要规范 仅支持英文开头 也不能有杠
              videoSrc:"../../static/video/app.mp4",
              postSrc:"../../static/images/app.jpg"
             }

         //注意取到值之后再执行
         //跨域与localhost
         Axios({
              url:"http://49.235.187.75:8600/queryVideo",
              data:formData,
              method:"post"
          }).then(resp=>{
            //要在里面处理返回数据
            //查到了才能实时返回
            console.log(resp);
            this.videoName = resp.data.videoName;
          }).then(
            source = {  
                //名字要规范 仅支持英文开头 也不能有杠
                  videoSrc:"../../static/video/"+this.videoName,
                  postSrc:"../../static/images/app.jpg"
             }
          )
          
          return source;
      }
  }
}
</script>

<!--border和padding与框架有关-->
<style>  
.menu-right{
		margin-left:200px;
	}
#file-upload{
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    overflow: hidden;
    color: #1E88C7;
    font-size:50px;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>

