<template>
  <v-navigation-drawer
    id="appDrawer"
    :mini-variant.sync="mini"
    fixed
    dark
    app
    v-model="drawer"
    width="260"

    >
    <v-toolbar dark style="background: #3c8dbc;" height="45px">
      <!-- <img v-bind:src="computeLogo" height="16" alt="Vue Material Admin Template"> -->
      <!-- <v-toolbar-title class="ml-0 pl-3">
        <span class="hidden-sm-and-down">&nbsp;</span>
      </v-toolbar-title>  -->  

      <!-- <v-container fill-height> -->
         <v-layout justify-center style="margin-top: 0px; height:45px;">
           <v-card style="top: 0px; background: transparent; height:0px;" flat>
             <v-container fill-height>
                     <img v-bind:src="computeLogo" height="16" alt="logo">
             </v-container>
           </v-card>
         </v-layout>
       <!-- </v-container> -->

    </v-toolbar>
    <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
      <v-text-field
        flat
        solo-inverted
        append-icon="search"
        label="Search"
        class="hidden-sm-and-down"
        :append-icon-cb="Search"
        >
      </v-text-field>
      <v-list dense expand>
        <template v-for="(item, i) in menus">
            <!--group with subitems-->
            <v-list-group v-if="item.items" :key="item.name" :group="item.group" :prepend-icon="item.icon" no-action="no-action" style="color:#b8c7ce;">
              <v-list-tile slot="activator" ripple="ripple">
                <v-list-tile-content>
                  <v-list-tile-title>A{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <template v-for="(subItem, i) in item.items">
                <!--sub group-->
                <v-list-group v-if="subItem.items" :key="subItem.name" :group="subItem.group" sub-group="sub-group">
                  <v-list-tile slot="activator" ripple="ripple">
                    <v-list-tile-content>
                      <v-list-tile-title>{ subItem.title }}</v-list-tile-title>
                    </v-list-tile-content>
                    
                  </v-list-tile>
                  <v-list-tile v-for="(grand, i) in subItem.children" :key="i" :to="genChildTarget(item, grand)" :href="grand.href" ripple="ripple">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ grand.title }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>



                </v-list-group>
                <!--child item-->
                <v-list-tile v-else :key="i" :to="genChildTarget(item, subItem)" :href="subItem.href" :disabled="subItem.disabled" :target="subItem.target" ripple="ripple" style="background: yellow; margin-left: 0px;">

                    <v-subheader :prepend-icon="subItem.icon" style="padding-left: 0px; background: red; margin-left: 0px;">{{ subItem.title }}</v-subheader>

                   <v-list-tile-action v-if="subItem.icon">
                      <v-icon :class="[subItem.iconClass || 'success--text']">{{ subItem.icon }}</v-icon>
                    </v-list-tile-action>
                  <v-list-tile-content :prepend-icon="subItem.icon">
                    <v-list-tile-title><span>{{ subItem.title }}</span></v-list-tile-title>
                  </v-list-tile-content>

                  <!-- <v-circle class="white--text pa-0 circle-pill" v-if="subItem.badge" color="red" disabled="disabled">{{ subItem.badge }}</v-circle> -->
                  <v-list-tile-action v-if="subItem.action">
                    <v-icon :class="[subItem.actionClass || 'success--text']">{{ subItem.action }}</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
              </template>

            </v-list-group>
            <v-subheader v-else-if="item.header" :key="i" style="background: #38393a; color: #4b646f; font-weight: 400; font-size: 0.8em;">{{ item.header }}</v-subheader>

            <v-divider v-else-if="item.divider" :key="i"></v-divider>
            <!-- top-level link -->
            <v-list-tile v-else-if="enabledComponent(item)" :to="!item.href ? { name: item.name } : null" :href="item.href" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="item.name" style="color:#b8c7ce;" >
              <v-list-tile-action v-if="item.icon">
                <v-icon :color="item.color ? item.color : 'white'">{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content style="color:#b8c7ce;">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
              <!-- <v-circle class="white--text pa-0 chip--x-small" v-if="item.badge" :color="item.color || 'primary'" disabled="disabled">{{ item.badge }}</v-circle> -->
              <v-list-tile-action v-if="item.subAction">
                <v-icon class="success--text">{{ item.subAction }}</v-icon>
              </v-list-tile-action>
              <!-- <v-circle class="caption blue lighten-2 white--text mx-0" v-else-if="item.chip" label="label" small="small">{{ item.chip }}</v-circle> -->
            </v-list-tile>
        </template>
      </v-list>        
    </vue-perfect-scrollbar>        
  </v-navigation-drawer>
</template>
<script>
import menu from '@/api/menu';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
export default {
  name: 'app-drawer',
  components: {
    VuePerfectScrollbar,
  },
  props: {
    expanded: {
      type: Boolean,
      default: true
    },
  },
  data: () => ({
    mini: false,
    drawer: true,
    menus: menu,
    scrollSettings: {
      maxScrollbarLength: 160
    }    
  }),
  computed: {
    computeGroupActive () {
      return true;
    },
    computeLogo () {
      // return '/static/m.png';
      return '/static/logo-im-small.svg';
    },

    sideToolbarColor () {
      return this.$vuetify.options.extra.sideNav;
    } 
  },
  watch: {
    drawer (value) {
      // alert('............');
      window.getApp.$emit('APP_DRAWER_TOGGLED_', value);
      // this.$emit('onchange', value);
      // or generate/simulate a native events (not sure how, but its outside Vue's realm I think
    }
  },
  created () {
    window.getApp.$on('APP_DRAWER_TOGGLED', () => {
      this.drawer = (!this.drawer);
    });
  },
  

  methods: {
    genChildTarget (item, subItem) {
      if (subItem.href) return;
      if (subItem.component) {
        return {
          name: subItem.component,
        };
      }
      return { name: `${item.group}/${(subItem.name)}` };
    },
    Search () {
      // 
    },
    isLoggedIn () {
      console.log(this.$store.state.isLoggedIn);
      console.log(this.$store.state);
      return this.$store.state.isLoggedIn;
    },
    enabledComponent (item) {
      if (item.Astatus) {
        if (item.Astatus === 'loggedin') {
          if (this.isLoggedIn()) return true;
          return false;          
        }
        if (item.Astatus === 'loggedout') {
          if (this.isLoggedIn()) return false;
          return true;          
        }

        return true;
      }
      return true;
    }
  }
};
</script>


<style lang="stylus">
// @import '../../node_modules/vuetify/src/stylus/settings/_elevations.styl';

#appDrawer
  font-family: 'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
  overflow: hidden
  .drawer-menu--scroll
    height: calc(100vh - 48px)
    overflow: auto
  .toolbar__content
    height:45px;


</style>
