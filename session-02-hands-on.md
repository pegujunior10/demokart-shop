# Build DemoKart yourself (hands-on guide)

**Time:** 11:30 to 13:00. **You will build:** an online shop called DemoKart, from an empty folder, by giving prompts to Claude Code. **At the end:** a working shop on your laptop, with its code in your own private GitHub repo.

## What are we doing today?

You are going to build a real online shop, even if you have never built a website before. You will not type code yourself. Instead you will **describe what you want in plain English**, and an AI tool called **Claude Code** will write the code for you.

Think of it like working with a very fast assistant:
- **You** are the boss. You decide what the shop should look like and how it should work.
- **Claude Code** is the assistant. It writes the files, installs the tools and runs the commands.
- **Your job** is to give clear instructions, check the result, and ask for fixes when something is wrong.

Here is the journey for the next 90 minutes:

```text
Empty folder  ->  Home page with products  ->  Filter, sort and search
              ->  Shopping cart            ->  Code saved on GitHub
```

### Words you will hear today

| Word | What it means in plain English |
|---|---|
| **Prompt** | A message you type to Claude Code, telling it what to do. |
| **Claude Code** | An AI assistant that lives in your terminal. It can read and write files and run commands. |
| **Terminal** | A text window where you type commands instead of clicking buttons. |
| **Next.js** | A toolkit for building websites. It gives us the pages and the structure, so we do not start from nothing. |
| **Tailwind CSS** | A tool for styling a website (colours, spacing, fonts) so it looks good. |
| **Component** | One reusable piece of a page, such as the header or a product card. |
| **localhost** | A website that runs only on your own laptop, so only you can see it. |
| **localStorage** | A small storage space inside your browser, where a website can save things like your cart. |
| **Git** | A tool that saves versions of your code, like "save game" points. |
| **Commit** | One saved version in Git, with a short message about what changed. |
| **GitHub** | A website that keeps an online copy of your Git versions, so your code is safe and shareable. |
| **Repo** | Short for repository: one project's folder of code on GitHub. |

You do not need to memorise these. Come back to this table whenever a word is new.

## How to use this guide

A **prompt** is a message you give to Claude Code. This guide has two kinds of text, and they look different:

- **Grey boxes** hold text you **copy and paste** into Claude Code. Copy everything inside the box.
- **Normal text** (steps, checks, tips) is for **you to read and follow**. Never paste it into Claude Code.

Your shop will not look exactly like your neighbour's. Claude Code makes small choices differently each time. That is fine. What matters is that your shop passes the "Check it worked" list at the end of each step.

| Time (suggested) | Step | You are done when |
|---|---|---|
| 11:30 | 0. Get ready | `node -v` and `gh auth status` both work |
| 11:40 | 1. Build the home page | 15 products show on localhost |
| 12:05 | 2. Add filter, sort and search | All three work together |
| 12:20 | 3. Add the cart | Add to cart works and survives a reload |
| 12:40 | 4. Push to GitHub | Your private repo is on GitHub |
| 12:55 | 5. Share | Repo link posted in Slack |

Go in order. Each prompt builds on the one before it. If you finish early, wait at the checkpoint or help the person next to you.

---

## Step 0. Get ready (10 min)

**What is happening and why:** before we build, we make sure your laptop has the right tools. This is like checking you have a pen and paper before an exam. Nothing is built in this step.

- **Node.js** lets your laptop run the tools that build websites. `node -v` checks it is installed.
- **GitHub CLI (`gh`)** lets Claude Code talk to your GitHub account from the terminal. `gh auth status` checks you are signed in.
- **Why an empty folder?** Claude Code will put all your shop's files in it. An empty folder keeps the project clean.

Do these things yourself. There is nothing to paste yet.

1. Create an empty folder called `demokart-shop`. Use lowercase and keep it empty.
2. Open that folder in VS Code.
3. Open the terminal in VS Code and start Claude Code.
4. Check your tools by typing these two commands in the terminal:
   - `node -v` should show version 20 or higher.
   - `gh auth status` should say "Logged in".
5. If `gh auth status` says you are not logged in, run `gh auth login` and choose **GitHub.com**, then **HTTPS**, then **Login with a web browser**.

Stuck on any of these? Put your hand up now.

---

## Step 1. Build the home page (25 min)

**What this does:** Claude Code creates a Next.js app and builds the DemoKart home page with 15 products.

