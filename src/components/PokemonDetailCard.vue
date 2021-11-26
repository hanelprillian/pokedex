<template>
  <div class="pokemon-detail-card" v-if="data">
    <div class="card">
      <div class="row">
        <div class="col-md-4">
          <div>
            <img :src="thumbnail" class="card-img-top">
          </div>
          <div class="list-thumbnails hidden-scrollbar">
            <img v-if="data.sprites.back_default" :src="data.sprites.back_default" @click="changeThumbnail(data.sprites.back_default)" class="mr-3 mb-3">
            <img v-if="data.sprites.back_female" :src="data.sprites.back_female" @click="changeThumbnail(data.sprites.back_female)" class="mr-3 mb-3">
            <img v-if="data.sprites.back_shiny" :src="data.sprites.back_shiny" @click="changeThumbnail(data.sprites.back_shiny)" class="mr-3 mb-3">
            <img v-if="data.sprites.back_shiny_female" :src="data.sprites.back_shiny_female" @click="changeThumbnail(data.sprites.back_shiny_female)" class="mr-3 mb-3">
            <img v-if="data.sprites.front_default" :src="data.sprites.front_default" @click="changeThumbnail(data.sprites.front_default)" class="mr-3 mb-3">
            <img v-if="data.sprites.front_female" :src="data.sprites.front_female" @click="changeThumbnail(data.sprites.front_female)" class="mr-3 mb-3">
            <img v-if="data.sprites.front_shiny" :src="data.sprites.front_shiny" @click="changeThumbnail(data.sprites.front_shiny)" class="mr-3 mb-3">
            <img v-if="data.sprites.front_shiny_female" :src="data.sprites.front_shiny_female" @click="changeThumbnail(data.sprites.front_shiny_female)" class="mr-3 mb-3">
          </div>
        </div>
        <div class="col-md-8">
          <div class="card-body p-3 p-md-5">
            <h5 class="card-title mb-4">{{data.name}}</h5>
            <div class="badges my-3 mt-5">
              <div class="font-weight-bold">Types</div>
              <span v-for="(d, i) in data.types" :key="i" class="badge badge-pill text-capitalize badge-primary py-1 mr-2">{{ d.type.name }}</span>
            </div>
            <div class="abilities my-4">
              <div class="font-weight-bold">Abilities</div>
              <span v-for="(d, i) in data.abilities" :key="i" class="badge badge-pill text-capitalize badge-success py-1 mr-2">{{ d.ability.name }}</span>
            </div>
            <div class="others my-4">
              <div class="row">
                <div class="col-md-7">
                  <div class="row">
                    <div class="col-4">
                      <div class="font-weight-bold">Height</div>
                      <p>{{data.height}}’ 00”</p>
                    </div>
                    <div class="col-4">
                      <div class="font-weight-bold">Weight</div>
                      <p>{{data.weight}} lbs</p>
                    </div>
                    <div class="col-4">
                      <div class="font-weight-bold">Gender</div>
                      <p>{{data.weight}} lbs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="stats my-4">
              <div class="font-weight-bold mb-4">Stats</div>
              <div class="row">
                <div class="col-md-8">
                  <div v-for="(d, i) in data.stats" :key="i" class="mb-3">
                    <span>{{d.stat.name}}</span>
                    <div class="progress" >
                      <div class="progress-bar" role="progressbar" :style="{width : `${d.base_stat}%`}" :aria-valuenow="d.base_stat" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="favorite" @click="toggleFav">
      <img v-if="isFav" src="../assets/fav-active-icon.svg" class="mr-2">
      <img v-else width="29" src="../assets/fav-inactive-icon.svg" class="mr-2">
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed, watch, ref} from 'vue'

export default {
  name: "PokemonDetailCard",
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  setup (props) {
    const store = useStore()
    let thumbnail = ref('')

    const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

    const isFav = computed(() => {
      return store.state.pokemon.favorites.filter(obj => obj.id === props.data.id).length > 0
    })

    watch(()=>props.data, (value) => {
      thumbnail.value = `${imageUrl}${value.id}.png`
    })

    const changeThumbnail = (url) => {
      thumbnail.value = url
    }

    const toggleFav = () => {
      if(isFav.value) {
        store.commit('pokemon/removeFav', props.data.id)
      } else {
        store.commit('pokemon/addFav', props.data)
      }
    }

    return {
      imageUrl,
      isFav,
      thumbnail,
      toggleFav,
      changeThumbnail
    }
  }
}
</script>

<style scoped lang="scss">
.pokemon-detail-card {
  position: relative;
  cursor: pointer;
  .card {
    background: #FFFFFF;
    box-shadow: 3px 0px 20px rgba(0, 0, 0, 0.16);
    border-radius: 20px;
    overflow: hidden;

    .card-img-top {
      object-fit: contain;
    }

    .card-title {
      text-transform: capitalize;
      font-style: normal;
      font-weight: bold;
      font-size: 30px;
      line-height: 21px;
      color: #0E0E0E;
    }
  }
  .favorite {
    cursor: pointer;
    position: absolute;
    top:15px;
    right:20px;
  }
  .list-thumbnails {
    padding: 20px;
    overflow-x: scroll;
    max-width: 100%;
    text-align: center;
    display: flex;
    img {
      width: 70px;
      box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.16);
      border-radius: 10px;
    }
  }
}
</style>