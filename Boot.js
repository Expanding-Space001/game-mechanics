var Game = {};

Game.Boot = function(game){

};

Game.Boot.prototype = {
  init:function(){
    this.input.maxPointers = 1;
  },

  preload:function(){

  },

  create:function(){
    this.game.state.start('Preloader');
  }
}
