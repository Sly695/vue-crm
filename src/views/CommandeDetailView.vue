<template>
  <div class="container">
    <h1>Détail commande #{{ id }}</h1>
    <p>Ici tu pourrais afficher les articles, le total, etc.</p>
    <router-link to="/">← Retour aux commandes</router-link>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>
