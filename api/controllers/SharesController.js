/**
 * SharesController
 *
 * @description :: Server-side logic for managing shares
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {

    index: function(req, res) {
        var data = {
            title: 'Акции',
            shares: {
                rows: [],
            },
        };

        Q()
            .then(function() {
                return Branch.find();
            })
            .then(function(branches) {
                data.branches = branches;
                console.time('SharesController/index');
                return Share.find({dead: false})
                // .populateAll()
                ;
            })
            .then(function(shares) {
                console.timeEnd('SharesController/index');
                return _.map(shares, function(s) {
                    return _.extend(s, {
                        href: s.code || s.id,
                    });
                });
            })
            .then(function(shares) {
                console.debug('no time');
                if (!shares) {
                    console.warn('Возвращен пустой список акций.');
                    shares = [];
                }
                data.shares.rows = shares;
                data.shares.params = provider.sharesGoogle.params;
            })
            .then(function() {
                console.debug('no time2');
                console.time('SharesController/UserSettings.findOne');
                return UserSettings.findOne({
                    user: req.user ? req.user.id : null,
                    page: 'shares/filters',
                });
            })
            .then(function(us) {
                console.timeEnd('SharesController/UserSettings.findOne');
                console.debug('us sett');
                data.us = (us && us.data) || {
                    // TODO: defaultsTo
                    filters: [
                        {
                            "text": "Разумный инвестор",
                            "conditions": [
                                {
                                    "column" : {"data": "MarketCap"},
                                    "type"   : {"value": "more"},
                                    "value"  : "100000000"
                                }, {
                                    "column" : {"data": "CurrentRatioYear"},
                                    "type"   : {"value": "more"},
                                    "value"  : "2"
                                }, {
                                    "column" : {"data": "Dividend"},
                                    "type"   : {"value": "more"},
                                    "value"  : "11"
                                }, {
                                    "column" : {"data": "RevenueGrowthRate10Years"},
                                    "type"   : {"value": "more"},
                                    "value"  : "6"
                                }, {
                                    "column" : {"data": "EPSGrowthRate10Years"},
                                    "type"   : {"value": "more"},
                                    "value"  : "15"
                                }, {
                                    "column" : {"data": "PE"},
                                    "type"   : {"value": "more"},
                                    "value"  : "1"
                                }, {
                                    "column" : {"data": "PE"},
                                    "type"   : {"value": "less"},
                                    "value"  : "12"
                                }, {
                                    "column" : {"data": "PriceToBook"},
                                    "type"   : {"value": "more"},
                                    "value"  : "0.2"
                                }, {
                                    "column" : {"data": "PriceToBook"},
                                    "type"   : {"value": "less"},
                                    "value"  : "0.8"
                                }
                            ],
                            "visibleColumns": [
                                {"data": "__adm"},
                                {"data": "code"},
                                {"data": "__moex"},
                                {"data": "__site"},
                                {"data": "__forums"},
                                {"data": "__links"},
                                {"data": "name"},
                                {"data": "PE"},
                                {"data": "QuoteLast"},
                                {"data": "BookValuePerShareYear"},
                            ]
                        }
                    ],
                };
            })
            .then(function() {
                console.debug('no time 3');
                return Statistics.findOne({name: 'sharesGoogleSaveToDB'});
            })
            .then(function(lastUpdate) {
                console.debug('stats');
                data.shares.info = [];
                if (lastUpdate) {
                    data.shares.info.push({
                        key: 'Данные обновлены',
                        value: moment(lastUpdate.data).fromNow(),
                    });
                }

                if (cron.tasks.sharesGoogle) {
                    data.shares.info.push({
                        key: 'Ближайшее обновление',
                        value: moment(cron.tasks.sharesGoogle.next()).fromNow(),
                    });
                }
                else {
                    data.shares.info.push({
                        key: 'Ближайшее обновление',
                        value: '!!! cron не активирован !!!',
                    });
                }
            })
            .then(function() {
                console.debug('render');
                res.render('services/shares/new_shares', data);
            })
            .catch(res.serverError)
            ;
    },

    ticker: function(req, res) {
        var href = req.param('href');

        var getShare;
        // MONGO!!!
        var mongoIdLength = 24;
        if (href.length === mongoIdLength) {
            getShare = provider.shares.getById;
        }
        else {
            getShare = provider.shares.getByCode;
        }

        getShare(href)
            .then(function(share) {
                if (!share) {
                    throw new Error('404');
                }
                if (share && share.code && href.length === mongoIdLength) {
                    var err = new Error('301');
                    err.redirectTo = '/services/shares/'+share.code;
                    throw err;
                }
                return res.render('services/shares/ticker', {
                    ticker: {
                        id: share.id,
                        name: share.name,
                        site: share.site,
                    },
                    tickerForums: share.forums || [],
                    tickerLinks: share.links || [],
                });
            })
            .catch(function(err) {
                if (err.message === '404') {
                    return res.render('404', {
                        msg: 'Тикер <b>'+href+'</b> не найден',
                    });
                }
                else if (err.message === '301') {
                    return res.redirect(err.redirectTo || '/');
                }
                else {
                    return res.serverError(err);
                }
            });
    },

    getTickerData: function(req, res) {
        var id = req.param('id');
        Share.findOne({id: id}).populateAll()
        // provider.shares.getById(id)
            .then(function(share) {
                if (!share) {
                    return res.send(404);
                }
                return res.send(share);

            })
            .catch(res.serverError);
    },



    //  ╔═╗╔╦╗╔╦╗╦╔╗╔
    //  ╠═╣ ║║║║║║║║║
    //  ╩ ╩═╩╝╩ ╩╩╝╚╝

    // админка
    editorPage: function(req, res) {
        var id = req.param('id');
        var data = {};

        Share.findOne({id: id}).populateAll()
            .then(function(share) {
                if (!share) {
                    throw new Error('404');
                }
                data.ticker = _.extend(share, {
                    info         : {
                        mfd_id       : share.mfd_id,
                        candlesCount : share.candlesHistory && share.candlesHistory.data.length,
                        lastCandle   : share.lastCandle,
                        indayCount   : share.indayCandles.length,
                    }
                });
            })
            .then(function() {
                return Branch.find();
            })
            .then(function(branches) {
                data.branches = branches;
            })
            .then(function() {
                return res.render('services/shares/editor', data);
            })
            .catch(function(err) {
                if (err.message === '404') {
                    return res.render('404', {
                        msg: 'Тикер #<b>'+id+'</b> не найден',
                    });
                }
                else {
                    return res.serverError(err);
                }
            });
    },

    // DEPRECATED
    updateGeneral: function(req, res) {
        var id = req.param('id');
        var message = req.param('message');

        Share
            .findOne({id: id})
            .then(function(share) {
                if (!share) {
                    throw new Error('404');
                }

                if (!message.key) {
                    console.warn('SharesController.updateGeneral получено сообщение без ключа!', message);
                }
                else if (message.key === 'ticker.code') {
                    share.code = (message.value && message.value.length) ? message.value : undefined;
                }
                else if (message.key === 'ticker.site') {
                    share.site = message.value;
                }
                else if (message.key === 'ticker.branch') {
                    share.branch = message.value;
                }
                else if (message.key === 'ticker.shares_count') {
                    share.shares_count = parseInt(message.value) || 0;
                }
                else if (message.key === 'ticker.forums') {
                    var forum = message.value;

                    console.log('shares adminig:', share.name);
                    if (message.remove) {
                        _.remove(share.forums, {id: forum.id});
                        console.log('forum removed:', forum);
                    }
                    else {
                        var found = _.find(share.forums, {id: forum.id});
                        if (found) {
                            _.extend(found, forum);
                        }
                        else {
                            // TODO: этого быть тут не должно...
                            if (!share.forums) {
                                share.forums = [];
                            }
                            share.forums.push(forum);
                        }
                        console.log('forum upd:', forum);
                    }
                }
                else if (message.key === 'ticker.links') {
                    var link = message.value;

                    console.log('shares adminig:', share.name);
                    if (message.remove) {
                        _.remove(share.links, {id: link.id});
                        console.log('link removed:', link);
                    }
                    else {
                        var found = _.find(share.links, {id: link.id});
                        if (found) {
                            _.extend(found, link);
                        }
                        else {
                            // TODO: этого быть тут не должно...
                            if (!share.links) {
                                share.links = [];
                            }
                            share.links.push(link);
                        }
                        console.log('link upd:', link);
                    }
                }
                else if (message.key === 'ticker.reports.fields') {
                    var field = message.value;

                    if (message.remove) {
                        var removed = _.remove(share.reports.fields, {id: field.id});
                        console.log('field removed:', removed);
                    }
                    else {
                        var found_field = _.find(share.reports.fields, {id: field.id});
                        if (!found_field) {
                            share.reports.fields.push(field);
                            console.log('field added:', field);
                        }
                        else {
                            if (found_field.key != field.key) {
                                console.log('field key modified:', found_field.key, '->', field.key);
                                _.each(share.reports.data, function(report) {
                                    report.data[field.key] = report.data[found_field.key];
                                    delete report.data[found_field.key];
                                });
                                found_field.key = field.key;
                            }
                            if (found_field.value != field.value) {
                                console.log('field value modified:', found_field.value, '->', field.value);
                                found_field.value = field.value;
                            }
                        }
                    }
                }
                else if (message.key === 'ticker.reports.data') {
                    var report = message.value;

                    console.log('shares adminig:', share.name);
                    if (message.remove) {
                        var removed = _.remove(share.reports.data, {id: report.id});
                        console.log('report removed:', removed);
                    }
                    else {
                        var found_report = _.find(share.reports.data, {id: report.id});
                        if (!found_report) {
                            share.reports.data.push(report);
                            console.log('report added:', report);
                        }
                        else {
                            console.log('report modified');
                            console.log('old:', found_report);
                            _.extend(found_report, report);
                            console.log('new:', found_report);
                        }
                    }
                }
                else if (message.key === 'ticker.divs') {
                    share.divs = message.value;
                }
                return share.save();
            })
            .then(function(share) {
                console.info('share updated', share.site);
                return res.ok();
            })
            .catch(function(err) {
                if (err.message === '404') {
                    return res.notFound();
                }
                else {
                    return res.serverError(err);
                }
            });
    },


    newUpdate: function(req, res) {
        var id = req.param('id');
        var msg = req.param('msg');

        return Share
            .findOne({id: id})
            .then(function(share) {
                if (!share) {
                    throw new Error('404');
                }
                _.extend(share, msg);
                return share.save().then(function() {return share;});
            })
            .then(function(share) {
                console.info('share updated', share.id);
                return res.ok();
            })
            .catch(function(err) {
                if (err.message === '404') {
                    return res.notFound();
                }
                else {
                    return res.serverError(err);
                }
            });
    },

    // получает дивы указанной акции, если есть айдишник,
    // если айдишника нет - получает все дивы
    parseDivs: function(req, res) {
        var id = req.param('id');
        var divsParser = require('../services/DataProviders/sharesDivsParser');

        return Q()
            .then(function() {
                if (id) {
                    return Share.find({
                        where: {
                            id: id,
                        },
                        select: [
                            'code',
                        ],
                    })
                    ;
                }
                else {
                    return Share.find({
                        where: {
                            dead: false,
                        },
                        select: [
                            'code',
                        ],
                    })
                    ;
                }
            })
            .then(function(shares) {
                if (!shares) {
                    throw new Error('shares not found');
                }
                return divsParser.parse(_.cMap(shares, 'code'));
            })
            .then(function(data) {
                if (data && data.length === 1) {
                    return res.send(data[0]);
                }
                return res.ok();
            })
            .catch(function(err) {
                return res.serverError(err);
            });
    },

    // получает дивы указанной акции, если есть айдишник,
    // если айдишника нет - получает все дивы
    parseCandles: function(req, res) {
        var id = req.param('id');
        var importer = require('../services/DataProviders/sharesImporter');

        return Q()
            .then(function() {
                return Share.find({id: id}).populateAll();
            })
            .then(function(shares) {
                return importer.forceUpdateCandles(shares);
            })
            .then(function(shares) {
                var ticker = shares && _.first(shares);
                return ticker && ticker.candlesHistory.data && ticker.candlesHistory.data.length || null;
            })
            .then(function(count) {
                return res.send({downloaded: count});
            })
            .catch(function(err) {
                return res.serverError(err);
            })
            ;
    },


    branchPage: function(req, res) {
        var id = req.param('id');
        var data = {
            title: 'Отрасль: ',
            tickers: [],
            googleParams: provider.sharesGoogle.params,
        };

        Q.all([
            Branch.findOne({id: id}),
            Share.find({
                where: {
                    dead: false,
                    branch: id,
                },
                select: [
                    'id',
                    'name',
                    'code',
                    //
                    'google',
                ],
            }),
        ])
        .spread(function(branch, shares) {
            if (!branch) {
                throw new Error('404');
            }
            data.title += branch.name;
            data.tickers = shares;
        })
        .then(function() {
            return res.render('services/shares/branch', data);
        })
        ;
    },


    // /services/sunburst
    sunburst: function(req, res) {
        var data = {
            title: 'Весь Российский фондовый рынок',
            tickers: [],
            branches: [],
        };

        Q()
            .then(function(branches) {
                console.time('SharesController/sunburst');
                return Q.all([
                    Share.find({dead: false}),
                    Branch.find(),
                ]);
            })
            .spread(function(shares, branches) {
                console.timeEnd('SharesController/sunburst');
                data.branches = branches;
                data.tickers  =  _.map(shares, function(s) {
                    return _.extend(s, {
                        href: s.code || s.id,
                    });
                });
            })
            .then(function() {
                res.render('services/shares/sunburst', data);
            })
            .catch(res.serverError)
            ;
    },


    favorites: function(req, res) {
        var msg = req.param('msg');
        console.log('fav:', msg);

        if (!msg || !msg.share) {
            return res.badRequest();
        }

        var shareId = msg.share;

        var foo = Q();

        if (msg.remove) {
            foo = foo.then(function() {
                console.debug('remove: ', {
                    user: req.user.id,
                    type: 'share',
                    data: {
                        id: shareId,
                    },
                });
                return Favorites.destroy({
                    user: req.user.id,
                    type: 'share',
                    data: {
                        id: shareId,
                    },
                })
                .catch(res.serverError)
                ;
            });
        }
        else {
            foo = foo.then(function() {
                return Favorites.create({
                    user: req.user.id,
                    type: 'share',
                    data: {
                        id: shareId,
                    },
                    msg: msg.reason,
                })
                .catch(res.serverError)
                ;
            });
        }

        return foo
            .then(res.ok)
            .catch(res.serverError)
            ;
    },


    getFavorites: function(req, res) {
        return Q()
            .then(function() {
                return Favorites.find({
                    user: req.user.id,
                    type: 'share',
                });
            })
            .then(function(fav) {
                var shareIds = _.map(fav, 'data.id');
                return [fav, Share.find({id: shareIds})];
            })
            .spread(function(fav, shares) {
                return res.send(_.map(shares, function(s) {
                    var favorite = _.find(fav, {data: {id: s.id}});
                    s._favorite = favorite;
                    return s;
                }));
            })
            .catch(res.serverError)
            ;
    },


};

