<template>
  <div class="container">
    <h1>📦 Commandes passées</h1>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Client</th>
          <th>Total</th>
          <th>Détail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="commande in commandes" :key="commande.id">
          <td>{{ commande.date }}</td>
          <td>
            <router-link :to="'/client/' + commande.client">{{ commande.client }}</router-link>
          </td>
          <td>{{ commande.total.toFixed(2) }} €</td>
          <td>
            <router-link :to="'/commande/' + commande.id">Voir</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Commande {
  id: number
  date: string
  client: string
  total: number
}

const commandes = ref<Commande[]>([
  { id: 1, date: '2025-07-20', client: 'Francis Dupont', total: 35.8 },
  { id: 2, date: '2025-07-18', client: 'Claire Morel', total: 22.5 },
  { id: 3, date: '2025-07-17', client: 'Jean-Paul Martin', total: 49.99 },
])
</script>

<style scoped>
.container {
  padding: 2rem;
  font-family: sans-serif;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  border: 1px solid #ccc;
  padding: 0.75rem;
  text-align: left;
}

a {
  color: #007bff;
  text-decoration: none;
}
</style>
