<template>
  <div class="search-box">
    <a-icon type="search"></a-icon>
    <a-input-search
      @search="filterArticle"
      class="search-box"
      placeholder="搜索文章..."
      size="small"
    />
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { filterArticle } from '../services/articleServices'
export default {
  name: 'SearchBox',
  data() {
    this.filterArticle = debounce(this.filterArticle, 800)
    return {
      value: null
    }
  },
  methods: {
    filterArticle(value) {
      filterArticle(value).then(data => {
        this.$emit('filterArticle', data)
      })
    }
  }
}
</script>
<style lang="less" >
.search-box {
  color: #ced4d9;
  display: flex;
  height: 64px;
  align-items: center;
  .ant-input {
    border: none;
    box-shadow: none;
  }
  .ant-input-suffix {
    display: none;
  }
}
</style>