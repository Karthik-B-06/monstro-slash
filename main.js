new Vue({
  el : '#app',
  data: {
    name:'',
    playerHealth: 65,
    monsterHealth: 25,
    gameIsRunning: false,
    show: false,
    turns: []
  },
  methods: {
    changeName: function(event) {
      this.name = event.target.value;
      this.show = true;
    },
    startGame: function() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.gameIsRunning = true;
      this.turns = [];
    },
    attack: function() {
      var damage = this.calcDamage(4, 15);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player attacks Monster. Damage Caused ' + damage + "." 
      });
      if(this.checkGameStatus()) return;
      this.monsterAttack();      
    },
    specialAttack: function() {
      var damage = this.calcDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Special Attack By Player. Damage Caused ' + damage + "." 
      });
      if(this.checkGameStatus()) return;
      this.monsterAttack();
    },
    heal: function() {
      if(this.playerHealth <= 88) {
        this.playerHealth += 12;
      } 
      else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: 'Player Heals' 
      });
      this.monsterAttack();
    },
    giveUp: function() {
      this.gameIsRunning = false;
      this.turns = [];
    },
    calcDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);      
    },
    monsterAttack: function() {
      var damage = this.calcDamage(5,17);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster attacks Player. Damage Caused ' + damage + "." 
      });
      if(this.checkGameStatus()) return;
    },
    checkGameStatus: function() {
      if(this.monsterHealth <= 0) {
        if(confirm('You Won..... !! New Game ??')) {
          this.startGame();
        }
        else {
          this.gameIsRunning = false;
        }
        return true;
      }
      else if(this.playerHealth <= 0) {
        if(confirm('You Lost..... :( !! Try Again ??')) {
          this.startGame();
        }
        else {
          this.gameIsRunning = false;
        }
        return true;
      }
    }
  }
})