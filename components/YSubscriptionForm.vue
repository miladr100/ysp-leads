<template>
  <v-row justify="center" align="center">
      <div v-if="isMobile">
          <button
            v-if="showButton && !isSubscribed"
            class="button button__subscribe-m"
            @click="subscribe()"
            >
            {{buttonTitle}}
        </button>
      </div>
      <div v-else>
        <button
            v-if="showButton && !isSubscribed"
            class="button button__subscribe-w"
            @click="subscribe()"
        >
            {{buttonTitle}}
        </button>
      </div>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="500"
        >
        <v-card color="#141434" dark>
            <v-col v-if="!isMobile" cols="12" class="d-flex flex-column align-center"> 
                <v-container
                    v-if="!showButton && !isSubscribed"
                    class="d-flex flex-column"
                >
                    <v-text-field
                        v-model="form.name"
                        label="Digite seu nome completo"
                        placeholder="Ex: Marcos Rogério"
                        :error-messages="nameErrors"
                        filled
                        dense
                        clearable
                    ></v-text-field>
                    <v-text-field
                        v-model="form.email"
                        label="Digite seu melhor email"
                        placeholder="Ex: meuemail@email.com"
                        :error-messages="emailErrors"
                        filled
                        dense
                        clearable
                    ></v-text-field>
                    <v-row>
                        <v-col cols="4">
                            <v-select
                                v-model="form.state"
                                :items="states"
                                item-text="value"
                                :disabled="states.length == 0"
                                label="Estado"
                                placeholder="Selecione seu estado"
                                :error-messages="stateErrors"
                                filled
                                dense
                            ></v-select>
                        </v-col>
                        <v-col cols="8">
                            <v-autocomplete
                                v-model="form.city"
                                label="Cidade"
                                placeholder="Selecione sua cidade"
                                :items="cities"
                                :error-messages="cityErrors"
                                :disabled="cities.length == 0"
                                item-text="value"
                                hide-no-data
                                dense
                                filled
                                clearable
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-container>

                <p v-if="isSubscribed" class="subscribed-w mt-4">
                    Inscrição realizada com sucesso!
                </p>
                <div
                    v-if="isSubscribed"
                    class="d-flex flex-row align-center mb-4"
                >
                    <span>
                        <p class="date-w">
                            Agora é sua vez de contribuir com o conexão!
                        </p>
                        <p class="date-w">
                            Compartilhe o evento com seus amigos ;)
                        </p>
                    </span>
                    <div @click="shareViaWhatsApp()">
                        <span
                            class="iconify"
                            data-icon="mdi:whatsapp"
                            style="color: #34af23"
                            data-width="52"
                            data-height="52"
                        ></span>
                    </div>
                </div>

                <button
                    v-if="!showButton && !isSubscribed"
                    class="button button__send-w"
                    @click="submit('web')"
                >
                    {{submitButtonTitle}}
                </button>
            </v-col>
            <v-col v-else cols="12" class="d-flex flex-column align-center">
                <v-container
                    v-if="!showButton && !isSubscribed"
                    class="d-flex flex-column"
                >
                    <v-text-field
                        v-model="form.name"
                        label="Digite seu nome completo"
                        placeholder="Ex: Marcos Rogério"
                        :error-messages="nameErrors"
                        filled
                        dense
                        clearable
                    ></v-text-field>
                    <v-text-field
                        v-model="form.email"
                        label="Digite seu melhor email"
                        placeholder="Ex: meuemail@email.com"
                        :error-messages="emailErrors"
                        filled
                        dense
                        clearable
                    ></v-text-field>
                    <v-select
                        v-model="form.state"
                        :items="states"
                        item-text="value"
                        :disabled="states.length == 0"
                        label="Estado"
                        placeholder="Selecione seu estado"
                        :error-messages="stateErrors"
                        filled
                        dense
                    ></v-select>
                    <!-- <v-select
                        v-model="form.city"
                        :items="cities"
                        item-text="value"
                        :disabled="cities.length == 0"
                        label="Cidade"
                        placeholder="Selecione sua cidade"
                        :error-messages="cityErrors"
                        filled
                        dense
                    ></v-select> -->
                    <v-autocomplete
                        v-model="form.city"
                        label="Cidade"
                        placeholder="Selecione sua cidade"
                        :items="cities"
                        :error-messages="cityErrors"
                        :disabled="cities.length == 0"
                        item-text="value"
                        hide-no-data
                        dense
                        filled
                        clearable
                    ></v-autocomplete>
                </v-container>

                <button
                    v-if="!showButton && !isSubscribed"
                    class="button button__send-m d-flex justify-center"
                    @click="submit('web')"
                >
                    {{submitButtonTitle}}
                </button>
            </v-col>
        </v-card>
      </v-dialog>
  </v-row>
</template>

