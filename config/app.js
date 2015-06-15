/**
 * Мой конфиг-свалка
 * для всего и сразу
 *
 */

module.exports.app = {
    dataDir: '.data',

    providers: {
        bonds: {
            type: 'bond', // Issuer.type
            cache: 'bonds',
        },
        shares: {
            src: '_shares', // папка, откуда будут импортироваться
            type: 'share', // Issuer.type
            cache: 'shares',
            // http://mfd.ru/marketdata/?id=5&mode=3&group=16
            mfd: {
                '+МосЭнерго'     : '63',
                'AGRO-гдр'       : '73223',
                'FXAU ETF'       : '59994',
                'FXCN ETF'       : '62792',
                'FXDE ETF'       : '59998',
                'FXGD ETF'       : '59817',
                'FXJP ETF'       : '59992',
                'FXMM ETF'       : '66288',
                'FXRB ETF'       : '54116',
                'FXRU ETF'       : '61157',
                'FXUK ETF'       : '59993',
                'FXUS ETF'       : '59995',
                'GTL ао'         : '51987',
                'PGIL-ао'        : '76880',
                'Polymetal'      : '56252',
                'RUSAL plc'      : '80121',
                'Yandex clA'     : '66538',
                'iFXIT ETF'      : '61775',
                'iQIWI'          : '59186',
                'iАЭССЕЛЬао'     : '60508',
                'iАвиастКао'     : '65825',
                'iВТОРРЕСао'     : '46778',
                'iДонскЗР'       : '33231',
                'iДонскЗР п'     : '33232',
                'iЗПИФФинИТ'     : '71',
                'iЗаводДИОД'     : '29363',
                'iИСКЧ ао'       : '17125',
                'iЛевенгук'      : '49748',
                'iМедиахолд'     : '51821',
                'iМультиСис'     : '50793',
                'iНПОНаука'      : '42020',
                'iНаукаСвяз'     : '41928',
                'iПлазмек'       : '39233',
                'iРоллман'       : '50794',
                'iРоллман-п'     : '65893',
                'iСкайКо-ао'     : '47447',
                'iФармсинтз'     : '32144',
                'iЧЗПСН ао'      : '58241',
                'iЮтинет.Ру'     : '37399',
                'iэнергомаш'     : '57590',
                'АВТОВАЗ ао'     : '73',
                'АВТОВАЗ ап'     : '74',
                'АГАНА САкт'     : '39682',
                'АЛРОСА ао'      : '41369',
                'АЛРОСА-Нюр'     : '41479',
                'АбрауДюрсо'     : '44598',
                'Авангрд-ао'     : '118',
                'АвексНедв'      : '66572',
                'Акрон'          : '144',
                'АльтаирИнв'     : '15996',
                'АнгараЗПИФ'     : '9248',
                'Аптеки36и6'     : '157',
                'Армада'         : '82037',
                'Арсагера'       : '168',
                'АстрЭнСб'       : '177',
                'АтлантаАрт'     : '35281',
                'Афина Реал'     : '15995',
                'АшинскийМЗ'     : '182',
                'Аэрофлот'       : '183',
                'БСП ао'         : '190',
                'БайкалСтар'     : '14963',
                'БанкМосквы'     : '204',
                'БашИнСв ао'     : '28600',
                'БашИнСв ап'     : '28601',
                'Башнефт ао'     : '41228',
                'Башнефт ап'     : '41229',
                'Белон ао'       : '232',
                'БестЭфБ ао'     : '80302',
                'БурЗолото'      : '41807',
                'ВАбхазии'       : '31135',
                'ВТБ ао'         : '258',
                'ВТБИндММВБ'     : '32340',
                'ВТБФондАкц'     : '32339',
                'ВТБФондКаз'     : '32342',
                'ВТБФондСб'      : '32341',
                'ВТБфонд ДМ'     : '67765',
                'ВТГК'           : '264',
                'ВХЗ-ао'         : '269',
                'ВЭК 01 ао'      : '270',
                'Варьеган'       : '41981',
                'Варьеган-п'     : '41982',
                'Верхнесалд'     : '273',
                'Возрожд-ао'     : '287',
                'Возрожд-п'      : '288',
                'ВолгЭнСб'       : '289',
                'ВолгЭнСб-п'     : '290',
                'ВоронЭнСб'      : '308',
                'ВоронЭнСбп'     : '309',
                'ВостРАО ао'     : '316',
                'ВостРАО ап'     : '317',
                'ВыбСудЗ ао'     : '48800',
                'ВыбСудЗ ап'     : '48801',
                'ВысокиеТех'     : '29037',
                'ГАЗ ао'         : '42052',
                'ГАЗ ап'         : '42053',
                'ГАЗ-Тек ао'     : '42662',
                'ГАЗ-сервис'     : '40087',
                'ГАЗКОН-ао'      : '40089',
                'ГАЗПРОМ ао'     : '330',
                'ГМКНорНик'      : '336',
                'ГУМ'            : '342',
                'ГазпРнД ао'     : '61131',
                'Газпрнефть'     : '346',
                'Галс-Девел'     : '38822',
                'ГлТоргПрод'     : '51850',
                'ГорФондНед'     : '15428',
                'ДВМП ао'        : '383',
                'ДИКСИ ао'       : '44517',
                'ДЭК ао'         : '394',
                'ДагСб ао'       : '396',
                'Деликатесы'     : '51849',
                'Дорогбж ао'     : '415',
                'Дорогбж ап'     : '416',
                'ЕТС ао'         : '82036',
                'Живой Оф'       : '66357',
                'ЗВЕЗДА ао'      : '42055',
                'ЗИЛ ао'         : '41824',
                'ЗМЗ-ао'         : '443',
                'ЗМЗ-ап'         : '444',
                'ЗПИФ Рент2'     : '17765',
                'ЗПИФ Рент3'     : '17766',
                'ЗПИФ Страт'     : '79287',
                'ЗПИФ ФинКВ'     : '445',
                'ЗПИФАтлант'     : '15166',
                'ЗПИФБиоТех'     : '50968',
                'ЗПИФКлНедв'     : '53333',
                'ЗПИФКлевИн'     : '43788',
                'ЗПИФКрасн'      : '46805',
                'ЗемлРодКр'      : '79206',
                'ИДЖАТ'          : '65852',
                'ИКРУСС-ИНВ'     : '65447',
                'ИРКУТ-3'        : '460',
                'ИСУ ГК-2'       : '69080',
                'ИСУ ЕФГ-2'      : '73034',
                'ИСУ-1'          : '54955',
                'ИСУ-11000'      : '67182',
                'ИСУ-2'          : '55017',
                'ИСУ-2 ГФТ'      : '64989',
                'ИСУ-3'          : '61245',
                'ИСУ-3 ГФТ'      : '70948',
                'ИСУ-4 ГФТ'      : '70947',
                'ИСУ-6'          : '65854',
                'ИСУ-9000'       : '69860',
                'ИСУ-АФ'         : '64990',
                'ИСУ-ВыСтд'      : '69435',
                'ИСУ-КП'         : '65665',
                'ИСУ-МрегИп'     : '69861',
                'ИСУ-ПН'         : '68543',
                'ИСУБерЛуны'     : '74299',
                'ИСУБерМеч'      : '73033',
                'ИСУБерМоря'     : '74300',
                'ИТ-сегмент'     : '69884',
                'Ижсталь ап'     : '41488',
                'Ижсталь2ао'     : '41486',
                'Ижсталь3ао'     : '41487',
                'Инв-Девел'      : '79256',
                'ИнтерРАОао'     : '17107',
                'ИркЭнерго'      : '506',
                'КАМАЗ'          : '511',
                'КЗМС ао'        : '519',
                'КМЗ'            : '525',
                'КОКС ао'        : '529',
                'КСБ ао'         : '541',
                'КСБ ап'         : '542',
                'КУЗОЦМ ао'      : '41969',
                'КалужскСК'      : '555',
                'КамчатЭ ао'     : '558',
                'КамчатЭ ап'     : '559',
                'Квадра'         : '29055',
                'Квадра-п'       : '29058',
                'Кольчуга'       : '49900',
                'КоршГОК ао'     : '589',
                'КосогМЗ ао'     : '41809',
                'КоттедПарк'     : '69859',
                'КрасОкт-1п'     : '598',
                'КрасОкт-ао'     : '599',
                'КраснГЭС'       : '602',
                'Красэсб ао'     : '607',
                'Красэсб ап'     : '608',
                'КубанСт ап'     : '611',
                'КубаньЭнСб'     : '612',
                'Кубанэнр'       : '614',
                'КузбТК ао'      : '28676',
                'Кузбасэнрг'     : '615',
                'КузнецкийБ'     : '47480',
                'Куйбазот'       : '41967',
                'Куйбазот-п'     : '41968',
                'КурганГКао'     : '48811',
                'КурганГКап'     : '49088',
                'ЛСР ао'         : '629',
                'ЛУКОЙЛ'         : '632',
                'ЛЭСК ао'        : '41498',
                'Лензол. ап'     : '14995',
                'Лензолото'      : '647',
                'Лента др'       : '64410',
                'Ленэнерг-п'     : '648',
                'Ленэнерго'      : '650',
                'М.видео'        : '666',
                'МГТС-4ап'       : '672',
                'МГТС-5ао'       : '673',
                'МЕРИДИАН'       : '9820',
                'ММК'            : '716',
                'МН-фонд ао'     : '35101',
                'МОЭСК'          : '726',
                'МРСК СЗ'        : '730',
                'МРСК СК'        : '742',
                'МРСК Ур'        : '747',
                'МРСК ЦП'        : '777',
                'МРСК Центр'     : '778',
                'МРСКВол'        : '779',
                'МРСКСиб'        : '787',
                'МРСКЮга ао'     : '815',
                'МТС-ао'         : '826',
                'МагадЭн ао'     : '31760',
                'МагадЭн ап'     : '31761',
                'Магнит ао'      : '832',
                'МариЭнСб'       : '840',
                'МариЭнСб-п'     : '841',
                'МашЗавод'       : '41813',
                'МегаФон ао'     : '49747',
                'Мегион-ао'      : '855',
                'Мегион-ап'      : '856',
                'МедиаВиМ'       : '61457',
                'Мечел ао'       : '9060',
                'Мечел ап'       : '35831',
                'МихРентИП'      : '79862',
                'Монолит-ип'     : '879',
                'МордЭнСб'       : '880',
                'Морион ао'      : '41970',
                'МосБиржа'       : '51353',
                'МосОблБанк'     : '46788',
                'МосЭС ао'       : '891',
                'Мостотрест'     : '27847',
                'Мотовил ао'     : '9441',
                'МурмТЭЦ-ао'     : '41971',
                'МурмТЭЦ-п'      : '41972',
                'НКНХ ао'        : '909',
                'НКНХ ап'        : '910',
                'НЛМК ао'        : '913',
                'НМТП ао'        : '915',
                'Нефтекамск'     : '39588',
                'НижгорСб'       : '944',
                'НижгорСб-п'     : '945',
                'Нижкамшина'     : '41973',
                'Новатэк ао'     : '948',
                'Новопл ап'      : '29702',
                'Новсибэн'       : '41974',
                'Новсибэн-п'     : '41975',
                'НфтФПРиР'       : '29036',
                'ОВК ао'         : '81204',
                'ОВК-001D'       : '81209',
                'ОГК-2 ао'       : '967',
                'ОКС ао'         : '54550',
                'ОМЗ-ап'         : '990',
                'ОМПК ао'        : '992',
                'ОПИН ао'        : '993',
                'ОРЕОЛПроек'     : '45274',
                'Омскшина'       : '18048',
                'ОргСинт ао'     : '41401',
                'ОргСинт ап'     : '41402',
                'Отисифарм'      : '76910',
                'ОткрФКБ ао'     : '67217',
                'ПИК ао'         : '1019',
                'ПИФ АТРИУМ'     : '37247',
                'ПИФ Аршин'      : '67893',
                'ПИФ Атлант'     : '58629',
                'ПИФ Витязь'     : '80230',
                'ПИФ ПЕРАМО'     : '70591',
                'ПИФАльтИнв'     : '31603',
                'ПИФАрсЖС'       : '1051',
                'ПИФБКСфно'      : '1065',
                'ПИФБизнрнт'     : '36267',
                'ПИФБолУрал'     : '69991',
                'ПИФВолжски'     : '47417',
                'ПИФДолгКап'     : '40214',
                'ПИФЕВРАЗФН'     : '51290',
                'ПИФЖилПрог'     : '1088',
                'ПИФЗемПодм'     : '49749',
                'ПИФЗемлБаз'     : '48769',
                'ПИФЗолКол'      : '36849',
                'ПИФИДжиЭст'     : '68552',
                'ПИФИмп-Куб'     : '33759',
                'ПИФИмп-ПФН'     : '33758',
                'ПИФИнвЮгры'     : '38821',
                'ПИФИнженер'     : '18029',
                'ПИФИсток'       : '49189',
                'ПИФКапИн'       : '51617',
                'ПИФКапИнвб'     : '28890',
                'ПИФКапОбл'      : '1104',
                'ПИФКапПрсн'     : '34535',
                'ПИФКвант'       : '30371',
                'ПИФКоммИнв'     : '66464',
                'ПИФМАМаунт'     : '33195',
                'ПИФМайлст'      : '41404',
                'ПИФМдАльфа'     : '45571',
                'ПИФМдБета'      : '51291',
                'ПИФМдГамма'     : '62499',
                'ПИФМожБер'      : '16432',
                'ПИФНМТраст'     : '68196',
                'ПИФОткрОбл'     : '1156',
                'ПИФОтрИнв'      : '35928',
                'ПИФПерПрК'      : '60491',
                'ПИФПервИнв'     : '43711',
                'ПИФПерспИн'     : '30471',
                'ПИФПокрвск'     : '1168',
                'ПИФПротон'      : '50789',
                'ПИФПятЗем'      : '52027',
                'ПИФРВМ-Лог'     : '64417',
                'ПИФРВМКап'      : '67207',
                'ПИФРСГ-НЖ'      : '27974',
                'ПИФРФЦ-Шув'     : '1181',
                'ПИФРаздМКМ'     : '46012',
                'ПИФРацио'       : '51227',
                'ПИФРегнКН'      : '53461',
                'ПИФРусТрнз'     : '1191',
                'ПИФСбер-КН'     : '52424',
                'ПИФСелена'      : '30372',
                'ПИФСистИнв'     : '38741',
                'ПИФСтабиль'     : '69992',
                'ПИФСтрИнв'      : '64451',
                'ПИФСтрукт'      : '79288',
                'ПИФТФБ-Рен'     : '30299',
                'ПИФТФГСпек'     : '31714',
                'ПИФТверУс'      : '31022',
                'ПИФТелИнв'      : '65853',
                'ПИФТехРост'     : '36848',
                'ПИФТрЮЗем'      : '28602',
                'ПИФТрастЮн'     : '49923',
                'ПИФТретЗем'     : '41251',
                'ПИФУнСтрат'     : '36847',
                'ПИФУрлНед1'     : '49190',
                'ПИФФондКап'     : '61828',
                'ПИФХеритед'     : '44503',
                'ПИФЦарМост'     : '1228',
                'ПИФЧетвЗем'     : '41381',
                'ПИФЧистЭн'      : '41370',
                'ПИФЭнерСев'     : '63510',
                'ПИФЮгра'        : '17996',
                'ПМП ао'         : '1240',
                'ПРОТЕК ао'      : '28606',
                'ПФТерЮгра'      : '1256',
                'ПФЮграРант'     : '1257',
                'ПавлАвт ао'     : '41500',
                'ПермьЭнС-п'     : '1272',
                'ПермьЭнСб'      : '1273',
                'Перспект'       : '51220',
                'Перспект-2'     : '51221',
                'Перспектив'     : '47454',
                'Петр ао'        : '41814',
                'ПолюсЗолот'     : '1281',
                'Приморье'       : '35956',
                'ПроектИ ао'     : '17327',
                'Промсвб ао'     : '48946',
                'РБК ао'         : '35301',
                'РВММегаплс'     : '30373',
                'РВМСтНедв1'     : '46596',
                'РГС ао'         : '61060',
                'РДБанк ао'      : '59991',
                'РНТ'            : '68379',
                'РОСИНТЕРао'     : '1334',
                'Разгуляй'       : '1353',
                'Распадская'     : '1359',
                'РегБР ао'       : '28607',
                'РитейлИнв'      : '69883',
                'РодПростор'     : '33481',
                'Родина ап'      : '1370',
                'Рождест.ип'     : '17794',
                'Росбанк ао'     : '1372',
                'Роснефть'       : '1373',
                'Россети ао'     : '54102',
                'Россети ап'     : '54103',
                'Ростел -ао'     : '1383',
                'Ростел -ап'     : '1384',
                'РостовЭС'       : '1385',
                'РостовЭС-п'     : '1386',
                'РусАква ао'     : '80286',
                'РусГидро'       : '1389',
                'Русал рдр'      : '33198',
                'Русгрэйн'       : '30298',
                'Русолово'       : '57601',
                'Русполимет'     : '1402',
                'РязЭнСб'        : '1412',
                'СЗПароход'      : '1418',
                'СМ.арт-Ал'      : '40779',
                'СМЗ-ао'         : '1434',
                'СОЛЛЕРС'        : '1437',
                'СЭМЭстПерв'     : '73224',
                'Саларьево'      : '82019',
                'СамарЭн-ао'     : '40765',
                'СамарЭн-ап'     : '40766',
                'СаратНПЗ'       : '41494',
                'СаратНПЗ-п'     : '41495',
                'СаратЭн-ао'     : '41339',
                'СаратЭн-ап'     : '41340',
                'СберЖилНед'     : '54930',
                'СберЖлНед2'     : '68942',
                'Сбербанк'       : '1463',
                'Сбербанк-п'     : '1464',
                'СевСт-ао'       : '1476',
                'Селестра'       : '9808',
                'Селигдар'       : '39756',
                'Селигдар-п'     : '45199',
                'Синерг. ао'     : '1498',
                'Система ао'     : '1503',
                'Слав-ЯНОСп'     : '30018',
                'Славн-ЯНОС'     : '1506',
                'СтаврЭнСб'      : '1528',
                'СтаврЭнСбп'     : '1529',
                'Сургнфгз'       : '1542',
                'Сургнфгз-п'     : '1543',
                'ТАНТАЛ ао'      : '41820',
                'ТАНТАЛ ап'      : '41821',
                'ТГК-1'          : '1549',
                'ТГК-14'         : '1566',
                'ТГК-2'          : '1567',
                'ТГК-2 ап'       : '1568',
                'ТЗА ао'         : '1588',
                'ТКЗ ао'         : '41505',
                'ТКЗКК ао'       : '41811',
                'ТКЗКК ап'       : '41812',
                'ТКСМ ао'        : '32421',
                'ТМК ао'         : '1593',
                'ТРАНСАЭРао'     : '35278',
                'ТФК-Финанс'     : '65892',
                'ТамбЭнСб'       : '1604',
                'ТамбЭнСб-п'     : '1605',
                'Татнфт 3ао'     : '1613',
                'Татнфт 3ап'     : '1614',
                'Таттел. ао'     : '1615',
                'Телеграф'       : '1626',
                'Телеграф-п'     : '40778',
                'ТомскРП ао'     : '1638',
                'ТомскРП ап'     : '1639',
                'ТрансК ао'      : '31759',
                'Транснф ап'     : '1658',
                'ТринфПерсп'     : '40684',
                'ТринфРПоле'     : '17118',
                'ТрнфИП ТрЭ'     : '9937',
                'ТрнфФГлобл'     : '63579',
                'Труд ап'        : '43015',
                'УАЗ ао'         : '1665',
                'УКОРФ ао'       : '33749',
                'УрКузница'      : '45200',
                'УралСиб ао'     : '41980',
                'Уркалий-ао'     : '1706',
                'ФСК ЕЭС ао'     : '1712',
                'Фармстанд'      : '1718',
                'Физика ао'      : '41403',
                'Форт ап'        : '43023',
                'ФосАгро ао'     : '37859',
                'ХМБОткр ао'     : '80134',
                'Химпром ао'     : '41965',
                'Химпром ап'     : '41966',
                'ЦМТ ао'         : '1738',
                'ЦМТ ап'         : '1739',
                'ЧКПЗ ао'        : '1749',
                'ЧМК ао'         : '1750',
                'ЧТПЗ ао'        : '1753',
                'ЧЦЗ ао'         : '1754',
                'ЧелябЭС ао'     : '1757',
                'ЧелябЭС ап'     : '1758',
                'ЧеркизГ-ао'     : '1764',
                'ЧерногНефт'     : '41959',
                'Э.ОНРоссия'     : '37883',
                'ЭРКО ао'        : '41961',
                'Электрцинк'     : '41960',
                'ЭнелРос ао'     : '69042',
                'ЭнергияРКК'     : '1786',
                'ЮТэйр ао'       : '1798',
                'ЮУНК ао'        : '44777',
                'ЮграКомНед'     : '1802',
                'ЮграРентФ'      : '1803',
                'ЮжКузб. ао'     : '1805',
                'ЯТЭК ао'        : '41823',
                'Якутскэн-п'     : '1818',
                'Якутскэнрг'     : '1820',
                'ЯрШинЗ ао'      : '34958',
                'ЯрослСК'        : '1826',
                'ЯрослСК-п'      : '1827',
                'Ярославич'      : '1828',
            },
        }
    }
};
