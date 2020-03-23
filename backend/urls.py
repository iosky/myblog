from django.urls import path, include
from rest_framework import routers
from api.views import ArticleViewSet, CategoryViewSet, TagViewSet, index_view

router = routers.DefaultRouter()
router.register('article', ArticleViewSet)
router.register('category', CategoryViewSet)
router.register('tag', TagViewSet)


urlpatterns = [
    path('', index_view, name='index'),
    path('api/', include(router.urls))
]
