from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:123456@localhost/online_ecommerce'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'c46bf97ee4a8cc7892164198f050735d'

db = SQLAlchemy(app)

login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'


# Import models first to ensure the user_loader is registered before routes are set up.
from soumalyo_ghosh import models

@login_manager.user_loader
def load_user(user_id):
    return models.User.query.get(int(user_id))

from soumalyo_ghosh import routes


with app.app_context():
    db.create_all()