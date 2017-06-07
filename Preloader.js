Game.Preloader = function(game){

};

Game.Preloader.prototype = {
  preload:function (){
      this.load.image('titlescreen','Images/Menu/titlescreen.jpg');
      this.load.image('button','Images/Menu/button.png');
      this.load.image('win','Images/Menu/win.png');
      this.load.image('loading','Images/Menu/loading.png');

      this.load.image('background','Images/Background/bg.png');

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

  },

  create:function (){
    this.state.start('MainMenu');

  },

  update:function (){

  }

}
