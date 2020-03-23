from django.views.decorators.cache import never_cache
from django.views.generic import TemplateView
from rest_framework import viewsets
from .serializers import TagSerializer, ArticleSerializer, CategorySerializer
from .models import Tag, Category, Article

# 设置vue项目入口
index_view = never_cache(TemplateView.as_view(template_name='index.html'))


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
