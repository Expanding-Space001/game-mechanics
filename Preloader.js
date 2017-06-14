Game.Preloader = function(game){

};

Game.Preloader.prototype = {
  preload:function (){
      game.load.image('titlescreen','Images/Menu/titlescreen.png');
      game.load.image('win','Images/Menu/win.png');
      game.load.image('loading','Images/Menu/loading.png');
      game.load.image('HowTo','Images/Menu/HowToB.png');
      game.load.image('Play','Images/Menu/PlayB.png');
      game.load.image('HowToBackg','Images/Menu/HowTo.png');
      game.load.image('Terug','Images/Menu/terug.png');

      this.load.image('background','Background/bg.png');

      game.load.image('diamond', 'Images/Sprites/diamond.png');
      game.load.image('firstaid', 'Images/Sprites/firstaid.png');
      game.load.image('bullet', 'Images/Sprites/star.png');
      game.load.image('enemyBullet', 'Images/Sprites/star.png');
      game.load.image('enemy','Images/Sprites/Alien.png');
      game.load.image('rock2','Images/Sprites/rock2.png');
      game.load.image('laika_idle','Images/Sprites/laika_idle.png');
      game.load.image('albert', 'Images/Sprites/albert.png');
      game.load.image('dead','Images/Sprites/laikaDead.png');
      game.load.image('laikaAttack','Images/Sprites/laikaAttack.png');

      game.load.spritesheet('LaikaBark','Images/Sprites/LaikaBark.png',550,500,20);

  },

  create:function (){
    this.state.start('MainMenu');

  },

  update:function (){

  }

}
