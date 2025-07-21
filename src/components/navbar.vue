<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="logo">MyCRM</div>
      <ul class="nav-links">
        <li><router-link to="/dashboard" active-class="active-link">Dashboard</router-link></li>
        <li><router-link to="/products" active-class="active-link">Produits</router-link></li>
        <li><router-link to="/orders" active-class="active-link">Commandes</router-link></li>
        <li><router-link to="/users" active-class="active-link">Utilisateurs</router-link></li>
        <li><router-link to="/settings" active-class="active-link">Paramètres</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Pas besoin de code ici pour cette navbar simple
</script>

<style scoped>
.navbar {
  background-color: #42b883;
  padding: 0.8rem 1rem;
  color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-weight: 700;
  font-size: 1.5rem;
  cursor: pointer;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.nav-links li {
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.nav-links a:hover,
.nav-links a.active-link {
  background-color: #369b6d;
}
</style>
