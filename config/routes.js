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
    'get /services/bonds/help'          : 'Bonds.help',
    'get /services/bonds/all'           : 'Bonds.bonds',
    'get /services/bonds/filters'       : 'Bonds.filters',
    'get /services/bonds/additional'    : 'Bonds.additional',
    //---
    'post /services/bonds/updateFilter' : 'Bonds.updateFilter',

    // Shares
    'get /services/shares'              : 'Shares',
    'get /services/shares/:href'        : 'Shares.ticker',
    'get /services/shares/:id/edit'     : 'Shares.editorPage', // админка
    'get /services/shares/:id/info'     : 'Shares.getTickerData', // апи
    //---
    'post /services/shares/:id/update'  : 'Shares.updateGeneral',



    //
    // About page
    //
    'get /about'              : 'About',
    'get /about/feedback'     : 'About.feedback',
    'get /about/donation'     : 'About.donation',
    'get /about/donation/thx' : 'About.thx',



    //
    // Admin
    //
    'get /adm'                  : 'Admin',
    'get /adm/bonds_reparse'    : 'Admin.bonds_reparse',
    'get /adm/bonds_cache'      : 'Admin.bonds_cache',
    'get /adm/shares_cache'     : 'Admin.shares_cache',





    //  ╔╦╗╔═╗╔═╗╔╦╗
    //   ║ ║╣ ╚═╗ ║
    //   ╩ ╚═╝╚═╝ ╩
    'get /403': {response: 'forbidden'},
    'get /404': {response: 'notFound'},
    'get /500': {response: 'serverError'},

    'get /test': 'Main.test',

};
