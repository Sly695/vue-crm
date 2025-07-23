import { defineStore } from 'pinia';

interface Article {
  ref: string;
  nom: string;
  prix: number;
  quantite: number;
  description: string;
}

export const usePanierStore = defineStore('panier', {
  state: () => ({
    panier: [] as Article[],
  }),
  getters: {
    total: (state) => state.panier.reduce((acc, item) => acc + item.prix * item.quantite, 0),
  },
  actions: {
    ajouter(article: Article) {
      const existing = this.panier.find((item) => item.ref === article.ref);
      if (existing) {
        existing.quantite++;
      } else {
        this.panier.push({ ...article, quantite: 1 });
      }
    },
    retirer(article: Article) {
      const existing = this.panier.find((item) => item.ref === article.ref);
      if (existing) {
        existing.quantite--;
        if (existing.quantite <= 0) {
          this.supprimer(article);
        }
      }
    },
    supprimer(article: Article) {
      this.panier = this.panier.filter((item) => item.ref !== article.ref);
    },
    vider() {
      this.panier = [];
    },
  },
});
