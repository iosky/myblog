from .models import Tag, Category, Article
from rest_framework import serializers


class TagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tag
        fields = ['url', 'name', 'created_time', 'modified_time', 'pk']


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['url', 'name', 'created_time', 'modified_time', 'pk']


class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Article
        fields = ['url', 'title', 'excerpt', 'content', 'views',
                  'created_time', 'modified_time', 'category', 'tag', 'pk']