**What is happening and why:**
- This is the biggest prompt of the day, and it is long on purpose. A good prompt says **what to build**, **what the data looks like**, **how it should look**, and **how to check it is finished**. Read it and spot those four parts.
- Claude Code first sets up an empty Next.js project (this installs a lot of files, so it can take a minute or two).
- It then creates a file with your 15 products (`data/products.js`), and builds the page from small pieces called components: Header, Hero, CategoryFilter, ProductCard, ProductGrid and Footer.
- Finally it starts your shop on **localhost**. Only you can see it, and only while it is running.
- You will see Claude Code ask permission before it runs commands. That is a safety feature. Read each one, and ask if you do not understand it.

**What you do:**
1. Copy the whole prompt below.
2. Paste it into Claude Code and press Enter.
3. Read each command Claude Code asks to run, then approve it.
4. Wait until it gives you a local link (usually `http://localhost:3000`), then open it in your browser.

**Prompt 1: paste this into Claude Code**

```text
Create a new Next.js app in this empty folder.
Use JavaScript (not TypeScript), the App Router and Tailwind CSS.
Use non-interactive options so setup does not stop to ask questions, for example:
npx create-next-app@latest . --js --app --tailwind --eslint --no-src-dir --import-alias "@/*" --use-npm --yes

Then build a polished, market-ready home page for an online shop called DemoKart.
It should look like a real e-commerce brand, not a tutorial project.

DATA
Put 15 realistic products in data/products.js. Each product has:
- id
- name
- category (Electronics, Fashion, Home or Books)
- price in rupees (a whole number between 199 and 49999)
- originalPrice (higher than price, shown with a strikethrough)
- rating (3.8 to 4.9)
- reviews (a count between 20 and 5000)
- badge (optional: "Bestseller", "New" or "Sale")
- image

Rules for the products:
- Use realistic names, for example "Noise-Cancelling Wireless Headphones",
  "Cotton Oxford Shirt", "Ceramic Pour-Over Coffee Set", "Atomic Habits Paperback".
- Spread them across all four categories, with at least 3 in each.
- For images, use a real Unsplash photo that matches the product:
  https://images.unsplash.com/photo-<id>?auto=format&fit=crop&w=600&h=600&q=80
  Make sure every URL works and shows the right item. If you cannot verify a photo,
  use https://placehold.co/600x600/png?text=Product+Name for that product.

IMAGES
- Use plain <img> tags, not next/image.
- Add loading="lazy", a meaningful alt text, and a fixed square shape
  (aspect-square, object-cover) so the grid never jumps around.
- Add an onError handler that swaps in the placehold.co fallback image.

PAGE LAYOUT
- Header: sticky, white background, with a subtle shadow or border.
  - DemoKart logo/wordmark on the left.
  - Search box in the centre (visible on desktop, collapsed on mobile).
  - Cart and account icons on the right.
- Hero banner under the header: a bold headline, a one-line subheading, a
  "Shop now" button and a clean gradient background. Keep it compact, not full-screen.
- Category filter bar: pill buttons for All, Electronics, Fashion, Home and Books.
  Clicking one filters the grid. This needs a client component with useState.
  Highlight the active pill.
- Search: filter products by name as the user types.
- Product grid: 1 column on small phones, 2 on mobile, 3 on tablet, 4 on desktop,
  with comfortable gaps.
- Footer: simple, with columns for Shop, Support and Company, plus a copyright line.

PRODUCT CARD
- Rounded corners, soft shadow, a small lift on hover and a slight image zoom.
- The badge sits in a corner of the image.
- Category label in small, muted, uppercase text.
- Product name limited to 2 lines.
- Star rating with the review count.
- Price in bold with the ₹ symbol and Indian number formatting (toLocaleString('en-IN')).
- Original price struck through in grey.
- A green "% off" tag calculated from the two prices.
- An "Add to cart" button.

BEHAVIOUR
- The cart count in the header goes up when "Add to cart" is clicked
  (simple client-side state, no backend).
- Show a friendly "No products found" message when a filter or search returns nothing.

STYLE
- Clean and modern, with lots of whitespace.
- One accent colour (for example indigo or orange) plus neutral greys.
- Inter or a system font, with consistent spacing.
- Fully responsive and accessible: visible focus states, aria-labels on icon-only
  buttons, and enough colour contrast.

CODE
- Set the page title and meta description in app/layout.js.
- Split the code into components in a components/ folder:
  Header, Hero, CategoryFilter, ProductCard, ProductGrid and Footer.

WHEN DONE
Run the build or lint to check for errors, start the dev server, and give me the local link.
```

