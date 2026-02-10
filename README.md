# Final Exam

Vite + React + TypeScript + Mantine  
Public data fetched from Back4App (Parse REST API)

## Setup

```bash
npm install
npm run dev
```

# 📦 Documentazione MockAPI — Store Prodotti

## Base URL

Tutte le richieste API utilizzano il seguente base endpoint:

```
https://69810f04c9a606f5d446090c.mockapi.io/api/v1
```

---

# 🛍 Risorsa: Products

Rappresenta il catalogo prodotti dello store (abbigliamento, accessori, outerwear, ecc.).

Endpoint principale:

```
/Products
```

---

# 📘 Schema Prodotto

Struttura TypeScript corrispondente ai dati MockAPI:

```ts
type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "OneSize";

type Product = {
  id: string;
  createdAt: string;

  code: string;
  name: string;
  description: string;

  images: string[];

  brand: string;
  category: string;

  sizes: Partial<Record<Size, number>>;
};
```

---

# 📌 Descrizione Campi

| Campo       | Tipo         | Descrizione                                |
| ----------- | ------------ | ------------------------------------------ |
| id          | string       | Identificatore univoco generato da MockAPI |
| createdAt   | string (ISO) | Data creazione record                      |
| code        | string       | Codice interno / SKU                       |
| name        | string       | Nome prodotto                              |
| description | string       | Descrizione completa                       |
| images      | string[]     | Lista immagini (filename o URL)            |
| brand       | string       | Marca                                      |
| category    | string       | Categoria prodotto                         |
| sizes       | object       | Mappa taglia → prezzo                      |

---

# 📐 Formato Campo Sizes

Il campo `sizes` è un oggetto dove:

```
chiave = taglia
valore = prezzo
```

## Esempio abbigliamento

```json
"sizes": {
  "S": 90,
  "M": 95,
  "L": 100
}
```

## Esempio accessorio

```json
"sizes": {
  "OneSize": 35
}
```

---

# 🌐 Endpoint Disponibili

---

## ✅ Recupera Tutti i Prodotti

### Request

```
GET /Products
```

### Esempio

```
GET /api/v1/Products
```

### Risposta

```json
[
  {
    "id": "prod_001",
    "createdAt": "2026-02-10T00:00:00Z",
    "code": "HYPE-TEE-WHT",
    "name": "Essential Tee White",
    "description": "Premium cotton t-shirt",
    "images": ["tee1.jpg", "tee2.jpg"],
    "brand": "Hype Clothing",
    "category": "tops",
    "sizes": {
      "S": 40,
      "M": 45,
      "L": 50
    }
  }
]
```

---

## ✅ Recupera Prodotto per ID

```
GET /Products/:id
```

### Esempio

```
GET /Products/prod_001
```

Restituisce un singolo oggetto prodotto.

---

## ✅ Crea Nuovo Prodotto

```
POST /Products
```

### Body esempio

```json
{
  "code": "HYPE-HOODIE-GRY",
  "name": "Graphic Hoodie Grey",
  "description": "Soft fleece hoodie",
  "images": ["hoodie1.jpg"],
  "brand": "Hype Clothing",
  "category": "hoodies",
  "sizes": {
    "S": 90,
    "M": 95,
    "L": 100
  }
}
```

---

## ✅ Aggiorna Prodotto

```
PUT /Products/:id
```

Aggiorna completamente il record prodotto.

---

## ✅ Elimina Prodotto

```
DELETE /Products/:id
```

Rimuove il prodotto dal catalogo.

---

# 🔎 Query Supportate da MockAPI

MockAPI fornisce parametri query integrati.

---

## Filtraggio per campo

```
/Products?brand=Hype Clothing
```

---

## Ricerca testuale

```
/Products?search=hoodie
```

---

## Ordinamento

```
/Products?sortBy=createdAt&order=desc
```

---

## Paginazione

```
/Products?page=1&limit=12
```

---

# 💰 Calcolo Prezzo nel Frontend

Poiché i prezzi sono dentro `sizes`, il prezzo minimo visualizzato va calcolato:

```ts
const minPrice = Math.min(
  ...Object.values(product.sizes).filter(
    (v): v is number => typeof v === "number"
  )
);
```

---

# 🖼 Immagine Principale

Nel catalogo si usa la prima immagine:

```ts
const mainImage = product.images[0];
```

---

# 🔍 Ricerca Frontend Consigliata

Per migliorare la ricerca lato client:

```
name + brand + code
```

---

# ⚠️ Note sui Dati MockAPI

In alcune configurazioni MockAPI può restituire array come stringhe JSON.

Se necessario:

```ts
function parseImages(value: unknown): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") return JSON.parse(value);
  return [];
}
```

---

# 🏗 Struttura Consigliata Frontend

```
/types/product.ts
/api/storeApi.ts
/pages/products.tsx
/components/ProductCard
```

---

# ✅ storeApi.ts — esempio base

```ts
const BASE =
  "https://69810f04c9a606f5d446090c.mockapi.io/api/v1";

export const getProducts = () =>
  fetch(`${BASE}/Products`).then(r => r.json());

export const getProduct = (id: string) =>
  fetch(`${BASE}/Products/${id}`).then(r => r.json());
```

---

# 🎯 Copertura Funzionale

Questa MockAPI supporta:

* Catalogo prodotti
* Scheda prodotto
* Prezzi per taglia
* Filtri per brand/categoria
* Ordinamento
* Paginazione
* Operazioni CRUD complete

Adatta per:

```
Catalogo ecommerce
Product detail page
Carrello
Filtri
Ricerca
Ordinamenti
```

---

**Fine documentazione MockAPI Store**
