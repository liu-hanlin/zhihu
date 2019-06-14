<template>
<div>
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
          <i class="sy">首页</i>
        </div>
      </div>
    </div>
  <div class="wrapper" ref="first">
    
    <div class="header clearfix">
      <i class="fa fa-bars" id="meau" @touchstart="isShow=true" aria-hidden="true"></i>
      <span class="first">{{name}}</span>
      <i class="fa fa-ellipsis-v" id="more" aria-hidden="true"></i>
      <i class="fa fa-bell" id="bell"></i>
    </div>
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      @someSwiperEvent="callback"
      v-if="top_stories.length"
    >
      <!-- slides -->
      <swiper-slide v-for="item in top_stories" :key="item.id">
        <img :src="item.image" @touchstart="toDetail(item.id)">
        <p>{{item.title}}</p>
      </swiper-slide>
      <div class="swiper-pagination"></div>
    </swiper>
    <!-- 列表 -->
    <div class="news" v-for="(item,index) in news" :key="index">
      <p class="title">{{item.title}}</p>
      <ul class="ul">
        <li
          v-for="(it) in item.data"
          :key="it.id"
          class="box"
          :id="it.id"
          @touchstart="toDetail(it.id)"
        >
          <p>{{it.title}}</p>
          <div class="pic">
            <img :src="it.images" alt>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
  
</template>

<script type="text/ecmascript-6">
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import API from "../../common/js/API.js";

Date.prototype.getWeek = function() {
  var arr = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  var day = this.getDay();
  return arr[day];
};
var num = 0;
function getDate(num) {
  var date = new Date().getTime();
  //1 params=20190610 title=06月09日 星期日
  var newDate = new Date(date - (num - 1) * 24 * 60 * 60 * 1000);

  var year1 = newDate.getFullYear();
  var month1 =
    newDate.getMonth() + 1 < 10
      ? "0" + (newDate.getMonth() + 1)
      : newDate.getMonth() + 1;
  var day1 =
    newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
  var params = year1 + "" + month1 + "" + day1;
  // title
  var newDate2 = new Date(date - num * 24 * 60 * 60 * 1000);
  var month2 =
    newDate2.getMonth() + 1 < 10
      ? "0" + (newDate2.getMonth() + 1)
      : newDate2.getMonth() + 1;
  var day2 =
    newDate2.getDate() < 10 ? "0" + newDate2.getDate() : newDate2.getDate();
  var week = newDate2.getWeek();
  var title = month2 + "月" + day2 + "日" + " " + week;
  return {
    params: params,
    title: title
  };
}
export default {
  components: {
    swiper,
    swiperSlide
  },
  props: [],
  data() {
    return {
      name: "首页",
      isload: true,
      isShow: false,
      news: [],
      top_stories: [],
      title: "首页",
      swiperOption: {
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  watch: {},
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    callback() {},
    tocollection(){
    // if(){
      this.$router.push('/collection');
    // }
    },
    toDetail(id) {
      this.$router.push("/detail/" + id);
    },
    getNewDate() {
      if (this.isload) {
        this.isload = false;
        num++;
        this.$http({
          url: API.before + "/" + getDate(num).params
        }).then(d => {
          this.isload=true;
          this.news.push({
            title: getDate(num).title,
            data: d.data.stories
          });
          // console.log(d);
        });
      }
    }
  },
  mounted() {
    var that = this;
    this.$http({
      url: API.Ndatas,
      method: "get"
    })
      .then(d => {
        this.news.push({
          title: "今日新闻",
          data: d.data.stories
        });
        this.top_stories = d.data.top_stories;
        this.getNewDate();
      })
      .catch(err => {
        console.log(err);
      });

    window.onscroll = function() {
      var wh =
        document.documentElement.clientHeight || document.body.clientHeight;
      var st = document.documentElement.scrollTop || document.body.scrollTop;
      var dh =
        document.documentElement.offsetHeight || document.body.offsetHeight;
      if (wh + st + 30 >= dh) {
        that.getNewDate();
      }

      // 
      if (st < 220) {
        that.name = "首页";
      } else {
        var times = document.querySelectorAll(".title");
        for (var i = 0; i < times.length; i++) {
          if (times[i].getBoundingClientRect().top + st < st + wh) {
            // console.log(times[i].getBoundingClientRect().top + st);
            // console.log(times[i].innerHTML)
            that.name = times[i].innerHTML;
          }
        }
      }
    };
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.wrapper {
  width: 100vw;
  height: 100%;
  overflow: hidden;
  background-color: #f3f3f3;
  padding-top: 1rem;

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

  .header {
    z-index: 2;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    height: 1rem;
    background-color: #00a2ed;
    width: 100%;
    overflow: hidden;
    padding-right .2rem

    #meau {
      font-size: 0.5rem;
      color: $fff;
      margin-left: 0.3rem;
      margin-top: 0.3rem;
    }

    .first {
      margin-left: 0.7rem;
      font-size: 0.4rem;
      color: $fff;
    }

    #bell {
      float: right;
      font-size: 0.4rem;
      color: $fff;
      margin-right: 0.7rem;
      margin-top: 0.3rem;
    }

    #more {
      float: right;
      color: $fff;
      margin-right: 0.3rem;
      margin-top: 0.3rem;
      font-size: 0.4rem;
    }
  }

  .swiper-container img {
    width: 100%;
    height: 4rem;
  }

  .swiper-container p {
    position: absolute;
    width: 7rem;
    text-align: center;
    top: 2.8rem;
    color: #fff;
    font-size: 0.4rem;
  }

  .title {
    padding-top: 0.3rem;
    padding-left: 0.2rem;
    padding-bottom: 0.2rem;
    color: $primary;
  }

  // .ul {
  //   margin: 0.2rem;
  // }

  .box {
    background-color: $fff;
    margin-right .4rem
    margin-bottom: 0.1rem;
    border-radius: 0.1rem;
    overflow: hidden;
  }

  .box p {
    flex: 1;
    float: left;
    width: 5rem;
    line-height: 0.3rem;
    height: 0.3rem;
    padding-top: 0.1rem;
    font-size: 0.3rem;
    margin-top: 0.3rem;
    padding-left: 0.1rem;
  }

  .box img {
    float: right;
    width: 1rem;
    height: 1rem;
    margin: 0.2rem 0.2rem 0.2rem 0;
  }
}
</style>

