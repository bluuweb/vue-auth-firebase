<template>
    <div>
        <h1>Agregar</h1>
        <form @submit.prevent="agregarTarea(nombre)">
            <input type="text" v-model="nombre" class="form-control" placeholder="Ingrese tarea">
            <button type="submit" class="btn btn-primary mt-2 btn-block" :disabled='desactivar'>Agregar</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'Agregar',
    data() {
        return {
            nombre: ''
        }
    },
    methods:{
        ...mapActions(['agregarTarea'])
    },
    computed:{
        desactivar(){
            return this.nombre.trim() === ''
        }
    }
}
</script>