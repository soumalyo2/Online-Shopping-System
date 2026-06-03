from flask import Flask, render_template, request, redirect, url_for
import mysql.connector
app = Flask(__name__)

#Database Configauration Connection
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="Shubham Jana",
        password="Sulekha",
        database="simple_db"
    )

#Route 1: home page (Displays the HTML and fetches data)
@app.route('/')
def index():
    conn = get_db_connection()
    cursor = conn.cursor()

    #Fatch all users from the database
    cursor.execute("SELECT * FROM users")
    all_users = cursor.fetchall()

    cursor.close()
    conn.close()

    #send the database data over to the HTML file
    return render_template('index.html', users=all_users)
#route 2: Handling From Submission
@app.route('/add',methods=['POST'])
def add_user():
    #Grab the name from the HTML input form field named 'username'
    name_from_form = request.form['username']
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    #Insert data into MySQL
    cursor.execute("INSERT INTO users (name) VALUES (%s)",(name_from_form,))
    conn.commit() # Save changes to database
    
    cursor.close()
    conn.close()
    
    # Redirect back to the home page to see the updated list
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
