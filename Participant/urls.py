from django.conf.urls import patterns, url
import views


urlpatterns = patterns('',
    url(r'^add', views.add_participant),
    # url(r'^list', views.admin_nav),
    url(r'^problem', views.get_problem_html)
)
