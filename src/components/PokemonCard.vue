<template>
  <div class="pokemon-card" v-if="data" @click="openDetail(data.id)">
    <img :src="`${imageUrl}${data.id}.png`" class="card-img-top">
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">{{data.name}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: "PokemonCard",
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  setup () {
    const router = useRouter()

    const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
    const openDetail = (id) => {
      router.push(`/pokemon/${id}`)
    }

    return {
      imageUrl,
      openDetail
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
      object-fit: cover;
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
}
</style>