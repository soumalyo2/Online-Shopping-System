from flask import Flask, render_template
from faslk_sqlalchemy import SQLAlchemy
app = Flask(__name__)

@app.route('/')
def hello_shubham():
    return render_template('index.html')

@app.route('/products')
def products():
    return 'This is the products page'