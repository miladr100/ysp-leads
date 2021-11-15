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
      <img class="img-ysp-m mt-12" src="~/static/img/ysp_logo.png" />

      <p class="page-content__moto-m mt-10">3ª Nomeação de Jovens <br/> Embaixadores da Paz</p>
      <p class="page-content__special-m">A Herança que eu carrego</p>

      <p class="page-content__date-m">Dia 20 de novembro às 16 horas</p>
      <p class="page-content__date-m">Assista ao vivo nas redes sociais do <br/> YSP Latin America</p>
    
      <div>
        <YSubscriptionForm
          class="page-content__subscription-form-m d-flex justify-center ml-4 mt-6"
          button-title="inscreva-se"
          submit-button-title="Enviar"
          :is-mobile="smAndDown"
          :states="allStates"
          :cities="allCities"
          :is-subscribed="isSubscribed"
          @chosedState="getAndSetStaticCities"
          @submitForm="handleSubmit"
          @clickSubscribe="sendAnalyticsData"
        />

        <p v-if="isSubscribed" class="page-content__subscribed-m mt-4">
          Inscrição realizada com sucesso!
        </p>
        <div
          v-if="isSubscribed"
          class="d-flex flex-row justify-center align-center mb-4"
        >
          <span>
            <p class="page-content__date-m">
              Contribua com a paz!
            </p>
            <p class="page-content__date-m">
              Compartilhe com seus amigos ;)
            </p>
          </span>
          <div @click="shareViaWhatsApp()">
            <span
              class="iconify"
              data-icon="mdi:whatsapp"
              style="color: #fada39"
              data-width="36"
              data-height="36"
            ></span>
          </div>
        </div>
      </div>
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
          @clickSubscribe="sendAnalyticsData"
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
      formName: '',
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
    setTimeout(() => this.sendAnalyticsData(),3000)
  },
  methods: {
    subscribe() {
      this.sendAnalyticsData('button_subscribe')
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
      try {
        this.$axios.setHeader('apikey', process.env.SUPABASE_API_KEY)
        this.$axios.post('leads', {
          ...formData.form,
          device: formData.type,
          edition: ACTUAL_EMBAIXADORES_EVENT,
        })
        this.formName = formData.form.name
        this.isSubscribed = true
      } catch (err) {
        this.$toast.open({
          message: 'Falha ao enviar dados, por favor tente novamente.',
          type: 'error',
        })
      }
    },
    sendAnalyticsData(typeData = 'page_read') {
      try {
        const deviceType = this.smAndDown ? 'mobile' : 'web'
        this.$axios.setHeader('apikey', process.env.SUPABASE_API_KEY)
        this.$axios.post('analytics', { type: typeData, device: deviceType, edition: ACTUAL_EMBAIXADORES_EVENT })
      } catch (err) {
        console.error(err)
      }
    },
    shareViaWhatsApp() {
      let header = 'Oi oi, tudo bem? :)'
      const name = this.formName?.split(' ')[0]
      if (name) header = `Oi oi, aqui é ${this.formName.split(' ')[0]} :)`
      const message = window.encodeURIComponent(`${header}
👋 Vim te convidar para a 3ª nomeação de Jovens Embaixadores da Paz, com a discussão sobre "A Herança que eu carrego"!!"
Participe de um painel sobre o Dia da Consciência Negra, e entenda mais sobre nossa herança cultural africana. Além disso, teremos experiências e lições de vida de jovens líderes de projetos sociais, os novos Jovens Embaixadores da Paz
🗓️ Sábado, 20 de novembro, às 16 hrs (horário de Brasília)    
      
      Inscreva-se agora pelo link: https://embaixadorespaz.vercel.app/`)
      window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank').focus()
      this.sendAnalyticsData('share_whatsapp')
    },
    followInstagram() {
      window.open('https://www.instagram.com/ysplatinamerica/', '_blank').focus()
    },
    followFacebook() {
      window.open('https://www.facebook.com/ysplatinamerica', '_blank').focus()
    },
  },
}
</script>

<style lang="scss" scoped>
$primary-font: 'Lato', sans-serif;
$secondary-font: 'Shadows Into Light', cursive;
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
        font-family: $primary-font;
        font-size: 24px;
        font-weight: 800;
        color: $color-primary;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }

    &__special {
      &-w {
        font-family: $secondary-font;
        font-size: 68px;
        font-weight: 900;
        color: $color-primary;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 6px;
      }
      &-m {
        font-family: $secondary-font;
        font-size: 32px;
        font-weight: 900;
        color: $color-primary;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 2px;
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
        font-family: $primary-font;
        font-size: 16px;
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
        font-size: 20px;
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
        height: 76px;
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
