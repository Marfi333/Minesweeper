/**
 * Constants
 */

const MAIN = document.getElementsByTagName( 'main' )[0];
const MENU = {
    firstScreen: document.getElementsByClassName( 'firstScreen' )[0],
    secondScreen: document.getElementsByClassName( 'secondScreen' )[0],
    firstIndicator: document.getElementById( 'firstIndicator' ),
    secondIndicator: document.getElementById( 'secondIndicator' ),
    
    StartScreen: document.getElementById( 'StartScreen' ),
    MainScreen: document.getElementById( 'MainScreen' ),
    FieldMap: document.getElementById( 'FieldMap' ),

    HoursLabel: document.getElementsByClassName( 'hours' )[0],
    MinutesLabel: document.getElementsByClassName( 'minutes' )[0],
    SecondsLabel: document.getElementsByClassName( 'seconds' )[0],

    Blur: document.getElementsByTagName( 'blur' )[0],
    Main: document.getElementsByTagName( 'main' )[0],

    Alerts: [
        document.getElementById( "pause" ),
        document.getElementById( "newGame" ),
        document.getElementById( "dead" ),
        document.getElementById( "won" ),
    ],
    FlagStat: document.getElementById( "flagStat" ),
};

let DIFFICULTY = "easy";
let GAME;