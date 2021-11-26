<template>
  <div class="container">
    <div class="btn-group mb-5" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-primary">All Types</button>
      <button type="button" class="btn btn-secondary">Middle</button>
      <button type="button" class="btn btn-secondary">Right</button>
    </div>

    <div class="row">
      <div class="col-4" v-for="(d, i) in listPokemon" :key="i">
        tot
      </div>
    </div>

    <div id="loadMore" ref="scrollLoadMoreRef" @click="infinityLoop">
      Load More..
    </div>
    <PokemonCard/>
  </div>
</template>

<script>
import PokemonCard from './../components/PokemonCard'
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'

export default {
  name: 'Home',
  components: {
    PokemonCard
  },
  setup () {
    const scrollLoadMoreRef = ref(null)
    const store = useStore()
    let currentUrl = `https://pokeapi.co/api/v2/pokemon/`
    let nextUrl = null
    let listPokemon = ref([])

    const getPokemon = async () => {
      await store.commit('pokemon/setNextApiUrl', currentUrl)
      await store.dispatch('pokemon/getAllPokemon', {}).then((response) => {
        nextUrl = response.next

        response.results.forEach(pokemon => {
          pokemon.id = pokemon.url.split('/').filter((part) => { return !!part }).pop()
          listPokemon.value.push(pokemon)
        });
      }).catch(() => {
        alert('data not found')
      })
    }

    const infinityLoop = async () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(async entry => {
          if(entry.intersectionRatio > 0 && nextUrl) {
            currentUrl = nextUrl
            await getPokemon()
          }
        })
      })

      observer.observe(scrollLoadMoreRef.value)
    }

    onMounted(() => {
      getPokemon()
      infinityLoop()
    })

    return {
      infinityLoop,
      listPokemon,
      scrollLoadMoreRef
    }
  }
}
</script>

<style>

</style>
