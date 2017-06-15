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

      game.load.spritesheet('shoot','Images/Sprites/goodfire.png',100,50,20);

      this.load.image('background','Background/bg.png');

      game.load.image('bullet', 'Images/Sprites/Bark.png');
      game.load.image('enemyBullet', 'Images/Sprites/Laser.png');
      game.load.image('enemy','Images/Sprites/Alien.png');
      game.load.image('rock2','Images/Sprites/rock2.png');
      game.load.image('laika_idle','Images/Sprites/laika_idle.png');
      game.load.image('albert', 'Images/Sprites/albert.png');
      game.load.image('laika_die','Images/Sprites/laikaDead.png');
      game.load.image('laikaAttack','Images/Sprites/laikaAttack.png');
      game.load.image('LaikaHit','Images/Sprites/Laika_hit.png');

      //game.load.spritesheet('LaikaBark','Images/Sprites/LaikaBark.png',550,500,20);

  },

  create:function (){
    this.state.start('MainMenu');

  },

  update:function (){

  }

}
