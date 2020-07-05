<template>
  <div class="loadingWrapper">
    <span class="material-icons loadingIcon">
      data_usage
    </span>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
})
</script>
<style lang="scss" scoped>
@keyframes iconLotate {
  0% { transform: rotate(0deg) }
  50% { transform: rotate(180deg) }
  100% { transform: rotate(360deg) }
}
.loadingWrapper {
  width: 100%;
  text-align: center;
  margin: 20px 0;
}
.loadingIcon {
  font-size: 150px;
  color: #271f70;
  animation: iconLotate 1.5s linear infinite;
}

</style>
