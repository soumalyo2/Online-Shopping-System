'''
**most imp**
routing @app.for each page with their functions
'''

import secrets
import os
from flask import render_template, request, redirect, url_for, flash
from flask_blog import app, db, bcrypt
from flask_blog.forms import blogregistrationform, blogloginform, blogupdateform
from flask_blog.models import User, Post
from flask_login import login_user, current_user, logout_user, login_required



@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = blogregistrationform()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username = form.username.data, email = form.email.data, password = hashed_password)
        
        db.session.add(user)
        db.session.commit()
        
        flash(f'account created! you are able to log-in', 'success')
        return redirect(url_for('login'))
    return render_template('blog_register.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = blogloginform()
    if form.validate_on_submit():
        user = User.query.filter_by(email = form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember = form.remember.data)
            next_page = request.args.get('next')
            flash('you have been logged in!', 'success')
            return redirect(next_page) if next_page else redirect(url_for('home'))
        else:
            flash('login unsuccessful. please check email and password', 'danger')
    return render_template('blog_login.html', form=form)

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
