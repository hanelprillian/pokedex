<template>
  <div class="pokemon-card" v-if="data">
    <div class="card">
      <img :src="`${imageUrl}${data.id}.png`" @click="openDetail(data.id)" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title" @click="openDetail(data.id)">{{data.name}}</h5>
      </div>
    </div>
    <div class="favorite" @click="toggleFav">
      <img v-if="isFav" src="../assets/fav-active-icon.svg" class="mr-2">
      <img v-else width="29" src="../assets/fav-inactive-icon.svg" class="mr-2">
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {computed} from 'vue'

export default {
  name: "PokemonCard",
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  setup (props) {
    const store = useStore()
    const router = useRouter()

    const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
    const openDetail = (id) => {
      router.push(`/pokemon/${id}`)
    }

    const isFav = computed(() => {
      return store.state.pokemon.favorites.filter(obj => obj.id === props.data.id).length > 0
    })

    const toggleFav = async () => {
      if(isFav.value) {
        store.commit('pokemon/removeFav', props.data.id)
      } else {
        store.commit('pokemon/addFav', props.data)
      }
    }

    return {
      imageUrl,
      openDetail,
      isFav,
      toggleFav
    }
  }
}
</script>

<style scoped lang="scss">
.pokemon-card {
  cursor: pointer;
  .card {
    background: #FFFFFF;
    box-shadow: 3px 0px 20px rgba(0, 0, 0, 0.16);
    border-radius: 20px;
    overflow: hidden;

    .card-img-top {
      object-fit: contain;
      height: 200px;
    }

    .card-title {
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 21px;
      color: #01549B;
    }
  }
  .favorite {
    cursor: pointer;
    position: absolute;
    top:15px;
    right:20px;
  }
}
</style>