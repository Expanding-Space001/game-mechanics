Game.Preloader = function(game){

};

Game.Preloader.prototype = {
  preload:function (){
      this.load.image('titlescreen','Images/Menu/titlescreen.jpg');
      this.load.image('button','Images/Menu/button.png');

      game.stage.backgroundColor = '#372900';

      game.load.image('diamond', 'Images/Sprites/diamond.png');
      game.load.image('firstaid', 'Images/Sprites/firstaid.png');
      game.load.image('bullet', 'Images/Sprites/star.png');
      game.load.image('enemyBullet', 'Images/Sprites/star.png');
      game.load.image('enemy','Images/Sprites/firstaid.png');

  },

  create:function (){
    this.state.start('MainMenu');

  },

  update:function (){

  }

}