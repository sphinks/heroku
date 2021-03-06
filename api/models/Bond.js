/**
* Bond.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        name          : {type: 'string'},
        num           : {type: 'string', required: true},
        risk          : {type: 'string', defaultsTo: ''},
        rate          : {type: 'float'},
        cpVal         : {type: 'float'},
        cpDur         : {type: 'float'},
        endDate       : {type: 'string'},

        bid           : {type: 'float', defaultsTo: 0},
        ask           : {type: 'float', defaultsTo: 0},
        nkd           : {type: 'float'},
        state         : {type: 'string'},
        cpDate        : {type: 'string'},
        expiresIn     : {type: 'integer'},

        bid_candle    : {type: 'json', defaultsTo: {o:'',h:'',l:'',c:'',d:''}},
        ask_candle    : {type: 'json', defaultsTo: {o:'',h:'',l:'',c:'',d:''}},
        indayCandles  : {type: 'array', defaultsTo: []},
        dailyCandles  : {type: 'array', defaultsTo: []},

        // старые выпуски
        dead          : {type: 'boolean', defaultsTo: false},
        die: function() {
            this.dead = true;
            return this.save();
        },
    },



    beforeCreate: format,
    beforeUpdate: format,

};

function format(bond, next) {
    // вечных облигаций не бывыает
    if (!bond.endDate) {
        console.info('forever_bond', bond.name, bond.num)
        return next('forever_bond');
    }

    bond.endDate = moment(bond.endDate, ddf);
    bond.cpDate  = moment(bond.cpDate,  ddf);

    bond.rate    = parseFloat(bond.rate);   // номинал
    bond.cpVal   = parseFloat(bond.cpVal);  // размер купона
    bond.cpDur   = parseFloat(bond.cpDur);  // длительность купона
    bond.nkd     = parseFloat(bond.nkd);    // НКД
    bond.bid     = parseFloat(bond.bid);    // предложение

    if(!bond.bid || bond.bid <= 0) bond.bid = '';
    if(!bond.ask || bond.ask <= 0) bond.ask = '';

    // дней до погашения
    bond.expiresIn = bond.endDate.diff(moment(), 'days');

    // должны бы уже выплатить... не следим.
    if (!bond.expiresIn || bond.expiresIn < 0) {
        console.info('stale_bond', bond.name, bond.num)
        bond.dead = true;
        return next('stale_bond');
    }

    // приводим даты к виду, ожидаемому базой
    bond.endDate   = bond.endDate.format(ddf);
    bond.cpDate    = bond.cpDate.format(ddf);

    return next();
}
