<template>
  <div>
    <!--    <div class="q-pa-lg">-->
    <!--      <frontpage-component />-->
    <!--    </div>-->
    <div class="row justify-around">
      <div class="q-pa-lg">
        Recojo
        <Recojo />
      </div>
      <div class="q-pa-lg">
        Entrega
        <Entrega />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexGps",
  components: {
    FrontpageComponent: () => import("components/gps/FrontpageComponent.vue"),
    Recojo: () => import("components/gps/Recojo.vue"),
    Entrega: () => import("components/gps/Entrega.vue")
  }
};
</script>

<style scoped></style>
