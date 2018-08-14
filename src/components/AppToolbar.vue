<template>
  <v-toolbar
    fixed
    dark
    app
    height="45px"
    >
    <v-toolbar-title class="ml-0 pl-3">
    <!-- <v-toolbar-title style="background: yellow; margin-top: 0px; height:45px;"> -->
      <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
    </v-toolbar-title>
      <v-layout align-left justify-left v-if="!drawer" style="margin-top: 0px; height:45px; ">
       <v-card style="background: #3c8dbc; height:0px;" flat>
       <!-- <v-card flat hover> -->
         <v-container fill-height>
                 <img v-bind:src="computeLogo" alt="logo">
         </v-container>
       </v-card>
     </v-layout>

      <v-spacer></v-spacer>
      <!-- <v-btn href="mailto:wangqiangshen@gmail.com">
        Hire Me
      </v-btn>  -->     
      <!-- <v-btn icon href="https://github.com/tookit/vue-material-admin">
        <v-icon>fa fa-github</v-icon>
      </v-btn> -->
      <v-btn icon @click="handleFullScreen()">
        <v-icon>fullscreen</v-icon>
      </v-btn>
      <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
        <v-btn icon flat slot="activator">
        <v-badge color="red" overlap>
          <span slot="badge">{{numNotifications}}</span>
          <v-icon medium>notifications</v-icon>
        </v-badge>
        </v-btn>
        <notification-list v-if="numNotifications > 0" style="top:45px;"></notification-list>
      </v-menu>
      <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition" align-center justify-center >
         <!-- <v-layout align-center justify-center > -->
        
        <v-btn icon large flat slot="activator">
          <v-avatar size="30px">
            <img :src="getProfilePic()" alt="user"/>     
          </v-avatar>
          <!-- {{ getUser('name') }} -->
        </v-btn>

        <v-list class="pa-0" align-center justify-center>

          <v-container fill-height style="background: #3c8dbc;">
            <v-layout row wrap align-center >
              <v-flex class="text-xs-center" xs12>
                    <v-avatar size="50px">
                         <img v-bind:src="getProfilePic()" alt="user">
                    </v-avatar>
              </v-flex>
              <v-flex class="text-xs-center" xs12 style="color: #FFF;">
                {{ getUser('name') }}
              </v-flex>
              <v-flex class="text-xs-center" xs12 style="font-size: 0.8em">
                {{ getUser('email') }}
              </v-flex>
            </v-layout>
          </v-container>
          <v-container fill-height style="background: #f9f9f9;" class="pa-1">
            <v-layout row wrap align-center >
              <v-flex v-if="!isLoggedIn()" class="text-xs-center" xs12 >
                <v-btn block flat slot="activator" outline style="font-size: 1em; color: #666666; background-color: #f4f4f4; border-color: #ddd;" to="/account/login">
                  <v-icon small left>fa-lock</v-icon>
                  <!-- <v-spacer></v-spacer> -->
                  Login
                </v-btn>
              </v-flex>
              <v-flex v-if="!isLoggedIn()" class="text-xs-center" xs12 style="font-size: 0.8em;">
                <v-btn block flat slot="activator" outline style="color: #666666; background-color: #f4f4f4; border-color: #ddd;" to="/account/register">
                  <v-icon small left>fa-user-plus</v-icon>    Register
                </v-btn>
              </v-flex>
              <v-flex v-if="isLoggedIn()" class="text-xs-center" xs12 style="font-size: 0.8em;">
                <v-btn block flat slot="activator" outline style="color: #666666; background-color: #f4f4f4; border-color: #ddd;">
                  <v-icon small left>fa-user</v-icon>    Profile
                </v-btn>
              </v-flex>
              <v-flex v-if="isLoggedIn()" class="text-xs-center" xs12 style="font-size: 0.8em;">
                <v-btn block flat slot="activator" outline style="color: #666666; background-color: #f4f4f4; border-color: #ddd;">
                  <v-icon small left>fa-sign-out</v-icon>    Logout
                </v-btn>
              </v-flex>
              

            </v-layout>
          </v-container>

        </v-list>

       
      </v-menu>
  </v-toolbar>
</template>
<script>
import NotificationList from '@/components/widgets/list/NotificationList';
import Util from '@/util';
export default {
  name: 'app-toolbar',
  components: {
    NotificationList
  },
  data: () => ({
    numNotifications: 0,
    user: {
    },
    items: [
      {
        icon: 'account_circle',
        href: '#',
        title: 'Profile',
        click: (e) => {
          console.log(e);
        }
      },
      {
        icon: 'settings',
        href: '#',
        title: 'Settings',
        click: (e) => {
          console.log(e);
        }
      },
      {
        icon: 'fullscreen_exit',
        href: '#',
        title: 'Logout',
        click: (e) => {
          window.getApp.$emit('APP_LOGOUT');
        }
      }
    ],
    drawer: false,
  }),
  computed: {
    toolbarColor () {
      return this.$vuetify.options.extra.mainNav;
    },
    computeLogo () {
      return '/static/logo-im-small.svg';
    },
  },
  created () {
    window.getApp.$on('APP_DRAWER_TOGGLED_', (val) => {
      this.drawer = val;
    });
  },
  methods: {
    handleDrawerToggle () {
      this.drawer = !this.drawer;
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      Util.toggleFullScreen();
    },
    getProfilePic () {
      return this.$store.state.user.profilepic || this.$store.state.user.defaultprofilepic;
    },
    getUser (elem) {
      let ret = this.$store.state.user[elem];
      if (elem === 'name') return ret || 'Guest';
      if (elem === 'email') return ret || this.$store.state.user.defaultEmail; 
    },
    isLoggedIn () {
      return this.$store.state.isLoggedIn;
    },
  },
};
</script>

<style lang="stylus" scoped> 
  .smallHeight
    height:45px;
    margin-top:0px;
  .toolbar__content
    height:45px;
</style>
