<template>
  <Header class="mb-4"/>
  <router-view></router-view>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang="scss">
body {
  font-family: 'Montserrat', sans-serif;
}

.btn {
  border-radius: 18px;
}

.hidden-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.hidden-scrollbar::-webkit-scrollbar {
  display: none;
}
.page-title {
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 21px;
  color: #646464;
}
</style>
