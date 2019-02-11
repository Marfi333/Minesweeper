/**
 * Main functions
 */

const switchPane = element => {
    let elements = [
        MENU.firstScreen,
        MENU.secondScreen
    ];
    
    elements.forEach( item => {
        if ( item === element )
        {
            item.classList.remove( "hidden" );
            item.classList.remove( "fadeOutLeft" );
            item.classList.add("fadeInRight");
            document.getElementById( item.dataset.screen ).classList.add( "active" );
            setTimeout(() => {
                item.style.animationDelay = "0ms";
            }, 1300);
        }
        else
        {
            item.classList.remove( "fadeInRight" );
            item.classList.add( "fadeOutLeft" );
            document.getElementById( item.dataset.screen ).classList.remove( "active" );

            setTimeout(() => {
                item.classList.add( "hidden" );
            }, 500);

            setTimeout(() => {
                item.style.animationDelay = "300ms";
            }, 1300);
        }
    });

    
};

const toggleDifficulty = element => {
    elements = [
        document.getElementById( 'easy' ),
        document.getElementById( 'hard' )
    ].forEach( item => {
        if ( item === element )
        {
            item.classList.add( "active" );
            DIFFICULTY = item.id;
        }
        else
        {
            item.classList.remove( "active" );
        }
    });
};

const startGame = () => {
    GAME = new Game( DIFFICULTY );

    MENU.StartScreen.classList.remove( "fadeIn" );
    MENU.StartScreen.classList.add( "fadeOutLeft" );
    setTimeout(() => {
        MENU.StartScreen.classList.add( "hidden" );
        MENU.StartScreen.classList.remove( "fadeOutLeft" );
    }, 500);

    MENU.MainScreen.style.animationDelay = "400ms";
    MENU.MainScreen.classList.remove( "hidden" );
    MENU.MainScreen.classList.add( "fadeIn" );

    GAME.createMap();

    GAME.MINES.forEach( item => {
        let field = Field.findElementByCoordinates( item, MENU.FieldMap );
        field.classList.remove("unrevealed");
        field.classList.add("mine");
    });
};

const fieldAction = event => {
    event.preventDefault();
    let element = event.target;
    
    switch ( event.type )
    {
        case 'click':
        element.classList.add("flipOutY");
            break;

        case 'contextmenu':
            break;

        case 'press':
            break;
    }
};