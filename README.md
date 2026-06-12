# Online-Shopping-System
1: Architectural Flow Graph
+-------------------------------------------------------------------------+
|                              [ Web Browser ]                            |
+-------------------------------------------------------------------------+
          |                                                 |
          | (Standard Routing)                              | (Direct Access)
          v                                                 v
+-----------------------+                         +-----------------------+
|     Flask Backend     |                         |     Rich Frontend     |
|       (app.py)        |                         |   (Static /visual/)   |
|-----------------------|                         |-----------------------|
| GET /                 |                         | index.html            |
| GET /login            |                         | template/Books...     |
| GET /admin            |                         | template/seller...    |
| GET /cart             |                         | template/fashion...   |
+-----------------------+                         +-----------------------+
          |                                                 |
          | (Renders)                                       | (Imports)
          v                                                 v
+-----------------------+                         +-----------------------+
|   Jinja2 Templates    |                         |     Visual Assets     |
|     (templates/)      |                         |     (visual/js/)      |
|-----------------------|                         |-----------------------|
| index.html            |                         | Books.js / Data.js    |
| login.html            |                         | products.js           |
| admin.html            |                         | seller.js / dash.js   |
| cart.html             |                         | login.js              |
+-----------------------+                         +-----------------------+
          |                                                 |
          | (Imports)                                       |
          v                                                 |
+-----------------------+                                   |
|    Static Assets      |                                   |
|     (static/js)       |                                   |
|-----------------------|                                   |
| login.js              |                                   |
+-----------------------+                                   |
          |                                                 |
          +-----------------------+-------------------------+
                                  |
                                  | (Read / Write State)
                                  v
                      +-----------------------+
                      |     [ IndexedDB ]     |
                      |  (Auth, Cart, Likes)  |
                      +-----------------------+

2: Annotated Directory Tree
📦 Project Root
 ┣ 📜 app.py                  <-- Flask Backend (Routes: /, /login, /admin, /cart)
 ┣ 📂 templates/              <-- Jinja2 Templates (Rendered by Flask)
 ┃ ┣ 📜 index.html              
 ┃ ┣ 📜 login.html              
 ┃ ┣ 📜 admin.html              
 ┃ ┗ 📜 cart.html               
 ┣ 📂 static/                 <-- Static Assets (Used by Jinja2)
 ┃ ┗ 📂 js/                     
 ┃   ┗ 📜 login.js            <-- Interacts with IndexedDB (Local Storage Auth)
 ┗ 📂 visual/                 <-- Next-Gen Rich Frontend (Direct Browser Access)
   ┣ 📜 index.html            <-- Root visual entry point
   ┣ 📂 template/               
   ┃ ┣ 📜 Books.html            
   ┃ ┣ 📜 Books_ProductDetails.html
   ┃ ┣ 📜 fashion.html          
   ┃ ┣ 📜 seller.html           
   ┃ ┗ 📜 seller_dashboard.html 
   ┗ 📂 js/                   <-- Visual DOM Logic & DB Interaction
     ┣ 📜 Books.js & Books_Data.js <-- Writes Cart/Likes to IndexedDB
     ┣ 📜 login.js                 
     ┣ 📜 products.js              <-- Writes Product State to IndexedDB
     ┣ 📜 seller.js                <-- Registers to IndexedDB
     ┗ 📜 seller_dashboard.js

3.updated Directory Tree(package structure)
📦 Project Root
 ┣ 📜 run.py                  <-- NEW: The single entry point to start the app
 ┣ 📂 backend/                <-- NEW: The Flask application package
 ┃ ┣ 📜 __init__.py           <-- Initializes the App Factory
 ┃ ┣ 📂 routes/               <-- Blueprints (replaces the monolithic app.py)
 ┃ ┃ ┣ 📜 __init__.py         
 ┃ ┃ ┣ 📜 main.py             <-- Routes: /, /cart
 ┃ ┃ ┣ 📜 auth.py             <-- Routes: /login
 ┃ ┃ ┗ 📜 admin.py            <-- Routes: /admin
 ┃ ┣ 📂 templates/            <-- Jinja2 Templates
 ┃ ┗ 📂 static/               <-- Static Assets
 ┗ 📂 visual/                 <-- Rich Frontend (Untouched)