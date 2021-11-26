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
</style>
