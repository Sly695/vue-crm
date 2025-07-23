<template>
  <div class="users-container">
    <h1 class="title">👥 Gestion des utilisateurs</h1>
    <h2 class="subtitle">👤 Utilisateurs actifs</h2>
    <p v-if="activeUsers.length === 0">Aucun utilisateur actif.</p>
    <p v-else class="total">🟢 Total utilisateurs actifs : {{ activeUsers.length }}</p>

    <div class="active-users-section">
      <table class="users-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in activeUsers" :key="user.id">
            <td>{{ user.nom }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.actif ? 'Actif' : 'Inactif' }}</td>
            <td>
              <button @click="desactiverUser(user)">🔒 Désactiver</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 class="subtitle">📋 Liste complète des utilisateurs</h2>
    <table class="users-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in utilisateurs" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.nom }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.actif ? 'Actif' : 'Inactif' }}</td>
          <td>
            <button
              v-if="!user.actif"
              @click="activerUser(user)"
            >
              🔓 Activer
            </button>
            <button
              v-else
              @click="desactiverUser(user)"
            >
              🔒 Désactiver
            </button>
            <button @click="changerRole(user)">♻️ Changer rôle</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Utilisateur {
  id: number
  nom: string
  email: string
  role: 'user' | 'admin' | 'moderator'
  actif: boolean
}

// Exemple de données utilisateurs
const utilisateurs = ref<Utilisateur[]>([
  { id: 1, nom: 'Alice Dupont', email: 'alice@example.com', role: 'admin', actif: true },
  { id: 2, nom: 'Bob Martin', email: 'bob@example.com', role: 'user', actif: true },
  { id: 3, nom: 'Claire Petit', email: 'claire@example.com', role: 'moderator', actif: false },
  { id: 4, nom: 'David Durand', email: 'david@example.com', role: 'user', actif: true },
])

// Utilisateurs actifs (similaire au panier dans ton exemple)
const activeUsers = computed(() => utilisateurs.value.filter(u => u.actif))

// Activer un utilisateur
function activerUser(user: Utilisateur) {
  user.actif = true
}

// Désactiver un utilisateur
function desactiverUser(user: Utilisateur) {
  user.actif = false
}

// Changer rôle utilisateur (simple cycle : user → moderator → admin → user)
function changerRole(user: Utilisateur) {
  if (user.role === 'user') user.role = 'moderator'
  else if (user.role === 'moderator') user.role = 'admin'
  else user.role = 'user'
}
</script>

<style scoped>
.users-container {
  max-width: 100vw;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  padding: 32px;
}

.title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.4rem;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  background-color: #fff;
}

.users-table th,
.users-table td {
  border: 1px solid #ddd;
  padding: 0.6rem;
  text-align: left;
}

.users-table th {
  background-color: #f2f2f2;
}

.users-table tbody tr:hover {
  background-color: #fafafa;
}

button {
  padding: 0.3rem 0.6rem;
  margin: 0 0.2rem;
  cursor: pointer;
  background-color: #42B883;
  color: white;
  border: none;
  border-radius: 4px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.total {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
