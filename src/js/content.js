
const frame = document.querySelector('#content');
console.log(frame);

frame.addEventListener( 'DOMNodeInserted', function ( event ) {
    if( event.target.id == 'title' ) { 
        if(event.target.innerText === 'Today'){
            event.target.parentNode.parentNode.parentNode.parentNode.remove();
        }
    };
}, false );

