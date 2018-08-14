<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app id="inspire" class="app">
        <app-drawer class="app--drawer"></app-drawer>
        <app-toolbar class="app--toolbar " style="background: #3c8dbc;" height="45px"></app-toolbar>
        <v-content>
          <!-- Page Header -->
          <page-header v-if="$route.meta.breadcrumb"></page-header>
          <div class="page-wrapper">
            <router-view></router-view>
          </div>   
           <!-- App Footer -->
          <v-footer height="auto" class="white pa-3 app--footer">
            <span>
              <span class="caption"><strong>Copyright &copy; <a href="https://csybersystems.cseco.co.ke" target="blank" style="text-decoration: none;">CSYBER SYSTEMS</a>, {{ new Date().getFullYear() }} </strong></span>
              <br>
              <span>Open Sourced Under Apache</span>
              <br>
              Built with <v-icon small>favorite</v-icon> by CSYBER SYSTEMS
            </span>
            <v-spacer></v-spacer>
            <span>
              <span class="caption"> 
                <v-btn icon href="https://github.com/tookit/vue-material-admin">
                  <v-icon small>fa fa-github</v-icon>
                </v-btn> 
              </span> 
              <span class="caption"> 
                <v-btn icon href="https://github.com/tookit/vue-material-admin">
                  <v-icon small color="indigo">fa fa-facebook</v-icon>
                </v-btn> 
              </span><span class="caption"> 
                <v-btn icon href="https://github.com/tookit/vue-material-admin">
                  <v-icon small color="light-blue">fa fa-twitter</v-icon>
                </v-btn> 
              </span> 
              <br>
              <span class="caption" style="{float:right;}"> <strong>Version</strong> {{version}} </span> 

              <!-- <span class="caption mr-1"> <v-icon small>github</v-icon> </span>  -->
              <!-- <span class="caption mr-1"> <v-icon small>facebook</v-icon> </span>  -->
              <!-- <span class="caption mr-1"> <v-icon small>twitter</v-icon> </span>  -->
            </span>
          </v-footer>
        </v-content>
        <!-- Go to top -->
        <app-fab></app-fab>
        <!-- theme setting -->
        <v-btn small fab dark falt fixed top="top" right="right" class="setting-fab" color="red" @click="openThemeSettings">
          <v-icon>settings</v-icon>
        </v-btn>
        <v-navigation-drawer
          class="setting-drawer smallHeight"
          temporary
          right
          v-model="rightDrawer"
          hide-overlay
          fixed
          >
          <theme-settings></theme-settings>
        </v-navigation-drawer>        
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </template>
    <v-snackbar
      :timeout="3000"
      bottom
      right
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon> 
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>    
  </div>
</template>
<script>
import AppDrawer from '@/components/AppDrawer';
import AppToolbar from '@/components/AppToolbar';
import AppFab from '@/components/AppFab';
import PageHeader from '@/components/PageHeader';
import menu from '@/api/menu';
import ThemeSettings from '@/components/ThemeSettings';
import AppEvents from  './event';
export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader,
    ThemeSettings
  },
  data: () => ({
    version: '2.0',
    builder: {
      facebook: '',
      github: 'https://github.com/csybersystems',
      twitter: ''
    },
    expanded: true,
    rightDrawer: false,
    snackbar: {
      show: false,
      text: '',
      color: '',
    }
  }),

  computed: {

  },

  created () {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
  },
  methods: {
    openThemeSettings () {
      this.$vuetify.goTo(0);
      this.rightDrawer = (!this.rightDrawer);
    }
  },

};
</script>


<style lang="stylus" scoped>
  .setting-fab 
    top:50%!important; 
    right:0;
    border-radius:0  
  .page-wrapper
    min-height:calc(100vh - 64px - 50px - 81px );  
  .smallHeight
    height:45px;
    margin-top:0px;
  .toolbar__content
    height:45px;
  

</style>
