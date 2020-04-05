from django.db import models
        
class Account(models.Model):
    value = models.FloatField(default=0)       
        
class Transaction(models.Model):
    
    CARD_CHOICES = [
        ("credit","Credit Card"),
        ("debit","Debit Card")
    ]
    
    comment = models.CharField(max_length=200)
    cost = models.FloatField()
    card_type = models.CharField(choices=CARD_CHOICES,max_length=50)
    date = models.DateField()
    account = models.ForeignKey("Account", related_name="transactions", on_delete=models.CASCADE)
    def __str__(self):
        return self.comment
    
    

        

