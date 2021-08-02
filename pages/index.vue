<template>
  <!-- <v-card class="logo py-4 d-flex justify-center">
  </v-card> -->
  <div class="page">
    <div class="page-content d-flex flex-column align-center">
      <p class="page-content__title opacity--2 top--un110" >VEM AÍ</p>
      <p class="page-content__title" >VEM AÍ</p>
      <!-- <p class="page-content__title" >VEM AÍ</p> -->

      <p class="page-content__subtitle">Um dos maiores e mais prestigiados</p>
      <p class="page-content__subtitle top--un12">eventos do YSP do ano de 2021.</p>

      <p class="page-content__moto">Qual o seu legado?</p>

      <p class="page-content__date">Descubra no dia 14 de agosto</p>

      <div>
        <button v-if="showButton" class="button__subscribe" @click="showButton = false" >Inscreva-se</button>
        <form v-else class="my-1 d-flex flex-column">
          <div class="d-flex align-center justify-space-between">
            <label for="name">Nome Completo</label>
            <input id="name" type="text" name="name">
          </div>
          <div class="d-flex align-center justify-space-between">
            <label for="email">Melhor email</label>
            <input id="email" type="text" name="email">
          </div>
        </form>
      </div>
      
      <img class="img-ysp" src="~/static/img/ysp_logo.png" >
    </div>
    <div class="page-background">
      <img class="page-background__background" src="~/static/img/fullscreen-background.png" >
    </div>
  </div>
</template>

<script>

export default({
  data () {
    return {
      showButton: true,
    }
  },
})
</script>


<style lang="scss" scoped>
.page {
  .page-content {
    position: relative;
    z-index: 2;

    &__title {
      font-size: 130px;
      font-weight: 800;
      color: #f2de79;
      margin: -12px 0 -56px 0;
    }

    &__subtitle {
      font-size: 36px;
      font-weight: 400;
      color: #f2de79;
      text-align: center;
      margin: 56px 0 0 0;
    }

    &__moto {
      font-size: 36px;
      font-weight: 800;
      color: #f2de79;
      text-align: center;
      text-transform: uppercase;
      margin: 28px 0 0 0;
    }

    &__date {
      font-size: 20px;
      font-weight: 500;
      color: #f2de79;
      text-align: center;
      margin: 2px 0 0 0;
    }

    .button {
      &__subscribe {
        transition-duration: 0.4s;
        color: #f2de79;
        font-size: 46px;
        font-weight: 500;
        text-transform: uppercase;
        padding: 4px 48px;
        border: 2px solid #f2de79;
        border-radius: 60px;
        margin: 24px 0;
      }
    }

    .opacity {
      &--1 {
        opacity: 0.7;
      }
      &--2 {
        opacity: 0.5;
      }
      &--3 {
        opacity: 0.3;
      }
    }

    .top {
      &--un12 {
        margin-top: -12px;
      }
      &--un110 {
        margin-top: -110px;
      }
    }

    .img-ysp {
      height: 70px;
    }

    label {
      font-size: 20px;
      font-weight: 500;
      color: #f2de79;
      margin-right: 32px;
    }

    input[type=text] {
      padding: 12px 20px;
      margin: 6px 0;
      display: inline-block;
      border: 2px solid #f2de79;
      border-radius: 24px;
      box-sizing: border-box;
    }
  }
  .page-background {
    position: fixed; 
    top: -50%; 
    left: -50%; 
    width: 200%; 
    height: 200%;

    &__background {
      position: absolute; 
      top: 0; 
      left: 0; 
      right: 0; 
      bottom: 0; 
      margin: auto; 
      min-width: 50%;
      min-height: 50%;
    }
  }

  
}
</style>
