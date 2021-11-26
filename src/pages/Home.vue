<template>
  <div class="container">
    <div class="page-title mb-4">
      List Pokemon
    </div>
    <div class="btn-group btn-types mb-5 hidden-scrollbar" role="group" aria-label="Basic example">
      <button type="button" class="btn" @click="filterByType('')" :class="{'btn-primary' : selectedType === '', 'btn-outline-secondary' : selectedType !== ''}">All</button>
      <button type="button" v-for="(d, i) in listTypes" :key="i" @click="filterByType(d.id)"
              :class="{'btn-primary' : selectedType === d.id, 'btn-outline-secondary' : selectedType !== d.id}"
              class="btn">{{ d.name }}</button>
    </div>

    <div class="row">
      <div class="col-md-3 mb-5" v-for="(d, i) in listPokemon" :key="i">
        <pokemon-card :data="d"/>
      </div>
    </div>

    <div id="loadMore" ref="scrollLoadMoreRef" v-if="selectedType === ''" @click="infinityLoop">
      Load More..
    </div>
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
    let listTypes = ref([])
    let selectedType = ref('')

    const getPokemon = async (params = {}) => {
      await store.commit('pokemon/setNextApiUrl', currentUrl)
      await store.dispatch('pokemon/getAllPokemon', {
        params
      }).then((response) => {
        nextUrl = response.next

        response.results.forEach(pokemon => {
          pokemon.id = pokemon.url.split('/').filter((part) => { return !!part }).pop()
          listPokemon.value.push(pokemon)
        });
      }).catch(() => {
      })
    }

    const getPokemonTypes = async () => {
      await store.dispatch('pokemon/getAllTypes', {}).then((response) => {
        response.results.forEach(type => {
          type.id = type.url.split('/').filter((part) => { return !!part }).pop()
          listTypes.value.push(type)
        });
      }).catch(() => {
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

    const filterByType = async (type) => {
      selectedType.value = type
      listPokemon.value = []

      if(selectedType.value) {
        await store.dispatch('pokemon/getDetailType', selectedType.value).then((response) => {
          response.pokemon.forEach(pokemon => {
            pokemon.pokemon.id = pokemon.pokemon.url.split('/').filter((part) => { return !!part }).pop()
            listPokemon.value.push(pokemon.pokemon)
          });
        }).catch((error) => {
          console.log('error', error)
        })
      } else {
        await store.commit('pokemon/setNextApiUrl', `https://pokeapi.co/api/v2/pokemon/`)
        await getPokemon()
      }
    }

    onMounted(() => {
      getPokemon()
      getPokemonTypes()
      infinityLoop()
    })

    return {
      infinityLoop,
      listPokemon,
      scrollLoadMoreRef,
      listTypes,
      selectedType,
      filterByType
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
