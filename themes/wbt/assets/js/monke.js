var $ = jQuery.noConflict();

function makenorm() {//красота на поля
    $('.active .address-item').removeClass('uniq');
    $('.active .address-item:odd').addClass('uniq');
    return true;
}

addresscount = 1; //изначальное кол-во адресов для отправки


$(document).ready(function () {
    var $goagead = $('.goahead');//для эффектов
    TweenMax.to('h1', .7, {//стартовая анимация
        text: 'Monke dreams...', onComplete: function () {
            TweenMax.staggerTo($goagead, .2, {opacity: 1, scale: 1, display: "block"}, .2);
        }
    })
    $('input').val('');//очистка полей
    $('.form-netswitcher input').val('mainnet');//изначальный тип сети
    $('.form-netswitcher').click(function () {//клик по выбору сети
        var $nettype = $('.form-netswitcher input').val();
        if ($nettype == 'mainnet') {
            $('.form-netswitcher input').val('testnet');
            TweenMax.to($('.switcher-circle'), .3, {
                width: "39px", onComplete: function () {
                    TweenMax.to($('.switcher-circle'), .3, {
                        width: "15px", left: "auto", right: "4px", onComplete: function () {

                        }
                    });
                }
            });
            $('.nettype').eq(0).removeClass('active');
            $('.nettype').eq(1).addClass('active');
        } else {
            $('.form-netswitcher input').val('mainnet');
            TweenMax.to($('.switcher-circle'), .3, {
                width: "39px", onComplete: function () {
                    TweenMax.to($('.switcher-circle'), .3, {
                        width: "15px", left: "4px", right: "auto", onComplete: function () {

                        }
                    });
                }
            });
            $('.nettype').eq(1).removeClass('active');
            $('.nettype').eq(0).addClass('active');
        }
        $('.submit').removeClass('hide');
    });

    function makeevent() {//события мыши для созданных элементов
        $('input,select').focus(function () {
            $(this).parent('.form-field').addClass('field-focus');
            $('.submit').removeClass('hide');
        });
        $('input,select').focusout(function () {
            if ($(this).val() == "") {
                $(this).parent('.form-field').removeClass('field-focus');
            }
        });
        $('input,select').change(function () {

            $('.submit').removeClass('hide');
        });
        $('.remove').off('click').on('click', function (e) {
            var $this = $(this).parent('.address-item');
            TweenMax.to($this, .3, {
                x: -50, opacity: 0, height: "0px", display: "none", onComplete: function () {
                    $this.remove();
                    makenorm();
                    addresscount = addresscount - 1;
                }
            });
        });
    }

    makeevent();
    makenorm();

    //выпадающий список
    var $menu = $('.types');

    function showmenu() {
        TweenMax.to($menu, .3, {
            opacity: 1, display: "block", onComplete: function () {

            }
        });
        $menu.addClass('active');
    }

    function hidemenu() {
        TweenMax.to($menu, .3, {
            opacity: 0, display: "none", onComplete: function () {

            }
        });
        $menu.removeClass('active');
    }

    function switchmenu() {
        if ($menu.is('.active')) {
            hidemenu();
        } else {
            showmenu();
        }
    }

    //клик по выпадающему списку
    $('.type-switcher').click(function () {
        switchmenu();
    });

    $(document).click(function (event) {//клик в пустоту
        if ($(event.target).closest('.shield').length)
            return;
        hidemenu();
        event.stopPropagation();
    });

    transtype = 'send';//тип транзакции по умолчанию

    $('.types li a').click(function () {//клик по типу транзакции
        var $this = $(this);
        transtype = $this.data('type');
        $('.type-switcher span').text($(this).text());
        $('.types li').removeClass('current');
        $this.parent('li').addClass('current');
        //смена активной формы

        var $forma = $('.form'),
            $activeform = $('.form[data-type="' + transtype + '"]');
        TweenMax.to($forma, 0, {
            opacity: 0, display: "none", onComplete: function () {
                $forma.removeClass('active');
            }
        });
        TweenMax.to($activeform, .3, {
            opacity: 1, display: "block", onComplete: function () {
                $activeform.addClass('active');
            }
        });
        makenorm();
        $('.submit').removeClass('hide');
    });

    sellall = false; //"продать все" снята

    $('.sell-all').click(function () { //клик "продать все"
        var $this = $(this),
            $hidecount = $('.hideonall');
        if ($this.is('.active')) {
            sellall = false;
            TweenMax.to($hidecount, .3, {
                opacity: 1, display: "block", height: "auto", onComplete: function () {

                }
            });
        } else {
            sellall = true;
            TweenMax.to($hidecount, .3, {
                opacity: 0, display: "none", height: "0", onComplete: function () {

                }
            });
        }
        $('.submit').removeClass('hide');
        $this.toggleClass('active');
    });


    //вывод сообщений
    function message(text, stat = 'no') {
        var addsuc = '<svg class="icon success"><use xlink:href="#icon-success"></use></svg>',
            adderror = '<svg class="icon error"><use xlink:href="#icon-error"></use></svg>',
            addmess = '';
        if (stat == 'ok') {
            addmess = addsuc;
        }
        if (stat == 'error') {
            addmess = adderror;
        }
        var mess = addmess + '<span>' + text + '</span>';
        $('.message-generator').append('<p class="message goeffect"></p>');
        TweenMax.to('.goeffect', .5, {
            text: mess, onComplete: function () {

            }
        });
        $('.message').removeClass('goeffect');
    }

    function resetdown(lock=false) {
        //снятие блокировки кнопки и очистка
        if (!lock) {$('.submit').removeClass('hide');}
        TweenMax.to('.progress', .3, {
            opacity: 0, display: "block", delay: 2, onComplete: function () {

            }
        });
    }

    function makeqr(hashh) {//генерация QR
        $('.message-generator').append('<img class="qrcome" src="https://chart.googleapis.com/chart?chl=' + hashh + '&chs=512x512&cht=qr" alt="qr">');

        TweenMax.to(window, .5, {
            scrollTo: {y: $('.qrcome'), offsetY: -150}, ease: Power2.easeOut, onComplete: function () {

            }
        });
        TweenMax.to($('.qrcome'), 1, {
            opacity: 1, rotationY: "360deg", delay: .5, onComplete: function () {

            }
        });
    }

    $('.submit').click(async function () {//клик по SUBMIT
        TweenMax.to(window, .5, {
            scrollTo: {y: $('.result'), offsetY: 50}, ease: Power2.easeOut, onComplete: function () {

            }
        });
        //блокируем кнопку
        $(this).addClass('hide');
        //удаляем прошлые результаты
        $('.message').remove();
        $('.qrcome').remove();
        //показываем индикатор прогресса
        TweenMax.to('.progress', .3, {
            opacity: 1, display: "block", onComplete: function () {

            }
        });
        //сбор полей
        message('Mr.Monkestein XI collecting fields...');

        var nettype = $("input[name='nettype']").val();//здесь тип сети

        var taxcoin = $("input[name='taxcoin']").val(), //монета для комсы
            tmessage = $("input[name='message']").val(), //сообщение
            sender = $("input[name='sender']").val(); //отправитель

        var regEx = /^Mx[A-Za-z0-9]+$/,
            validstr = regEx.test(sender);
        if ((sender == '') || (sender.length != 42) || (!validstr)) {
            message('Check sender field', 'error');
            resetdown();
            return false;
        }
        taxcoin = taxcoin.toUpperCase();
        if (taxcoin == '') {
            message('Check tax coin...my goodness...', 'error');
            resetdown();
            return false;
        }


        switch (transtype) { //ориентация по типу транзакции
            case 'send': {
                var addresses = [], ii = 0;
                jQuery('.active .address-item').each(function () {
                    addresses[ii] = [];//массив адресов
                    addresses[ii][0] = $(this).find("input[name='address']").val();
                    addresses[ii][1] = $(this).find("input[name='coin']").val();
                    addresses[ii][2] = $(this).find("input[name='amount']").val();
                    ii++;
                });
                //проверка полей
                for (i = 0; i < addresscount; i++) {

                    var regEx = /^Mx[A-Za-z0-9]+$/,
                        validstr = regEx.test(addresses[i][0]);
                    if ((addresses[i][0] == '') || (addresses[i][0].length != 42) || (!validstr)) {
                        message('Check address field#' + (i + 1) + ', Nigga...', 'error');
                        resetdown();
                        return false;
                    }
                    addresses[i][1] = addresses[i][1].toUpperCase();
                    if (addresses[i][1] == '') {
                        message('Check coin field#' + (i + 1) + '...', 'error');
                        resetdown();
                        return false;
                    }

                    if ((addresses[i][2] == '') || (!$.isNumeric(addresses[i][2]))) {
                        message('Check amount field#' + (i + 1) + '...', 'error');
                        resetdown();
                        return false;
                    }
                }


                //получаем хэш
                message('Getting Nonce...');

                // magic goes here

                const node_main = 'https://api.minter.stakeholder.space/';
                const node_test = 'https://api.testnet.minter.stakeholder.space/';
                const net = nettype === 'mainnet';

                const node = new minterSDK.Minter({
                    chainId: net ? 1 : 2,
                    apiType: 'node',
                    baseURL: net ? node_main : node_test
                });

                //

                const nonce = await node.getNonce(sender);
                message('Nonce is ' + nonce, 'ok');
                message('Generating transaction...');
                const mult = addresses.length > 1;

                let txData = null;

                if (!mult) {
                    txData = new minterTx.MinterTxDataSend({
                        to: minterUtil.toBuffer(addresses[0][0]),
                        coin: minterTx.coinToBuffer(addresses[0][1]),
                        value: `0x${minterUtil.convertToPip(addresses[0][2], 'hex')}`,
                    });
                } else {
                    let list = [];

                    for (i = 0; i < addresscount; i++) {
                        list[i] = {
                            to: minterUtil.toBuffer(addresses[i][0]),
                            coin: minterTx.coinToBuffer(addresses[i][1]),
                            value: `0x${minterUtil.convertToPip(addresses[i][2], 'hex')}`,
                        };
                    }
                    console.log(list);

                    txData = new minterTx.MinterTxDataMultisend({
                        list: list
                    });
                }


                const tx = new minterTx.MinterTx({
                    nonce: `0x${nonce.toString(16)}`,
                    chainId: net ? '0x01' : '0x02',
                    gasPrice: '0x01',
                    gasCoin: minterTx.coinToBuffer(taxcoin),
                    type: mult ? minterTx.TX_TYPE_MULTISEND : minterTx.TX_TYPE_SEND,
                    data: txData.serialize(),
                    payload: minterUtil.toBuffer(tmessage),
                });

                message('transaction was generated:', 'ok');
                const hash = tx.hash(false).toString('hex');
                message(hash);

                makeqr(hash);
                break;
            }
            case 'sell': {
                var sellcoin = $(".active input[name='coinsell']").val(); //монета на продажу
                sellcoin = sellcoin.toUpperCase();
                if (sellcoin == '') {
                    message('Check sell coin...', 'error');
                    resetdown();
                    return false;
                }

                if (!sellall) {//не нажата sellall
                    var amount = $(".active input[name='amount']").val(); //количество на продажу
                    if ((amount == '') || (!$.isNumeric(amount))) {
                        message('Check amount field...', 'error');
                        resetdown();
                        return false;
                    }
                }

                var buycoin = $(".active input[name='coinbuy']").val(); //монета на покупку
                buycoin = buycoin.toUpperCase();
                if (buycoin == '') {
                    message('Check buy coin...', 'error');
                    resetdown();
                    return false;
                }

                message('Getting Nonce...');


                // magic goes here

                const node_main = 'https://api.minter.stakeholder.space/';
                const node_test = 'https://api.testnet.minter.stakeholder.space/';
                const net = nettype === 'mainnet';

                const node = new minterSDK.Minter({
                    chainId: net ? 1 : 2,
                    apiType: 'node',
                    baseURL: net ? node_main : node_test
                });

                //

                const nonce = await node.getNonce(sender);
                message('Nonce is ' + nonce, 'ok');
                message('Generating transaction...');

                let txData = null;
                if (!sellall) {
                    txData = new minterTx.MinterTxDataSell({
                        coinToSell: minterTx.coinToBuffer(sellcoin),
                        valueToSell: `0x${minterUtil.convertToPip(amount, 'hex')}`,
                        coinToBuy: minterTx.coinToBuffer(buycoin),
                    });
                } else {
                    txData = new minterTx.MinterTxDataSellAll({
                        coinToSell: minterTx.coinToBuffer(sellcoin),
                        coinToBuy: minterTx.coinToBuffer(buycoin),
                    });
                }

                const tx = new minterTx.MinterTx({
                    nonce: `0x${nonce.toString(16)}`,
                    chainId: net ? '0x01' : '0x02',
                    gasPrice: '0x01',
                    gasCoin: minterTx.coinToBuffer(taxcoin),
                    type: sellall ? minterTx.TX_TYPE_SELL_ALL : minterTx.TX_TYPE_SELL,
                    data: txData.serialize(),
                    payload: minterUtil.toBuffer(tmessage),
                });

                message('transaction was generated:', 'ok');
                const hash = tx.hash(false).toString('hex');
                message(hash);

                makeqr(hash);


                break;
            }
            case 'buy': {
                var buycoin = $(".active input[name='coinbuy']").val(); //монета на покупку
                buycoin = buycoin.toUpperCase();
                if (buycoin == '') {
                    message('Check buy coin...', 'error');
                    resetdown();
                    return false;
                }

                var amount = $(".active input[name='amount']").val(); //количество на покупку
                if ((amount == '') || (!$.isNumeric(amount))) {
                    message('Check amount field...', 'error');
                    resetdown();
                    return false;
                }

                var sellcoin = $(".active input[name='coinsell']").val(); //монета на продажу
                sellcoin = sellcoin.toUpperCase();
                if (sellcoin == '') {
                    message('Check sell coin...', 'error');
                    resetdown();
                    return false;
                }


                message('Getting Nonce...');


                // magic goes here

                const node_main = 'https://api.minter.stakeholder.space/';
                const node_test = 'https://api.testnet.minter.stakeholder.space/';
                const net = nettype === 'mainnet';

                const node = new minterSDK.Minter({
                    chainId: net ? 1 : 2,
                    apiType: 'node',
                    baseURL: net ? node_main : node_test
                });

                //

                const nonce = await node.getNonce(sender);
                message('Nonce is ' + nonce, 'ok');
                message('Generating transaction...');

                const txData = new minterTx.MinterTxDataBuy({
                    coinToBuy: minterTx.coinToBuffer(buycoin),
                    valueToBuy: `0x${minterUtil.convertToPip(amount, 'hex')}`,
                    coinToSell: minterTx.coinToBuffer(sellcoin),
                });

                const tx = new minterTx.MinterTx({
                    nonce: `0x${nonce.toString(16)}`,
                    chainId: net ? '0x01' : '0x02',
                    gasPrice: '0x01',
                    gasCoin: minterTx.coinToBuffer(taxcoin),
                    type: minterTx.TX_TYPE_BUY,
                    data: txData.serialize(),
                    payload: minterUtil.toBuffer(tmessage),
                });

                message('transaction was generated:', 'ok');
                const hash = tx.hash(false).toString('hex');
                message(hash);

                makeqr(hash);


                break;
            }
            case 'delegate': {
                var pubkey = $("input[name='pubkey']").val(); //адрес ноды

                var regEx = /^Mp[A-Za-z0-9]+$/,
                    validstr = regEx.test(pubkey);
                if ((pubkey == '') || (pubkey.length != 66) || (!validstr)) {
                    message('Check key field', 'error');
                    resetdown();
                    return false;
                }

                var coindeleg = $(".active input[name='coin']").val(); //монета на делегирование
                coindeleg = coindeleg.toUpperCase();
                if (coindeleg == '') {
                    message('Check Coin field...', 'error');
                    resetdown();
                    return false;
                }

                var amount = $(".active input[name='amount']").val(); //количество
                if ((amount == '') || (!$.isNumeric(amount))) {
                    message('Check amount field...', 'error');
                    resetdown();
                    return false;
                }

                // message('Mark...', 'ok');


                message('Getting Nonce...');


                // magic goes here

                const node_main = 'https://api.minter.stakeholder.space/';
                const node_test = 'https://api.testnet.minter.stakeholder.space/';
                const net = nettype === 'mainnet';

                const node = new minterSDK.Minter({
                    chainId: net ? 1 : 2,
                    apiType: 'node',
                    baseURL: net ? node_main : node_test
                });

                //

                const nonce = await node.getNonce(sender);
                message('Nonce is ' + nonce, 'ok');
                message('Generating transaction...');


                const txData = new minterTx.MinterTxDataDelegate({
                    pubKey: minterUtil.toBuffer(pubkey),
                    coin: minterTx.coinToBuffer(coindeleg),
                    stake: `0x${minterUtil.convertToPip(amount, 'hex')}`,
                });

                const tx = new minterTx.MinterTx({
                    nonce: `0x${nonce.toString(16)}`,
                    chainId: net ? '0x01' : '0x02',
                    gasPrice: '0x01',
                    gasCoin: minterTx.coinToBuffer(taxcoin),
                    type: minterTx.TX_TYPE_DELEGATE,
                    data: txData.serialize(),
                    payload: minterUtil.toBuffer(tmessage),
                });

                message('transaction was generated:', 'ok');
                const hash = tx.hash(false).toString('hex');
                message(hash);

                makeqr(hash);


                break;
            }
            case 'unbond': {
                var pubkey = $("input[name='pubkey']").val(); //адрес ноды

                var regEx = /^Mp[A-Za-z0-9]+$/,
                    validstr = regEx.test(pubkey);
                if ((pubkey == '') || (pubkey.length != 66) || (!validstr)) {
                    message('Check key field', 'error');
                    resetdown();
                    return false;
                }

                var coindeleg = $(".active input[name='coin']").val(); //монета на отзыв
                coindeleg = coindeleg.toUpperCase();
                if (coindeleg == '') {
                    message('Check Coin field...', 'error');
                    resetdown();
                    return false;
                }

                var amount = $(".active input[name='amount']").val(); //количество
                if ((amount == '') || (!$.isNumeric(amount))) {
                    message('Check amount field...', 'error');
                    resetdown();
                    return false;
                }

                // message('Mark...', 'ok');


                message('Getting Nonce...');


                // magic goes here

                const node_main = 'https://api.minter.stakeholder.space/';
                const node_test = 'https://api.testnet.minter.stakeholder.space/';
                const net = nettype === 'mainnet';

                const node = new minterSDK.Minter({
                    chainId: net ? 1 : 2,
                    apiType: 'node',
                    baseURL: net ? node_main : node_test
                });

                //

                const nonce = await node.getNonce(sender);
                message('Nonce is ' + nonce, 'ok');
                message('Generating transaction...');


                const txData = new minterTx.MinterTxDataUnbond({
                    pubKey: minterUtil.toBuffer(pubkey),
                    coin: minterTx.coinToBuffer(coindeleg),
                    stake: `0x${minterUtil.convertToPip(amount, 'hex')}`,
                });

                const tx = new minterTx.MinterTx({
                    nonce: `0x${nonce.toString(16)}`,
                    chainId: net ? '0x01' : '0x02',
                    gasPrice: '0x01',
                    gasCoin: minterTx.coinToBuffer(taxcoin),
                    type: minterTx.TX_TYPE_UNBOND,
                    data: txData.serialize(),
                    payload: minterUtil.toBuffer(tmessage),
                });

                message('transaction was generated:', 'ok');
                const hash = tx.hash(false).toString('hex');
                message(hash);

                makeqr(hash);


                break;
            }
        }


        //разблокируем кнопку и чистимся
        resetdown(true);
    });


    $('.add-address').click(function () {//добавление адресата
        var data = '            <div class="address-item loading">\n' +
            '                <p class="form-field form-field-input"><span class="form-field-placeholder">Banana Address</span><input type="text" name="address"></p>\n' +
            '                <p class="form-field form-field-input field-short caps"><span class="form-field-placeholder">Coin</span><input type="text" name="coin">\n' +
            '                </p>\n' +
            '                <p class="form-field form-field-input field-short"><span class="form-field-placeholder">Amount</span><input type="text" name="amount"></p>\n' +
            '\n' +
            '\n' +
            '            <a class="remove">Remove this</a></div>';
        $(this).parent('p').before(data);
        makenorm();

        TweenMax.to($('.loading'), 0, {
            x: -50, onComplete: function () {
                TweenMax.to($('.loading'), .3, {
                    x: 0, opacity: 1, display: "block", onComplete: function () {
                        $('.address-item').removeClass('loading');
                        makeevent();
                    }
                });
            }
        });
        addresscount++;
    });

});


