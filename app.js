new Vue({
  el: "#app",
  data: {
    health: 200,
    player: {
      Health: 100,
      simpleAttack: 5,
    },
    monster: {
      Health: 200,
    },
  },
  methods: {
    attackMonster: function () {
      this.monster.Health -= this.player.simpleAttack;
      console.log(this.monster.Health);
    },
  },
});
