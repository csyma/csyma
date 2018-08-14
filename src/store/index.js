import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: 'bart',
  storage: window.localStorage
});

export default new Vuex.Store({

  state: {
    token: null, // can not modify a mutation
    user: {
      defaultprofilepic: '/static/images/4e14f517d239010c439617922dc13543.png',
      profilepic: null,
      defaultEmail: 'guest@cseco.co.ke'
    },
    isLoggedIn: false,
    cow: null,
    cows: [
      {
        value: false,
        id: 1,
        name: 'chelel',
        weight: 408,
        breed: 'freshian',
        picture:
        'https://media.mnn.com/assets/images/2017/01/cow-in-pasture.jpg.838x0_q80.jpg',
        date: '1/1/2009',
        state: ['pregnant'],
        delete: 'Delete'
      },
      {
        value: false,
        id: 2,
        name: 'baringo',
        weight: 345,
        breed: 'ashyre',
        picture: 'https://grassfood.files.wordpress.com/2015/05/dsc0207e.jpg',
        date: '1/1/2009',
        state: ['dry'],
        delete: 'Delete'
      },
      {
        value: false,
        id: 3,
        name: 'mardadi',
        weight: 287,
        breed: 'jersey',
        picture:
        'https://media.mnn.com/assets/images/2017/01/cow-in-pasture.jpg.838x0_q80.jpg',
        state: ['pregnant', 'dry'],
        date: '1/1/2009',

        delete: 'Delete'
      }
    ]
  },
  mutations: {
    setToken (state, token) {
      state.token = token;
      if (token) {
        state.isLoggedIn = true;

      } else {
        state.isLoggedIn = false;
      }
    },
    setUser (state, user) {
      state.user = user;
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token);
    },
    setUser ({ commit }, user) {
      commit('setUser', user);
    }
  },
  getters: {
    getCow: (state) => (name) => {
      let cow = state.cows.find(function (obj) {
        return obj.name === name;
      });
      return cow;
    }
  },
  plugins: [vuexLocal.plugin]
});