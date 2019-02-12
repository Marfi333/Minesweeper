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
    Timer.seconds = 0;

    MENU.FieldMap.innerHTML = "";
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
    GAME.createBackground();

    Timer.startTimer();
};

const fieldAction = event => {
    event.preventDefault();
    let element = event.target;
    
    switch ( event.type )
    {
        case 'click':
        element.classList.remove( "flag" );
        element.classList.add("fadeOut");
        element.classList.remove( "unrevealed" );
        element.dataset.type = "revealed";
        element.removeEventListener( "click", fieldAction );
        element.removeEventListener( "contextmenu", fieldAction );
        element.removeEventListener( "press", fieldAction );
        
        let coord = new Coordinates( parseInt( element.dataset.x ), parseInt( element.dataset.y ) );

        GAME.MINES.forEach( mine => {
            if ( mine.equals( coord ) )
            {
                gameOver();
            }
        });

            break;

        case 'contextmenu':
            if ( element.nodeName === "svg" ) element = element.parentNode;
            else if ( element.nodeName === "path" ) element = element.parentNode.parentNode; 

            if ( element.classList.contains( "flag" ) )
            {
                element.classList.remove( "flag" );
                element.classList.add( "unrevealed" );
                element.innerHTML = "";
            }
            else if ( GAME.FLAG_COUNTER <= GAME.MINES.length-1 )
            {
                element.classList.remove( "unrevealed" );
                element.classList.add( "flag" );
                element.innerHTML = Field.FLAG();
            }
            GAME.calculateFlags();
            break;

        case 'press':
            if ( element.classList.contains( "flag" ) )
            {
                element.classList.remove( "flag" );
                element.classList.add( "unrevealed" );
                element.innerHTML = "";
            }
            else if ( GAME.FLAG_COUNTER <= GAME.MINES.length-1 )
            {
                element.classList.remove( "unrevealed" );
                element.classList.add( "flag" );
                element.innerHTML = Field.FLAG();
            }
            GAME.calculateFlags();
            break;
    }

    if ( GAME.mapDiscover() ) gameWon();
};

const Timer = {
    timer: null,
    startTimer: () => {
        Timer.timer = setInterval( Timer.setTime, 1000 );
    },
    stopTimer: () => {
        clearInterval( Timer.timer );
    },
    setTime: () => {
        ++Timer.seconds;
        MENU.SecondsLabel.innerHTML = Timer.pad( Timer.seconds % 60 );
        MENU.MinutesLabel.innerHTML = Timer.pad( parseInt( Timer.seconds / 60 ) % 60 );
        MENU.HoursLabel.innerHTML = Timer.pad( parseInt( Timer.seconds / 60 / 60 ) );
    },
    pad: val => {
        let str = val + "";

        if ( str.length < 2 )
        {
            return "0" + str;
        }
        else
        {
            return str;
        }
    },
    seconds: 0
};

const pauseGame = ( action ) => {
    if ( action === 'pause' )
    {
        Timer.stopTimer();

        MENU.Blur.classList.remove( "hidden" );
        MENU.Main.classList.add( "blurred" );
        MENU.Blur.classList.add( "fadeIn" );
        
        document.getElementById( "pause" ).style.animationDuration = ".4s";
        document.getElementById( "pause" ).classList.remove( "hidden" );
        document.getElementById( "pause" ).classList.add( "fadeIn" );
    }
    else if ( action === 'resume' )
    {
        Timer.startTimer();
        document.getElementById( "pause" ).classList.remove( "fadeIn" );
        document.getElementById( "pause" ).style.animationDuration = ".2s";
        document.getElementById( "pause" ).classList.add( "fadeOut" );

        MENU.Blur.classList.remove( "fadeIn" );
        MENU.Blur.classList.add( "fadeOut" );

        MENU.Main.classList.remove( "blurred" );

        setTimeout(() => {
            MENU.Blur.classList.add( "hidden" );
            document.getElementById( "pause" ).classList.add( "hidden" );
            MENU.Blur.classList.remove( "fadeOut" );
            document.getElementById( "pause" ).classList.remove( "fadeOut" );
        }, 400);
    }
};