**What you just learned:** a detailed prompt gives a detailed result. Every part of the product card you see (the badge, the struck-through price, the green "% off") exists because one line of the prompt asked for it. Look at the prompt again and match the lines to what you see on screen.

**Check it worked.** Tick every line before you raise your hand:
- [ ] The DemoKart home page opens in your browser.
- [ ] There are 15 products with photos, prices, a struck-through original price and a green "% off" tag.
- [ ] The header stays at the top when you scroll, with the DemoKart name, a search box and a cart icon.
- [ ] The page still looks fine when you make the browser window narrow.

**If something goes wrong.** Paste the matching sentence into Claude Code:

| Problem | Paste this |
|---|---|
| Setup stops and asks you a question | `Use the non-interactive options and the default answers.` |
| A photo does not show | `Check the image links and use the placehold.co fallback.` |
| You see a red build or lint error | `Fix this error:` then paste the error text after it |

Other problems: the folder must be empty and lowercase. If port 3000 is busy, open the link the terminal prints, often `localhost:3001`.

---

## Step 2. Add filter, sort and search (15 min)

**What this does:** you can narrow the products by category, sort by price, and search by name, all at once.

**What is happening and why:**
- A real shop has too many products to scroll through, so shoppers need ways to find things quickly.
- The filter, the sort and the search all work on the same list of products. First the list is **filtered** (by category and search words), then it is **sorted** (by price). That order is why the three controls can work together instead of fighting each other.
- It happens instantly because everything runs inside your browser, on products already on the page. Nothing is sent to a server, so there is no waiting and no page reload.
- The prompt says "never change the original list, make a copy first". This protects your original product order, so "Featured" can always go back to it.

**What you do:**
1. Copy the whole prompt below.
2. Paste it into Claude Code and press Enter.
3. When it finishes, refresh your browser.

**Prompt 2: paste this into Claude Code**

```text
Extend the existing DemoKart home page with a category filter and a price sort
that work together and update the product grid instantly, with no page reload.
Keep the current design, components, search box and cart behaviour working as they are.

FUNCTIONALITY
- Category filter: pill buttons for All, Electronics, Fashion, Home and Books.
  "All" is selected by default. Clicking a pill shows only products in that category.
- Sort by price: a native <select> dropdown with these options:
  - "Featured" (the original order from data/products.js, and the default)
  - "Price: Low to high"
  - "Price: High to low"
- The two controls must work together. Example: Fashion + Price: Low to high shows
  only Fashion products, cheapest first. Changing one control keeps the other's choice.
- The search box must also work with both: filter by category and search text first,
  then sort the result.
- Put the logic in one client component ("use client"):
  - Use useState for selectedCategory and sortOrder.
  - Use useMemo to work out which products are visible.
  - Never change the original array. Copy it with [...products] before calling sort.
  - Sort by the numeric price field, not the formatted text.
- Show a live result count above the grid, for example "Showing 6 products".
  Use "1 product" (singular) when there is only one.
- If nothing matches, show a friendly "No products found" message with a
  "Clear filters" button that resets category, sort and search.

UI
- Put the category pills and the sort dropdown on one row below the hero:
  pills on the left, dropdown on the right.
- On mobile, the pills scroll sideways (no wrapping, hidden scrollbar) and the
  dropdown sits on its own line below, full width.
- The active pill uses the accent colour with white text. Inactive pills are white
  with a grey border and a hover state.
- Accessibility:
  - A visible focus ring on every control.
  - aria-pressed on the pills.
  - An aria-label on the sort select.
  - Wrap the result count in aria-live="polite" so screen readers announce changes.
- Add a short fade or transition when the grid updates, and make sure the layout
  does not jump.

CODE
- Keep the components split as before: CategoryFilter, SortSelect, ProductGrid and
  ProductCard in components/.
- The parent client component owns the state and passes it down as props.
- Keep the category list and sort options as constants at the top of the file so
  they are easy to change.

WHEN DONE
Run lint or build to check for errors, make sure the dev server is running, and give
me the local link. Then tell me how you tested the combinations (for example
Books + High to low, All + Low to high, and Clear filters).
```

**Check it worked.**
- [ ] Click **Electronics**: only electronics show. Click **All**: everything is back.
- [ ] Choose **Price: Low to high**: prices go up. Choose **High to low**: prices go down.
- [ ] Combine them: Fashion + Low to high shows only Fashion items, cheapest first.
- [ ] Type in the search box: the list and the "Showing N products" count both change.
- [ ] Search for something silly: you see "No products found" and a **Clear filters** button that resets everything.

