'''
This file is the entry point to run the Flask application.
'''
from soumalyo_ghosh import app

if __name__ == '__main__':
    # Setting host='0.0.0.0' makes the server accessible from your network,
    # which is useful for testing on other devices.
    # The server will run on http://127.0.0.1:5000 by default
    app.run(debug=True)