/**
 * Game
 */
class Game
{
    constructor( _difficulty )
    {
        this.DIFFICULTY = _difficulty;
        this.MAP_SIZE = this.countSize();
        this.MINES = this.randomizeMines( this.countMines(), this.MAP_SIZE );
        this.FLAG_COUNTER = 0;

        MENU.FlagStat.innerText = 0;
        document.getElementById( "maxFlags" ).innerText = this.MINES.length;
        MENU.HoursLabel.innerText = "00";
        MENU.MinutesLabel.innerText = "00";
        MENU.SecondsLabel.innerText = "00";
    }   

    setDifficulty( _difficulty )
    {
        if ( _difficulty !== undefined && ( _difficulty === "easy" || _difficulty === "hard" ) )
            this.DIFFICULTY = _difficulty;
    }

    countSize()
    {
        if ( this.DIFFICULTY === "easy" )
            return 9;
        else if ( this.DIFFICULTY === "hard" )
            return 16;
    }

    countMines()
    {
        if ( this.DIFFICULTY === "easy" )
            return 10;
        else if ( this.DIFFICULTY === "hard" )
            return 40;
    }

    createMap()
    {
        let container = document.createElement( "div" );
            container.classList.add( "grid" );
            container.classList.add( "fg" );
            container.classList.add( `s${this.MAP_SIZE}` );

        for ( let x = 0; x < this.MAP_SIZE; x++ )
        {
            for ( let y = 0; y < this.MAP_SIZE; y++ )
            {
                container.appendChild( (new Field( new Coordinates( x, y ), "unrevealed", this.MAP_SIZE )).createElement( null, true ) );
            }
        }

        MENU.FieldMap.appendChild( container );
    }

    createBackground()
    {
        let container = document.createElement( "div" );
            container.classList.add( "grid" );
            container.classList.add( "bg" );
            container.classList.add( `s${this.MAP_SIZE}` );

        for ( let x = 0; x < this.MAP_SIZE; x++ )
        {
            for ( let y = 0; y < this.MAP_SIZE; y++ )
            {
                let i = false;

                for ( let items in this.MINES )
                {
                    if ( this.MINES[items].equals(new Coordinates(x,y)) )
                    {
                        container.appendChild( (new Field( new Coordinates( x, y ), "mine", this.MAP_SIZE )).createElement( null, false, false ) );
                        i = true;
                    }
                }

                if ( !i )
                {
                    let coord = new Coordinates( x, y );
                    let neighbours = [];
                    let counter = 0;

                    if ( x > 0 ) neighbours.push( new Coordinates( x-1, y ) );
                    if ( x > 0 && y > 0 ) neighbours.push( new Coordinates( x-1, y-1 ) );
                    if ( y > 0 ) neighbours.push( new Coordinates( x, y-1 ) );
                    if ( x < this.MAP_SIZE-1 && y > 0 ) neighbours.push( new Coordinates( x+1, y-1 ) );
                    if ( y < this.MAP_SIZE-1 ) neighbours.push( new Coordinates( x+1, y ) );
                    if ( x < this.MAP_SIZE-1 && y < this.MAP_SIZE-1 ) neighbours.push( new Coordinates( x+1, y+1 ) );
                    if ( y < this.MAP_SIZE-1 ) neighbours.push( new Coordinates( x, y+1 ) );
                    if ( x > 0 && y < this.MAP_SIZE-1 ) neighbours.push( new Coordinates( x-1, y+1 ) );

                    neighbours.forEach( neighbour => {
                        this.MINES.forEach( mine => {
                            if ( neighbour.equals( mine ) ) counter++;
                        });
                    });

                    if ( counter === 0 )
                    {
                        container.appendChild( (new Field( new Coordinates( x, y ), "empty", this.MAP_SIZE )).createElement( null, false, false ) );
                        i = true;
                    }
                    else
                    {
                        container.appendChild( (new Field( new Coordinates( x, y ), "number", this.MAP_SIZE )).createElement( counter, false, false ) );
                        i = true;
                    }
                }
            }
        }

        MENU.FieldMap.appendChild( container );
    }

