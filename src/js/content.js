const targetNode = document.querySelector('#content');

const config = { childList: true, subtree: true};

const callback = function(mutationList, observer) {
    for(const mutation of mutationList) {

        for(let node of mutation.addedNodes) {
            if (!(node instanceof HTMLElement)) continue;
            
            if (node.matches('[id*="dismissible"]')) {
                if(node.className == 'style-scope ytd-shelf-renderer'){
                    if(node.querySelector('#title').innerText == 'Today'){
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

