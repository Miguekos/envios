<template>
  <div class="" id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  methods: {
    ...mapActions("registros", ["callRegistrosCount"])
  },
  created() {
    // this.$q.dark.set(true);
    // this.$q.addressbarColor.set('#667eea')
    this.$q.addressbarColor.set('#5b63a3');
    // this.callRegistrosCount();
  },
  mounted() {
    // this.$vs.setColor('primary', '#000')
  }
};
</script>
<style>
.principal {
  /*background-image: linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%);*/
  background-image: linear-gradient(
    -225deg,
    #7085b6 0%,
    #87a7d9 50%,
    #def3f8 100%
  );
}
</style>
