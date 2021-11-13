<template>
  <div class="page">
    <!--##### MOBILE -->
    <div v-if="smAndDown" class="page-content d-flex flex-column align-center">
      <div
        v-if="followBoxMobile"
        class="
          social-m
          d-flex
          flex-column
          align-center
          justify-center
          mt-12
          px-5
          py-4
        "
      >
        <p class="social-m-btn" @click="followBoxMobile = false">X</p>
        <p class="page-content__date-m mb-2" style="color: white">Siga-nos</p>
        <div @click="followInstagram()">
          <span
            class="iconify"
            data-icon="mdi:instagram"
            style="color: #c13584"
            data-width="34"
            data-height="34"
            @click="followInstagram()"
          ></span>
        </div>
        <div @click="followFacebook()">
          <span
            class="iconify"
            data-icon="mdi:facebook"
            style="color: #3b5998"
            data-width="34"
            data-height="34"
            @click="followFacebok()"
          ></span>
        </div>
      </div>

      <p class="page-content__title-m page-content__title-m-top">
        2º Nomeação de
      </p>
      <p class="page-content__title-m">Jovens</p>
      <p class="page-content__title-m">Embaixadores</p>
      <p class="page-content__title-m">pela Paz</p>

      <p class="page-content__text mt-16">
        Um evento que contará com vários jovens de
      </p>
      <p class="page-content__text">
        destaque, das mais diversas áreas, discutindo
      </p>
      <p class="page-content__text">
        sobre o que mais importa para você!
      </p>

      <p class="page-content__moto-m">Qual o seu legado?</p>

      <p class="page-content__date-m">Dia 14 de agosto às 16 horas</p>

      <div>
        <button
          v-if="showButton"
          class="button button__subscribe-m"
          @click="subscribe()"
        >
          Inscreva-se
        </button>
        <form
          v-if="!showButton && !isSubscribed"
          class="form-m d-flex flex-column"
        >
          <div class="d-flex align-center justify-space-between">
            <label class="label-m" for="name">Nome</label>
            <input
              id="name"
              v-model="form.name"
              style="width: 100%"
              class="input-m"
              type="text"
              name="name"
              placeholder="Digite seu nome completo"
            />
          </div>
          <div class="d-flex align-center justify-space-between">
            <label class="label-m" for="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              style="width: 100%"
              class="input-m"
              type="text"
              name="email"
              placeholder="Digite seu melhor email"
            />
          </div>
          <div class="d-flex align-center justify-space-between mt-1">
            <select
              id="state"
              v-model="form.state"
              class="select-state select-state-m"
              name="state"
              form="stateform"
            >
              <option value="" disabled="disabled" selected="selected">
                Estado
              </option>
              <option
                v-for="(state, i) in allStates"
                :key="i"
                :value="state.value"
              >
                {{ state.short }}
              </option>
            </select>

            <select
              id="city"
              v-model="form.city"
              :disabled="allCities.length == 0"
              style="width: 100%"
              class="select-state select-state-m"
              name="city"
              form="stateform"
            >
              <option value="" disabled="disabled" selected="selected">
                Cidade
              </option>
              <option
                v-for="(city, i) in allCities"
                :key="i"
                :value="city.value"
              >
                {{ city.value }}
              </option>
            </select>
          </div>
        </form>
        <p v-if="isSubscribed" class="page-content__subscribed-m">
          Inscrição realizada com sucesso!
        </p>
        <div
          v-if="isSubscribed"
          class="d-flex flex-row justify-center align-center mb-4"
        >
          <span>
            <p class="page-content__date-m">
              Agora é sua vez de contribuir com a paz!
            </p>
            <p class="page-content__date-m">
              Compartilhe o evento com seus amigos ;)
            </p>
          </span>
          <div @click="shareViaWhatsApp()">
            <span
              class="iconify"
              data-icon="mdi:whatsapp"
              style="color: #fada39"
              data-width="30"
              data-height="30"
            ></span>
          </div>
        </div>
      </div>

      <button
        v-if="!showButton && !isSubscribed"
        class="button button__send-m"
        @click="handleSubmit('mobile')"
      >
        Enviar
      </button>
      <img v-else class="img-ysp-m" src="~/static/img/ysp_logo.png" />
    </div>

    <!--##### WEB -->
    <div v-else class="page-content d-flex flex-column align-center">
      <div class="social-w d-flex flex-column align-center mt-12 mr-14">
        <p class="social-w-text">Siga-nos</p>
        <div @click="followInstagram()">
          <span
            class="iconify"
            data-icon="mdi:instagram"
            style="color: #c13584"
            data-width="52"
            data-height="52"
          ></span>
        </div>
        <div @click="followFacebook()">
          <span
            class="iconify"
            data-icon="mdi:facebook"
            style="color: #3b5998"
            data-width="52"
            data-height="52"
          ></span>
        </div>
      </div>
      <img class="img-ysp-w mt-12" src="~/static/img/ysp_logo.png" />

      <p class="page-content__moto-w mt-10">3ª Nomeação de Jovens <br/> Embaixadores da Paz</p>
      <p class="page-content__special-w">A Herança que eu carrego</p>

      <p class="page-content__date-w">Dia 20 de novembro às 16 horas</p>
      <p class="page-content__date-w">Assista ao vivo nas redes sociais do YSP Latin America</p>

      <div>
        <YSubscriptionForm
          class="page-content__subscription-form-w d-flex justify-center ml-4 mt-6"
          button-title="inscreva-se"
          submit-button-title="Enviar"
          :is-mobile="smAndDown"
          :states="allStates"
          :cities="allCities"
          :is-subscribed="isSubscribed"
          @chosedState="getAndSetStaticCities"
          @submitForm="handleSubmit"
        />

        <p v-if="isSubscribed" class="page-content__subscribed-w">
          Inscrição realizada com sucesso!
        </p>
        <div
          v-if="isSubscribed"
          class="d-flex flex-row justify-center align-center mb-4"
        >
          <span>
            <p class="page-content__date-w">
              Agora é sua vez de contribuir com a paz!
            </p>
            <p class="page-content__date-w">
              Compartilhe o evento com seus amigos ;)
            </p>
          </span>
          <div @click="shareViaWhatsApp()">
            <span
              class="iconify"
              data-icon="mdi:whatsapp"
              style="color: #fada39"
              data-width="46"
              data-height="46"
            ></span>
          </div>
        </div>
      </div>
    </div>
    <div class="page-background">
      <img
        class="page-background__background"
        src="~/static/img/fullscreen-background.png"
      />
    </div>
  </div>
