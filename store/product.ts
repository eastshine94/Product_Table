import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import axios from 'axios'
import { ProductDto, ProductOptionDto, FilterDto, ApiResponse, OrderCol, OrderDirection } from '@/types'

@Module({ namespaced: true })
export default class Product extends VuexModule {
    // 상품 리스트
    products: Array<ProductDto> = [];
    // 차트를 그리기 위해 모든 상품을 불러온다.
    allProducts: Array<ProductDto> = [];
    // 현재 선택된 필터 옵션
    filterOption: ProductOptionDto|null = null;
    // 현재 입력된 필터의 최소 범위
    filterRangeMin: string = '';
    // 현재 입력된 필터의 최대 범위
    filterRangeMax: string = '';
    // 현재 적용된 필터 리스트
    appliedFilters: Array<FilterDto> = [];
    // 한 페이지에 몇개의 상품을 보여줄지
    perPage: number = 20;
    // 상품을 정렬할 때 기준
    orderCol: OrderCol = 'sale_price'
    // 오름차순 or 내림차순
    orderDirection: OrderDirection = 'desc'

    @Mutation
    SET_PRODUCTS (products: Array<ProductDto>) {
      this.products = products
    }

    @Mutation
    RESET_ALL_PRODUCTS () {
      this.allProducts = []
    }

    @Mutation
    ADD_ALL_PRODUCTS (products: Array<ProductDto>) {
      this.allProducts = this.allProducts.concat(products)
    }

    // 필터 옵션을 설정해준다.
    @Mutation
    SET_FILTER_OPTION (option: ProductOptionDto) {
      this.filterOption = option
      this.filterRangeMin = ''
      this.filterRangeMax = ''
    }

    @Mutation
    SET_FILTER_RANGE_MIN (value: string) {
      this.filterRangeMin = value
    }

    @Mutation
    SET_FILTER_RANGE_MAX (value: string) {
      this.filterRangeMax = value
    }

    @Mutation
    SET_PER_PAGE (perPage: number) {
      this.perPage = perPage
    }

    @Mutation
    SET_ORDER_COL (col: OrderCol) {
      this.orderCol = col
    }

    @Mutation
    SET_ORDER_DIRECTION (direction: OrderDirection) {
      this.orderDirection = direction
    }

    /*
      필터 적용 시 최소값과 최대값을 비교하여 최소, 최대값을 설정
      기존에 적용된 필터가 있으면 값을 변경
    */
    @Mutation
    APPLY_FILTER () {
      const option:ProductOptionDto = this.filterOption as ProductOptionDto
      const minValueToNumber = parseInt(this.filterRangeMin.replace(/[^0-9]/g, '')) || 0
      const maxValueToNumber = parseInt(this.filterRangeMax.replace(/[^0-9]/g, '')) || 0
      const minValue:string = minValueToNumber > maxValueToNumber ? this.filterRangeMax : this.filterRangeMin
      const maxValue:string = minValueToNumber > maxValueToNumber ? this.filterRangeMin : this.filterRangeMax

      const optionExist: number = this.appliedFilters.findIndex(filter => filter.option.value === option.value)
      if (optionExist < 0) {
        this.appliedFilters.push({
          option,
          minValue: minValue || '0',
          maxValue: maxValue || '0'
        })
      } else {
        this.appliedFilters[optionExist].minValue = minValue || '0'
        this.appliedFilters[optionExist].maxValue = maxValue || '0'
      }
      this.filterRangeMin = minValue
      this.filterRangeMax = maxValue
    }

    // 적용된 필터 초기화
    @Mutation
    INIT_APPLY_FILTER () {
      this.filterRangeMin = ''
      this.filterRangeMax = ''
      this.appliedFilters = []
    }

    @Mutation
    ADD_FILTER (filter: FilterDto) {
      this.appliedFilters.push(filter)
    }

    @Mutation
    REMOVE_FILTER (target: string) {
      this.appliedFilters = this.appliedFilters.filter(filter => filter.option.value !== target)
    }

    /*
      로딩 중 상태로 만들고, api를 호출하여 해당 URI의 상품 데이터를 불러온다.
      상품 데이터를 products에 저장하고, 페이지네이션의 마지막 페이지를 변경한다.
      로딩 중 상태를 없애, 상품 테이블이 보이도록 한다.
    */
    @Action
    async getProducts () {
      await this.context.commit('base/SET_SHOW_LOADING_PAGE', true, { root: true })
      const url = this.getUrl
      const products: ApiResponse<Array<ProductDto>> = await axios.get(url)
      await this.context.commit('SET_PRODUCTS', products.data.data)
      await this.context.commit('pagination/SET_LAST_PAGE', products.data.last_page, { root: true })
      await this.context.commit('base/SET_SHOW_LOADING_PAGE', false, { root: true })
    }

    // 필터에 해당하는 모든 상품을 array에 저장
    @Action
    async getAllProducts () {
      await this.context.commit('base/SET_SHOW_LOADING_PAGE', true, { root: true })
      await this.context.commit('RESET_ALL_PRODUCTS')
      const query = `query=${this.getQuery}`
      let page = 1
      let lastPage = 2
      while (page <= lastPage) {
        const url = `http://products-interview.b4e2txqxtr.ap-northeast-2.elasticbeanstalk.com/api/products?page=${page}&per_page=1000&${query}`
        const products: ApiResponse<Array<ProductDto>> = await axios.get(url)
        await this.context.commit('ADD_ALL_PRODUCTS', products.data.data)
        lastPage = products.data.last_page
        page++
      }

      await this.context.commit('base/SET_SHOW_LOADING_PAGE', false, { root: true })
    }

    @Action
    onClickApplyFilterBtn () {
      this.context.commit('APPLY_FILTER')
    }

    @Action
    onClickRemoveFilterBtn (target: string) {
      this.context.commit('REMOVE_FILTER', target)
    }

    // 적용된 필터를 API 호출에 필요한 query로 변환
    get getQuery () {
      const result = this.appliedFilters.reduce((acc, filter, idx) => {
        const optionVal = filter.option.value
        const minValue = optionVal === 'created_at' ? `"${filter.minValue}"` : filter.minValue.replace(/[^0-9]/g, '')
        const maxValue = optionVal === 'created_at' ? `"${filter.maxValue}"` : filter.maxValue.replace(/[^0-9]/g, '')
        return `${acc} ${idx === 0 ? '' : 'and'} ${optionVal} gte ${minValue} and ${optionVal} lte ${maxValue}`
      }, '')

      return result
    }

    // store에 state를 활용하여 상품 API 호출에 필요한 URI를 얻는다.
    get getUrl () {
      const currentPage = `page=${this.context.rootState.pagination.currentPage}`
      const perPage = `per_page=${this.perPage}`
      const orderCol = `orders[0][column]=${this.orderCol}`
      const orderDirection = `orders[0][direction]=${this.orderDirection}`
      const query = `query=${this.getQuery}`
      const url = `http://products-interview.b4e2txqxtr.ap-northeast-2.elasticbeanstalk.com/api/products?${currentPage}&${perPage}&${orderCol}&${orderDirection}&${query}`
      return url
    }
}
