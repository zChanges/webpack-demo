<template>
    <div>
      {{name}}
      <router-view/>
    </div>
</template>
<script>
export default {
  data() {
    return {
      name: "vue-webpack-demo"
    };
  }
};
</script>
