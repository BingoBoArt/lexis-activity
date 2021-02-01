<template>
  <div id="app">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件，比如 Home！ -->
        </router-view>
      </keep-alive>
      <transition name="slide-fade" mode="out-in" appear>
          <router-view v-if="!$route.meta.keepAlive">
              <!-- 这里是会被缓存的视图组件，比如 Home！ -->
          </router-view>
      </transition>
  </div>
</template>
<script>
export default {
  name: 'App',
  components: {
  },
  created: function () {
  },
  mounted: function () {
  }
}
</script>
