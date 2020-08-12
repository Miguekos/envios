<template>
  <div class="flex flex-center">
    <div class="q-pa-lg">
      <div class="q-pa-md">
        Recojo
      </div>
      <GmapAutocomplete @place_changed="setPlace"> </GmapAutocomplete>
      <!--      <button @click="usePlace">Add</button>-->
    </div>
    <br />
    <!-- :center="{ lat: -12.046374, lng: -77.0427934 }" -->
    <GmapMap
      v-if="place"
      style="width: 100%; height: 300px;"
      :zoom="15"
      :center="{
        lat: this.place.geometry.location.lat(),
        lng: this.place.geometry.location.lng()
      }"
    >
      <!--      <GmapMarker-->
      <!--        v-for="(marker, index) in markers"-->
      <!--        :key="index"-->
      <!--        :position="marker.position"-->
      <!--      />-->
      <GmapMarker
        label="★"
        :position="{
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng()
        }"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markers: [],
      place: null
    };
  },
  description: "Autocomplete Example (#164)",
  methods: {
    setDescription(description) {
      console.log("description", description);
      this.description = description;
    },
    setPlace(place) {
      console.log("place", place);
      this.place = place;
      this.$store.commit("registros/setlatRecojo", this.place.geometry);
      this.$store.commit("registros/setlngRecojo", this.place.geometry);
    },
    usePlace(place) {
      if (this.place) {
        this.markers.push({
          position: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng()
          }
        });

        console.log(this.markers);
        this.place = null;
      }
    }
  }
};
</script>
