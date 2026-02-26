# Wallet POC

## Quick Start for local development

Use this order when running locally:

1. `backend` (API) on port `5000`
2. `strapi-cms` (content) on port `1337`
3. `frontend` = `payment` app on port `3000` (Mimicks Subdomain app)
4. `sa-frontend` = `sa` app on port `3001` (Mimicks Primary domain app)

### One-time setup (each folder)

Run `npm install` in each folder:

- `backend`
- `strapi-cms`
- `frontend`
- `sa-frontend`

### Start commands (use 4 terminals)

Terminal 1:

```bash
cd backend
npm start
```

Terminal 2:

```bash
cd strapi-cms
npm run develop
```

Terminal 3 (payment app must be `3000`):

```bash
cd frontend
npm run dev -- -p 3000
```

Terminal 4 (sa app must be `3001`):

```bash
cd sa-frontend
npm run dev -- -p 3001
```

### Home page endpoints

- `sa` app home: `http://sa.lvh.me:3001`
- `payment` app home: `http://payment.lvh.me:3000`
- backend API base: `http://localhost:5000`
- strapi admin: `http://localhost:1337/admin`

> `sa.lvh.me` and `payment.lvh.me` are local subdomain-style hosts mapped to your machine (localhost).

---

---

---

## Frontend

Tech Stack: React, NextJS, Tailwind CSS, Auth0

---

## Backend

Tech Stack: NodeJS, ExpressJS

### Routes

**Route**:
Save Wallet API endpoint
http://localhost:5000/api/wallet/save

**Postman cURL**:
postman request POST 'http://localhost:5000/api/wallet/save' \
 --header 'Content-Type: application/json' \
 --body '{
"accountNumber": "123456789",
"routingNumber": "543215432",
"nickname":"sudir Amex"
}'

---

---

---

## Strapi CMS

Tech Stack: Strapi (NodeJS), SQLite(internal)

### Local Development

- Start Strapi server: `npm run develop` (from Strapi project root)
- Strapi Local Dashboard opens up: `http://localhost:1337/admin`

## Wallet Form CMS

**cURL**: curl --location 'http://localhost:1337/api/wallet-labels'

**Endpoint**: http://localhost:1337/api/wallet-labels

**Sample response**:

```json
{
  "data": [
    {
      "id": 11,
      "documentId": "nx2h51snczlw49dyfg9dah83",
      "title": "Wallet Page",
      "createdAt": "2026-02-23T11:01:59.055Z",
      "updatedAt": "2026-02-23T16:58:01.233Z",
      "publishedAt": "2026-02-23T16:58:01.236Z",
      "accountLabel": "Account Number",
      "routingLabel": "Routing Number (10 digits)",
      "nicknameLabel": "Account Nickname",
      "submitButton": "Save to Wallet",
      "body": "Please enter the details below to save to your Digital Wallet\n\n",
      "accountTypeLabel": "Account Type",
      "accountType": {
        "savingsAccountLabel": "savings",
        "currentAccountLabel": "current"
      },
      "termsAndConditionsCheckbox": false,
      "termsAndConditionsModal": {
        "heading": "Terms & Conditions",
        "body": "By saving your wallet, you agree to our policies...",
        "closeButtonLabel": "close"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

---

## Success Page CMS

**cURL**: curl --location 'http://localhost:1337/api/success-pages'

**Endpoint**: http://localhost:1337/api/success-pages

**Sample response**:

```json
{
  "data": [
    {
      "id": 3,
      "documentId": "hi5pv7fdxf9qyfax2a0d1utc",
      "title": "Saved to Wallet Successfully ",
      "nicknameLabel": "Nickname",
      "accountLabel": "Account",
      "createdAt": "2026-02-23T13:20:13.034Z",
      "updatedAt": "2026-02-23T15:13:59.322Z",
      "publishedAt": "2026-02-23T15:13:59.329Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

---

## Error Page CMS

**cURL**: curl --location 'http://localhost:1337/api/error-pages'

**Endpoint**: 'http://localhost:1337/api/error-pages'

**Sample response**:

```json
{
  "data": [
    {
      "id": 3,
      "documentId": "v0gyjc9g68vs2lud1c89brju",
      "title": "Something Went Wrong ",
      "body": "An unexpected error occurred. Please try again in sometime",
      "buttonLabel": "Try Again",
      "createdAt": "2026-02-23T15:16:42.851Z",
      "updatedAt": "2026-02-24T10:30:57.524Z",
      "publishedAt": "2026-02-24T10:30:57.528Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

---

---

---
