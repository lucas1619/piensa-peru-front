<template>
    <section class="panel-publicaciones">
        <div class="container">
            <modal :width="600" name="confirmDelete"> 
                <div style="padding: 20px">
                    <h2 style="text-align: center">
                        ¿Está seguro que quiere eliminar esta publicación?
                    </h2>
                    <p style="text-align: center">
                        La publicación será eliminada permanentemente
                    </p>
                    <div style="width: 100%; display: flex; align-items:center; justify-content: center">
                        <button style="margin-right: 10px" class="btn-white" @click="$modal.hide('confirmDelete')">
                            Volver
                        </button>
                        <button class="btn-blue" @click="deletePublication">
                            Eliminar
                        </button>
                    </div>
                </div>
            </modal>
            <modal :width="900" height="auto" name="addNew">
                <div style="width: 50%; margin: 0 auto">
                    <h2 style="text-align: center">
                        Agregar nueva publicación
                    </h2>
                    <validation-observer style="display: flex; align-items: center; justify-content:center; flex-direction:column;" v-slot={invalid}> 
                        <form>
                            <validation-provider name="Titulo" rules="required" v-slot="{ errors }">
                                <input placeholder="Titulo de publicacion" style="width: 100%; margin: 5px 0;" class="input-gray" type="text" v-model="newPublication.title">
                                <span class="error">{{ errors[0] }}</span>
                            </validation-provider>
                            <validation-provider name="Tipo" rules="required" v-slot="{ errors }">
                                <input placeholder="Tipo de publicacion" style="width: 100%; margin: 5px 0;" class="input-gray" type="text" v-model="newPublication.type">
                                <span class="error">{{ errors[0] }}</span>
                            </validation-provider>
                            <validation-provider name="Autor" rules="required" v-slot="{ errors }">
                                <input style="width: 100%; margin: 5px 0;" class="input-gray" type="text" readonly v-model="user.name">
                                <span class="error">{{ errors[0] }}</span>
                            </validation-provider>
                            <vue-tags-input placeholder="Tags" :tags="newPublication.tags" @tags-changed="newTags => newPublication.tags = newTags" v-model="tag"/>
                        </form>
                        <div style="display: flex; align-items:center; justify-content: space-between; width: 100%; padding: 20px 0">
                            <button @click="$modal.hide('addNew')" class="btn-white">
                                Volver
                            </button>
                            <button class="btn-blue" :disabled="invalid || newPublication.tags.length === 0" @click="addPublication">
                                Agregar
                            </button>
                        </div>
                    </validation-observer>
                </div>
            </modal>
            <div class="head-section">
                <h2>Publicaciones</h2>
                <button class="btn-white" @click="back">Volver</button>
            </div>
            <div class="publicaciones">
                <div class="publicaciones-header">
                    <button @click="openAddNewModal" class="btn-blue-sm" style="display: flex; align-items:center; justify-content:center;">
                        <feather-icon icon="PlusIcon" style="margin-right: 5px" size="17"/> Añadir publicacion
                    </button>
                </div>
                <div class="table-publicaciones">
                    <div class="table-title">
                        Titulo
                    </div>
                    <div class="table-title">
                        Autor
                    </div>
                    <div class="table-title">
                        Tags
                    </div>
                    <div class="table-title">
                        Tipo
                    </div>
                    <div class="table-title">
                        Fecha
                    </div>
                    <div class="table-title">
                        Accion
                    </div>
                    
                    <template v-for="(publication, index) in filteredPublications">
                        <div class="table-row" :key="'title-'+index" :style="{
                            background: index % 2 === 0 ? '#F6F9FE' : '#FFFFFF'
                        }">
                            {{publication.title}}
                        </div>
                        <div class="table-row" :key="'autor-'+index" :style="{
                            background: index % 2 === 0 ? '#F6F9FE' : '#FFFFFF'
                        }">
                            {{publication.autor.name}}
                        </div>
                        <div class="table-row" :key="'tags-'+index" :style="{
                            background: index % 2 === 0 ? '#F6F9FE' : '#FFFFFF'
                        }">
                            {{publication.tags.reduce((acc, tag) => acc + tag + ', ', '').slice(0, -2)}}
                        </div>
                        <div class="table-row" :key="'type-'+index" :style="{
                            background: index % 2 === 0 ? '#F6F9FE' : '#FFFFFF'
                        }">
                            {{publication.type}}
                        </div>
                        <div class="table-row" :key="'date-'+index" :style="{
                            background: index % 2 === 0 ? '#F6F9FE' : '#FFFFFF'
                        }">
                            {{publication.date}}
                        </div>
                        <div class="table-row" :key="'actions-'+index" :style="{
                            background: index % 2 === 0 ? '#F6F9FE' : '#FFFFFF'
                        }">
                            <div>
                                <feather-icon style="color: #001E76; margin-right: 10px; cursor: pointer" icon="EditIcon" size="17" @click="editPublication(publication.id)"/>
                                <feather-icon style="color: #A30D11; cursor: pointer" icon="Trash2Icon" size="17" @click="openModalDelete(publication.id)"/>
                            </div>
                        </div>
                    </template>
                    
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {mapState} from 'vuex'
import FeatherIcon from '@/components/FeatherIcon.vue'
export default {
  components: { FeatherIcon },
    name: 'PanelPublicacionesView',
    data() {
        return {
            publications: [],
            tag: '',
            selectedId: null,
            newPublication: {
                title: '',
                autor: {
                    id: '',
                    name: ''
                },
                tags: [],
                type: '',
                date: ''
            },
        }
    },
    computed: {
        ...mapState({
            user: state => state.user
        }),
        filteredPublications() {
            if(this.user.role === 'expert') {
                return this.publications.filter(publication => publication.autor.id === this.user.id)
            }
            return this.publications
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        },
        openModalDelete(id) {
            this.selectedId = id
            this.$modal.show('confirmDelete')
        },
        deletePublication() {
            this.publications = this.publications.filter(publication => publication.id !== this.selectedId)
            localStorage.setItem('publications', JSON.stringify(this.publications))
            this.$modal.hide('confirmDelete')
        },
        openAddNewModal() {
            this.$modal.show('addNew')
        },
        addPublication() {
            this.newPublication.autor = this.user
            this.newPublication.tags = this.newPublication.tags.reduce((acc, tag) => {
                acc.push(tag.text)
                return acc
            }, [])
            this.newPublication.date = this.$moment().format('DD/MM/YYYY')
            this.publications.push({...this.newPublication})
            this.newPublication = {
                title: '',
                autor: {
                    id: '',
                    name: ''
                },
                tags: [],
                type: '',
                date: '',
                principal_image: '',
                body: ''

            }
            // overwrite local storage
            localStorage.setItem('publications', JSON.stringify(this.publications))
            this.$modal.hide('addNew')
        },
        editPublication(id) {
            this.$router.push({name: 'editPublication', params: {id}})
        }
    },
    created() {
        this.publications = JSON.parse(localStorage.getItem('publications')) || []
    }
}
</script>

<style lang="scss" scoped>
.panel-publicaciones{
    margin-top: 66px;
}
.head-section{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.publicaciones {
    background: white;
    .publicaciones-header {
        padding: 24px 28px;
    }
}
.table-publicaciones {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    div {
        padding: 10px 10px;
        max-width: 100%;
        overflow: auto;
    }
    .table-title{
        font-weight: bold;
        font-size: 14px;
        justify-self: center;
    }
    .table-row {
        font-size: 14px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }

}
</style>