'''
from datetime import datetime
mport db, login_manager
 import UserMixin


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

    
classes for insert data query for users,sellers,posts(products posted by the sellers with relation(foreign key)),admin etc.
'''