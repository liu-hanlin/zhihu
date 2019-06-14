<template>
  <div class="wrapper">
    <header>
      <i class="fa fa-mail-reply return" @touchstart="$router.go(-1)"></i>
      <div class="T_no">
        <i class="fa fa-thumbs-up no"></i>
        <span class="t_no">{{T_popularity}}</span>
      </div>
      <div class="T_comment">
        <i class="fa fa-comments comment" @touchstart="tomorecomment(id)"></i>
        <span class="t_comment">{{T_comment}}</span>
      </div>
      <i class="fa fa-star star" @touchstart="collect()"></i>
      <i class="fa fa-share-alt share"></i>
    </header>
    <div class="Img">
      <img :src="data.image" alt>
    </div>
    <div v-html="data.body" class="Body"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API.js";
export default {
  components: {},
  props: [],
  data() {
    return {
      data: "",
      img: "",
      title: "",
      id: "",
      T_comment: "",
      T_popularity: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    collect() {
      var arr = localStorage.getItem("arr")
        ? JSON.parse(localStorage.getItem("arr"))
        : [];

      if (arr.some(item => item.id == this.$route.params.id)) {
        //有当前id的这条信息，删除
        this.$(".star").css("color", "#fff");
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].id == this.$route.params.id) {
            arr.splice(i, 1);
            break;
          }
        }
      } else {
        // push
        this.$(".star").css("color", "orange");
        arr.push({
          title: this.title,
          images: this.img,
          id: this.$route.params.id
        });
      }

      localStorage.setItem("arr", JSON.stringify(arr));
    },
    tomorecomment(id) {
      this.$router.push("/morecomment/" + id);
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.$http({
      url: API.Detail + "/" + this.id,
      method: "get"
    })
      .then(d => {
        console.log(d);
        this.img = d.data.images;
        this.title = d.data.title;
        this.data = d.data;
      })
      .catch(err => {
        console.log(err);
      });
    this.$http({
      url: API.comment + "/" + this.id,
      method: "get"
    })
      .then(d => {
        this.T_comment = d.data.comments;
        this.T_popularity = d.data.popularity;
      })
      .catch(err => {
        console.log(err);
      });
    var arr = localStorage.getItem("arr")
      ? JSON.parse(localStorage.getItem("arr"))
      : [];
    if (arr.some(item => item.id == this.$route.params.id)) {
      this.$(".star").css("color", "orange");
    } else {
      this.$(".star").css("color", "#fff");
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.wrapper {
  width: 100vw;

  header {
    position fixed
    top 0
    left 0
    width: 100%;
    height: 1rem;
    background-color: $headercolor;
    color: $fff;
    overflow: hidden;

    .return {
      float: left;
      padding-top: 0.4rem;
      margin-left: 0.2rem;
      font-size: 0.3rem;
    }

    .share {
      float: right;
      padding-top: 0.4rem;
      margin-right: 0.3rem;
      font-size: 0.3rem;
    }

    .star {
      float: right;
      padding-top: 0.4rem;
      margin-right: 0.5rem;
      font-size: 0.3rem;
      color: #fff;
      background-color: $headercolor;
    }

    .T_comment {
      float: right;
      padding-top: 0.4rem;
      padding-right: 0.2rem;
      font-size: 0.3rem;
    }

    .T_no {
      float: right;
      padding-right: 0.6rem;
      margin-top: 0.4rem;
      font-size: 0.3rem;
    }
  }

  .Img {
    // padding-top 1rem
    width: 100%;
    // overflow: hidden;

    img {
      width: 100%;
      height: 5rem;
    }
  }

  .Body {
    >>>.img-place-holder, .headline {
      height: 0;
    }
  }

  .Body {
    margin-right: 0.5rem !important;
  }
}
</style>

