from flask import Flask, render_template, request, redirect, url_for, flash
from db_config import get_db_connection

app = Flask(__name__)
app.secret_key = 'pbssd_ecommerce_secret' # Required for session-based flash messages

# @app.route('/')
# def index():
#     products = []  # fallback

#     try:
#         conn = get_db_connection()
#         cursor = conn.cursor(dictionary=True)
#         cursor.execute("SELECT * FROM products")
#         products = cursor.fetchall()
#         cursor.close()
#         conn.close()
#     except Exception as e:
#         print("DB Error:", e)  # sirf terminal me dikhega

#     return render_template('index.html', products=products)

@app.route('/')
def index():
    products = []

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM products")
        products = cursor.fetchall()
        cursor.close()
        conn.close()
    except Exception as e:
        print("DB Error:", e)

    return render_template('index.html', products=products)
@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/admin/login')
def admin_login():
    return render_template('admin_login.html')

@app.route('/admin')
def admin_dashboard():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()
    # Debug line: This will show you exactly what keys are in your dictionary
    print(f"DEBUG: First product keys: {products[0].keys() if products else 'No products found'}")
    cursor.close()
    conn.close()
    return render_template('admin.html', products=products)

@app.route('/admin/add', methods=['GET', 'POST'])
def add_product():
    if request.method == 'POST':
        name = request.form.get('name')
        description = request.form.get('description')
        price = request.form.get('price')
        stock = request.form.get('stock')
        image_url = request.form.get('image_url')
        
        seller_id = 1 # Placeholder: replace with session['user_id'] once auth is implemented

        conn = get_db_connection()
        cursor = conn.cursor()
        query = "INSERT INTO products (seller_id, name, description, price, stock, image_url) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(query, (seller_id, name, description, price, stock, image_url))
        conn.commit()
        cursor.close()
        conn.close()
        
        flash('Product added successfully!', 'success')
        return redirect(url_for('admin_dashboard'))
    
    return render_template('add_product.html')

@app.route('/payment')
def payment_gateway():
    return render_template('payment_gateway.html')

@app.route('/grocery')
def grocery():
    return render_template('grocery.html', current_page = 'grocery' )

@app.route('/fashion')
def fashion():
    return render_template('fashion.html',current_page = 'fashion')

@app.route('/cart')
def cart():
    return render_template('cart.html',current_page = 'cart')

@app.route('/mobile')
def mobile():
    return render_template('mobile.html',current_page = 'mobile')

@app.route('/beauty')
def beauty():
    return render_template('beauty.html',current_page = 'beauty')

@app.route('/pet')
def pet():
    return render_template('pet.html',current_page = 'pet')

@app.route('/electronic')
def electronic():
    return render_template('electronic.html',current_page = 'electronic')

@app.route('/Homesmart')
def Homesmart():
    return render_template('Homesmart.html', current_page = 'homesmart')

@app.route('/Toys')
def Toys():
    return render_template('Toys.html', current_page = 'toys')

@app.route('/Food')
def Food():
    return render_template('Food.html', current_page = 'food')

@app.route('/car')
def car():
    return render_template('car.html', current_page = 'car')

@app.route('/two_Wheelers')
def two_Wheelers():
    return render_template('two_Wheelers.html',current_page = 'tow_wheelers')

@app.route('/Books')
def Books():
    return render_template('Books.html',current_page = 'books')

@app.route('/Fitness_and_Sports')
def Fitness_and_Sports():
    return render_template('Fitness_and_Sports.html',current_page = 'fitness_and_sports')

@app.route('/Medicine_and_Nutrients')
def Medicine_and_Nutrients():
    return render_template('Medicine_and_Nutrients.html',current_page = 'medicine_and_nutrients')

@app.route('/travel_landing')
def travel_landing():
    return render_template('travel_landing.html',current_page = 'travel_landing')

@app.route('/seller')
def seller():
    return render_template('seller.html')

@app.route('/account')
def account():
    return render_template('account.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/Food_AllProducts')
def Food_AllProducts():
    return render_template('Food_AllProducts.html')

@app.route('/two_Wheelers_AllProducts')
def two_Wheelers_AllProducts():
    return render_template('two_Wheelers_AllProducts.html')

@app.route('/two_Wheelers_ProductDetails')
def two_Wheelers_ProductDetails():
    return render_template('two_Wheelers_ProductDetails.html')

@app.route('/orders')
def orders():
    return render_template('orders.html')

@app.route('/Medicine_and_Nutrients_AllProducts')
def Medicine_and_Nutrients_AllProducts():
    return render_template('Medicine_and_Nutrients_AllProducts.html')

@app.route('/Fitness_and_Sports_AllProducts')
def Fitness_and_Sports_AllProducts():
    return render_template('Fitness_and_Sports_AllProducts.html')
if __name__ == '__main__':
    app.run(debug=True, port=5001)