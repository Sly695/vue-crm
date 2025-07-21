<template>
  <div class="container">
    <h1>👥 Liste des utilisateurs</h1>
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Date d'inscription</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in utilisateurs" :key="user.id">
          <td>
            <router-link :to="'/client/' + user.nom">{{ user.nom }}</router-link>
          </td>
          <td>{{ user.email }}</td>
          <td>{{ user.inscription }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Utilisateur {
  id: number
  nom: string
  email: string
  inscription: string
}

const utilisateurs = ref<Utilisateur[]>([
  { id: 1, nom: 'Francis Dupont', email: 'francis@example.com', inscription: '2023-03-12' },
  { id: 2, nom: 'Claire Morel', email: 'claire@example.com', inscription: '2023-04-28' },
  { id: 3, nom: 'Jean-Paul Martin', email: 'jp.martin@example.com', inscription: '2023-05-10' },
  { id: 4, nom: 'Élise Lambert', email: 'elise.l@example.com', inscription: '2023-06-01' },
  { id: 5, nom: 'Sofiane Khelifi', email: 'sofiane.k@example.com', inscription: '2023-06-15' },
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
