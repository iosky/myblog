from .models import Tag, Category, Article, User, Comment
from rest_framework import serializers


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['pk', 'name']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['pk', 'name']


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['pk', 'title', 'description', 'content', 'like',
                  'created_time', 'modified_time', 'category', 'tag']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'username', 'password', 'articles']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['pk', 'content', 'user', 'article']