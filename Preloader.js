Game.Preloader = function(game){

};

Game.Preloader.prototype = {
  preload:function (){
      game.load.image('titlescreen','Images/Menu/titlescreen.png');
      game.load.image('win','Images/Menu/win.png');
      game.load.image('loading','Images/Menu/loading.png');
      game.load.image('LosingScreen','Images/Menu/LosingScreen.png');
      game.load.image('HowTo','Images/Menu/HowToB.png');
      game.load.image('Play','Images/Menu/PlayB.png');
      game.load.image('HowToBackg','Images/Menu/HowTo.png');
      game.load.image('Terug','Images/Menu/terug.png');
      game.load.image('TerugNaarMenu','Images/Menu/TerugNaarMenu.png');

      game.load.spritesheet('anim','Images/Sprites/animation_sheet.png',300,240,16);

      this.load.image('background','Background/bg.png');
      this.load.image('background2','Background/bg2.png');
      this.load.image('Aarde','Background/Aarde.png');
      this.load.image('Jupiter','Background/Jupiter.png');
      this.load.image('Mars','Background/Mars.png');
      this.load.image('Neptunus','Background/Neptunus.png');
      this.load.image('Saturnus','Background/Saturnus.png');
      this.load.image('Uranus','Background/Uranus.png');

      game.load.image('bullet', 'Images/Sprites/Bark.png');
      game.load.image('enemyBullet', 'Images/Sprites/Laser.png');
      game.load.image('enemy','Images/Sprites/Alien2.png');
      game.load.image('rock2','Images/Sprites/rock1.png');
      game.load.image('laika_idle','Images/Sprites/laika_idle.png');
      game.load.image('albert', 'Images/Sprites/albert.png');
      game.load.image('laika_die','Images/Sprites/laikaDead.png');
      game.load.image('laikaAttack','Images/Sprites/laikaAttack.png');
      game.load.image('LaikaHit','Images/Sprites/Laika_hit.png');
      game.load.image('laikaLives','Images/Sprites/LaikaLives.png');
      game.load.image('LifesUI','Images/Sprites/lifesUI.png');


  },

  create:function (){
    this.state.start('MainMenu');

  },

  update:function (){

  }

}
