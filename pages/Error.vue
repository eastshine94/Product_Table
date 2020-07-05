<template>
  <main>
    <div class="container">
      <div class="warningIconWrapper">
        <span class="warningIcon">!</span>
      </div>
      <h2 class="errorMessage">
        페이지를 <em>찾을 수 없습니다.</em>
      </h2>
      <div class="errorDescription">
        <p>요청하신 주소의 페이지를 찾을 수 없습니다.</p>
        <p>입력하신 내용이나 주소가 잘못되었거나 일시적으로 처리가 불가능합니다.</p>
        <p>이전 페이지로 이동하여 다시 한 번 시도해보십시오.</p>
      </div>
      <div class="pageMoveBlock">
        <button @click.prevent="onClickPrevBtn">
          이전 페이지로
        </button>
        <button @click.prevent="onClickHomeBtn">
          초기 화면으로
        </button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import '@/styles/baseSetting.scss'
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class Error extends Vue {
  onClickPrevBtn () {
    this.$router.go(-1)
  }

  onClickHomeBtn () {
    this.$router.replace('/')
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 640px;
  margin: 20vh auto;
  text-align: center;
}
.warningIcon {
  font-size: 30px;
  font-weight: 900;
  color: #fff;
  background: #911717;
  border-radius: 4px;
  padding: 8px 20px;
}
.errorMessage{
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -1px;
  padding: 24px 0 22px 0;
  & em{
    color: #911717;
  }
}
.errorDescription {
  & p{
    font-size: 13px;
    padding-bottom: 10px;
  }
}
.pageMoveBlock{
  padding: 10px 0;
  & button {
    padding: 8px;
    font-size: 15px;
    font-weight: bold;
    border: 1px solid #444444;
    margin-right: 10px;
    cursor: pointer;
  }
}
@media only screen and (max-width: "640px"){
  .container {
    width: 98%;
  }
}
</style>
