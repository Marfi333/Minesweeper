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
};
let DIFFICULTY = "easy";
let GAME;