new Vue({
  el: "#app",
  data: {
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
      Health: 100,
    },
    log: ["testas", "kaskas"],
    styleHealthBar: {
      backgroundColor: "green",
      margin: 0,
      // color: "white",
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
        return this.monster.Health + "%";
      }
      return this.monster.Health + "%";
    },
  },
});
