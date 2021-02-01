import LemonUtils from 'lemon-utils';
export default {
  throttle(fn, interval) {
      var _self = fn;
      var timer;
      var firstTime = true;
      return function () {
          var args = arguments;
          var _me = this;
          //如果是第一次调用不需要延迟执行
          if (firstTime) {
              _self.apply(_me, args);
              firstTime = false;
              return firstTime
          }
          if (timer) {
              return false;
          }
          timer = setTimeout(function () {
              clearTimeout(timer);
              timer = null;
              _self.apply(_me, args);
          }, interval || 300)
      }
  },
  playSound(id){
    let audio = document.querySelector("#" + id);
    audio && audio.play();
  },
  soundPlay(url){
    if(LemonUtils.UA.ios){
      // IOS webAudio播放无声音，调用start, 无声音
      this.playSound(url);
      return;
    }
    var map = {
      'right_mp3': 'http://file.lexislive.com.cn/resource/201812/498010b4-2363-4c9c-afa9-9708bbda6b4d.mp3',
      'error_mp3': 'http://file.lexislive.com.cn/resource/201812/fd57fe40-ee9d-4a02-ae4b-f69b86fcf738.mp3',
    }
    if(!map[url]){
      return;
    }
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    if(!AudioContext){
      return;
    }
    var context = new AudioContext();
    var source = null;
    var audioBuffer = null;
    function stopSound() {
        if (source) {
            source.noteOff(0); //立即停止
        }
    }
    function playSound() {
        source = context.createBufferSource();
        source.buffer = audioBuffer;
        // source.loop = true;
        source.connect(context.destination);
        // 立即播放 部分浏览器是noteOn()函数，用法相同
        if(source.start){
          source.start(0);
        }else if(source.noteOn){
          source.noteOn(0)
        } 
    }
    function initSound(arrayBuffer) {
        context.decodeAudioData(arrayBuffer, function(buffer) { //解码成功时的回调函数
            audioBuffer = buffer;
            playSound();
        }, function(e) { //解码出错时的回调函数
            console.log('Error decoding file', e);
        });
    }
    function loadAudioFile(url) {
        var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function(e) { //下载完成
            initSound(this.response);
        };
        xhr.send();
    }
    loadAudioFile(map[url])
  }
}