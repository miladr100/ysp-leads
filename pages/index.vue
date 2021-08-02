<template>
  
  <div class="page">
    <!--##### MOBILE -->
    <div v-if="smAndDown" class="page-content d-flex flex-column align-center">
      
      <p class="page-content__title-m opacity--3 top--un70" >VEM AÍ</p>
      <p class="page-content__title-m opacity--2" >VEM AÍ</p>
      <p class="page-content__title-m" >VEM AÍ</p>
      

      <p class="page-content__subtitle-m">Um dos maiores e mais prestigiados</p>
      <p class="page-content__subtitle-m top--un4">eventos do YSP do ano de 2021.</p>

      <p class="page-content__text">Um evento que contará com vários jovens de</p>
      <p class="page-content__text top--un4">destaque, das mais diversas áreas, discutindo </p>
      <p class="page-content__text top--un4">sobre o que mais importa para você!</p>

      <p class="page-content__moto-m">Qual o seu legado?</p>

      <p class="page-content__date-m">Descubra no dia 14 de agosto</p>

      <div>
        <button v-if="showButton" class="button__subscribe-m" @click="showButton = false" >Inscreva-se</button>
        <form v-else class="form-m d-flex flex-column">
          <div class="d-flex align-center justify-space-between">
            <label class="label-m" for="name">Nome Completo</label>
            <input id="name" class="input-m" type="text" name="name">
          </div>
          <div class="d-flex align-center justify-space-between">
            <label class="label-m" for="email">Melhor email</label>
            <input id="email" class="input-m" type="text" name="email">
          </div>
        </form>
      </div>
      
      <img class="img-ysp-m" src="~/static/img/ysp_logo.png" >
    </div>

    <!--##### WEB -->
    <div v-else class="page-content d-flex flex-column align-center">
      
      <p class="page-content__title-w opacity--2 top--un110" >VEM AÍ</p>
      <p class="page-content__title-w" >VEM AÍ</p>
      

      <p class="page-content__subtitle-w">Um dos maiores e mais prestigiados</p>
      <p class="page-content__subtitle-w top--un12">eventos do YSP do ano de 2021.</p>

      <p class="page-content__moto-w">Qual o seu legado?</p>

      <p class="page-content__date-w">Descubra no dia 14 de agosto</p>

      <div>
        <button v-if="showButton" class="button__subscribe-w" @click="showButton = false" >Inscreva-se</button>
        <form v-else class="form-w d-flex flex-column">
          <div class="d-flex align-center justify-space-between">
            <label class="label-w" for="name">Nome Completo</label>
            <input id="name" class="input-w" type="text" name="name">
          </div>
          <div class="d-flex align-center justify-space-between">
            <label class="label-w" for="email">Melhor email</label>
            <input id="email" class="input-w" type="text" name="email">
          </div>
        </form>
      </div>
      
      <img class="img-ysp-w" src="~/static/img/ysp_logo.png" >
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
  computed: {
    smAndUp() {
      return this.$vuetify.breakpoint.smAndUp
    },
    mdAndUp() {
      return this.$vuetify.breakpoint.mdAndUp
    },
    smAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    },
    xsOnly() {
      return this.$vuetify.breakpoint.xsOnly
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
      &-w {
        font-size: 130px;
        font-weight: 800;
        color: #f2de79;
        margin: -12px 0 -56px 0;
      }
      &-m {
        font-size: 86px;
        font-weight: 800;
        color: #f2de79;
        margin: -8px 0 -48px 0;
      }
    }

    &__subtitle {
      &-w {
        font-size: 36px;
        font-weight: 400;
        color: #f2de79;
        text-align: center;
        margin: 56px 0 0 0;
      }
      &-m {
        font-size: 18px;
        font-weight: 500;
        color: #f2de79;
        text-align: center;
        margin: 48px 0 0 0;
      }
    }

    &__text {
      font-size: 16px;
      font-weight: 400;
      color: #f2de79;
      text-align: center;
      margin: 28px 0 0 0;
    }

    &__moto {
      &-w {
        font-size: 36px;
        font-weight: 800;
        color: #f2de79;
        text-align: center;
        text-transform: uppercase;
        margin: 28px 0 0 0;
      }
      &-m {
        font-size: 24px;
        font-weight: 800;
        color: #f2de79;
        text-align: center;
        text-transform: uppercase;
        margin: 32px 0 0 0;
      }
    }

    &__date {
      &-w {
        font-size: 20px;
        font-weight: 500;
        color: #f2de79;
        text-align: center;
        margin: 2px 0 0 0;
      }
      &-m {
        font-size: 14px;
        font-weight: 500;
        color: #f2de79;
        text-align: center;
        margin: 6px 0 0 0;
      }
    }

    .button {
      &__subscribe {
        &-w {
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
        &-m {
          transition-duration: 0.4s;
          color: #f2de79;
          font-size: 28px;
          font-weight: 500;
          text-transform: uppercase;
          padding: 6px 32px;
          border: 2px solid #f2de79;
          border-radius: 60px;
          margin: 42px 0;
        }
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
      &--un4 {
        margin-top: -4px;
      }
      &--un12 {
        margin-top: -12px;
      }
      &--un70 {
        margin-top: -70px;
      }
      &--un110 {
        margin-top: -110px;
      }
    }

    .img-ysp {
      &-w {
        height: 70px;
      }
      &-m {
        height: 40px;
      }
    }

    .label {
      &-w {
        font-size: 20px;
        font-weight: 500;
        color: #f2de79;
        margin-right: 32px;
      }
      &-m {
        font-size: 12px;
        font-weight: 500;
        color: #f2de79;
        margin-right: 26px;
      }
    }

    .input {
      &-w[type=text] {
        padding: 12px 20px;
        margin: 6px 0;
        display: inline-block;
        border: 2px solid #f2de79;
        border-radius: 24px;
        box-sizing: border-box;
      }
      &-m[type=text] {
        padding: 8px 6px;
        margin: 6px 0;
        display: inline-block;
        border: 2px solid #f2de79;
        border-radius: 24px;
        box-sizing: border-box;
      }
    }

    .form {
      &-w {
        margin: 10px 0;
      }
      &-m {
        margin: 18px 0;
      }
    }

    input:focus {
      outline: none;
      border: 2px solid #fada39;
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
