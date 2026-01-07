# 99Tech Code Challenge Solutions

This repository contains my solutions for the 99Tech code challenges 1–3.

---

## Problem 1
- **File:** `src/problem1/index.js`
- **Description:** Implements three methods to sum numbers from 1 to `n`:
  1. Loop-based (`sum_to_n_a`)
  2. Recursive (`sum_to_n_b`)
  3. Array reduce (`sum_to_n_c`)
- **Notes:** It is assumed that only positive integers are accepted as input. Thus, input validation rejects zero or negative integers.

---

## Problem 2
- **Folder:** `src/problem2/`
- **Description:** A React + Vite project that implements a currency swap form.
  - Uses `shadcn/ui` components and `tailwindcss`.
  - Fully responsive for mobile and desktop.
  - Includes a swap confirmation dialog with loading and success toast.
  - Includes a simple toggle button for switching light/dark mode.

- **How to run:**
  ```bash
  cd src/problem2
  npm install
  npm run dev
  ```

## Problem 3
- **File:** `src/problem3/index.tsx`
- **Description:** Refactored version of the provided messy React code.:
  - Contains in-line comments for specific fixes.
  -	explanation.txt summarises all issues identified and solutions applied.
- **Notes:**
  - Standalone TypeScript file, assumes existence of useWalletBalances and usePrices hooks, as well as WalletRow component.
  - I created a minimal React project for Problem 3 to easily debug and visually verify the refactored component, even though the solution itself is a standalone TypeScript file.