<script>
import { validationMixin } from "vuelidate"
import { required } from "vuelidate/lib/validators"

export default {
    name: 'YSubscriptionForm',
    mixins: [validationMixin],
    props: {
        buttonTitle: {
            type: String,
            default: '',
            require: true,
        },
        submitButtonTitle: {
            type: String,
            default: '',
        },
        isMobile: {
            type: Boolean,
            default: false,
        },
        isSubscribed: {
            type: Boolean,
            default: false,
        },
        states: {
            type: Array,
            default: () => [],
        },
        cities: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            showButton: true,
            loading: false,
            dialog: false,
            form: {
                name: '',
                email: '',
                state: '',
                city: '',
            },
        }
    },
    validations() {
        return {
            form: {
                name: { required },
                email: { required },
                state: { required },
                city: { required }
            }
        }
    },
    computed: {
        nameErrors() {
            return this.$v.form.name.$dirty &&
                !this.$v.form.name.required
                ? ['Preenchimento obrigatório']
                : []
        },
        autocompleteErrors() {
            return this.$v.form.name.$dirty &&
                !this.$v.form.name.required
                ? ['Erro! Busque seu nome']
                : []
        },
        emailErrors() {
            return this.$v.form.email.$dirty &&
                !this.$v.form.email.required
                ? ['Preenchimento obrigatório']
                : []
        },
        stateErrors() {
            return this.$v.form.state.$dirty &&
                !this.$v.form.state.required
                ? ['Preenchimento obrigatório']
                : []
        },
        cityErrors() {
            return this.$v.form.city.$dirty &&
                !this.$v.form.city.required
                ? ['Preenchimento obrigatório']
                : []
        },
    },
    watch: {
        'form.state'(paylod) {
            if (paylod) {
                const chosenState = this.states.find(
                    (state) => state.value === paylod
                )
                this.form.city = ''
                this.$emit('chosedState', chosenState)
            }
        },
    },
    methods: {
        subscribe() {
            this.showButton = false
            this.dialog = true
            this.$emit('clickSubscribe','click_subscribe')
        },
        submit(pageType) {
            this.$v.$touch()
            if (this.$v.$invalid) return

            this.$emit('submitForm', { form: this.form, type: pageType })

            this.dialog = false
        },
        shareViaWhatsApp() {
            let header = 'Oi oi, tudo bem? :)'
            const name = this.form.name?.split(' ')[0]
            if (name) header = `Oi oi, aqui é ${name} :)`
            const message = window.encodeURIComponent(
            `${header}
            👋 Vim te convidar para a 5ª Conexão Centro Oeste, vamos viajar pelo Brasil! 
            Do Oiapoque ao Chuí!
            Você não vai deixar escapar essa oportunidade, não é mesmo?
            📆 Domingo, 7 de novembro, às 16 hrs (Brasília) e 15 hrs (MS e MT)
            
            Inscreva-se agora pelo link: https://conexaoco.vercel.app/`)
            window
                .open(`https://api.whatsapp.com/send?text=${message}`, '_blank')
                .focus()
            // this.sendAnalyticsData('share_whatsapp')
        },
    }
}
</script>

<style lang="scss" scoped>
$color-primary:  #f2de79;
$color-primary-dark:  #fada39;
$color-primary-light:  #082a53;
$color-secondary: #f0f1f1;
$color-tertiary: #e78f12;

.button {
    transition-duration: 0.4s;
    color: $color-primary;
    text-transform: uppercase;
    border: 2px solid $color-primary;
    border-radius: 60px;
    cursor: pointer;
    font-family: 'Lato', sans-serif;
    letter-spacing: 2px;

    &:hover {
        outline: none;
        border: 2px solid $color-primary-dark;
        color: $color-primary-dark;
    }

    &__subscribe {
        &-w {
            font-size: 36px;
            font-weight: 500;
            padding: 4px 36px;
        }
        &-m {
            font-size: 22px;
            font-weight: 500;
            padding: 6px 26px;
        }
    }

    &__send {
        &-w {
            font-size: 18px;
            font-weight: 400;
            padding: 4px 42px;
        }
        &-m {
            font-size: 16px;
            font-weight: 400;
            padding: 6px 32px;
        }
    }
}

.subscribed {
    &-w {
        font-family: 'Quicksand';
        font-size: 1.8rem;
        font-weight: 500;
        color: $color-primary-dark;
    }
    &-m {
        font-family: 'Quicksand';
        font-size: 1.0rem;
        font-weight: 500;
        color: $color-primary-dark;
        text-align: center;
    }
}

.date {
    &-w {
        font-family: 'Quicksand';
        font-size: 1.2rem;
        font-weight: 500;
        color: $color-primary;
    }
    &-m {
        font-family: 'Quicksand';
        font-size: 0.8rem;
        font-weight: 500;
        text-align: center;
        color: $color-primary;
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

</style>