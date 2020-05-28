new Vue({
  el: "#app",
  data: {
    stateWon: false,
    playerTurn: true,
    width: "40%",
    color: "red",
    health: 200,
    player: {
      Health: 100,
      simpleAttack: 30,
      specialAtack: function () {
        return this.simpleAttack + 5;
      },
    },
    monster: {
      StartHealth: 100,
      Health: 100,
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
      this.addToLog(this.player.simpleAttack);
      console.log(this.log);

      console.log(this.player.simpleAttack);
      console.log(this.player.specialAtack());
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
        var kaskas = document.getElementById("logas");
        kaskas.style.display = "none";
        this.stateWon = !this.stateWon;
        setTimeout(function () {
          alert("You win!");
        }, 550);
        // alert("You win! after");
        this.monster.Health = 0;
        return this.monster.Health + "%";
      }

      return this.monster.Health + "%";
    },
  },
  watch: {
    stateWon: function () {
      //this.monster.Health = 0;
    },
  },
});
