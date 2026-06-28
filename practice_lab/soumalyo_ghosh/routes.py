import secrets
import os
from flask import render_template, request, redirect, url_for, flash
from soumalyo_ghosh import app, db
from soumalyo_ghosh.forms import userregistrationform, userloginform
from soumalyo_ghosh.models import User, Product
from flask_login import login_user, current_user, logout_user, login_required  



@app.route('/')
def home():
    return render_template('index.html')

@app.route('/shop')
def shop():
    return render_template('index.html')
# @app.route('/register', methods=['GET', 'POST'])
# def register():
#     if current_user.is_authenticated:
#         return redirect(url_for('home'))
#     form = userregistrationform()
#     if form.validate_on_submit():
#         #hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
#         user = User(username = form.username.data, email = form.email.data, password = form.password.data)
        
#         db.session.add(user)
#         db.session.commit()
        
#         flash(f'account created! you are able to log-in', 'success')
#         return redirect(url_for('login'))
#     return render_template('user_register.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    
    # Determine which form to show based on the URL query parameter
    form_to_show = request.args.get('form', 'login')
    login_form = userloginform()
    register_form = userregistrationform()

    if current_user.is_authenticated:
        return redirect(url_for('home'))
    
    if login_form.submit_login.data and login_form.validate_on_submit():
        user = User.query.filter_by(email=login_form.email.data).first()
        # if user and bcrypt.check_password_hash(user.password, form.password.data):
        if user and user.password == login_form.password.data:
            login_user(user, remember = login_form.remember.data)
            next_page = request.args.get('next')
            flash('you have been logged in!', 'success')
            return redirect(next_page) if next_page else redirect(url_for('home'))
        else:
            flash('login unsuccessful. please check email and password', 'danger')
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    if register_form.submit_register.data and register_form.validate_on_submit():
        new_user = User(
            username=register_form.username.data,
            email=register_form.email.data,
            password=register_form.password.data, 
            phone=register_form.phone.data,
            location=register_form.location.data,
            image_file=save_picture(register_form.user_image.data) if register_form.user_image.data else 'default.jpg'
        )

        db.session.add(new_user)
        db.session.commit()
        flash(f'account created! you are able to log-in', 'success')
        return redirect(url_for('login'))

    return render_template('login.html', login_form=login_form, register_form=register_form, form_to_show=form_to_show)


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('home'))

def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_filename = random_hex + f_ext
    picture_path = os.path.join(app.root_path, 'static', picture_filename)
    form_picture.save(picture_path)
    return picture_filename

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
@login_required
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