from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from flask_login import current_user
from wtforms import BooleanField, StringField, PasswordField, SubmitField, ValidationError
from wtforms.validators import DataRequired, Email, EqualTo, Length
from soumalyo_ghosh.models import User



class userregistrationform(FlaskForm):
    username = StringField('username', validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField('email', validators=[DataRequired(), Email()])
    phone = StringField('Phone', validators=[DataRequired()])
    location = StringField('Location', validators=[DataRequired()])
    user_image = FileField('Upload Photo', validators=[FileAllowed(['jpg', 'png', 'jpeg'])])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('confirm password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('sign up')

    def validate_username(self, username):
        user = User.query.filter_by(username = username.data).first()
        if user:
            raise ValidationError("your username is already taken. please choose a different one")
    def validate_email(self, email):
        user = User.query.filter_by(email = email.data).first()
        if user:
            raise ValidationError("your email is already registered. please choose a different one")


class userloginform(FlaskForm):  
    email = StringField('email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember = BooleanField('Remember Me')
    submit = SubmitField('Login')
