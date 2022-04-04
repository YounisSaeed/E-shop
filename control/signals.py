from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def UpdateUser(sender,instance,**kwargs):
    user = instance
    if user.email != '':
        user.username = user.email

pre_save.connect(UpdateUser,sender=User)