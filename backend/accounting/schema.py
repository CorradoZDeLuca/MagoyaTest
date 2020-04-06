from graphene_django import DjangoObjectType
from .models import Account,Transaction
import graphene


class AccountType(DjangoObjectType):
    class Meta:
        model = Account
class TransactionType(DjangoObjectType):
    class Meta:
        model = Transaction
   
              
class Query(graphene.ObjectType):
    
    
    all_transactions = graphene.List(TransactionType)
    def resolve_all_transactions(self,info,**kwargs):
        return Transaction.objects.filter(account__pk=1).order_by("date")
        
    account = graphene.Field(AccountType)
    def resolve_account(self,info,**kwargs):
        account = Account.objects.get_or_create(pk=1)
        return account[0]
    

class CreateTransaction(graphene.Mutation):
    transaction = graphene.Field(TransactionType)
    class Arguments:
        card_type = graphene.String()
        comment = graphene.String()    
        date = graphene.Date()
        cost = graphene.Float()
        
    def mutate(self, info, **inputs):
        account = Account.objects.get_or_create(pk=1)[0]
        if account.value - inputs.get("cost") >= 0 and inputs.get("cost") > 0 and  inputs.get("date") and inputs.get("card_type"):
            account.value = account.value - inputs.get("cost")
            transaction = Transaction(date=inputs.get("date"),card_type=inputs.get("card_type"),cost=inputs.get("cost"),comment=inputs.get("comment"),account=account)
            account.save()        
            transaction.save()
            
        return CreateTransaction(transaction=transaction)
    
class DeleteTransaction(graphene.Mutation): 
    account = graphene.Field(AccountType)
        
    class Arguments:
        id = graphene.Int()        
        
    def mutate(self, info, **inputs):
        transaction = Transaction.objects.get(pk=inputs.get("id"))
        account = Account.objects.get(pk=1)
        account.value = account.value + transaction.cost
        account.save()
        transaction.delete()
            
        return DeleteTransaction(account=account)
class EditAccount(graphene.Mutation):
    account = graphene.Field(AccountType)
    class Arguments:
        value = graphene.Float()
        
    def mutate(self, info, **inputs):
        account = Account.objects.get_or_create(pk=1)[0]
        if inputs.get("value")>= 0:
            account.value = inputs.get("value")
    
        account.save()
            
        return EditAccount(account=account)    
    

    
    
    
class Mutation(graphene.ObjectType):
    create_transaction = CreateTransaction.Field()
    edit_account = EditAccount.Field()
    delete_transaction = DeleteTransaction.Field()

    
schema = graphene.Schema(query=Query ,mutation=Mutation)
    