</template>

<script>
import statesAndCities from '~/static/json/estados-cidades.json'

const ACTUAL_EMBAIXADORES_EVENT = 3

export default {
  name: 'YspLeadsIndex',
  // async asyncData({ $axios }) {
  //   const allStatesOfBrazil = await $axios.$get(
  //     `${process.env.brasilApi}ibge/uf/v1`
  //   )
  //   return { allStatesOfBrazil }
  // },
  data() {
    return {
      showButton: true,
      isSubscribed: false,
      followBoxMobile: true,
      form: {
        name: '',
        email: '',
        state: '',
        city: '',
      },
      allStates: [],
      allCities: [],
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
    },
  },
  mounted() {
    this.getAndSetStaticStates();
    // this.sendAnalyticsData()
  },
  methods: {
    subscribe() {
      // this.sendAnalyticsData('button_subscribe')
      this.showButton = false
    },
    formatDataFromIbge(states) {
      return states.reduce((acc, state) => {
        return [
          ...acc,
          {
            value: state.nome,
            short: state.sigla,
            id: state.id,
          },
        ]
      }, [])
    },
    getAndSetStaticStates() {
      this.allStates = statesAndCities.estados.map((state, index) => {
        return {
          id: index,
          short: state.sigla,
          value: state.nome,
        }
      })
    },
    getAndSetStaticCities(stateSelected) {
      const cities = statesAndCities.estados.filter(
        (state) => state.sigla === stateSelected.short
      )[0]
      const formattedCities = cities.cidades.map((city, index) => {
        return {
          id: index,
          value: city,
        }
      })
      this.allCities = formattedCities
    },
    handleSubmit(formData) {
      console.log(formData, ACTUAL_EMBAIXADORES_EVENT)
      this.isSubscribed = true
      // try {
      //   this.$axios.setHeader('apikey', process.env.SUPABASE_API_KEY)
      //   this.$axios.post('leads', {
      //     ...formData.form,
      //     device: formData.type,
      //     edition: ACTUAL_EMBAIXADORES_EVENT,
      //   })
      //   this.isSubscribed = true
      // } catch (err) {
      //   this.$toast.open({
      //     message: 'Falha ao enviar dados, por favor tente novamente.',
      //     type: 'error',
      //   })
      // }
    },
    sendAnalyticsData(typeData = 'page_read') {
      try {
        const deviceType = this.smAndDown ? 'mobile' : 'web'
        this.$axios.setHeader('apikey', process.env.SUPABASE_API_KEY)
        this.$axios.post('analytics', { type: typeData, device: deviceType })
      } catch (err) {
        console.error(err)
      }
    },
    shareViaWhatsApp() {
      let header = 'Oi oi, tudo bem? :)'
      const name = this.form.name?.split(' ')[0]
      if (name) header = `Oi oi, aqui é ${this.form.name.split(' ')[0]} :)`
      const message = window.encodeURIComponent(`${header}
      👋 Vim te convidar para a 2ª nomeação de Jovens Embaixadores da Paz, com discussões sobre "Qual é o seu legado?"
      Conheça experiências e lições de vida de jovens de destaque, e saiba como eles superam os desafios da vida para construir um legado!!
      📆 Sábado, 14 de agosto, às 16 hrs 
      
      Inscreva-se agora pelo link: https://embaixadorespaz.vercel.app/`)
      window
        .open(`https://api.whatsapp.com/send?text=${message}`, '_blank')
        .focus()
      this.sendAnalyticsData('share_whatsapp')
    },
    followInstagram() {
      console.log('OI Insta')
      window
        .open('https://www.instagram.com/ysplatinamerica/', '_blank')
        .focus()
    },
    followFacebook() {
      window.open('https://www.facebook.com/ysplatinamerica', '_blank').focus()
    },
  },
}
</script>

