from django.urls import include, re_path

from .views import (
    BranchesAPIView,
    BranchDetailAPIView,
    BanksAPIView,
    BankDetailAPIView,
    CreateAccountAPIView,
    AccountListAPIView,
    DepositAPIView,
    WithdrawAPIView,
    AccountDetailAPIView,
    ClientSignInAPIView,
    TransferAPIView,
    LoansAPIView,
    CustomerRequestAPIView
)

urlpatterns = [
    re_path(r'^branches/', BranchesAPIView.as_view(),name='branches'),
    re_path(r'^branch/(?P<pk>[0-9]+)/', BranchDetailAPIView.as_view(),name='branch-detail'),
    re_path(r'^banks', BanksAPIView.as_view(), name='banks'),
    re_path(r'^bank/(?P<pk>[0-9]+)/', BankDetailAPIView.as_view(), name='bank-detail'),
    re_path(r'^create_account/', CreateAccountAPIView.as_view(), name='create-account'),
    re_path(r'^accounts/', AccountListAPIView.as_view(), name='accounts'),
    re_path(r'^deposits/', DepositAPIView.as_view(), name='amount deposit'),
    re_path(r'^withdrawals/', WithdrawAPIView.as_view(), name='amount withdraw'),
    re_path(r'^account/(?P<pk>[0-9]+)/', AccountDetailAPIView.as_view(), name='amount withdraw'),
    re_path(r'^signin_account/', ClientSignInAPIView.as_view(), name='signin_account'),
    re_path(r'^transfer_amount/', TransferAPIView.as_view(), name='transfer amount'),
    re_path(r'^loan/', LoansAPIView.as_view(), name='loan details'),
    re_path(r'^customer_request/', CustomerRequestAPIView.as_view(), name='customer request service'), 
]
