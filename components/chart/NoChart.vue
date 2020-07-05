<template>
  <div class="noChartWrapper">
    <p>
      해당 조건의 그래프를 그릴 수 없습니다.<br>
      조건을 변경하여 다시 시도해보세요.
    </p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
})
</script>
<style lang="scss" scoped>
.noChartWrapper {
    width: 80%;
    margin: 15vh auto;
    padding-left: 30px;
    border: 2px solid rgb(197, 15, 15);
    border-radius: 20px;
    text-align: center;
    padding: 40px 20px;
    font-size: 20px;
    font-weight:  bold;
}
</style>
