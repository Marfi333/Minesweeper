/**
 * Long-press eventhandler
 */

((window, document) => {
    'use strict';
    let timer = null;
    let isTouch = ( ( 'ontouchstart' in window ) || ( navigator.maxTouchPoints > 0 ) || ( navigator.msMaxTouchPoints > 0 ) );

    let mouseDown = isTouch ? 'touchstart' : 'mousedown';
    let mouseOut = isTouch ? 'touchcancel' : 'mouseout';
    let mouseUp = isTouch ? 'touchend' : 'mouseup';
    let mouseMove = isTouch ? 'touchmove' : 'mousemove';

    let mouseWheel = 'mousewheel';
    let wheel = 'wheel';
    let scrollEvent = 'scroll';


    if ( typeof window.PressEvent !== 'function' ) 
    {

        window.PressEvent = ( event, params ) => {
            params = params || { bubbles: false, cancelable: false, detail: undefined };

            let evt = document.createEvent( 'PressEvent' );
            evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );

            return evt;
        };

        window.PressEvent.prototype = window.Event.prototype;
    }

    document.addEventListener( mouseDown, e => {
        let el = e.target;
        let longPressDelay = parseInt( el.getAttribute('data-long-press-delay')  || '500', 10 );

        timer = setTimeout( fireLongPressEvent.bind( el ), longPressDelay );
    });

    document.addEventListener( mouseUp, e => {
        clearTimeout( timer );
    });

    document.addEventListener( mouseOut, e => {
        clearTimeout( timer );
    });

    document.addEventListener( mouseMove, e => {
        clearTimeout( timer );
    });

    document.addEventListener( mouseWheel, e => { 
        clearTimeout( timer );
    });

    document.addEventListener( wheel, e => { 
        clearTimeout( timer );
    });

    document.addEventListener( scrollEvent, e => { 
        clearTimeout( timer );
    });


    function fireLongPressEvent() 
    {
        this.dispatchEvent( new CustomEvent( 'press', { bubbles: true, cancelable: true } ) );
        clearTimeout( timer );
    }
})( this, document );
