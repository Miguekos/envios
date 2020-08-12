<template>
  <div v-if="info">
    <div class="text-center text-white">
<!--      Recojo-->
    </div>
    <GmapMap
      :center="center"
      :zoom="15"
      map-type-id="terrain"
      style="width: 280px; height: 280px;"
    >
      <GmapMarker
        v-for="(m, index) in markers"
        :key="`marker_${index}`"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
      <GmapCircle :center="center" :radius="accuracy" />
    </GmapMap>
  </div>
</template>

<script>
export default {
  props: ["info"],
  name: "VerMapa",
  computed: {
    center() {
      return (
        this.info.location && {
          lat: this.info.location.lat,
          lng: this.info.location.lng
        }
      );
    },
    centerMapper() {
      return this.center && { position: this.center };
    },
    markers() {
      return this.centerMapper ? [this.centerMapper] : [];
    }
  },
  data() {
    return {
      accuracy: 50,
      activar: false
    };
  },
  async created() {
    // await this.markers.push({
    //   position: {
    //     lat: this.info.location.lat,
    //     lng: this.info.location.lng
    //   }
    // });
    this.activar = true;
  }
};
</script>

<style scoped></style>
