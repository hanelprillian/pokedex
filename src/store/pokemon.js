import axios from 'axios'
const state = () => ({
    favorites: [],
    pokeApiNextUrl: 'a'
})

const getters = {}

const actions = {
    async getAllPokemon ({ state }, payload) {
        return new Promise((resolve, reject) => {
            const { params = {} } = payload
            axios.get(state.pokeApiNextUrl, {
                params
            }).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }
}

const mutations = {
    setNextApiUrl (state, url) {
        state.pokeApiNextUrl = url
    },
    addFav (state, data) {
        state.favorites.push(data)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}