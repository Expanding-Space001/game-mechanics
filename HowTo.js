Game.HowTo = function(game){

};

Game.HowTo.prototype = {
  preload:function (){
    var HowToBackg = game.add.image(0,0,'HowToBackg');

    this.createButton(game, game.world.centerX + 415, game.world.centerY - 260,300,100,
    function(){
      this.state.start('MainMenu');
    });
  },

  update:function (){

  },

    createButton:function(game,x,y,w,h,callback){
      var button1 = game.add.button(x,y,'Terug',callback,this,2,1,0);

      button1.anchor.setTo(0.5,0.5);
      button1.width = w;
      button1.height = h;
      button1.scale.setTo(0.65,0.65);
  }

}
