<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed app
    >
      <v-list>
        <v-subheader>크리에이터</v-subheader>
        <v-list-tile @click="$router.push({name: 'home'})">
          <v-list-tile-action>
            <v-icon>trending_up</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>YouTube 랭킹</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader>에디터</v-subheader>
        <v-list-tile @click="$router.push({name: 'about'})">
          <v-list-tile-action>
            <v-icon>assignment_ind</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>채용공고</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader>커뮤니티</v-subheader>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>자유게시판</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp" 
      color="primary" dark fixed app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- after login -->
      <v-menu
        v-if="isLogin"
        offset-y
        transition="slide-y-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>face</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>내 정보</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>내 글관리</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile @click="logout">
            <v-list-tile-content>
              <v-list-tile-title>로그아웃</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
      <!-- before login -->
      <v-menu
        v-else
        offset-y
        transition="slide-y-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>person</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile @click="showLoginDialog = true">
            <v-list-tile-title>회원가입 | 로그인</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <!-- content -->
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
        >
          <v-flex text-xs-center>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <!-- login dialog -->
    <v-dialog v-model="showLoginDialog" width="400px">
      <v-card>
        <v-card-title class="pb-0">
          <v-layout wrap column class="text-xs-center">
            <span class="headline font-weight-bold">Application</span>
          </v-layout>
        </v-card-title>
        <v-card-text class="pt-0">
          <v-container>
            <v-layout wrap column class="text-xs-center">
              <div>Lorem Ipsum is simply dummy text</div>
              <div>of the printing and typesetting industry.</div>
              <v-img
                :src="require('@/assets/google.png')"
                @click="login"
                contain
                height="50"
                class="ma-4"
                style="cursor: pointer;"
              ></v-img>
              <small>
                <span>회원가입시&nbsp;</span>
                <span class="primary--text" style="cursor: pointer;"><u>서비스 이용약관</u></span>과&nbsp;
                <span class="primary--text" style="cursor: pointer;"><u>개인정보 취급방침</u></span>을 읽고 동의했습니다.
              </small>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Main extends Vue {
  drawer: boolean = false;
  isLogin: boolean = false;
  showLoginDialog: boolean = false;

  login() {
    this.showLoginDialog = false;
    this.isLogin = true;
  }

  logout() {
    this.isLogin = false;
  }
}
</script>
