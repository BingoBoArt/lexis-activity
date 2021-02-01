<template>
    <div class="no-data-wrapper">
      <p v-if="text" class="text">{{text}}</p>
      <slot></slot>
    </div>
</template>/slot>
<script>
export default {
  name: "no-data",
  components: {},
  data: () => {
    return {
    };
  },
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  computed: {
  },
  methods: {
  },
  created: function() {},
  mounted: function() {
  }
};
</script>
<style scoped>
.no-data-wrapper {
  width: 100%;
  height: 100px;
  text-align: center;
  overflow: hidden;
  padding-top: 100px;
  .text{
    color: #186288;
    font-size: 40px;
    line-height: 100px;
  }
}
</style>

