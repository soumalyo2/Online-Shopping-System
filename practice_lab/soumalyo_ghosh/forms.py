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
    submit_register = SubmitField('Create Account')

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
    submit_login = SubmitField('Sign In')

class SellerRegistrationForm(FlaskForm):
    seller_name = StringField('Seller Name', validators=[DataRequired(), Length(min=2, max=30)])
    shop_name = StringField('Shop Name', validators=[DataRequired(), Length(min=2, max=30)])
    seller_email = StringField('Seller Email', validators=[DataRequired(), Email()])
    seller_password = PasswordField('Password', validators=[DataRequired(), Length(min=6, max=60)])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('seller_password', message="Passwords must match")]) 
    aadhar_number = StringField('Aadhar Number', validators=[DataRequired(), Length(min=12, max=12, message="Aadhar must be 12 digits")])
    gst_number = StringField('GST Number', validators=[DataRequired(), Length(min=15, max=15, message="GST must be 15 characters")])
    contact_number = StringField('Contact Number', validators=[DataRequired(), Length(min=10, max=13, message="Enter a valid contact number")])
    seller_image = FileField('Shop Image', validators=[FileAllowed(['jpg', 'png', 'jpeg'], 'Images only!')])
    address = StringField('Seller Address', validators=[DataRequired(), Length(max=120)])
    submit = SubmitField('Register')