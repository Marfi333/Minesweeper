/**
 * Coordinates
 */
class Coordinates
{
    constructor( _x, _y )
    {
        this.X = _x;
        this.Y = _y;
    }

    setX( _x )
    {
        this.X = _x;
        return this;
    }

    setY( _y )
    {
        this.Y = _y;
        return this;
    }


    getX()
    {
        return this.X;
    }

    getY()
    {
        return this.Y;
    }


    equals( _coord )
    {
        if ( typeof _coord !== typeof this )
        {
            return false;
        }

        if ( _coord.getX() === this.X && _coord.getY() === this.Y )
        {
            return true;
        }

        return false;
    }
}