**What you just learned:** you can add a new feature to an existing project by describing it, and tell Claude Code to keep everything else working ("keep the current design and cart behaviour as they are").

**Learn from the code.** Paste this into Claude Code, then read the answer:

```text
In 3 lines, explain how the filter and sort work.
```

**If something goes wrong.**

| Problem | Paste this |
|---|---|
| Sort works but the filter stopped | `Category filter, sort and search must all work together. Filter and search first, then sort.` |
| The page reloads when you click a button | `The filter must update instantly without a page reload.` |

---

## Step 3. Add the cart (20 min)

**What this does:** you can add products to a cart, see a cart page with a total, and the cart is still there after you reload.

**What is happening and why:**
- A cart has to remember things. If you add a shirt and then refresh the page, a shop that forgets your shirt would be useless.
- For now we save the cart in your browser's **localStorage**. It is like a small notebook that the website keeps inside your browser.
- We save only the product `id` and the `quantity`, not names or prices. When the cart page opens, it looks up the current name and price from the product list. This way an old price is never stuck in a saved cart.
- The prompt asks the cart to load **after** the page first appears. This avoids a common beginner error called a **hydration error**, where the page the server prepared does not match what your browser builds. If you ever see this word, now you know what it is about.
- Other small touches, like the "Added ✓" button and the pop-up message, are not required to make a cart work. They are what makes a shop feel real and friendly to use.

**What you do:**
1. Copy the whole prompt below.
2. Paste it into Claude Code and press Enter.
3. When it finishes, refresh your browser.

**Prompt 3: paste this into Claude Code**

```text
Add a working cart to the existing DemoKart app. Keep the current design, filters,
sort, search and components working as they are.
The cart lives in the browser using localStorage for now (no backend, no login).

CART STATE
- Create a CartContext in context/CartContext.js (a client component with "use client").
  It holds the cart and provides:
  items, itemCount, total, addToCart(id), increaseQty(id), decreaseQty(id),
  removeFromCart(id) and clearCart().
  Wrap the app in this provider from app/layout.js.
- Save only { id, quantity } for each item in localStorage under the key "demokart-cart".
  Do not save names or prices. Look up product details in data/products.js by id when
  showing the cart, so prices are always current.
- Adding a product that is already in the cart increases its quantity by 1 instead of
  creating a duplicate line. Limit quantity to 10 per product. Decreasing from 1
  removes the item.
- Avoid hydration errors:
  - Start with an empty cart on the server and on the first render.
  - Then load from localStorage inside a useEffect and set an isLoaded flag.
  - Only save back to localStorage after isLoaded is true, so the saved cart is never
    overwritten by the empty starting state.
- Wrap every localStorage read and write in try/catch. Check the loaded data (an array
  of objects with a valid id and a positive whole-number quantity) and quietly drop
  entries whose product no longer exists.
- Keep tabs in sync by listening to the window "storage" event, so a change in one
  tab updates the others.

PRODUCT CARDS
- After "Add to cart" is clicked, the button shows "Added ✓" for about 1.5 seconds
  (disabled during that time), then goes back to normal.
- If the item is already in the cart, show a small "In cart: 2" note on the card.
- Show a small toast at the bottom of the screen saying "Added to cart" with a
  "View cart" link. It disappears after 3 seconds. Use role="status" so screen
  readers announce it.

HEADER
- Show a cart icon with a count badge that links to /cart using next/link.
  - Hide the badge when the count is 0, and show "9+" above 9.
  - Give the link aria-label="Cart, N items".
  - The badge shows the total quantity across all items.
  - It must not flicker or cause a hydration warning on load, so render the badge
    only after isLoaded.

CART PAGE (app/cart/page.js)
- Make it a client component that uses the same Header and Footer as the home page.
- Each line item shows:
  - Product image (plain <img> with the same onError fallback as the cards)
  - Name and category
  - Unit price in ₹
  - Quantity control: – and + buttons with the number between them, with aria-labels
  - Line total (price × quantity) in ₹
  - A "Remove" button
- Summary panel (a sticky sidebar on desktop, below the list on mobile) showing the
  number of items, the subtotal and the Total in bold.
- Format all money in rupees with toLocaleString('en-IN'), for example ₹12,499.
- A "Checkout" button that is disabled and says "Coming soon" (as a tooltip or label).
- A "Clear cart" text button that asks for confirmation before clearing.
- Empty state: a friendly "Your cart is empty" message with an icon and a
  "Continue shopping" button that links to /.
- Show a skeleton or nothing (not the empty state) until isLoaded is true, so people
  with items never see a flash of "Your cart is empty".
- Add a "Continue shopping" link at the top of the page.
- Use the accent colour and spacing from the home page.
- Fully responsive: on mobile, line items stack with the image on the left and the
  controls underneath.

QUALITY
- Do not change state directly. Work out itemCount and total with reduce, using the
  items array and the product lookup.
- All buttons have visible focus rings, and icon-only buttons have aria-labels.
- Set the /cart page title to "Your cart | DemoKart" with a metadata export in a small
  server layout file (app/cart/layout.js), because the page itself is a client component.

WHEN DONE
Run lint or build to check for errors, make sure the dev server is running, and give me
the local link. Then tell me how you tested it:
- add the same product twice
- add different products
- reload the page and confirm the cart is still there
- remove an item
- change a quantity
- clear the cart
- open the site in a second tab and confirm the sync
```

