<template>
  <div class="crm-container">
    <h1 class="title">🛒 Gestion des produits alimentaires</h1>
    <h2 class="subtitle">🧺 Mon panier</h2>
    <p v-if="panier.length === 0">Votre panier est vide.</p>
    <p v-else class="total">💰 Total panier : {{ total.toFixed(2) }} €</p>
    <div class="panier-section">
      <table class="crm-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Quantité</th>
            <th>Prix unitaire (€)</th>
            <th>Total (€)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in panier" :key="item.ref">
            <td>{{ item.nom }}</td>
            <td>{{ item.quantite }}</td>
            <td>{{ item.prix.toFixed(2) }}</td>
            <td>{{ (item.prix * item.quantite).toFixed(2) }}</td>
            <td>
              <button @click="retirerUnDuPanier(item)">➖</button>
              <button @click="supprimerDuPanier(item)">❌</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <table class="crm-table">
      <thead>
        <tr>
          <th>Référence</th>
          <th>Nom</th>
          <th>Description</th>
          <th>Prix (€)</th>
          <th>Stock</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.ref">
          <td>{{ article.ref }}</td>
          <td>{{ article.nom }}</td>
          <td>{{ article.description }}</td>
          <td>{{ article.prix.toFixed(2) }}</td>
          <td>{{ article.quantite }}</td>
          <td>
            <button @click="ajouterAuPanier(article)" :disabled="article.quantite === 0">
              ➕ Ajouter
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Article {
  ref: string
  nom: string
  prix: number
  quantite: number
  description: string
}

const articles = ref<Article[]>([
  { ref: 'F001', nom: 'Pommes', prix: 2.5, quantite: 30, description: 'Pommes rouges bio' },
  { ref: 'F002', nom: 'Bananes', prix: 1.99, quantite: 20, description: 'Bananes équitables' },
  { ref: 'F003', nom: 'Pain complet', prix: 3.2, quantite: 10, description: 'Pain artisanal' },
  { ref: 'F004', nom: 'Lait entier', prix: 1.5, quantite: 15, description: 'Bouteille 1L' },
  { ref: 'F005', nom: 'Œufs bio', prix: 3.8, quantite: 8, description: 'Boîte de 6' },
  { ref: 'F006', nom: 'Jambon', prix: 4.75, quantite: 12, description: '4 tranches' },
  { ref: 'F007', nom: 'Pâtes', prix: 2.1, quantite: 25, description: '500g de penne' },
  { ref: 'F008', nom: 'Riz basmati', prix: 2.99, quantite: 18, description: '1kg de riz' },
  { ref: 'F009', nom: 'Fromage râpé', prix: 2.8, quantite: 14, description: '150g d’emmental râpé' },
  { ref: 'F010', nom: 'Beurre doux', prix: 2.4, quantite: 16, description: 'Plaquette de 250g' },
  { ref: 'F011', nom: 'Yaourts nature', prix: 2.0, quantite: 22, description: 'Pack de 4' },
  { ref: 'F012', nom: 'Farine de blé', prix: 1.35, quantite: 19, description: '1kg' },
  { ref: 'F013', nom: 'Sucre en poudre', prix: 1.6, quantite: 21, description: '1kg' },
  { ref: 'F014', nom: 'Sel fin', prix: 0.99, quantite: 30, description: '500g' },
  { ref: 'F015', nom: 'Poivre moulu', prix: 2.2, quantite: 18, description: '50g' },
  { ref: 'F016', nom: 'Filets de poulet', prix: 6.5, quantite: 10, description: '300g' },
  { ref: 'F017', nom: 'Saumon fumé', prix: 5.9, quantite: 8, description: '4 tranches' },
  { ref: 'F018', nom: 'Courgettes', prix: 1.8, quantite: 25, description: '500g' },
  { ref: 'F019', nom: 'Tomates', prix: 2.3, quantite: 20, description: '500g' },
  { ref: 'F020', nom: 'Carottes', prix: 1.2, quantite: 28, description: '1kg' },
  { ref: 'F021', nom: 'Pommes de terre', prix: 2.5, quantite: 26, description: '2kg' },
  { ref: 'F022', nom: 'Salade verte', prix: 1.7, quantite: 15, description: 'Une pièce' },
  { ref: 'F023', nom: 'Miel', prix: 4.2, quantite: 12, description: 'Pot de 250g' },
  { ref: 'F024', nom: 'Confiture de fraise', prix: 3.4, quantite: 14, description: 'Pot de 370g' },
  { ref: 'F025', nom: 'Jus d’orange', prix: 2.9, quantite: 18, description: 'Bouteille 1L' },
  { ref: 'F026', nom: 'Biscuits sablés', prix: 2.5, quantite: 16, description: 'Paquet de 150g' },
  { ref: 'F027', nom: 'Chocolat noir', prix: 2.3, quantite: 17, description: 'Tablette de 100g' },
  { ref: 'F028', nom: 'Café moulu', prix: 3.9, quantite: 14, description: '250g' },
])


const panier = ref<Article[]>([])

function ajouterAuPanier(article: Article) {
  const existing = panier.value.find((item) => item.ref === article.ref)
  if (existing) {
    existing.quantite++
  } else {
    panier.value.push({ ...article, quantite: 1 })
  }

  const stockArticle = articles.value.find((a) => a.ref === article.ref)
  if (stockArticle && stockArticle.quantite > 0) {
    stockArticle.quantite--
  }
}

function retirerUnDuPanier(article: Article) {
  const panierItem = panier.value.find((item) => item.ref === article.ref)
  const stockItem = articles.value.find((a) => a.ref === article.ref)

  if (panierItem && stockItem) {
    panierItem.quantite--
    stockItem.quantite++

    if (panierItem.quantite === 0) {
      const index = panier.value.findIndex((i) => i.ref === article.ref)
      if (index !== -1) {
        panier.value.splice(index, 1)
      }
    }
  }
}

function supprimerDuPanier(article: Article) {
  const index = panier.value.findIndex((item) => item.ref === article.ref)
  if (index !== -1) {
    const original = articles.value.find((a) => a.ref === article.ref)
    if (original) {
      original.quantite += panier.value[index].quantite
    }
    panier.value.splice(index, 1)
  }
}

const total = computed(() =>
  panier.value.reduce((acc, item) => acc + item.prix * item.quantite, 0)
)
</script>

<style scoped>
.crm-container {
  max-width: 100vw;
  max-height: 100vh;
  margin: 2rem auto;
  font-family: 'Segoe UI', Tahoma, sans-serif;
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

.crm-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  background-color: #fff;
}

.crm-table th,
.crm-table td {
  border: 1px solid #ddd;
  padding: 0.6rem;
  text-align: left;
}

.crm-table th {
  background-color: #f2f2f2;
}

.crm-table tbody tr:hover {
  background-color: #fafafa;
}

button {
  padding: 0.3rem 0.6rem;
  margin: 0 0.2rem;
  cursor: pointer;
  background-color: #3498db;
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
