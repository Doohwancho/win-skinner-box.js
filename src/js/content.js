
function getDateFromHours(time) {
  time = time.split(':');
  let now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
}

function timeComparer(option){
  let benchmark = new Date();
  benchmark.setHours(6,0,0); 

  let now = new Date();
  let youtubeTime = getDateFromHours(option.features.time.hourUnit);
  
  if(now - benchmark > 0){ //낮인데
    if(benchmark - youtubeTime > 0){ //youtube time이 새벽 0,1,2이면,
      return true; 
    } else { //youtube time이 밤 9,10,11시면,
      return (youtubeTime - now) > 0;
    }
  }
  else { //새벽인데
    //youtube time이 밤 9,10,11시면,
    if(youtubeTime - benchmark > 0){
      return false;
    } else {
      //youtube time이 새벽 0,1,2시면,
      return (youtubeTime - now) > 0;
    }
  }
}

function blockYoutube(){
  const targetNode = document.querySelector('#content');

    const config = { childList: true, subtree: true};

    const callback = function(mutationList, observer) {
        for(const mutation of mutationList) {

            for(let node of mutation.addedNodes) {
                if (!(node instanceof HTMLElement)) continue;
                
                if (node.matches('[id*="dismissible"]')) {
                    if(node.className == 'style-scope ytd-shelf-renderer'){
                        if(node.querySelector('#title').innerText == 'Today' || node.querySelector('#title').innerText == '오늘'|| node.querySelector('#title').innerText == '최근 업로드 순'|| node.querySelector('#title').innerText == 'Recent'){
                            node.hidden = true;
                            node.parentNode.parentNode.hidden = true;
                        } 
                    }
                }
            }
        }
    };

    const observer = new MutationObserver(callback);

    observer.observe(targetNode, config);
}

chrome.storage.sync.get({
  features: {
      time: {
          hourUnit: '00:00:00'
      }
    }
}, function(option){
  if(timeComparer(option)){ 
    blockYoutube();
  }
});