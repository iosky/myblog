<template>
  <div class="search-box">
    <a-icon type="search"></a-icon>
    <a-select
      :showArrow="false"
      placeholder="搜索文章..."
      showSearch
      style="width: 200px"
    ></a-select>
  </div>
</template>

<style lang="less" >
.search-box {
  .anticon {
    color: #ced4d9;
  }
  .ant-select-selection {
    border: none;
    box-shadow: none;
  }
}
</style>