**Check it worked.**
- [ ] Click **Add to cart**: the button shows "Added ✓" for a moment and a message appears at the bottom.
- [ ] The cart number in the header goes up.
- [ ] Add the same product twice: its quantity becomes 2 (it is not two separate lines).
- [ ] Open the cart page (`/cart`): each item shows its image, quantity buttons, line total and a Remove button, plus the total in ₹.
- [ ] **Reload the page: your cart is still there.**
- [ ] Open the site in a second tab and change the cart: the first tab updates too.
- [ ] **Clear cart** asks you to confirm. An empty cart shows "Your cart is empty".

**What you just learned:** a website can remember things between visits without a server, but only inside one browser. This is the limit of localStorage: it works for one person on one browser, and nobody else (including the shop owner) can see your cart.

**Think about it (with the person next to you).** Open the shop in a private (incognito) window. The cart is empty there. Why? Where is your cart really stored? *(Answer: in your browser's localStorage. Another browser or laptop cannot see it.)*

**If something goes wrong.**

| Problem | Paste this |
|---|---|
| A warning about "hydration", or "Your cart is empty" flashes on load | `Fix the hydration warning. The cart must load from localStorage only after the first render.` |
| The cart number does not update | `Check that the whole app is wrapped in the CartContext provider in app/layout.js.` |
| The cart is lost when you reload | `The cart must be saved to localStorage under the key demokart-cart and loaded back on page load.` |

---

## Step 4. Push your code to GitHub (15 min)

**What this does:** Git saves versions of your code on your laptop. A saved version is called a commit. GitHub keeps a copy online. Claude Code will do this for you.

**What is happening and why:**
- Imagine writing an important essay with no backup. If your laptop breaks, it is gone. **Git** and **GitHub** are the backup, plus a history of every change.
- A **commit** is like a "save point" in a video game. Each one has a message, such as "feat: build DemoKart storefront", so you can see later what changed and go back if something breaks.
- **GitHub** keeps an online copy, so the code is safe and can be shared with a team. Later, services that put websites online can read your code from there.
- The prompt first checks a file called **`.gitignore`**. It lists things that must never be saved online: `node_modules` (a huge folder of other people's code that anyone can re-download) and `.env` files (which hold secret keys and passwords). Leaking secrets on GitHub is one of the most common beginner mistakes, and this check prevents it.
- The repo is **private**, so only you can see it.
- Notice how the prompt tells Claude Code what to do when something goes wrong ("stop and ask me", "never force push"). Good prompts include rules for failure, not just for success.

**What you do:**
1. Copy the whole prompt below.
2. Paste it into Claude Code and press Enter.
3. Read each command before you approve it.

**Prompt 4: paste this into Claude Code**

```text
Do the following in the DemoKart project folder.

First, explain in exactly 3 short lines, one each, for a beginner:
what Git is, what a commit is, and what GitHub is.
Use plain words and no jargon.

Then do these steps in order.

1. Check the .gitignore file.
   - Confirm it excludes node_modules, .next, and all environment files
     (.env, .env.local, .env.*.local). If any are missing, add them.
     Keep a .env.example tracked if one exists.
   - If this folder is not a Git repository yet, run git init and make sure the
     default branch is called main.
   - Run git status and check that no .env file, node_modules folder or build output
     is staged or already tracked. If any are, remove them from tracking with
     git rm --cached (without deleting the local files) before committing.

2. Commit all the work so far.
   - Check that git user.name and user.email are set. If they are not, stop and tell
     me. Do not invent values.
   - Stage everything and commit with a clear message in this style:
     "feat: build DemoKart storefront with product grid, category filter, price sort and localStorage cart"
   - Show me the commit hash and the number of files committed.

3. Create the GitHub repo and push.
   - Run gh auth status first. If I am not logged in, stop and tell me to run
     gh auth login, then wait. Do not try workarounds.
   - Create a private repo named demokart-shop on my personal account (not an
     organization) and push the code in one step:
     gh repo create demokart-shop --private --source=. --remote=origin --push
   - If a repo with that name already exists, do not overwrite it and never use a
     force push. Tell me and ask what to do.

4. Verify the push.
   - Run gh repo view demokart-shop --json url,visibility to confirm the repo exists
     and is PRIVATE.
   - Run git status -sb and git log origin/main -1 to confirm local main is up to date
     with GitHub and the latest commit is there.
   - Confirm in one line that node_modules and .env files were not pushed.

5. Give me the repo link. This must be the last thing in your reply.
   Only after the push is confirmed, end your reply with exactly this format. Put the
   full URL from gh repo view (https://github.com/<my-username>/demokart-shop) on its
   own line so it is clickable:

   ✅ Pushed successfully
   Repo: https://github.com/<my-username>/demokart-shop
   Visibility: Private
   Branch: main
   Latest commit: <short hash> - <commit message>

   - If any step failed, do not print a link. Instead say which step failed and why,
     in one plain sentence.
   - Remind me in one line that because the repo is private, the link only opens when
     I am logged in to my GitHub account.
```

**What you just learned:** you now have your first project on GitHub. Any developer's portfolio starts like this.

**Check it worked.**
- [ ] Claude Code explained Git, a commit and GitHub in 3 lines.
- [ ] Its last message says "Pushed successfully" and shows a repo link.
- [ ] Open the link in your browser (you must be logged in to GitHub). You can see your files and your commit message.
- [ ] The repo is **Private**.
- [ ] `node_modules` and any `.env` files are **not** in the repo.

**If something goes wrong.**

| Problem | What to do |
|---|---|
| "Not logged in" | In the terminal, run `gh auth login` and sign in through the browser. Then paste: `Try the GitHub steps again.` |
| The repo name is taken | Paste: `Use the repo name demokart-shop-2 instead.` |
| Git says your name or email is not set | Claude Code stops on purpose. In the terminal run `git config --global user.name "Your Name"` and `git config --global user.email "you@example.com"`, then paste: `Continue from where you stopped.` |

---

## Step 5. Share your repo (5 min)

Post your repo link in the Slack channel. The link only opens for you while you are logged in to GitHub, because the repo is private.

## What you built today

Take a minute to look back. In about 90 minutes, from an empty folder, you:

1. Set up a real **Next.js** project with one prompt.
2. Built a **polished home page** with 15 products.
3. Added **filter, sort and search** that work together.
4. Added a **cart** that remembers your items.
5. Saved your work with **Git** and put it on **GitHub**.

You did this by describing what you wanted. The skill you practised today is the one that matters most when working with AI: **say clearly what you want, check the result, and ask for fixes in plain words.**

### What is still missing (and what comes next)

- **The shop is only on your laptop.** Nobody else can open it yet. Putting it live on the internet is called **deploying**, and it is the next step.
- **The cart lives in one browser.** A real shop keeps carts and products in a **database** on a server, so they work on any device. That is also a later step.

## You are done when

- [ ] The shop runs on localhost with 15 products.
- [ ] Search, category filter and price sort work together.
- [ ] Add to cart works and the cart survives a reload.
- [ ] Your code is in a private GitHub repo.
- [ ] Your repo link is posted in Slack.

## Finished early? Add your own feature

Choose one. Write your own prompt describing it, check that it works, then paste `Commit and push this change to GitHub.`

- A product detail page that opens when you click a card.
- Sort by rating.
- A Checkout button that shows an order summary, with no payment.
- A wishlist heart on each product card.

## Tips

- If a prompt gives a result you do not like, tell Claude Code what is wrong in plain words. You do not need to start again.
- If you see a red error, copy it into Claude Code with the words `Fix this error:`.
- Never paste passwords, tokens or `.env` values into Claude Code or Slack.
- The skill you are learning is not the prompts. It is describing clearly what you want, checking the result, and asking for fixes.
