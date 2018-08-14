const Menu =  [
  { header: 'Main Navigation' },
  {
    title: 'Home',
    group: 'apps',
    icon: 'fa-home',
    href: '#',
  },
  // {
  //   title: 'Dashboard',
  //   group: 'apps',
  //   icon: 'dashboard',
  //   name: 'Dashboard',
  // },
  // {
  //   title: 'Chat',
  //   group: 'apps',
  //   icon: 'chat_bubble',
  //   // target: '_blank',
  //   name: 'Chat',
  // },
  // {
  //   title: 'Inbox',
  //   group: 'apps',
  //   name: 'Mail',
  //   target: '_blank',
  //   icon: 'email',
  // },
  // {
  //   title: 'Media',
  //   group: 'apps',
  //   name: 'Media',
  //   icon: 'perm_media',
  // },
  // {
  //   title: 'Widgets',
  //   group: 'widgets',
  //   component: 'widgets',
  //   icon: 'widgets',
  //   items: [
  //     { name: 'social', title: 'Social', component: 'components/social' },
  //     { name: 'statistic', title: 'Statistic', badge: 'new', component: 'components/statistic' },
  //     { name: 'chart', title: 'Chart', component: 'components/chart' },
  //     { name: 'list', title: 'List', component: 'components/widget-list' },
  //     // { name: 'post', title: 'Post', component: 'components/widget-post' },
  //   ]
  // },  
  { header: 'My Account' },
  {
    title: 'Profile',
    Astatus: 'loggedin',
    group: 'apps',
    name: 'Profile',
    icon: 'fa-user',
  },
  {
    title: 'Log Out',
    group: 'apps',
    Astatus: 'loggedin',
    name: 'Logout',
    icon: 'fa-sign-out',
    color: 'warning'  // choose which color
  },
  {
    title: 'Login',
    Astatus: 'loggedout',
    group: 'apps',
    name: 'login',
    icon: 'fa-sign-in',
    color: 'success',
    href: '/#/account/login'
  },
  {
    title: 'Register',
    Astatus: 'loggedout',
    group: 'apps',
    name: 'My Profile',
    icon: 'fa-user-plus',
    color: 'success',
    href: '/#/account/register'
  },
  { divider: true },
  { header: 'Resources' },
  {
    title: 'Cshop',
    group: 'apps',
    icon: 'fa-shopping-bag',
    name: 'Cshop',
    color: 'blue'
  },
  {
    title: 'Blog',
    group: 'apps',
    icon: 'fa-book',
    name: 'Blog',
    color: 'blue'
  },
  {
    title: 'Contacts',
    group: 'extra',
    icon: 'fa-envelope',
    name: 'Contacts',
    color: 'blue',
    // items: [
    //   { name: 'Email', title: 'Email', component: 'Login', icon: 'fa-github' },
    //   { name: 'Facebook', title: 'Facebook', component: 'NotFound' },
    //   { name: 'Twitter', title: 'Twitter', component: 'AccessDenied' },
    //   { name: 'Telephone', title: 'Telephone', component: 'ServerError' },
    // ]
  }, 
  { header: 'Contribute' },
  {
    title: 'Github',
    group: 'apps',
    icon: 'fa-github',
    name: 'Github',
    target: '_blank',
    href: 'https://github.com/csyma/csyma'
  },
];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
