<template>
  <div class="container">
    <div class="page-title mb-4">
      My Favorites ({{ $store.state.pokemon.favorites.length }})
    </div>
    <div v-if="listPokemon.length === 0" class="alert alert-warning">
      No Data
    </div>
    <div class="row">
      <div class="col-md-3 mb-5" v-for="(d, i) in listPokemon" :key="i">
        <pokemon-card :data="d"/>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonCard from './../components/PokemonCard'
import { useStore } from 'vuex'
import { onMounted, ref, watch } from 'vue'

export default {
  name: 'Favorite',
  components: {
    PokemonCard
  },
  setup () {
    const store = useStore()
    let listPokemon = ref([])

    const getFav = async () => {
      listPokemon.value = []
      store.state.pokemon.favorites.forEach(favorite => {
        listPokemon.value.push(favorite)
      })
    }

    watch(() => store.state.pokemon.favorites, () => {
      getFav()
    })

    onMounted(() => {
      getFav()
    })

    return {
      getFav,
      listPokemon,
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
