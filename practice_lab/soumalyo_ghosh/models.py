from datetime import datetime
from soumalyo_ghosh import db, login_manager
from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False) 
    location = db.Column(db.String(120), nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    products = db.relationship('Product', backref='seller', lazy=True)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.phone}', '{self.location}', '{self.image_file}')"

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date_posted = db.Column(db.String(20), nullable=False, default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"Product('{self.title}', '{self.date_posted}', '{self.category}')"   
   
class Seller(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    seller_name = db.Column(db.String(30), unique=True, nullable=False)
    shop_name = db.Column(db.String(30), unique=True, nullable=False)
    seller_email = db.Column(db.String(120), unique=True, nullable=False)
    seller_password = db.Column(db.String(60), nullable=False)
    aadhar_number = db.Column(db.String(12), unique=True, nullable=False)
    gst_number = db.Column(db.String(15), unique=True, nullable=False)
    contact_number = db.Column(db.String(15), unique=True, nullable=False)
    seller_image = db.Column(db.String(20), nullable=False, default='default.jpg')
    address = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f"Seller('{self.seller_name}', '{self.shop_name}', '{self.seller_email}','{self.seller_image}')"
    