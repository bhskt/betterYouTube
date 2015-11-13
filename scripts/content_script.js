(function () {
    'use strict';
    let findParent = function (node, query) {
            let parent = node.parentElement;
            while(parent && !parent.matches(query)) {
                parent = parent.parentElement;
            }
            return parent;
        },
        port = chrome.runtime.connect();
    port.onMessage.addListener(function (videos) {
        console.log(videos);
        videos.forEach(function (video) {
            let thumbnails = document.body.getElementsByTagName('img');
            for(let thumbnailsCount = 0; thumbnailsCount < thumbnails.length; thumbnailsCount += 1) {
                let thumbnail = thumbnails.item(thumbnailsCount),
                    a = findParent(thumbnail, 'a[href*="watch?v=' + video.id + '"]');
                if(a) {
                    
                    let byt = document.createElement('div');
                    byt.setAttribute('class', 'better-youtube-0');
                    byt.innerHTML = '<div class="byt-like-percent" style="width:' + video.statistics.likePercent + '%;"></div>';
                    thumbnail.parentNode.insertBefore(byt, thumbnail);
                }
            }
        });
    });
    new MutationObserver(function (mutations) {
        let ids = new Set();
        mutations.forEach(function (mutation) {
            for(let addedNodesCount = 0; addedNodesCount < mutation.addedNodes.length; addedNodesCount += 1) {
                if(typeof mutation.addedNodes.item(addedNodesCount).querySelectorAll === 'function') {
                    let thumbnails = mutation.addedNodes.item(addedNodesCount).getElementsByTagName('img');
                    for(let thumbnailsCount = 0; thumbnailsCount < thumbnails.length; thumbnailsCount += 1) {
                        let a = findParent(thumbnails.item(thumbnailsCount), 'a[href*="watch?v="]');
                        if(a) {
                            let id = a.href.match(/watch\?v=([A-Z0-9_\-]{11})/i);
                            if(id && id[1]) {
                                id = id[1];
                                ids.add(id);
                            }
                        }
                    }
                }
            }
        });
        if(ids.size) {
            port.postMessage([...ids]);
        }
    }).observe(document, {childList: true, subtree: true});
})();