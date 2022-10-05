import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

let store = {
    state: {
        client: location.href.includes("origin") ? "origin" : "std",
        server: '',
        isExpand: true
    },
    mutations: {
        SET_STATE: (state, payload) => {
            state[payload.key] = payload.value;
        }
    },
    getters: {},
    actions: {},
    modules: {},
};

export default new Vuex.Store(store);
