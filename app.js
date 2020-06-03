new Vue({
  el: "#app",
  data: {
    state: {
      playerWon: false,
      playerAction: false,
      playerTurn: true,
    },
    width: "40%",
    color: "red",
    health: 200,
    player: {
      Health: 100,
      //min max attack formula to add some randomness
      simpleAttack: 30,
      specialAtack() {
        return this.simpleAttack + 20;
      },
      heal() {
        return 20;
      },
    },
    monster: {
      StartHealth: 100,
      Health: 100,
      simpleAttack: 15,
    },
    log: ["testas", "kaskas"],
    styleHealthBar: {
      backgroundColor: "green",
      margin: 0,
      color: "white",
      width: "50%",
    },
  },
  methods: {
    attackMonster() {
      this.monster.Health -= this.player.simpleAttack;
      const msg = `player hits Monster with Simple attack for ${this.player.simpleAttack} dmg`;
      this.addToLog(msg);
      this.attackPlayer();
    },
    attackMonsterSpecial() {
      this.monster.Health -= this.player.specialAtack();
      const msg = `player hits Monster with Special attack for ${this.player.specialAtack()} dmg`;
      this.addToLog(msg);
      this.attackPlayer();
    },
    //add red color to hp bar when plaeyr gets dmg
    attackPlayer() {
      this.player.Health -= this.monster.simpleAttack;
    },
    //Fix hea;l over 100
    healPlayer() {
      this.player.Health += this.player.heal();
      if (this.player.Health > 100) this.player.Health = 100;

      const msg = `player heals himself for +${this.player.heal()} HP`;
      this.addToLog(msg);
      this.state.playerAction = true;
      var that = this;
      setTimeout(function () {
        that.attackPlayer();
        that.state.playerAction = false;
      }, 1000);
    },
    //gets values and adds the to the array
    addToLog(argument) {
      this.log.unshift(argument);
    },
  },
  computed: {
    widthHealth() {
      if (this.monster.Health <= 0) {
        // alert("what");
        // var kaskas = document.getElementById("logas");
        // kaskas.style.display = "none";
        this.state.playerWon = !this.state.playerWon;
        setTimeout(function () {
          alert("You win!");
        }, 550);
        // alert("You win! after");
        this.monster.Health = 0;
        return this.monster.Health + "%";
      }

      return this.monster.Health + "%";
    },
    widthHealthPlayer() {
      // if (this.monster.Health <= 0) {
      //   // alert("what");
      //   var kaskas = document.getElementById("logas");
      //   kaskas.style.display = "none";
      //   this.state.playerWon = !this.state.playerWon;
      //   setTimeout(function () {
      //     alert("You win!");
      //   }, 550);
      //   // alert("You win! after");
      //   this.monster.Health = 0;
      //   return this.monster.Health + "%";
      // }
      return this.player.Health + "%";
    },
  },
  watch: {
    stateWon: function () {
      //this.monster.Health = 0;
    },
  },
});