<style lang="scss" scoped>
$primary-font: 'Lato', sans-serif;
$color-primary:  #f2de79;
$color-primary-dark:  #fada39;

.page {
  .social {
    &-w {
      position: absolute;
      z-index: 3;
      right: 0;
      bottom: 0;
      &-text {
        font-size: 28px;
        font-weight: 500;
        color: $color-primary;
        text-align: center;
        margin: -4px 0 0 0;
      }
    }
    &-m {
      position: fixed;
      z-index: 3;
      left: 0;
      background-color: #f2de7981;
      border-radius: 8px;

      &-btn {
        top: 0;
        right: 0;
        margin: -6px -8px 0 0;
        position: absolute;
        padding: 2px 8px;
        font-size: 14px;
        color: white;
        border-radius: 50%;
        background-color: red;
      }
    }
  }

  .page-content {
    position: relative;
    z-index: 2;

    &__text {
      font-size: 14px;
      font-weight: 400;
      color: $color-primary;
      text-align: center;
      margin: 28px 0 0 0;
    }

    &__moto {
      &-w {
        font-family: $primary-font;
        font-size: 46px;
        font-weight: 900;
        color: $color-primary;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 2px;
      }
      &-m {
        font-size: 24px;
        font-weight: 800;
        color: $color-primary;
        text-align: center;
        text-transform: uppercase;
        margin: 24px 0 0 0;
      }
    }

    &__special {
      &-w {
        font-family: 'Shadows Into Light', cursive;
        font-size: 68px;
        font-weight: 900;
        color: $color-primary;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 6px;
      }
      &-m {

      }
    }

    &__date {
      &-w {
        font-family: $primary-font;
        font-size: 28px;
        font-weight: 500;
        color: $color-primary;
        text-align: center;
        margin: -4px 0 0 0;
      }
      &-m {
        font-size: 14px;
        font-weight: 500;
        color: $color-primary;
        text-align: center;
        margin: 4px 0 0 0;
      }
    }

    &__subscribed {
      &-w {
        font-family: $primary-font;
        font-size: 36px;
        font-weight: 400;
        color: $color-primary;
        text-align: center;
      }
      &-m {
        font-family: $primary-font;
        font-size: 24px;
        font-weight: 500;
        color: $color-primary;
        text-align: center;
      }
    }

    .button {
      transition-duration: 0.4s;
      color: $color-primary;
      text-transform: uppercase;
      border: 2px solid $color-primary;
      border-radius: 60px;
      cursor: pointer;

      &:hover {
        outline: none;
        border: 2px solid $color-primary-dark;
        color: $color-primary-dark;
      }

      &__subscribe {
        &-w {
          font-size: 46px;
          font-weight: 500;
          padding: 4px 48px;
          margin: 24px 0;
        }
        &-m {
          font-size: 28px;
          font-weight: 500;
          padding: 6px 32px;
          margin: 42px 0;
        }
      }
      
      &__send {
        &-w {
          font-size: 18px;
          font-weight: 400;
          padding: 4px 42px;
          margin: 14px 0;
        }
        &-m {
          font-size: 18px;
          font-weight: 400;
          padding: 6px 32px;
          margin: 12px 0;
        }
      }
    }

    .img-ysp {
      &-w {
        height: 86px;
      }
      &-m {
        height: 40px;
      }
    }

    .label {
      &-w {
        font-size: 20px;
        font-weight: 500;
        color: $color-primary;
        margin-right: 32px;
      }
      &-m {
        font-size: 12px;
        font-weight: 500;
        color: $color-primary;
        margin-right: 26px;
      }
    }

    .input {
      &-w[type='text'] {
        padding: 12px 20px;
        margin: 6px 0;
        display: inline-block;
        border: 2px solid $color-primary;
        border-radius: 24px;
        box-sizing: border-box;
        color: $color-primary;
      }
      &-m[type='text'] {
        padding: 8px 6px;
        margin: 6px 0;
        padding-left: 12px;
        display: inline-block;
        border: 2px solid $color-primary;
        border-radius: 24px;
        box-sizing: border-box;
        color: $color-primary;
      }
    }

    .form {
      &-w {
        margin: 10px 0;
        min-width: 34vw;
      }
      &-m {
        margin: 18px 0;
      }
    }

    input:focus {
      outline: none;
      border: 2px solid $color-primary-dark;
    }

    .select-state {
      -webkit-appearance: none;
      color: $color-primary;
      margin: 0 4px;
      border: 2px solid $color-primary;
      border-radius: 24px;
      text-align: center;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      transition-duration: 0.4s;

      option {
        color: #223254;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      option[value=''][disabled] {
        display: none;
      }

      &:focus {
        outline: none;
        border: 2px solid $color-primary-dark;
      }

      &:hover {
        outline: none;
        border: 2px solid $color-primary-dark;
        color: $color-primary-dark;
      }

      &[disabled] {
        outline: none;
        border: 2px solid #fada3998;
        cursor: not-allowed;
      }
    }

    .select-state-w {
      padding: 8px 20px;
      font-size: 20px;

      option {
        font-size: 14px;
      }
    }

    .select-state-m {
      padding: 10px 6px;
      font-size: 14px;

      option {
        font-size: 14px;
      }
    }

    .iconify {
      transition-duration: 0.4s;
      cursor: pointer;
      margin-left: 12px;

      &:hover {
        margin-bottom: 6px;
      }
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
