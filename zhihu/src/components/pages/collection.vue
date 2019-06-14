<template>
  <div class="wrapper">
      <div class="mask" v-if="isShow" @touchstart.self="isShow=false">
      <div class="con">
        <div class="top">
          <div class="pic">
            <img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560224227553&di=0f563f5b52c90a621f62330712661fc5&imgtype=0&src=http%3A%2F%2Fpic8.nipic.com%2F20100713%2F1954049_091647155567_2.jpg' alt>
          </div>
          <p class="log">请登陆</p>
          <div class="load">
            <i class="fa fa-star"></i>
            <span @touchstart='tocollection()'>我的收藏</span>
            <i class="fa fa-download"></i>
            <span>离线下载</span>
          </div>
        </div>
        <div class="First">
          <i class="fa fa-home"></i>
          <i class="sy" @touchstart='toindex()'>首页</i>
        </div>
      </div>
    </div>
    <header>
      <i class="fa fa-bars" @touchstart="isShow=true"></i>
      <div class="num">
        <span>{{length}}</span>条收藏
      </div>
    </header>
    <div class="collection" v-for="(item) in Arr" :key="item.id" @touchstart='todetail(item.id)'>
      <div class="title">{{item.title}}</div>
      <img :src="item.images" alt>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],
  data() {
    return {
      isShow: false,
      Arr: [],
      length:'0',
      title: "",
      id: "",
      img: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
      todetail(id){
          this.$router.push('/detail/'+id)
      },
      toindex(){
          this.$router.go(-1)
      }
  },
  mounted() {
    this.Arr = JSON.parse(localStorage.getItem("arr"));
    this.length=this.Arr.length;
    // console.log(this.Arr);
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.wrapper {
  width: 100vw;
  height: 100%;
  background-color: silver;
   .mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    .con {
      width: 80%;
      height: 100%;
      background-color: $fff;
      color: $fff;

      .top {
        background-color: $headercolor;
        width: 100%;
        height: 2rem;
        padding-top: 0.2rem;
        overflow: hidden;

        .log {
          margin-top: 0.4rem;
          font-size: 0.4rem;
        }

        .pic {
          height: 1rem;
          width: 1rem;
          border-radius: 50%;
          margin-left: 0.2rem;
          margin-right: 0.3rem;
          overflow hidden
          float: left;
          img{
            width 100%
            height 100%
          } 
            
        }

        .load {
          margin-top: 0.7rem;
          margin-left: 0.4rem;
          font-size: 0.3rem;
          padding-bottom: 0.3rem;

          .star {
            padding-right: 0.3rem;
            display: inline-block;
          }

          i {
            margin-right: 0.5rem;
          }

          span {
            display: inline-block;
            margin-right: 0.3rem;
          }
        }
      }

      .First {
        background-color: #EBEBEB;
        height: 0.3rem;
        font-size: 0.4rem;
        color: $headercolor;
        padding: 0.3rem;

        .sy {
          display: inline-block;
          padiing-left: 0.5rem;
        }
      }
    }
  }

  header {
    height: 1rem;
    width: 100%;
    background-color: $headercolor;
    overflow: hidden;

    i {
      float: left;
      font-size: 0.7rem;
      padding-top: 0.2rem;
      padding-left: 0.2rem;
      color: #fff;
    }

    .num {
      font-size: 0.4rem;
      float: left;
      margin-left: 0.5rem;
      margin-top: 0.3rem;
      color: #fff;
    }
  }

  .collection {
    height: 1.5rem;
    background-color: red;
    margin-top: 0.1rem;
    margin-left: 0.1rem;
    margin-right: 0.6rem;
    margin-bottom: 0.1rem;
    border-radius: 0.1rem;
    background-color: $fff;
    overflow: hidden;

    .title {
      float: left;
      width 5rem
      font-size .3rem
      padding-top: 0.3rem;
      margin-left .2rem
    }

    img {
      float: right;
      width: 1rem;
      height: 1rem;
      margin-right .2rem
      margin-top .3rem
    }
  }
}
</style>

