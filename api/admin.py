from django.contrib import admin
from markdownx.admin import MarkdownxModelAdmin

from .models import Tag, Category, Article, User, Comment

admin.site.site_header = '博客管理系统'
admin.site.site_title = '博客管理系统'
admin.site.index_title = '博客管理系统'

admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(Article)
admin.site.register(User)
admin.site.register(Comment)
