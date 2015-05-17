module.exports.routes = {

    //
    // Main page
    //
    'get /': 'Main',



    //
    // Profile page
    //
    'get /me': 'Profile',

    // Settings
    'get /settings'              : 'Settings',
    //---
    'post /settings/update'      : 'Settings.update',

    // Auth
    'get /auth'                  : 'Auth',
    'get /logout'                : 'Auth.logout',
    'get /auth/:strategy'        : 'Auth.addStrategy',
    'get /auth/:strategy/remove' : 'Auth.removeStrategy',
    //---
    'post /auth/:action'  : 'Auth.action', // 'login', 'register'



    //
    // Services
    //
    'get /services': 'Services',

    // Bonds
    'get /services/bonds'               : 'Bonds',
    'get /services/bonds/all'           : 'Bonds.bonds',
    'get /services/bonds/filters'       : 'Bonds.filters',
    'get /services/bonds/additional'    : 'Bonds.additional',
    //---
    'post /services/bonds/updateFilter' : 'Bonds.updateFilter',



    //
    // About page
    //
    'get /about'            : 'About',
    'get /about/feedback'   : 'About.feedback',
    'get /about/donation'   : 'About.donation',





    //  ╔╦╗╔═╗╔═╗╔╦╗
    //   ║ ║╣ ╚═╗ ║
    //   ╩ ╚═╝╚═╝ ╩
    'get /403': {response: 'forbidden'},
    'get /404': {response: 'notFound'},
    'get /500': {response: 'serverError'},

    'get /test': 'Main.test',

};
