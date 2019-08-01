import { ActionContext, Module } from 'vuex';
import { RootState } from '@/store';
import { IUser } from '@/interfaces';
import axios from 'axios';
import API from '@/service/api';
import { getCookie } from '@/util';

interface State {
  user: IUser | null;
}

const module: Module<State, RootState> = {
  state: {
    user: null,
  },
  mutations: {
    setUser(state: State, user: IUser) {
      state.user = user;
    },
  },
  actions: {
    getUser({commit}: ActionContext<State, RootState>) {
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

export default module;
