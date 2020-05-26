import Vue from 'vue'
import Vuex from 'vuex'

import {auth, db} from '../firebase'

import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: null,
    error: null,
    tareas: [],
    tarea: {nombre: '', id: ''}
  },
  mutations: {
    setUsuario(state, payload){
      state.usuario = payload
    },
    setError(state, payload){
      state.error = payload
    },
    setTareas(state, payload){
      state.tareas = payload
    },
    setTarea(state, payload){
      state.tarea = payload
    },
    setEliminarTarea(state, payload){
        state.tareas = state.tareas.filter(item => item.id !== payload)
    }
  },
  actions: {
    eliminarTarea({commit, state}, id){
        db.collection(state.usuario.email).doc(id).delete()
        .then(() => {
            commit('setEliminarTarea', id)
        })
        .catch(error => console.log(error))
    },
    agregarTarea({commit, state}, nombreTarea){
        db.collection(state.usuario.email).add({
            nombre: nombreTarea
        })
        .then(doc => {
            router.push({name: 'Inicio'})
        })
        .catch(error => console.log(error))
    },
    getTarea({commit, state}, id){
        db.collection(state.usuario.email).doc(id).get()
        .then(doc => {
            let tarea = doc.data()
            tarea.id = doc.id
            commit('setTarea', tarea)
        })
        .catch(error => console.log(error))
    },
    editarTarea({commit, state}, tarea){
        db.collection(state.usuario.email).doc(tarea.id).update({
            nombre: tarea.nombre
        })
        .then(() => {
            router.push({name: 'Inicio'})
        })
        .catch(error => console.log(error))
    },
    getTareas({commit, state}){
        const tareas = []
        db.collection(state.usuario.email).get()
        .then(res => {
            res.forEach(doc => {
                let tarea = doc.data()
                tarea.id = doc.id
                tareas.push(tarea)
            })
            commit('setTareas', tareas)
        })
        .catch(error => console.log(error))
    },
    crearUsuario({commit}, usuario){
      auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
        .then(res => {
          console.log(res)
          const usuario = {
            email: res.user.email,
            uid: res.user.uid
          }
          db.collection(usuario.email).add({
            nombre: 'tarea de ejemplo #0'
          }).then(doc => {
            commit('setUsuario', usuario)
            router.push('/')
          })
          .catch(error => console.log(error))
        })
        .catch(error => {
          console.log(error)
          commit('setError', error)
        })
    },
    ingresoUsuario({commit}, usuario){
      auth.signInWithEmailAndPassword(usuario.email, usuario.password)
        .then(res => {
          console.log(res)
          const usuario = {
            email: res.user.email,
            uid: res.user.uid
          }
          commit('setUsuario', usuario)
          router.push('/')
        })
        .catch(error => {
          console.log(error)
          commit('setError', error)
        })
    },
    detectarUsuario({commit}, usuario){
      commit('setUsuario', usuario)
    },
    cerrarSesion({commit}){
      auth.signOut()
      router.push('/ingreso')
    }
  },
  getters:{
    existeUsuario(state){
      if(state.usuario === null){
        return false
      }else{
        return true
      }
    }
  },
  modules: {
  }
})
