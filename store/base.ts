import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class Base extends VuexModule {
  showLoadingPage: boolean = false
  showChart: boolean = false
  @Mutation
  SET_SHOW_LOADING_PAGE (isShow: boolean) {
    this.showLoadingPage = isShow
  }

  @Mutation
  SET_SHOW_CHART (isShow: boolean) {
    this.showChart = isShow
  }
}
