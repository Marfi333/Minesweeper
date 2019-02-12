class Audion
{
  constructor()
  {
    this.menuButtonSound = this.getMenuButtonSound;
    this.revealButtonSound = this.getRevealButtonSound;
    this.boomSound = this.getBoomSound;
  }


  menuButtonPress()
  {
    this.menuButtonSound.play();
  }

  revealButtonPress()
  {
    this.revealButtonSound.play();
  }

  boomSoundPlay()
  {
    this.boomSound.play();
  }


  get getMenuButtonSound()
  {
    return new Audio( document.location.toString().replace("index.html", "") + 'assets/sounds/menu_button.mp3' );
  }

  get getRevealButtonSound()
  {
    return new Audio( document.location.toString().replace("index.html", "") + 'assets/sounds/reveal_button.mp3' );
  }

  get getBoomSound()
  {
    return new Audio( document.location.toString().replace("index.html", "") + 'assets/sounds/boom.mp3' );
  }
}
