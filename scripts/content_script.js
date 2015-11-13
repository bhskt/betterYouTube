'use strict';

var _temporalUndefined = {};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _temporalAssertDefined(val, name, undef) { if (val === undef) { throw new ReferenceError(name + ' is not defined - temporal dead zone'); } return true; }

(function () {
    'use strict';
    var findParent = _temporalUndefined,
        port = _temporalUndefined;

    findParent = function findParent(node, query) {
        var parent = _temporalUndefined;
        parent = node.parentElement;
        while (_temporalAssertDefined(parent, 'parent', _temporalUndefined) && parent && !(_temporalAssertDefined(parent, 'parent', _temporalUndefined) && parent).matches(query)) {
            _temporalAssertDefined(_temporalAssertDefined(parent, 'parent', _temporalUndefined) && parent, 'parent', _temporalUndefined);

            parent = (_temporalAssertDefined(_temporalAssertDefined(parent, 'parent', _temporalUndefined) && parent, 'parent', _temporalUndefined) && _temporalAssertDefined(parent, 'parent', _temporalUndefined) && parent).parentElement;
        }
        return _temporalAssertDefined(parent, 'parent', _temporalUndefined) && parent;
    };

    port = chrome.runtime.connect();
    (_temporalAssertDefined(port, 'port', _temporalUndefined) && port).onMessage.addListener(function (videos) {
        console.log(videos);
        videos.forEach(function (video) {
            var thumbnails = _temporalUndefined;
            thumbnails = document.body.getElementsByTagName('img');
            for (var thumbnailsCount = 0; thumbnailsCount < (_temporalAssertDefined(thumbnails, 'thumbnails', _temporalUndefined) && thumbnails).length; thumbnailsCount += 1) {
                var thumbnail = _temporalUndefined,
                    a = _temporalUndefined;
                thumbnail = (_temporalAssertDefined(thumbnails, 'thumbnails', _temporalUndefined) && thumbnails).item(_temporalAssertDefined(thumbnailsCount, 'thumbnailsCount', _temporalUndefined) && thumbnailsCount);
                a = (_temporalAssertDefined(findParent, 'findParent', _temporalUndefined) && findParent)(_temporalAssertDefined(thumbnail, 'thumbnail', _temporalUndefined) && thumbnail, 'a[href*="watch?v=' + video.id + '"]');
                if (_temporalAssertDefined(a, 'a', _temporalUndefined) && a) {

                    var byt = _temporalUndefined;
                    byt = document.createElement('div');
                    (_temporalAssertDefined(byt, 'byt', _temporalUndefined) && byt).setAttribute('class', 'better-youtube-0');
                    (_temporalAssertDefined(byt, 'byt', _temporalUndefined) && byt).innerHTML = '<div class="byt-like-percent" style="width:' + video.statistics.likePercent + '%;"></div>';
                    (_temporalAssertDefined(thumbnail, 'thumbnail', _temporalUndefined) && thumbnail).parentNode.insertBefore(_temporalAssertDefined(byt, 'byt', _temporalUndefined) && byt, _temporalAssertDefined(thumbnail, 'thumbnail', _temporalUndefined) && thumbnail);
                }
            }
        });
    });
    new MutationObserver(function (mutations) {
        var ids = _temporalUndefined;
        ids = new Set();
        mutations.forEach(function (mutation) {
            for (var addedNodesCount = 0; addedNodesCount < mutation.addedNodes.length; addedNodesCount += 1) {
                if (typeof mutation.addedNodes.item(_temporalAssertDefined(addedNodesCount, 'addedNodesCount', _temporalUndefined) && addedNodesCount).querySelectorAll === 'function') {
                    var thumbnails = _temporalUndefined;
                    thumbnails = mutation.addedNodes.item(_temporalAssertDefined(addedNodesCount, 'addedNodesCount', _temporalUndefined) && addedNodesCount).getElementsByTagName('img');
                    for (var thumbnailsCount = 0; thumbnailsCount < (_temporalAssertDefined(thumbnails, 'thumbnails', _temporalUndefined) && thumbnails).length; thumbnailsCount += 1) {
                        var a = _temporalUndefined;
                        a = (_temporalAssertDefined(findParent, 'findParent', _temporalUndefined) && findParent)((_temporalAssertDefined(thumbnails, 'thumbnails', _temporalUndefined) && thumbnails).item(_temporalAssertDefined(thumbnailsCount, 'thumbnailsCount', _temporalUndefined) && thumbnailsCount), 'a[href*="watch?v="]');
                        if (_temporalAssertDefined(a, 'a', _temporalUndefined) && a) {
                            var id = _temporalUndefined;
                            id = (_temporalAssertDefined(a, 'a', _temporalUndefined) && a).href.match(/watch\?v=([A-Z0-9_\-]{11})/i);
                            if (_temporalAssertDefined(id, 'id', _temporalUndefined) && id && (_temporalAssertDefined(id, 'id', _temporalUndefined) && id)[1]) {
                                _temporalAssertDefined(_temporalAssertDefined(id, 'id', _temporalUndefined) && id, 'id', _temporalUndefined);

                                id = (_temporalAssertDefined(_temporalAssertDefined(id, 'id', _temporalUndefined) && id, 'id', _temporalUndefined) && _temporalAssertDefined(id, 'id', _temporalUndefined) && id)[1];

                                (_temporalAssertDefined(ids, 'ids', _temporalUndefined) && ids).add(_temporalAssertDefined(id, 'id', _temporalUndefined) && id);
                                if ((_temporalAssertDefined(ids, 'ids', _temporalUndefined) && ids).size === 20) {
                                    (_temporalAssertDefined(port, 'port', _temporalUndefined) && port).postMessage([].concat(_toConsumableArray(_temporalAssertDefined(ids, 'ids', _temporalUndefined) && ids)));
                                    (_temporalAssertDefined(ids, 'ids', _temporalUndefined) && ids).clear();
                                }
                            }
                        }
                    }
                }
            }
        });
        if ((_temporalAssertDefined(ids, 'ids', _temporalUndefined) && ids).size) {
            (_temporalAssertDefined(port, 'port', _temporalUndefined) && port).postMessage([].concat(_toConsumableArray(_temporalAssertDefined(ids, 'ids', _temporalUndefined) && ids)));
        }
    }).observe(document, { childList: true, subtree: true });
})();