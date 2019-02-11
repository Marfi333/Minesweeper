/**
 * Field Generator class
 */
class Field
{
    constructor( _coordinates, _type, _size )
    {
        this.SIZE = _size;
        this.COORDINATES = _coordinates;
        this.TYPE = null;
        if ( this.getTypes().includes( _type ) )
        {
            this.TYPE = _type;
        }
    }

    getTypes()
    {
        return [
            "empty",
            "unrevealed",
            "mine",
            "flag",
            "number"
        ];
    }

    createElement( num )
    {
        if ( this.TYPE === null )
            throw "Type cannot be null";

        let element = document.createElement( "div" );
            element.classList.add( "field" );
            element.classList.add( `field-${this.SIZE}` );
            element.classList.add( this.TYPE );
            element.dataset.x = this.COORDINATES.getX();
            element.dataset.y = this.COORDINATES.getY();
            element.dataset.type = this.TYPE;
            element.addEventListener( "click", fieldAction );
            element.addEventListener( "contextmenu", fieldAction );
            element.addEventListener( "press", fieldAction );

            element.classList.add("animated");
            element.style.animationDuration = "0.5s";

        if ( num !== undefined )
        {
            console.log(3);
            let p = document.createElement( "p" );
            p.innerText = num

            element.appendChild( p );
            element.classList.add( "unselectable" );
        }

        if ( this.TYPE === "mine" )
        {
            let mine = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bomb" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-bomb fa-w-16 fa-9x"><path fill="currentColor" d="M440.5 88.5l-52 52L415 167c9.4 9.4 9.4 24.6 0 33.9l-17.4 17.4c11.8 26.1 18.4 55.1 18.4 85.6 0 114.9-93.1 208-208 208S0 418.9 0 304 93.1 96 208 96c30.5 0 59.5 6.6 85.6 18.4L311 97c9.4-9.4 24.6-9.4 33.9 0l26.5 26.5 52-52 17.1 17zM500 60h-24c-6.6 0-12 5.4-12 12s5.4 12 12 12h24c6.6 0 12-5.4 12-12s-5.4-12-12-12zM440 0c-6.6 0-12 5.4-12 12v24c0 6.6 5.4 12 12 12s12-5.4 12-12V12c0-6.6-5.4-12-12-12zm33.9 55l17-17c4.7-4.7 4.7-12.3 0-17-4.7-4.7-12.3-4.7-17 0l-17 17c-4.7 4.7-4.7 12.3 0 17 4.8 4.7 12.4 4.7 17 0zm-67.8 0c4.7 4.7 12.3 4.7 17 0 4.7-4.7 4.7-12.3 0-17l-17-17c-4.7-4.7-12.3-4.7-17 0-4.7 4.7-4.7 12.3 0 17l17 17zm67.8 34c-4.7-4.7-12.3-4.7-17 0-4.7 4.7-4.7 12.3 0 17l17 17c4.7 4.7 12.3 4.7 17 0 4.7-4.7 4.7-12.3 0-17l-17-17zM112 272c0-35.3 28.7-64 64-64 8.8 0 16-7.2 16-16s-7.2-16-16-16c-52.9 0-96 43.1-96 96 0 8.8 7.2 16 16 16s16-7.2 16-16z" class=""></path></svg>';

            element.innerHTML = mine;
        }

        if ( this.TYPE === "flag" )
        {
            let flag = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="flag-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-flag-alt fa-w-16 fa-9x"><path fill="currentColor" d="M32 0C14.3 0 0 14.3 0 32v464c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V32C64 14.3 49.7 0 32 0zm430.6 4.2C291.3 91.5 305.4-62.2 96 32.4V384c185.7-92.2 221.7 53.3 397.5-23.1 11.4-5 18.5-16.5 18.5-28.8V30.8c0-25.1-26.8-38.1-49.4-26.6z" class=""></path></svg>';

            element.innerHTML = flag;
        }

        return element;
    }

    
    static findElementByCoordinates( _coord, _container )
    {
        let Node;

        _container.childNodes[1].childNodes.forEach( node => {
            if( node.dataset.x == _coord.getX() && node.dataset.y == _coord.getY() )
            {
                //console.log(node);
                Node = node;
            }
        });

        return Node;
    }

    static findElementByType( _type, _container )
    {
        if ( !this.getTypes().includes( _type ) )
            return false;

        let Node = [];

        _container.childNodes[1].childNodes.forEach( node => {
            if ( node.dataset.type == _type )
            {
                Node.push( node );
            }
        });

        return Node;
    }
}