//SPRITE COLOR START
(function () {
    "use strict";
    if (typeof window !== "undefined" && window.addEventListener) {
        var cache = Object.create(null); // holds xhr objects to prevent multiple requests
        var checkUseElems;
        var tid; // timeout id
        var debouncedCheck = function () {
            clearTimeout(tid);
            tid = setTimeout(checkUseElems, 100);
        };
        var unobserveChanges = function () {
            return;
        };
        var observeChanges = function () {
            var observer;
            window.addEventListener("resize", debouncedCheck, false);
            window.addEventListener("orientationchange", debouncedCheck, false);
            if (window.MutationObserver) {
                observer = new MutationObserver(debouncedCheck);
                observer.observe(document.documentElement, {
                    childList: true,
                    subtree: true,
                    attributes: true
                });
                unobserveChanges = function () {
                    try {
                        observer.disconnect();
                        window.removeEventListener("resize", debouncedCheck, false);
                        window.removeEventListener("orientationchange", debouncedCheck, false);
                    } catch (ignore) {
                    }
                };
            } else {
                document.documentElement.addEventListener("DOMSubtreeModified", debouncedCheck, false);
                unobserveChanges = function () {
                    document.documentElement.removeEventListener("DOMSubtreeModified", debouncedCheck, false);
                    window.removeEventListener("resize", debouncedCheck, false);
                    window.removeEventListener("orientationchange", debouncedCheck, false);
                };
            }
        };
        var createRequest = function (url) {
            // In IE 9, cross origin requests can only be sent using XDomainRequest.
            // XDomainRequest would fail if CORS headers are not set.
            // Therefore, XDomainRequest should only be used with cross origin requests.
            function getOrigin(loc) {
                var a;
                if (loc.protocol !== undefined) {
                    a = loc;
                } else {
                    a = document.createElement("a");
                    a.href = loc;
                }
                return a.protocol.replace(/:/g, "") + a.host;
            }

            var Request;
            var origin;
            var origin2;
            if (window.XMLHttpRequest) {
                Request = new XMLHttpRequest();
                origin = getOrigin(location);
                origin2 = getOrigin(url);
                if (Request.withCredentials === undefined && origin2 !== "" && origin2 !== origin) {
                    Request = XDomainRequest || undefined;
                } else {
                    Request = XMLHttpRequest;
                }
            }
            return Request;
        };
        var xlinkNS = "http://www.w3.org/1999/xlink";
        checkUseElems = function () {
            var base;
            var bcr;
            var fallback = ""; // optional fallback URL in case no base path to SVG file was given and no symbol definition was found.
            var hash;
            var href;
            var i;
            var inProgressCount = 0;
            var isHidden;
            var Request;
            var url;
            var uses;
            var xhr;

            function observeIfDone() {
                // If done with making changes, start watching for chagnes in DOM again
                inProgressCount -= 1;
                if (inProgressCount === 0) { // if all xhrs were resolved
                    unobserveChanges(); // make sure to remove old handlers
                    observeChanges(); // watch for changes to DOM
                }
            }

            function attrUpdateFunc(spec) {
                return function () {
                    if (cache[spec.base] !== true) {
                        spec.useEl.setAttributeNS(xlinkNS, "xlink:href", "#" + spec.hash);
                        if (spec.useEl.hasAttribute("href")) {
                            spec.useEl.setAttribute("href", "#" + spec.hash);
                        }
                    }
                };
            }

            function onloadFunc(xhr) {
                return function () {
                    var body = document.body;
                    var x = document.createElement("x");
                    var svg;
                    xhr.onload = null;
                    x.innerHTML = xhr.responseText;
                    svg = x.getElementsByTagName("svg")[0];
                    if (svg) {
                        svg.setAttribute("aria-hidden", "true");
                        svg.style.position = "absolute";
                        svg.style.width = 0;
                        svg.style.height = 0;
                        svg.style.overflow = "hidden";
                        body.insertBefore(svg, body.firstChild);
                    }
                    observeIfDone();
                };
            }

            function onErrorTimeout(xhr) {
                return function () {
                    xhr.onerror = null;
                    xhr.ontimeout = null;
                    observeIfDone();
                };
            }

            unobserveChanges(); // stop watching for changes to DOM
            // find all use elements
            uses = document.getElementsByTagName("use");
            for (i = 0; i < uses.length; i += 1) {
                try {
                    bcr = uses[i].getBoundingClientRect();
                } catch (ignore) {
                    // failed to get bounding rectangle of the use element
                    bcr = false;
                }
                href = uses[i].getAttribute("href")
                    || uses[i].getAttributeNS(xlinkNS, "href")
                    || uses[i].getAttribute("xlink:href");
                if (href && href.split) {
                    url = href.split("#");
                } else {
                    url = ["", ""];
                }
                base = url[0];
                hash = url[1];
                isHidden = bcr && bcr.left === 0 && bcr.right === 0 && bcr.top === 0 && bcr.bottom === 0;
                if (bcr && bcr.width === 0 && bcr.height === 0 && !isHidden) {
                    // the use element is empty
                    // if there is a reference to an external SVG, try to fetch it
                    // use the optional fallback URL if there is no reference to an external SVG
                    if (fallback && !base.length && hash && !document.getElementById(hash)) {
                        base = fallback;
                    }
                    if (uses[i].hasAttribute("href")) {
                        uses[i].setAttributeNS(xlinkNS, "xlink:href", href);
                    }
                    if (base.length) {
                        // schedule updating xlink:href
                        xhr = cache[base];
                        if (xhr !== true) {
                            // true signifies that prepending the SVG was not required
                            setTimeout(attrUpdateFunc({
                                useEl: uses[i],
                                base: base,
                                hash: hash
                            }), 0);
                        }
                        if (xhr === undefined) {
                            Request = createRequest(base);
                            if (Request !== undefined) {
                                xhr = new Request();
                                cache[base] = xhr;
                                xhr.onload = onloadFunc(xhr);
                                xhr.onerror = onErrorTimeout(xhr);
                                xhr.ontimeout = onErrorTimeout(xhr);
                                xhr.open("GET", base);
                                xhr.send();
                                inProgressCount += 1;
                            }
                        }
                    }
                } else {
                    if (!isHidden) {
                        if (cache[base] === undefined) {
                            // remember this URL if the use element was not empty and no request was sent
                            cache[base] = true;
                        } else if (cache[base].onload) {
                            // if it turns out that prepending the SVG is not necessary,
                            // abort the in-progress xhr.
                            cache[base].abort();
                            delete cache[base].onload;
                            cache[base] = true;
                        }
                    } else if (base.length && cache[base]) {
                        setTimeout(attrUpdateFunc({
                            useEl: uses[i],
                            base: base,
                            hash: hash
                        }), 0);
                    }
                }
            }
            uses = "";
            inProgressCount += 1;
            observeIfDone();
        };
        var winLoad;
        winLoad = function () {
            window.removeEventListener("load", winLoad, false); // to prevent memory leaks
            tid = setTimeout(checkUseElems, 0);
        };
        if (document.readyState !== "complete") {
            // The load event fires when all resources have finished loading, which allows detecting whether SVG use elements are empty.
            window.addEventListener("load", winLoad, false);
        } else {
            // No need to add a listener if the document is already loaded, initialize immediately.
            winLoad();
        }
    }
}());
//SPRITE COLOR END