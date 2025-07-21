<template>
  <div class="dashboard-container">
    <h1>Dashboard</h1>
    <div class="cards">
      <div class="card" v-for="stat in stats" :key="stat.title">
        <h3>{{ stat.title }}</h3>
        <p class="value">{{ stat.value }}</p>
        <p class="desc">{{ stat.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Exemple de stats : ces valeurs peuvent venir de ta state, API ou store Pinia
const stats = [
  {
    title: 'Produits',
    value: 128,
    description: 'Nombre total de produits disponibles',
  },
  {
    title: 'Commandes',
    value: 54,
    description: 'Commandes en cours',
  },
  {
    title: 'Utilisateurs',
    value: 32,
    description: 'Utilisateurs inscrits',
  },
  {
    title: 'Admins',
    value: 3,
    description: 'Administrateurs actifs',
  },
]
</script>

<style scoped>
.dashboard-container {
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 1.5rem;
  flex: 1 1 200px;
  min-width: 200px;
  text-align: center;
}

.card h3 {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #42b883;
}

.desc {
  color: #666;
  margin-top: 0.3rem;
  font-size: 0.9rem;
}
</style>
