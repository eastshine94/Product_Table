<template>
  <select :value="selected.value" @input="selected = $event.target.value" @change="onChangeOption">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { OptionDto } from '@/types'

@Component
export default class SelectList extends Vue {
  @Prop({ type: Array, required: true }) options!:Array<OptionDto>
  selected: OptionDto = this.options.find(option => option.selected) || this.options[0]

  onChangeOption (event:Event) {
    const element = event.target as HTMLSelectElement
    const value = element.value
    const selectedOption = this.options.find(option => option.value === value)
    // 부모 컴포넌트로 선택된 option을 emit한다.
    this.$emit('selectedOption', selectedOption)
    this.selected = selectedOption as OptionDto
  }
}
</script>
