<template>
  <div class="rightOptionWrapper">
    <form>
      <label class="perPageOptionsTitle">상품 수 : </label>
      <SelectList :options="perPageOptions" @selectedOption="onChangePerPageOption" />
      <input
        v-if="showInput"
        :value="initInput"
        type="text"
        maxlength="4"
        @input="onlyNumber"
        @keydown.enter.prevent="onSubmitInput"
      >
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { SelectList } from '@/components/shared'
import { OptionDto, ProductUrlQueryDto } from '@/types'
@Component({
  components: {
    SelectList
  }
})
export default class RightOption extends Vue {
    perPageOptions:Array<OptionDto> = [
      { name: '20개', value: '20', selected: false },
      { name: '50개', value: '50', selected: false },
      { name: '100개', value: '100', selected: false },
      { name: '직접 입력', value: 'direct', selected: false }
    ]

    // 초기값이 20, 50, 100 중 하나면 그것이 selected되고 아니면 직접 입력이 선택됨.
    created () {
      const query = this.$route.query as ProductUrlQueryDto
      const perPage: string|undefined = query.perPage
      if (perPage) {
        const selectedPerPageOptionsIndex = this.perPageOptions.findIndex(val => val.value === perPage)
        if (selectedPerPageOptionsIndex < 0) {
          this.perPageOptions[this.perPageOptions.length - 1].selected = true
          this.initInput = perPage
          this.showInput = true
        } else {
          this.perPageOptions[selectedPerPageOptionsIndex].selected = true
        }
      }
    }

    initInput: string = ''
    showInput: boolean = false

    // input 값은 숫자만 입력 가능하고, 1000을 넘길 수 없다.
    onlyNumber (e: Event) {
      const element: HTMLInputElement = e.target as HTMLInputElement
      const value: string = element.value.replace(/[^0-9]/g, '')
      element.value = value ? (parseInt(value) > 1000 ? '1000' : parseInt(value).toString()) : ''
    }

    onChangePerPageOption (selectedOption: OptionDto) {
      const selectedValue = selectedOption.value
      this.initInput = ''
      this.showInput = selectedValue === 'direct'
      if (!this.showInput) {
        this.changeQuery(selectedValue)
      }
    }

    onSubmitInput (e: Event) {
      const element: HTMLInputElement = e.target as HTMLInputElement
      const value: string = element.value
      if (parseInt(value) > 0) {
        this.changeQuery(value)
      }
    }

    changeQuery (value: string) {
      this.$store.commit('pagination/SET_CURRENT_PAGE', 1)
      const router = this.$router
      const query = this.$route.query
      this.$store.commit('product/SET_PER_PAGE', parseInt(value))
      router.replace({ query: { ...query, perPage: value, page: '1' } })
    }
}
</script>

<style lang="scss" scoped>
.rightOptionWrapper{
  margin: 20px 0 10px 0;
  & select {
      padding: 3px;
      border-radius: 3px;
  }
  & input {
      width: 50px;
      border: 1px solid #7e0404;
      border-radius: 3px;
      padding: 3px;
  }
}

.perPageOptionsTitle {

  font-weight: bold;
  font-size: 13px;
}
</style>
