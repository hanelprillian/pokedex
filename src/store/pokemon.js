import axios from 'axios'
const state = () => ({
    pokeApiNextUrl: 'a'
})

const getters = {}

const actions = {
    async getAllPokemon ({ state }, payload) {
        return new Promise((resolve, reject) => {
            const { params = {} } = payload
            axios.get(state.pokeApiNextUrl, {
                params
            })
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

const mutations = {
    setNextApiUrl (state, url) {
        state.pokeApiNextUrl = url
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}