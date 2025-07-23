<template>
  <div class="crm-container">
    <h1 class="title">🛒 Gestion des produits alimentaires</h1>
    <h2 class="subtitle">🧺 Mon panier</h2>
    <p v-if="panierStore.panier.length === 0">Votre panier est vide.</p>
    <p v-else class="total">💰 Total panier : {{ panierStore.total.toFixed(2) }} €</p>

    <div class="panier-section">
      <table class="crm-table" v-if="panierStore.panier.length > 0">
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
          <tr v-for="item in panierStore.panier" :key="item.ref">
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

      <div class="button-wrap" v-if="panierStore.total > 0">
        <button @click="validerPanier">Payer</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { usePanierStore } from "@/stores/panier";

const panierStore = usePanierStore();
const router = useRouter();

interface Article {
  ref: string;
  nom: string;
  prix: number;
  quantite: number;
  description: string;
}

const articles = ref<Article[]>([
  { ref: "F001", nom: "Pommes", prix: 2.5, quantite: 30, description: "Pommes rouges bio" },
  { ref: "F002", nom: "Bananes", prix: 1.99, quantite: 20, description: "Bananes équitables" },
  { ref: "F003", nom: "Pain complet", prix: 3.2, quantite: 10, description: "Pain artisanal" },
  // ... (ajoute ici le reste de tes articles comme avant)
]);

function ajouterAuPanier(article: Article) {
  panierStore.ajouter(article);
  const stockArticle = articles.value.find((a) => a.ref === article.ref);
  if (stockArticle && stockArticle.quantite > 0) {
    stockArticle.quantite--;
  }
}

function retirerUnDuPanier(article: Article) {
  panierStore.retirer(article);
  const stockArticle = articles.value.find((a) => a.ref === article.ref);
  if (stockArticle) {
    stockArticle.quantite++;
  }
}

function supprimerDuPanier(article: Article) {
  const panierItem = panierStore.panier.find((item) => item.ref === article.ref);
  if (panierItem) {
    const stockArticle = articles.value.find((a) => a.ref === article.ref);
    if (stockArticle) {
      stockArticle.quantite += panierItem.quantite;
    }
  }
  panierStore.supprimer(article);
}

function validerPanier() {
  router.push("/panier");
}
</script>

<style scoped>
.crm-container {
  padding: 32px;
  max-width: 100vw;
  max-height: 100vh;
  font-family: "Segoe UI", Tahoma, sans-serif;
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
  background-color: #42b883;
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

.button-wrap {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}
</style>
