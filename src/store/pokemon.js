import axios from 'axios'
const state = () => ({
    favorites: [],
    types: [],
    pokeApiNextUrl: ''
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
    },

    async getAllTypes (payload) {
        return new Promise((resolve, reject) => {
            const { params = {} } = payload
            axios.get(`https://pokeapi.co/api/v2/type`, {
                params
            }).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    async getDetailType ({ commit },payload) {
        return new Promise((resolve, reject) => {
            console.log('payload', payload)
            axios.get(`https://pokeapi.co/api/v2/type/${payload}`).then((response) => {
                commit('setTypes', response)
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
    setTypes (state, data) {
        state.types = data
    },
    addFav (state, data) {
        state.favorites.push(data)
    },
    removeFav (state, id) {
        state.favorites = state.favorites.filter(obj => obj.id !== id)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}