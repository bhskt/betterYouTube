(function () {
    'use strict';
    let key = 'AIzaSyAQ3pfh8dLvdLYX3SDN7feWUPNcygBi4Ck',
        idsProcessed = new Set(),
        idsCached = new Map();
    chrome.runtime.onConnect.addListener(function (port) {
        port.onMessage.addListener(function (idsReceived) {
            let idsNew = idsReceived.filter((id) => !idsProcessed.has(id)),
                idsOld = idsReceived.filter((id) => idsCached.has(id));
            if(idsNew.length) {
                let request = new XMLHttpRequest();
                idsProcessed = new Set([...idsProcessed, ...idsNew]);
                idsNew = idsNew.join(',');
                request.onreadystatechange = function () {
                    if(request.readyState === 4) {
                        if(request.status === 200) {
                            let response = JSON.parse(request.responseText);
                            if(response.pageInfo.totalResults) {
                                let videos = [];
                                response.items.forEach(function (video) {
                                    video.statistics.likePercent = parseInt(video.statistics.likeCount) * 100;
                                    video.statistics.likePercent /= parseInt(video.statistics.likeCount) + parseInt(video.statistics.dislikeCount);
                                    video.statistics.likePercent = Math.round(video.statistics.likePercent);
                                    videos.push(video);
                                    idsCached.set(video.id, video)
                                });
                                port.postMessage(videos);
                            }
                        }
                    }
                };
                request.open('GET', 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + idsNew + '&key=' + key, true);
                request.send();
            }
            if(idsOld.length) {
                port.postMessage(idsOld.map((id) => idsCached.get(id)));
            }
        });
    });
})();