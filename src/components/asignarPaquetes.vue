<template>
  <div class="center">
    <button @click="active = !active">
      active
    </button>
    <vs-dialog overflow-hidden v-model="active">
      <template #header>
        <h4 class="not-margin">Welcome to <b>Vuesax</b></h4>
      </template>

      <div class="con-form">
        <vs-select placeholder="Select" v-model="userAsig">
          <vs-option
            v-for="(color, i) in colors"
            :key="i"
            label="Vuesax"
            :value="color.value"
            v-model="color.value"
          >
            {{ color.color }}
          </vs-option>
        </vs-select>
      </div>
    </vs-dialog>
  </div>
</template>
<script>
export default {
  data: () => ({
    userAsig: "",
    colors: [
      {
        color: "danger",
        value: "1"
      },
      {
        color: "success",
        value: "2"
      },
      {
        color: "warn",
        value: "3"
      },
      {
        color: "dark",
        value: "4"
      },
      {
        color: "#7d33ff",
        value: "5"
      },
      {
        color: "rgb(59,222,200)",
        value: "6"
      }
    ],
    active: false,
    input1: "",
    input2: "",
    checkbox1: false
  })
};
</script>
<style lang="stylus">
getColor(vsColor, alpha = 1)
  unquote("rgba(var(--vs-"+vsColor+"), "+alpha+")")
getVar(var)
unquote("var(--vs-"+var+")")
.not-margin
  margin 0px
  font-weight normal
  padding 10px
.con-form
  width 100%
  .flex
    display flex
    align-items center
    justify-content space-between
    a
      font-size .8rem
      opacity .7
      &:hover
        opacity 1
  .vs-checkbox-label
    font-size .8rem
  .vs-input-content
    margin 10px 0px
    width calc(100%)
    .vs-input
      width 100%
.footer-dialog
  display flex
  align-items center
  justify-content center
  flex-direction column
  width calc(100%)
  .new
    margin 0px
    margin-top 20px
    padding: 0px
    font-size .7rem
    a
      color getColor('primary') !important
      margin-left 6px
      &:hover
        text-decoration underline
  .vs-button
    margin 0px
</style>
