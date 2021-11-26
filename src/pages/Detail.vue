<template>
  <div class="container">
    <div class="page-title mb-4">
      Detail Pokemon
    </div>
    <pokemon-detail-card :data="data"/>
  </div>
</template>

<script>
import PokemonDetailCard from './../components/PokemonDetailCard'
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Detail',
  components: {
    PokemonDetailCard
  },
  setup () {
    const route = useRoute()
    const store = useStore()
    let currentUrl = `https://pokeapi.co/api/v2/pokemon/`
    let data = ref(null)

    const getDetailPokemon = async (id) => {
      await store.commit('pokemon/setNextApiUrl', `${currentUrl}${id}`)
      await store.dispatch('pokemon/getAllPokemon', {
        params: {}
      }).then((response) => {
        data.value = response
      }).catch(() => {
      })
    }

    onMounted(() => {
      if(route.params.id) {
        getDetailPokemon(route.params.id)
      }
    })

    return {
      data,
      getDetailPokemon
    }
  }
}
</script>

<style lang="scss">
.btn-types {
  width: 100%;
  overflow-x: scroll;
}
</style>
