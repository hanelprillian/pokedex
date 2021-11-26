<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link to="/"><a class="navbar-brand mr-4" href="#"><img src="../assets/logo.svg"></a></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="form-inline my-2 ml-4 my-lg-0 mr-auto">
          <div class="input-group form-search">
            <input type="text" v-model="keyword" class="form-control" placeholder="Search pokemon name or code" aria-label="Recipient's username" aria-describedby="button-addon2">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" @click="searchPokemon" type="button" id="button-addon2">Go</button>
            </div>
          </div>
        </form>
        <ul class="navbar-nav ">
          <li class="nav-item active">
            <router-link to="/favorite" class="nav-link my-favorite-btn font-weight-bold" href="#"><img src="../assets/fav-active-icon.svg" class="mr-2"> My Favorite (0)</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {ref} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'Header',
  props: {},

  setup () {
    const store = useStore()
    const router = useRouter()
    const keyword = ref('')

    const searchPokemon = async () => {
      await store.commit('pokemon/setNextApiUrl', `https://pokeapi.co/api/v2/pokemon/${keyword.value}`)
      await store.dispatch('pokemon/getAllPokemon', {}).then(() => {
        router.push(`/pokemon/${keyword.value}`)
      }).catch(() => {
        alert('data not found')
      })
    }

    return {
      keyword,
      searchPokemon
    }
  }
}
</script>

<style lang="scss">
.navbar {
  background: #FFF !important;
  padding: 25px 0;
  .navbar-brand {
    min-width: 200px;
    img {
      width: 150px;
    }
  }
  .form-search {
    min-width: 400px;
    max-width: 100%;
  }
  .my-favorite-btn {
    color:#646464;
  }
}
</style>
