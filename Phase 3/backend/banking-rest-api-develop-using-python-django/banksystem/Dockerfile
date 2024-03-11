FROM python:3

ENV PYTHONUNBUFFERED 1
RUN mkdir /main
WORKDIR /main
COPY . /main/
COPY manage.py .
#COPY . . 
RUN pip install -r requirements.txt
#RUN python manage migration 
# ENV DJANGO_DB_NAME=default
# ENV DJANGO_SU_NAME=admin
# ENV DJANGO_SU_EMAIL=admin@my.company
# ENV DJANGO_SU_PASSWORD=mypass

# RUN python -c "import django; django.setup(); \
#    from django.contrib.auth.management.commands.createsuperuser import get_user_model; \
#    get_user_model()._default_manager.db_manager('$DJANGO_DB_NAME').create_superuser( \
#    username='$DJANGO_SU_NAME', \
#    email='$DJANGO_SU_EMAIL', \
#    password='$DJANGO_SU_PASSWORD')"