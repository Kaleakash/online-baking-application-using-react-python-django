# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import Http404

from rest_framework import generics,status
from rest_framework.response import Response 
from rest_framework.views import APIView

from .models import *
from .serializers import *


class BranchesAPIView(generics.ListCreateAPIView):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer

class BranchDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer

class BanksAPIView(generics.ListCreateAPIView):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer

class LoansAPIView(generics.ListCreateAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    
class BankDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer

class CustomerRequestAPIView(generics.ListCreateAPIView):
    queryset = CustomerRequest.objects.all()
    serializer_class = CustomerRequestSerializer
    
class CreateAccountAPIView(APIView):

    def post(self,request):
        """
        {
            "full_name": "John Doe",
            "address": "123 Main St",
            "open_date": "2018-01-01",
            "account_type": "savings",
            "bank": 1,
            "emailid":"john@gmail.com",
            "password":"john@123"

        }
        """
        client = Client.objects.create(
            name = request.data['full_name'],
            address = request.data['address'],
            emailid = request.data['emailid'],
            password=request.data['password']
        )
        bank = Bank.objects.get(pk=request.data['bank'])
        account = Account.objects.create(
            client = client,
            open_date = request.data['open_date'],
            account_type = request.data['account_type'],
            bank = bank
        )

        serializer = AccountSerializer(account)
        return Response(serializer.data,status=status.HTTP_201_CREATED)

class AccountListAPIView(generics.ListAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class DepositAPIView(generics.ListCreateAPIView):
    queryset = Deposit.objects.all();
    serializer_class = DepositSerializer

class WithdrawAPIView(generics.ListCreateAPIView):
    queryset = Withdraw.objects.all();
    serializer_class = WithdrawSerializer

class AccountDetailAPIView(generics.RetrieveAPIView):
    queryset = Account.objects.all();
    serializer_class=AccountDetailSerializer
    

class ClientSignInAPIView(generics.ListCreateAPIView):
      
      def post(self,request):
        emailidvalue = request.data['emailid'];
        passwordvalue = request.data['password'];
        result = Client.objects.filter(emailid=emailidvalue,password=passwordvalue).values().__len__();  
        if result==1:
            return Response("Successfully login!")
        else:
            return Response("Failure try once again!") 


class TransferAPIView(generics.ListCreateAPIView):
    queryset = Transfer.objects.all();   
    serializer_class = WithdrawSerializer
    def post(self,request):
        from_accno = request.data['fromaccno'];
        to_accno = request.data['toaccno'];
        amount = request.data['amount'];
        if Account.objects.filter(id=from_accno).values().__len__() == 0:
            return Response("From Account number is invalid")
        elif Account.objects.filter(id=to_accno).values().__len__() == 0:    
            return Response("To Account number is invalid")
        else:
            db_from_amount =Account.objects.filter(id=from_accno).values()[0].get("amount");
            db_to_amount =  Account.objects.filter(id=to_accno).values()[0].get("amount");
            if amount > db_to_amount:
                return Response("Insufficient amount didn't transfer")
            else:
                Account.objects.filter(id=from_accno).update(amount = db_from_amount-amount);
                Account.objects.filter(id=to_accno).update(amount =amount+db_to_amount);
                
                
                return Response("Amount Transfered successfully")
