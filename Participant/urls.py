from django.conf.urls import patterns, url
import views


urlpatterns = patterns('',
    url(r'^add', views.add_participan),
    url(r'^list', views.admin_nav)
)
