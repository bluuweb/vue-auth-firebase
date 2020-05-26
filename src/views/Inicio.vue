<template>
    <div>
        <h1>Lista de Tareas</h1>
        <router-link to='/agregar'>
            <button class="btn btn-primary">Agregar</button>
        </router-link>
        <ul class="list-group mt-3">
            <li v-for="(item, index) in tareas" :key="index" class="list-group-item">
                {{item.id}} - {{item.nombre}}
                <router-link :to="{name: 'Editar', params: {id: item.id}}" class="float-right">
                    <button class="btn btn-warning">Editar</button>
                </router-link>
                <button @click="eliminarTarea(item.id)" class="float-right btn btn-danger mr-2">Eliminar</button>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    name: 'Inicio',
    created(){
        this.getTareas()
    },
    methods:{
        ...mapActions(['getTareas', 'eliminarTarea'])
    },
    computed:{
        ...mapState(['tareas'])
    }
}
</script>