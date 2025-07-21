<template>
  <div class="container">
    <h1>🛒 Liste des produits alimentaires</h1>

    <div class="articles">
      <div v-for="article in articles" :key="article.ref" class="card">
        <h2>{{ article.nom }}</h2>
        <p>{{ article.description }}</p>
        <p>Prix : {{ article.prix.toFixed(2) }} €</p>
        <p>Quantité en stock : {{ article.quantite }}</p>
        <button @click="ajouterAuPanier(article)" :disabled="article.quantite === 0">
          Ajouter au panier
        </button>
      </div>
    </div>

    <div class="panier">
      <h2>🧺 Mon panier</h2>
        <ul>
            <li v-for="item in panier" :key="item.ref">
                {{ item.nom }} x {{ item.quantite }} ({{ (item.prix * item.quantite).toFixed(2) }} €)
                <button @click="retirerUnDuPanier(item)">➖</button>
                <button @click="supprimerDuPanier(item)">❌ Tout Supprimer</button>
            </li>
        </ul>
      <p v-if="panier.length === 0">Votre panier est vide.</p>
      <p v-else>Total : {{ total.toFixed(2) }} €</p>
    </div>
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
])

const panier = ref<Article[]>([])

function ajouterAuPanier(article: Article) {
  const existing = panier.value.find((item) => item.ref === article.ref)
  if (existing) {
    existing.quantite++
  } else {
    panier.value.push({ ...article, quantite: 1 })
  }

  // Décrémenter la quantité en stock
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
      // Supprimer de la liste si quantité 0
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
    // Récupérer l'article d'origine pour modifier le stock
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
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: sans-serif;
}

.articles {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  border: 1px solid #ccc;
  padding: 1rem;
  width: 250px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

button {
  margin-top: 0.5rem;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
}

.panier {
  margin-top: 2rem;
  border-top: 2px solid #444;
  padding-top: 1rem;
}
</style>
