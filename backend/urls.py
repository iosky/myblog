from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers
from django.contrib import admin
from api.views import ArticleViewSet, CategoryViewSet, TagViewSet, index_view, UserViewSet, CommentViewSet

router = routers.DefaultRouter()
router.register('article', ArticleViewSet)
router.register('category', CategoryViewSet)
router.register('tag', TagViewSet)
router.register('user', UserViewSet)
router.register('comment', CommentViewSet)

urlpatterns = [
    path('', index_view, name='index'),
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls)
]