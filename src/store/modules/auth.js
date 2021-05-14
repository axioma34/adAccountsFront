import axios from "axios"

const state = {
    token: null
}

const getters = {
    isAuthenticated: (state) => !!state.token,
    StateUser: (state) => state.token,
}

const actions = {
    async LogIn({commit}, user) {
        await axios.post("/login", user).then((response) => {
            if (!response.data) {  throw 'No response data' }
            if (!Object.prototype.hasOwnProperty.call(response.data,'token')) { throw 'No token in response' }
            commit("setUser", response.data.token)
        })
    },

    async LogOut({ commit }) {
        let user = null
        commit("logout", user)
    },
}

const mutations = {
    setUser(state, token) {
        state.token = token
    },

    logout(state, user) {
        state.token = user
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}