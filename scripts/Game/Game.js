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
            container.classList.add( `s${this.MAP_SIZE}` );

        for ( let x = 0; x < this.MAP_SIZE; x++ )
        {
            for ( let y = 0; y < this.MAP_SIZE; y++ )
            {
                container.appendChild( (new Field( new Coordinates( x, y ), "unrevealed", this.MAP_SIZE )).createElement() );
            }
        }

        MENU.FieldMap.appendChild( container );
    }

    randomizeMines( _minesCount, _mapSize )
    {
        console.log(_minesCount);
        console.log(_mapSize);
        let mines = [];

        for ( let i = 0; i < _minesCount; i++ )
        {
            let coord;
            let inArray = false;

            /*do
            {
                coord = new Coordinates( this.rand( 0, _mapSize-1 ), this.rand( 0, _mapSize-1 ) );

                mines.forEach( item => {
                    if ( item.equals( coord ) )
                        inArray = true;
                });
            }
            while ( inArray );*/

            while ( !inArray )
            {
                coord = new Coordinates( this.rand( 0, _mapSize-1 ), this.rand( 0, _mapSize-1 ) );
                if ( !mines.includes(coord) )
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
}