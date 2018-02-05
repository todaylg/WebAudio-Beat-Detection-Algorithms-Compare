/**
 * Helper to load a buffer
 * 
 * @param  {AudioContext} context the WebAudio API context
 * @param  {String} url     the url of the sound to load
 * @param  {Function} onLoad  callback to notify when the buffer is loaded and decoded
 * @param  {Function} onError callback to notify when an error occured
 */

function LoadBuffer (context, url, onLoad, onComplete, onError) {
    onLoad = onLoad || function (buffer) { }
    onError = onError || function () { }

    let request;
    if (url instanceof Blob) {
        request = new FileReader();
    } else {
        request = new XMLHttpRequest()
        request.open('GET', url, true)
        request.responseType = 'arraybuffer'
    }
    
    request.onload = function () {
        context.decodeAudioData(request.response, function (buffer) {//解码
            // callback
            onLoad(buffer)
        }, function () {
            // callback
            onError()
        })
        if(onComplete){//OfflineContext
            context.oncomplete = function(e) {//解码完成
                let buffer = e.renderedBuffer;
                onComplete(buffer);
            }
        }
    }
    request.send()
}

export default LoadBuffer;
