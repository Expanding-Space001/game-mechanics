Game.Preloader = function(game){

};

Game.Preloader.prototype = {
  preload:function (){
      this.load.image('titlescreen','Images/Menu/titlescreen.jpg');
      this.load.image('button','Images/Menu/button.png');
      this.load.image('win','Images/Menu/win.png');
      this.load.image('loading','Images/Menu/loading.png');

      //game.load.spritesheet('dead', 'Images/Sprites/goodDeath.png',50,50,16);
      game.load.spritesheet('shoot', 'Images/Sprites/goodfire.png',100,50,20);

      game.load.image('background','Images/Background/bg.png');

      game.load.image('diamond', 'Images/Sprites/diamond.png');
      game.load.image('firstaid', 'Images/Sprites/firstaid.png');
      game.load.image('bullet', 'Images/Sprites/star.png');
      game.load.image('enemyBullet', 'Images/Sprites/star.png');
      game.load.image('enemy','Images/Sprites/Alien.png');
      game.load.image('rock2','Images/Sprites/rock2.png');
      game.load.image('laika_idle','Images/Sprites/laika_idle.png');
      game.load.image('albert', 'Images/Sprites/albert.png');
      game.load.image('laika_die','Images/Sprites/laikaDead.png');
  },

  create:function (){
    this.state.start('MainMenu');

  },

  update:function (){

  }

}
