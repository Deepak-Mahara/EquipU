# 🎒 EquipU: The Ultimate Campus Survival Hub

> **Empowering hostel life, one essential at a time.** 
> EquipU is a purpose-built, full-stack e-commerce ecosystem designed exclusively for campus students. From midnight study snacks to weekend trekking gear, EquipU bridges the gap between campus isolation and essential accessibility.

🌐 **Step into the EquipU campus experience:** [equipu.vercel.app](https://equipu.vercel.app)
---

## 🌟 The Vision

Living in a hostel comes with unique challenges. EquipU was engineered to solve the logistical headache of sourcing daily needs on campus. With a sleek, dark-mode inspired UI featuring frosted glass aesthetics and fluid animations, the platform delivers a premium shopping experience tailored for the modern student.

---

## 🛍️ Curated Campus Categories

*   **🪥 Hostel Essentials:** The non-negotiable daily drivers—from laundry gear to personal care.
*   **📚 Stationery:** Pens, notebooks, and study aids to keep the GPA high.
*   **🔌 Electronics:** Cables, peripherals, and gadgets to keep the tech ecosystem running.
*   **🏕️ Trekking Essentials:** Rucksacks and gear for when it's time to escape the campus bubble.

---

## ✨ Key Features & User Experience

*   **Immersive Interface:** A dynamic hero section featuring interactive frosted glass visuals and scroll-triggered expansions.
*   **Frictionless Discovery:** An intuitive left-sidebar shop navigation with instant sorting (Name A-Z, Price Low/High) and clickable product lightboxes for detailed viewing.
*   **State-of-the-Art Cart Engine:** A globally accessible, sliding cart drawer powered by React Context API. It tracks quantities, handles real-time subtotal updates, and prevents UI layout shifts.
*   **Transparent Checkout:** A robust checkout pipeline calculating accurate itemized totals, an 8% tax rate, and free shipping triggers, all beautifully formatted in Indian Rupees (₹).
*   **Order Dashboard:** A dedicated "Your Orders" tracking page (currently featuring mock data like Order #EQ-84729) to visualize the post-purchase user flow.

---

## 🏗️ The Engine Room (Tech Stack)

EquipU is built on a modern, decoupled architecture, prioritizing component reusability and seamless state management.

**Client-Side (Frontend):**
*   **React.js & Vite:** Lightning-fast HMR and optimized production builds.
*   **Tailwind CSS (v4.3.5):** Utility-first styling for rapid, responsive, and custom UI design.
*   **React Router DOM:** Seamless client-side routing and URL-parameter filtering.
*   **Context API:** Prop-drilling eliminated; global cart state managed cleanly.
*   **Hosting:** Vercel

**Server-Side (Backend & Database):**
*   **Node.js & Express.js:** Robust, scalable RESTful API architecture.
*   **MongoDB Atlas:** Cloud-native NoSQL database handling flexible product schemas.
*   **Hosting:** Render

---

## 🚀 The Roadmap: What's Next?

EquipU is an evolving platform. The immediate development pipeline is focused on bridging the gap between browsing and buying:

1.  **🔐 Authentication & Identity:** Implementing secure user onboarding (Login/Signup) so students can maintain persistent carts, save favorite items, and track their purchase history.
2.  **💳 Payment Gateway Integration:** Replacing the current dummy "Confirm to Pay" flow with a live, secure payment processor. This will finalize the checkout lifecycle and dynamically populate the currently mocked "Your Orders" dashboard with real transactional data.

---

## 💻 Developer Setup (Run Locally)

Want to explore the codebase? Follow these steps to spin up EquipU on your local machine.

### Prerequisites
*   Node.js (v18+ recommended)
*   Git
*   MongoDB Atlas URI (or local MongoDB instance)

### 1. Clone & Install
```bash
git clone [https://github.com/Deepak-Mahara/EquipU.git] 
cd EquipU

2. Frontend Configuration
cd frontend
npm install

Create a .env file in the frontend root and link the backend:
    VITE_API_URL=http://localhost:5000
    Start the frontend: npm run dev

3. Backend Configuration
Open a new terminal tab and navigate to the backend:
    cd backend
    npm install

Create a .env file in the backend root with your database credentials:
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
Start the backend: npm run dev
