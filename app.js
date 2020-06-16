new Vue({
  el: "#app",
  data: {
    //Make computed state variables
    state: {
      showStates: true,
      playerWon: false,
      playerAction: false,
      playerTurn: true,
      gameInProgress: false,
    },
    width: "40%",
    color: "red",
    health: 200,
    player: {
      Health: 100,
      //min max attack formula to add some randomness
      simpleAttack: 30,
      specialAtack() {
        return this.simpleAttack + 500;
      },
      heal() {
        return 20;
      },
      baseStats() {
        const Health = 100;
        this.Health = Health;
      },
    },
    monster: {
      StartHealth: 100,
      Health: 100,
      simpleAttack: 15,
      baseStats() {
        const Health = 100;
        this.Health = Health;
      },
    },
    log: [],
    styleHealthBar: {
      backgroundColor: "green",
      margin: 0,
      color: "white",
      width: "50%",
    },
  },
  methods: {
    startNewGame() {
      // alert("Game Restarted");
      this.player.baseStats();
      this.monster.baseStats();
      this.log = [];

      this.state.gameInProgress = !this.state.gameInProgress;
      this.state.playerWon = false;
    },
    attackMonster() {
      this.monster.Health -= this.player.simpleAttack;
      const msg = `player hits Monster with Simple attack for ${this.player.simpleAttack} dmg`;
      const person = "player";
      this.addToLog(msg, person);
      this.attackPlayer();
    },
    attackMonsterSpecial() {
      this.monster.Health -= this.player.specialAtack();
      const msg = `player hits Monster with Special attack for ${this.player.specialAtack()} dmg`;
      this.addToLog(msg, "player");
      this.attackPlayer();
    },
    attackPlayer() {
      this.player.Health -= this.monster.simpleAttack;
      const msg = `monster hits player for ${this.monster.simpleAttack} dmg`;
      this.addToLog(msg, "monster");
    },
    healPlayer() {
      this.player.Health += this.player.heal();
      if (this.player.Health > 100) this.player.Health = 100;

      const msg = `player heals himself for +${this.player.heal()} HP`;
      this.addToLog(msg, "player");

      //DRY action
      this.state.playerAction = true;
      var that = this;
      setTimeout(function () {
        that.attackPlayer();
        that.state.playerAction = false;
      }, 1000);
    },
    addToLog(msg, person) {
      class LogMsg {
        constructor(msg, person) {
          this.msg = msg;
          this.person = person;
        }
      }
      let logMsg = new LogMsg(msg, person);
      console.log(logMsg);

      // this.log.unshift({ msg: msg, person: person });
      this.log.unshift(logMsg);
      console.log(this.log);
    },
    stateStyle(data) {
      // alert(data);

      return "color:red";
    },
  },
  computed: {
    widthHealth() {
      if (this.monster.Health <= 0) {
        this.state.playerWon = !this.state.playerWon;
        var that = this;
        setTimeout(function () {
          if (confirm("You win game")) {
            that.startNewGame();
          } else {
            that.state.gameInProgress = false;
          }
        }, 550);
        this.monster.Health = 0;
        return this.monster.Health + "%";
      }

      return this.monster.Health + "%";
    },
    //Make paleyr loose !!!
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
