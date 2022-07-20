
const targetNode = document.querySelector('#content');

const config = { attributes: true, childList: true, subtree: true, characterDataOldValue: true};

const callback = function(mutationList, observer) {
    for(const mutation of mutationList) {
        for(let node of mutation.addedNodes) {
            if (!(node instanceof HTMLElement)) continue;
            
            if (node.matches('[id*="dismissible"]')) { 
                if(node.className == 'style-scope ytd-shelf-renderer'){
                    if(node.querySelector('#title').innerText == 'Today'){
                        node.hidden = true;
                    }
                }
            }
        }
    }
};

const observer = new MutationObserver(callback);

observer.observe(targetNode, config);

// Later, you can stop observing
// observer.disconnect();

