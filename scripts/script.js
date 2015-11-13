'use strict';

var _temporalUndefined = {};

function _temporalAssertDefined(val, name, undef) { if (val === undef) { throw new ReferenceError(name + ' is not defined - temporal dead zone'); } return true; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

(function () {
    'use strict';
    var key = _temporalUndefined,
        idsProcessed = _temporalUndefined,
        idsCached = _temporalUndefined;
    key = 'AIzaSyAQ3pfh8dLvdLYX3SDN7feWUPNcygBi4Ck';
    idsProcessed = new Set();
    idsCached = new Map();
    chrome.runtime.onConnect.addListener(function (port) {
        port.onMessage.addListener(function (idsReceived) {
            var idsNew = _temporalUndefined,
                idsOld = _temporalUndefined;
            idsNew = idsReceived.filter(function (id) {
                return !(_temporalAssertDefined(idsProcessed, 'idsProcessed', _temporalUndefined) && idsProcessed).has(id);
            });
            idsOld = idsReceived.filter(function (id) {
                return (_temporalAssertDefined(idsCached, 'idsCached', _temporalUndefined) && idsCached).has(id);
            });
            if ((_temporalAssertDefined(idsNew, 'idsNew', _temporalUndefined) && idsNew).length) {
                (function () {
                    var request = _temporalUndefined;
                    request = new XMLHttpRequest();

                    _temporalAssertDefined(_temporalAssertDefined(idsProcessed, 'idsProcessed', _temporalUndefined) && idsProcessed, 'idsProcessed', _temporalUndefined);

                    idsProcessed = new Set([].concat(_toConsumableArray(_temporalAssertDefined(_temporalAssertDefined(idsProcessed, 'idsProcessed', _temporalUndefined) && idsProcessed, 'idsProcessed', _temporalUndefined) && _temporalAssertDefined(idsProcessed, 'idsProcessed', _temporalUndefined) && idsProcessed), _toConsumableArray(_temporalAssertDefined(idsNew, 'idsNew', _temporalUndefined) && idsNew)));

                    _temporalAssertDefined(_temporalAssertDefined(idsNew, 'idsNew', _temporalUndefined) && idsNew, 'idsNew', _temporalUndefined);

                    idsNew = (_temporalAssertDefined(_temporalAssertDefined(idsNew, 'idsNew', _temporalUndefined) && idsNew, 'idsNew', _temporalUndefined) && _temporalAssertDefined(idsNew, 'idsNew', _temporalUndefined) && idsNew).join(',');

                    (_temporalAssertDefined(_temporalAssertDefined(request, 'request', _temporalUndefined) && request, 'request', _temporalUndefined) && _temporalAssertDefined(request, 'request', _temporalUndefined) && request).onreadystatechange = function () {
                        if ((_temporalAssertDefined(_temporalAssertDefined(request, 'request', _temporalUndefined) && request, 'request', _temporalUndefined) && _temporalAssertDefined(request, 'request', _temporalUndefined) && request).readyState === 4) {
                            if ((_temporalAssertDefined(_temporalAssertDefined(request, 'request', _temporalUndefined) && request, 'request', _temporalUndefined) && _temporalAssertDefined(request, 'request', _temporalUndefined) && request).status === 200) {
                                var response = _temporalUndefined;
                                response = JSON.parse((_temporalAssertDefined(_temporalAssertDefined(request, 'request', _temporalUndefined) && request, 'request', _temporalUndefined) && _temporalAssertDefined(request, 'request', _temporalUndefined) && request).responseText);
                                if ((_temporalAssertDefined(response, 'response', _temporalUndefined) && response).pageInfo.totalResults) {
                                    (function () {
                                        var videos = _temporalUndefined;
                                        videos = [];
                                        (_temporalAssertDefined(response, 'response', _temporalUndefined) && response).items.forEach(function (video) {
                                            video.statistics.likePercent = parseInt(video.statistics.likeCount) * 100;
                                            video.statistics.likePercent /= parseInt(video.statistics.likeCount) + parseInt(video.statistics.dislikeCount);
                                            video.statistics.likePercent = Math.round(video.statistics.likePercent);
                                            (_temporalAssertDefined(_temporalAssertDefined(videos, 'videos', _temporalUndefined) && videos, 'videos', _temporalUndefined) && _temporalAssertDefined(videos, 'videos', _temporalUndefined) && videos).push(video);
                                            (_temporalAssertDefined(idsCached, 'idsCached', _temporalUndefined) && idsCached).set(video.id, video);
                                        });
                                        port.postMessage(_temporalAssertDefined(_temporalAssertDefined(videos, 'videos', _temporalUndefined) && videos, 'videos', _temporalUndefined) && _temporalAssertDefined(videos, 'videos', _temporalUndefined) && videos);
                                    })();
                                }
                            }
                        }
                    };
                    (_temporalAssertDefined(_temporalAssertDefined(request, 'request', _temporalUndefined) && request, 'request', _temporalUndefined) && _temporalAssertDefined(request, 'request', _temporalUndefined) && request).open('GET', 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + (_temporalAssertDefined(idsNew, 'idsNew', _temporalUndefined) && idsNew) + '&key=' + (_temporalAssertDefined(key, 'key', _temporalUndefined) && key), true);
                    (_temporalAssertDefined(_temporalAssertDefined(request, 'request', _temporalUndefined) && request, 'request', _temporalUndefined) && _temporalAssertDefined(request, 'request', _temporalUndefined) && request).send();
                })();
            }
            if ((_temporalAssertDefined(idsOld, 'idsOld', _temporalUndefined) && idsOld).length) {
                port.postMessage((_temporalAssertDefined(idsOld, 'idsOld', _temporalUndefined) && idsOld).map(function (id) {
                    return (_temporalAssertDefined(idsCached, 'idsCached', _temporalUndefined) && idsCached).get(id);
                }));
            }
        });
    });
})();