<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="am-panel am-panel-default">
    <div class="am-panel-hd">
      <h3 class="am-panel-title">
        站点信息
      </h3>
    </div>
    <div class="am-panel-bd">
      <form class="am-form am-form-horizontal"
            v-on:submit.prevent="submitForm"
            v-on:reset.prevent="reset">
        <fieldset>
          <legend>站点信息</legend>
          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">站点名称</label>
            <div class="am-u-sm-9 am-u-end ">
              <input type="text" v-model="app.siteName" required="required" placeholder="">
            </div>
          </div>
          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">站点地址</label>
            <div class="am-u-sm-9 am-u-end ">
              <input type="text" v-model="app.siteUrl" required="required" placeholder="">
            </div>
          </div>
          <div class="am-form-group">
            <div class="am-u-sm-10 am-u-sm-offset-2">
              <button type="submit" class="am-btn am-btn-default">提交</button>
              <button type="reset" class="am-btn am-btn-default">取消&返回</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>
<script>
  module.exports = {
    route: {
      canReuse: false
    },
    ready: function () {
      var $this = this;
      var $route = $this.$route;
      if ($route.name == 'analysis_info') {

      }
    },
    data: function () {
      return {
        app: {}
      }
    },
    methods: {
      reset: function () {
        var $this = this;
        $this.$dispatch('link', "analysis_info")
      },
      submitForm: function () {
        var $this = this;
        var app = $this.app;
        $this.$http.post($this.$tools.resolveUrl("/Apps/info"), app, function (data, status, request) {
          $this.$dispatch('link', "analysis");
        });
        return false;
      }
    },
    created: function () {

    }
  };
</script>
