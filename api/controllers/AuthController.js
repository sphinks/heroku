/**
 * Authentication Controller
 *
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */

var AuthController = {

    //  ╔═╗╔═╗╔╦╗
    //  ║ ╦║╣  ║
    //  ╚═╝╚═╝ ╩

    login: function (req, res) {
        // авторизирован? иди в профиль.
        if (req.isAuthenticated()) return res.redirect('/me');
        // Render the `auth/login` view
        var data = req.flash('form');
        return res.render('auth/login', {
            errors: req.flash('error'),
            form: data[0] || {},
        });
    },

    logout: function (req, res) {
        passport.logout(req, res);
        return res.redirect('/login')
    },

    register: function (req, res) {
        // авторизирован? иди в профиль.
        if (req.isAuthenticated()) return res.redirect('/me');
        var data = req.flash('form');
        return res.render('auth/register', {
            errors: req.flash('error'),
            form: data[0] || {},
        });
    },



    //  ╔═╗╔═╗╔═╗╔╦╗
    //  ╠═╝║ ║╚═╗ ║
    //  ╩  ╚═╝╚═╝ ╩

    action: function (req, res) {
        var action = req.param('action');

        // LOGIN
        if (!action || action == 'login') {
            passport.authenticate(['local'], function (err, user, challenges, statuses) {
                if (err || !user) {
                    // ошибка или оправдание - показать пользователю
                    var errorText = err || challenges;
                    return AuthController.tryAgain(req, res, errorText);
                }
                // аутентификация успешна
                passport.login(req, res, user, function(err) {
                    // даем токен пользователю
                    passport.rememberme.issue(user, function(err, token) {
                        if (err) console.error('unable to give token:', err);
                        res.cookie(sails.config.passport.rememberme.key, token, { path: '/', httpOnly: true, maxAge: 604800000 });
                        return res.redirect('/me');
                    });
                });
            })(req, res);
        }

        // REGISTER
        else if (action == 'register') {
            var email = req.param('email');
            var username = req.param('username');
            var password = req.param('password');

            // minLength от Waterline всегда пропускает 0 символов... -_-
            if (!email || !username || !password)
                return AuthController.tryAgain(req, res, new Error('Все поля обязательны для заполнения'));

            User.create({
                username: username,
                email: email,
            }, function(err, user) {
                if (err) return AuthController.tryAgain(req, res, err);
                Passport.create({
                    user: user.id,
                    protocol: 'local',
                    password: password,
                }, function(err) {
                    if (err) {
                        // что-то пошло не так
                        return user.destroy(function(err_1) {
                            if (err_1) console.error('unable to destroy user:', err_1);
                            return AuthController.tryAgain(req, res, err);
                        });
                    }
                    // аутентифицируем пользователя
                    passport.login(req, res, user, function(err) {
                        // даем ему токен
                        passport.rememberme.issue(user, function(err, token) {
                            if (err) console.error('unable to give token:', err);
                            res.cookie(sails.config.passport.rememberme.key, token, { path: '/', httpOnly: true, maxAge: 604800000 });
                            // и посылаем нахер
                            return res.redirect('/me');
                        });
                    });
                })
            })
        }

        // WTF?!
        else {
            // dafuq s dat?!
            console.error('auth controller, unrecognized action:', action);
            return res.redirect('/');
        }
    },



    //  ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
    //  ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
    //  ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝

    // возвращает на предыдущую страницу, но теперь с ошибками.
    // сохраняет заполненные данные
    tryAgain: function(req, res, errors) {
        // сообщения об ошибке
        if (!Array.isArray(errors)) {
            errors = [errors];
        }

        var flashes = [];
        _(errors).each(function(err) {
            if (!err.Errors) {
                // ошибка, но не от валидации...
                flashes.push(err.message || err);
            }
            else {
                _(err.Errors).each(function(trouble) {
                    _(trouble).each(function(instance) {
                        flashes.push(instance.message);
                    });
                })
            }
        })
        req.flash('error', flashes);
        //*/

        // данные, чтобы форма восстановила свои данные
        req.flash('form', req.body);

        // редиректы в нужные места, в зависимости от действия
        // вьюшки должны уметь показывать error & form
        var action = req.param('action');
        if (!action || action == 'login') {
            res.redirect('/login');
        }
        else if (action == 'register') {
            res.redirect('/register');
        }
        else {
            res.redirect('/');
        }
    },

};

module.exports = AuthController;
