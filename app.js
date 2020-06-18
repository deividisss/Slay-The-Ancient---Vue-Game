/*Tasks To DO
    Make player looose
*/
new Vue({
  el: "#app",
  data: {
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
      //Add cooldown to special attack
      specialAtack() {
        return this.simpleAttack + 30;
      },
      heal() {
        return 70;
      },
      baseStats() {
        const Health = 100;
        this.Health = Health;
      },
    },
    monster: {
      StartHealth: 100,
      Health: 100,
      simpleAttack: 40,
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
      this.state.playerAction = true;
      if (this.monster.Health > 0) {
        var that = this;
        setTimeout(function () {
          that.player.Health -= that.monster.simpleAttack;
          const msg = `monster hits player for ${that.monster.simpleAttack} dmg`;
          that.addToLog(msg, "monster");
          that.state.playerAction = false;
        }, 1000);
      } else {
        this.state.playerAction = false;
      }
    },
    healPlayer() {
      this.player.Health += this.player.heal();
      if (this.player.Health > 100) this.player.Health = 100;

      const msg = `player heals himself for +${this.player.heal()} HP`;
      this.addToLog(msg, "player");

      this.attackPlayer();
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
        }, 800);
        this.monster.Health = 0;
        return this.monster.Health + "%";
      }

      return this.monster.Health + "%";
    },
    widthHealthPlayer() {
      if (this.player.Health <= 0) {
        this.state.playerWon = !this.state.playerWon;
        var that = this;
        setTimeout(function () {
          if (confirm("You Loose game")) {
            that.startNewGame();
          } else {
            that.state.gameInProgress = false;
          }
        }, 800);
        this.player.Health = 0;
        return this.player.Health + "%";
      }

      return this.player.Health + "%";
      //return this.player.Health + "%";
    },
  },
  watch: {
    stateWon: function () {
      //this.monster.Health = 0;
    },
  },
});
