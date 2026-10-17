# 🍰 PASTRY INN — Modern Artisanal Bakery & Patisserie Web Platform

> **Live Demo:** [https://ais-pre-gh7t45gjfo2vdj4wuoz3sg-513039726570.asia-northeast1.run.app](https://ais-pre-gh7t45gjfo2vdj4wuoz3sg-513039726570.asia-northeast1.run.app)  
> **Admin Menu Manager:** [https://ais-pre-gh7t45gjfo2vdj4wuoz3sg-513039726570.asia-northeast1.run.app?admin=true](https://ais-pre-gh7t45gjfo2vdj4wuoz3sg-513039726570.asia-northeast1.run.app?admin=true)  
> **Author & Lead Engineer:** **Agraharapu Bala Venkatesh** ([@Balu3849](https://github.com/Balu3849)) · 📞 +91 9391233769 · ✉️ balu9391233@gmail.com  

---

## 📖 Overview

**PASTRY INN** is an omnichannel artisanal bakery and patisserie e-commerce web platform engineered for modern bakeries and highway cafe landmarks. Built for high performance and responsiveness, the application bridges the gap between dine-in table ordering, express highway takeaway, and doorstep delivery with automated WhatsApp ordering and a multi-rail payment gateway.

### 📍 Flagship Outlets
- **Annavaram Flagship (NH-16):** Opposite NVR Complex, National Highway 16, Annavaram, Andhra Pradesh ([Google Maps](https://maps.app.goo.gl/p6rg9Rhg13dbg7zR6))
- **Tuni Town Branch:** GNT Road, Beside Indian Oil Petrol Pump, Near RTC Complex, Tuni, Andhra Pradesh ([Google Maps](https://maps.app.goo.gl/GqYerkSa8keoaogA7))
- **Helpline / WhatsApp:** +91 96663 51333 (`09666351333`)

---

## ✨ Key Features

- **📱 Digital QR Code Table Ordering System:**
  - Dynamic vector-sharp SVG QR generator parameterized by Table # (`?table=1` to `Table #25`) or Highway Drive-By takeaway.
  - Automatic table parameter detection from URL query with a welcoming table-service banner.
  - One-click **"Print Table Tent Card"** mode for physical in-store dining tables.

- **💳 Multi-Rail Integrated Payment Gateway:**
  - **UPI Instant Pay:** Real-time dynamic payment QR code scannable with Google Pay, PhonePe, Paytm, CRED, or direct UPI VPA validation.
  - **Credit & Debit Cards:** Interactive credit card visual with Luhn validation, real-time spacing, expiry, and CVV masking.
  - **Net Banking:** Popular Indian banks selection (HDFC, SBI, ICICI, Axis, Kotak, PNB).
  - **Pay on Delivery / Counter:** Instant order confirmation with cash handling.
  - **Order Simulation & Celebration:** Confetti burst (`canvas-confetti`) with live progress tracker (*Confirmed → Baking in Oven → Packaged → Out for Delivery*).

- **📲 Automated WhatsApp Business Protocol:**
  - Serializes carts, portions, custom cake inscriptions (e.g. *"Happy Birthday Rohit!"*), addresses, and pricing into structured WhatsApp messages to **+91 96663 51333**.
  - Persistent expandable floating WhatsApp quick-inquiry widget.

- **🧁 Rich Menu & Dietary Filters:**
  - 100% Pure Veg / Eggless green tag toggle.
  - Real-time search across ingredients, portions, and categories (*Pastries, Cakes, Viennoiserie, Savouries, Cookies, Beverages*).

- **⚙️ Live In-App Admin Product & Pricing Manager:**
  - Direct route via `?admin=true` or the on-page "Admin: Manage Menu" button.
  - Edit prices and product images live in the UI without modifying code.
  - Add new products on the fly with instant persistence to `localStorage`.

- **🎨 Anti-Slop Editorial Design System:**
  - Earthy pastel palette: Warm Cream (`#FAF7F2`), Biscuit (`#F3EBDD`), Terracotta (`#C86D51`), Dark Cocoa (`#29221F`).
  - Zero-pill metadata discipline, typographic contrast (**Playfair Display** + **Plus Jakarta Sans**), and WCAG AA compliance.

---

## 🛠️ Tech Stack

| Technology | Role |
| :--- | :--- |
| **React 19** | Modern UI components, hooks, functional state |
| **TypeScript** | Strict type safety for menu items, carts, orders, and branches |
| **Tailwind CSS v4** | Modern utility-first responsive styling and theme variables |
| **Vite** | Blazing-fast build tool and dev server |
| **Canvas Confetti** | Celebratory particle effects on successful payment |
| **Lucide React** | Clean, affordance-only icons |

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/Balu3849/pastry-inn.git
cd pastry-inn
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 4. Build for production
```bash
npm run build
```

---

## 📁 Project Structure

```text
├── index.html                   # HTML entry point with Google Fonts & SEO tags
├── package.json                 # Project dependencies & npm scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite configuration with Tailwind CSS v4
├── src/
│   ├── main.tsx                 # React DOM root entry
│   ├── App.tsx                  # Main application orchestrator & state
│   ├── index.css                # Global CSS theme variables & fonts
│   ├── types.ts                 # TypeScript interfaces (Menu, Cart, Orders, Reviews)
│   ├── data/
│   │   └── bakeryData.ts        # Central menu catalog, branches, reviews & contact
│   ├── utils/
│   │   └── qrCodeGenerator.ts   # Dynamic SVG QR code generator & WhatsApp serializer
│   └── components/
│       ├── Header.tsx           # Navigation, live IST opening hours & bag button
│       ├── Hero.tsx             # Visual showcase, brand kicker & quick CTAs
│       ├── MenuSection.tsx      # Filterable menu, dietary toggles & price tags
│       ├── ItemDetailModal.tsx  # Ingredients, portion, allergens & cake text customizer
│       ├── CartDrawer.tsx       # Slide-over shopping bag with promo codes & GST calculation
│       ├── CheckoutPaymentModal.tsx # Multi-rail payment gateway (UPI QR, Card, NetBanking)
│       ├── DigitalQRModal.tsx   # Scannable table QR menu & printable tent card
│       ├── AdminMenuModal.tsx   # Live product, pricing & photo editor
│       ├── LocationShowcase.tsx # Annavaram & Tuni branches with Google Maps routing
│       ├── CustomerReviews.tsx  # Google reviews rating breakdown & interactive review form
│       ├── AmbienceGallery.tsx  # Display counters, cake studio & cafe seating gallery
│       ├── ContactSection.tsx   # Custom birthday/wedding cake & catering inquiry form
│       ├── WhatsAppFloat.tsx    # Persistent floating WhatsApp assistant
│       ├── CaseStudyModal.tsx   # Developer engineering showcase for Resume & LinkedIn
│       └── Footer.tsx           # Outlets, copyright, and developer credits
```

---

## 👤 Author & Developer

**Agraharapu Bala Venkatesh**  
- **GitHub:** [@Balu3849](https://github.com/Balu3849)  
- **Phone:** [+91 9391233769](tel:+919391233769)  
- **WhatsApp:** [Chat on WhatsApp](https://wa.me/919391233769)  
- **Email:** balu9391233@gmail.com  

---

## 📄 License
This project was built for showcase purposes. All rights reserved by PASTRY INN.
