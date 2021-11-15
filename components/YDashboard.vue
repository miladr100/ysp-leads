<template>
    <div class="d-flex flex-column">
        <v-row justify="center" class="mt-6 px-4">
            <v-col cols="4" lg="2" md="2" sm="4" xs="4" align="center" >
                <v-btn class="mb-2" @click="update()">Atualizar</v-btn>
                <v-btn @click="exit()">Sair</v-btn>
            </v-col>
            <v-col cols="6" lg="1" md="2" sm="4" xs="6" class="d-flex align-center justify-center ">
                <v-btn fab dark color="teal" @click="dialog = true">
                    <v-icon dark> mdi-cog-outline</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4" xs="6">
                <v-card>
                    <v-card-title class="d-flex justify-center">{{numbOfSubscriptions}}</v-card-title>
                    <v-card-subtitle class="d-flex justify-center">Nº Inscritos</v-card-subtitle>  
                </v-card>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4" xs="6">
                <v-card>
                    <v-card-title class="d-flex justify-center">{{numbOfAccess}}</v-card-title>
                    <v-card-subtitle class="d-flex justify-center">Nº Acessos</v-card-subtitle>  
                </v-card>
            </v-col>
            <v-col cols="6" lg="3" md="4" sm="5" xs="6">
                <v-card>
                    <v-card-title class="d-flex justify-center">{{numbOfButtonSubscribe}}</v-card-title>
                    <v-card-subtitle class="d-flex justify-center">Nº Cliques Inscrição</v-card-subtitle>  
                </v-card>
            </v-col>
            <v-col cols="6" lg="2" md="3" sm="4" xs="6">
                <v-card>
                    <v-card-title class="d-flex justify-center">{{numbOfShareWhatsApp}}</v-card-title>
                    <v-card-subtitle class="d-flex justify-center">Share Wpp</v-card-subtitle>  
                </v-card>
            </v-col>
        </v-row>
        <v-data-table
            :headers="headers"
            :items="allLeads"
            :items-per-page="5"
            class="elevation-1 mt-2"
        ></v-data-table>

        <v-dialog
            v-model="dialog"
            style="overflow-y: unset;"
            max-width="500"
            >
                <v-card>
                    <v-card-title>Ferramentas</v-card-title>
                        <v-row>
                            <v-col cols="10" class="d-flex align-center justify-center">
                                <v-card-text class="ml-2 font-weight-bold">Delete by Id</v-card-text>
                                <v-text-field
                                    v-model="deleteById"
                                    :counter="4"
                                    label="Lead ID"
                                    required
                                ></v-text-field>
                                <v-btn class="ml-12" depressed color="error" @click="deleteLeadByIdAssync()">Delete</v-btn>
                            </v-col>
                            <v-col cols="10" class="d-flex align-center justify-center">
                                <v-card-text class="ml-2 font-weight-bold">Change event edition</v-card-text>
                                <v-select
                                    v-model="actualEmbaixadoresEvent"
                                    :items="[3]"
                                    label="Select edition"
                                    required
                                ></v-select>
                                <v-btn class="ml-8" depressed color="success" @click="update()">Change</v-btn>
                            </v-col>
                        </v-row>
                </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: "YDashboard",
    components: {
    },
    data () {
        return {
            actualEmbaixadoresEvent: 3,
            allLeads: [],
            allOldLeads: [],
            numbOfSubscriptions: 0,
            numbOfAccess: 0,
            numbOfButtonSubscribe: 0,
            numbOfShareWhatsApp: 0,
            dialog: false,
            deleteById: '',
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Criado em', value: 'created_at' },
                {
                    text: 'Nome',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Email', value: 'email', sortable: false },
                { text: 'Estado', value: 'state', align: 'start', sortable: false },
                { text: 'Cidade', value: 'city', align: 'start', sortable: false },
                { text: 'Dispositivo', value: 'device', sortable: false },
            ],
        }
    },
    async mounted() {
        await this.getAllLeadsAsync()
        await this.getAccessAnalyticsAsync()
    },
    methods: {
        async getAccessAnalyticsAsync() {
            try {
                this.$axios.setHeader('apikey', process.env.SUPABASE_API_KEY)
                const { data } = await this.$axios.get('analytics?select=type')
                const pageRead = data.filter(lead => lead.type === 'page_read')
                const buttonSubscribe = data.filter(lead => lead.type === 'click_subscribe')
                const shareWhatsapp = data.filter(lead => lead.type === 'share_whatsapp')
                this.numbOfAccess = pageRead.length
                this.numbOfButtonSubscribe = buttonSubscribe.length
                this.numbOfShareWhatsApp = shareWhatsapp.length
            } catch (err) {
                this.$toast.open({message: "Falha ao obter analytics", type: "error"})
            }
        },
        async getAllLeadsAsync() {
            try {
                this.$axios.setHeader('apikey', process.env.SUPABASE_API_KEY)
                const { data } = await this.$axios.get('leads')
                this.allLeads = this.organizeLeads(data.filter(lead => lead.edition === this.actualEmbaixadoresEvent))
                this.allOldLeads = this.organizeLeads(data.filter(lead => lead.edition !== this.actualEmbaixadoresEvent))
                this.numbOfSubscriptions = this.allLeads.length
            } catch (err) {
                this.$toast.open({message: "Falha ao obter leads", type: "error"})
            }
        },
        async getLeadByIdAsync(leadId) {
            try {
                this.$axios.setHeader('apikey', process.env.SUPABASE_API_KEY)
                const { data } = await this.$axios.get(`leads?id=eq.${leadId}`)
                return data
            } catch (err) {
                this.$toast.open({message: "Falha ao obter lead", type: "error"})
            }
        },
        async deleteLeadByIdAssync() {
            try {
                const lead = await this.getLeadByIdAsync(this.deleteById)
                if(lead.length === 0) {
                    this.$toast.open({message: "Esse Id não existe.", type: "warning"})
                    return
                }
                this.$axios.setHeader('apikey', process.env.SUPABASE_API_KEY)
                await this.$axios.delete(`leads?id=eq.${this.deleteById}`)
                this.$toast.open({ message: `Lead ${lead[0].name} deletado com sucesso!`, type: "success" })
                this.update(false)
                this.deleteById = '';
                this.dialog = false;
            } catch (err) {
                this.$toast.open({message: "Falha ao deletar lead", type: "error"})
            }
        },
        organizeLeads(arrLeads) {
            return arrLeads.map(lead => {
                if(!lead.state) lead.state = ' - '
                if(!lead.city) lead.city = ' - '
                if(!lead.device) lead.device = ' - '
                if(!lead.phone) lead.phone = ' - '
                lead.created_at = this.$moment(lead.created_at).format("DD/MM/YYYY")
                return lead
            })
        },
        async update(withMessage = true) {
            await this.getAllLeadsAsync()
            await this.getAccessAnalyticsAsync()
            if(withMessage) this.$toast.open({message: "Dados atualizados com sucesso!", type: "success"})
        },
        exit() {
            this.$store.commit('updateIsLogged', false)
        }
    }
}
</script>