const newGame = () => {
    Timer.stopTimer();

    MENU.Blur.classList.remove( "hidden" );
    MENU.Main.classList.add( "blurred" );
    MENU.Blur.classList.add( "fadeIn" );
    
    document.getElementById( "newGame" ).style.animationDuration = ".4s";
    document.getElementById( "newGame" ).classList.remove( "hidden" );
    document.getElementById( "newGame" ).classList.add( "fadeIn" );
};

const createNewGame = () => {
    cancel();

    Timer.seconds = 0;
    Timer.stopTimer();

    MENU.MainScreen.style.animationDelay = "";
    MENU.MainScreen.classList.remove( "fadeIn" );
    MENU.MainScreen.classList.add( "fadeOut" );

    MENU.StartScreen.classList.remove( "hidden" );
    MENU.StartScreen.classList.add( "fadeIn" );

    setTimeout(() => {
        MENU.MainScreen.classList.add( "hidden" );
        MENU.MainScreen.classList.remove( "fadeOut" );
    }, 500);
};

const cancel = () => {
    Timer.startTimer();
    document.getElementById( "newGame" ).classList.remove( "fadeIn" );
    document.getElementById( "newGame" ).style.animationDuration = ".2s";
    document.getElementById( "newGame" ).classList.add( "fadeOut" );

    MENU.Alerts.forEach( alert => {
        alert.classList.remove( "fadeIn" );
        alert.style.animationDuration = ".2s";
        alert.classList.add( "fadeOut" );
    });

    MENU.Blur.classList.remove( "fadeIn" );
    MENU.Blur.classList.add( "fadeOut" );

    MENU.Main.classList.remove( "blurred" );

    setTimeout(() => {
        MENU.Blur.classList.add( "hidden" );
        MENU.Alerts.forEach( alert => {
            alert.classList.add( "hidden" );
        });

        MENU.Blur.classList.remove( "fadeOut" );
        MENU.Alerts.forEach( alert => {
            alert.classList.remove( "fadeOut" );
        });
    }, 400);
};

const gameOver = () => {
    Timer.stopTimer();

    GAME.MINES.forEach( mine => {
        let element = Field.findElementByCoordinates( mine, MENU.FieldMap );
        element.classList.add( "fadeOut" );
    }); 

    let mines = document.getElementsByClassName( "mine" );
    
    for ( let i in document.getElementsByClassName( "mine" ) )
    {
        let mines = document.getElementsByClassName( "mine" );
            if ( i === 'length' ) continue;

        if ( mines[i].style !== undefined )
        {
            mines[i].style.animationDuration = "1s";
            mines[i].classList.add( "heartBeat" );
        }
    }

    setTimeout(() => {
        MENU.Blur.classList.remove( "hidden" );
        MENU.Main.classList.add( "blurred" );
        MENU.Blur.classList.add( "fadeIn" );
        
        document.getElementById( "dead" ).style.animationDuration = ".4s";
        document.getElementById( "dead" ).classList.remove( "hidden" );
        document.getElementById( "dead" ).classList.add( "fadeIn" );
    }, 1500);
};

const gameWon = () => {
    Timer.stopTimer();

    let mines = document.getElementsByClassName( "mine" );
    
    GAME.MINES.forEach( mine => {
        let element = Field.findElementByCoordinates( mine, MENU.FieldMap );
        element.classList.add( "fadeOut" );
    }); 

    setTimeout(() => {
        MENU.Blur.classList.remove( "hidden" );
        MENU.Main.classList.add( "blurred" );
        MENU.Blur.classList.add( "fadeIn" );
        
        document.getElementById( "won" ).style.animationDuration = ".4s";
        document.getElementById( "won" ).classList.remove( "hidden" );
        document.getElementById( "won" ).classList.add( "fadeIn" );
    }, 1500);
};