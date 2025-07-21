<template>
  <div class="container">
    <h1>Profil du client : {{ name }}</h1>
    <p>Historique des achats, infos personnelles, etc. pourraient apparaître ici.</p>
    <router-link to="/">← Retour aux commandes</router-link>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const name = route.params.name
</script>
