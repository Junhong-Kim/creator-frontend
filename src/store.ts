import Vue from 'vue';
import Vuex, { StoreOptions, ActionContext } from 'vuex';
import { IUser } from '@/interfaces';
import axios from 'axios';
import API from '@/service/api';
import { getCookie } from './util';

Vue.use(Vuex);

interface State {
  user: IUser | null;
}

const store: StoreOptions<State> = {
  state: {
    user: null,
  },
  mutations: {
    setUser(state: State, user: IUser) {
      state.user = user;
    },
  },
  actions: {
    getUser({state, commit}: ActionContext<State, State>) {
      axios.get(API.USER_ME, {
        headers: {
          'x-access-token': getCookie('x-access-token'),
        },
      }).then((res) => {
        const data = res.data.data;
        commit('setUser', data);
      });
    },
  },
  getters: {
    user: (state: State) => state.user,
  },
};

export default new Vuex.Store(store);
