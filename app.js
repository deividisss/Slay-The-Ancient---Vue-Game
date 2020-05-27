new Vue({
  el: "#app",
  data: {
    stateWon: false,
    width: "40%",
    color: "red",
    health: 200,
    player: {
      Health: 100,
      simpleAttack: 50,
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
      console.log(this.monster.Health);
      console.log(this.player.specialAtack());
    },
  },
  computed: {
    widthHealth() {
      if (this.monster.Health <= 0) {
        var kaskas = document.getElementById("logas");
        kaskas.style.display = "none";
        this.stateWon = !this.stateWon;
        setTimeout(function () {
          alert("You win!");
        }, 500);

        return this.monster.Health + "%";
      }
      return this.monster.Health + "%";
    },
  },
  watch: {
    stateWon: function () {
      this.monster.Health = 0;
    },
  },
});