    recursiveDiscover( node )
    {
        let currentCoord = new Coordinates( node.dataset.x, node.dataset.y );
        let currentNode = Field.findBgElementByCoordinates( currentCoord, MENU.FieldMap );
        let returnMap = [];

        if ( currentNode.dataset.type === "number" || currentNode.dataset.type === "mine"  )
        {
            returnMap.push( currentNode );
        }
        else if ( currentNode.dataset.type === "empty" )
        {
            let neighbours = [ currentNode ];
            let has = [];
            //neighbours.push( currentNode );

            while ( neighbours.length > 0 )
            {
                for ( let neighbour of neighbours )
                {
                    console.log(neighbour);
                    let x = parseInt( neighbour.dataset.xy.split(";")[0] );
                    let y = parseInt( neighbour.dataset.xy.split(";")[1] );

                    if ( neighbour.dataset.type == "number" )
                    {
                        returnMap.push( neighbour );
                        has.push( neighbour );
                        neighbours.splice( neighbours.indexOf( neighbour ), 1 );
                    }

                    if ( neighbour.dataset.type == "mine" )
                    {
                        has.push( neighbour );
                        neighbours.splice( neighbours.indexOf( neighbour ), 1 );
                    }

                    if ( neighbour.dataset.type == "empty" )
                    {
                        if ( x > 0 && !has.includes( Field.findBgElementByCoordinates( new Coordinates( x-1, y ), MENU.FieldMap ) ) )
                        {
                            neighbours.push( Field.findBgElementByCoordinates( new Coordinates( x-1, y ), MENU.FieldMap ) );
                        }

                        if ( (x > 0 && y > 0) && !has.includes(Field.findBgElementByCoordinates( new Coordinates( x-1, y-1 ), MENU.FieldMap )) )
                        {
                            neighbours.push( Field.findBgElementByCoordinates( new Coordinates( x-1, y-1 ), MENU.FieldMap ) );
                        }

                        if ( y > 0 && !has.includes(Field.findBgElementByCoordinates( new Coordinates( x, y-1 ), MENU.FieldMap )) )
                        {
                            neighbours.push( Field.findBgElementByCoordinates( new Coordinates( x, y-1 ), MENU.FieldMap ) );
                        }

                        if ( (x < this.MAP_SIZE-1 && y > 0) && !has.includes(Field.findBgElementByCoordinates( new Coordinates( x+1, y-1 ), MENU.FieldMap )) )
                        {
                            neighbours.push( Field.findBgElementByCoordinates( new Coordinates( x+1, y-1 ), MENU.FieldMap ) );
                        }

                        if ( y < this.MAP_SIZE-1 && !has.includes(Field.findBgElementByCoordinates( new Coordinates( x+1, y ), MENU.FieldMap )) )
                        {
                            neighbours.push( Field.findBgElementByCoordinates( new Coordinates( x+1, y ), MENU.FieldMap ) );
                        }

                        if ( (x < this.MAP_SIZE-1 && y < this.MAP_SIZE-1) && !has.includes(Field.findBgElementByCoordinates( new Coordinates( x+1, y+1 ), MENU.FieldMap )) )
                        {
                            neighbours.push( Field.findBgElementByCoordinates( new Coordinates( x+1, y+1 ), MENU.FieldMap ) );
                        }

                        if ( y < this.MAP_SIZE-1 && !has.includes(Field.findBgElementByCoordinates( new Coordinates( x, y+1 ), MENU.FieldMap )) )
                        {
                            neighbours.push( Field.findBgElementByCoordinates( new Coordinates( x, y+1 ), MENU.FieldMap ) );
                        }

                        if ( (x > 0 && y < this.MAP_SIZE-1) && !has.includes(Field.findBgElementByCoordinates( new Coordinates( x-1, y+1 ), MENU.FieldMap )) )
                        {
                            neighbours.push( Field.findBgElementByCoordinates( new Coordinates( x-1, y+1 ), MENU.FieldMap ) );
                        }

                        returnMap.push( neighbour );
                        neighbours.splice( neighbours.indexOf( neighbour ), 1 );
                    }
                }
            }

            
        }

        return returnMap;
    }

    mapDiscover()
    {
        if ( document.getElementsByClassName( "unrevealed" ).length > this.MINES.length ) return false;


        let elements = [];

        for ( let e of document.getElementsByClassName( "unrevealed" ) )
        {
            elements.push( e );
        }

        for ( let e of document.getElementsByClassName( "flag" ) )
        {
            elements.push( e );
        }

        if ( elements.length > this.MINES.length ) return false;


        return true;
    }

    calculateFlags()
    {
        let flags = document.getElementsByClassName( "flag" );
        this.FLAG_COUNTER = flags.length;

        MENU.FlagStat.innerText = this.FLAG_COUNTER;
    }

    randomizeMines( _minesCount, _mapSize )
    {
        let mines = [];

        for ( let i = 0; i < _minesCount; i++ )
        {
            let coord = new Coordinates( this.rand( 0, _mapSize-1 ), this.rand( 0, _mapSize-1 ) );
            let inArray = true;

            while ( inArray )
            {
                let has = false;

                try 
                {
                    mines.forEach( item => {
                        if ( item.equals( coord ) )
                        {
                            has = true;
                            throw "break";
                        }
                    });
                }
                catch( e ) {}

                if ( has )
                {
                    coord = new Coordinates( this.rand( 0, _mapSize-1 ), this.rand( 0, _mapSize-1 ) );
                }
                else 
                {
                    inArray = false;
                }
            }

            mines.push( coord );
        }

        return mines;
    }

    rand( _min, _max )
    {
        return Math.floor( Math.random() * _max ) + _min;
    }

    static checkMine( coord )
    {
        this.MINES.forEach( mine => {
            if ( mine.equals( coord ) )
            {
                return true;
            }
        });

        return false;
    }
}