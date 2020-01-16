from django.db import models


class Menu(models.Model):
    restaurant_name = models.CharField(max_length=30, null=True)
    def __str__(self):
        return self.restaurant_name

class MenuItem(models.Model):
    FOOD_TYPE_CHOICES = [('non_veg', 'Non Veg'), ('veg', 'Veg')]
    ITEM_TYPE_CHOICES = [('starters', 'Starters'), ('main_course', 'Main Course'), ('drinks', 'Drinks')]
    food_type = models.CharField(max_length=8, choices=FOOD_TYPE_CHOICES, default='veg')
    item_type = models.CharField(max_length=20, choices=ITEM_TYPE_CHOICES, default='starters')
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Restaurant(models.Model):
    name = models.CharField(max_length=30)
    address = models.CharField(max_length=140)
    menu = models.OneToOneField(Menu, on_delete=models.CASCADE, null=True)
    rating = models.DecimalField(null=True, decimal_places=1, max_digits=3)
    budget = models.DecimalField(null=True, decimal_places=1, max_digits=10)
    lat = models.DecimalField(null=True, decimal_places=3, max_digits=5)
    lng = models.DecimalField(null=True, decimal_places=3, max_digits=5)
    firebase_id = models.CharField(max_length=140, null=True)
    tags = models.CharField(max_length=200, null=True)
    featured_thumbnail = models.ImageField(upload_to='images/featured_thumbnail', null=True)
    image_1 = models.ImageField(upload_to='images', null=True)
    image_2 = models.ImageField(upload_to='images', null=True)
    image_3 = models.ImageField(upload_to='images', null=True)

    def __str__(self):
        return self.name


class Package(models.Model):
    package_name = models.CharField(max_length=30, null=True)
    details = models.CharField(max_length=200, null=True)
    veg_starters_count = models.PositiveSmallIntegerField()
    non_veg_starters_count = models.PositiveSmallIntegerField()
    veg_main_course_count = models.PositiveSmallIntegerField()
    non_veg_main_course_count = models.PositiveSmallIntegerField()
    drinks_count = models.PositiveSmallIntegerField()
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    price = models.PositiveSmallIntegerField(null=True)

    def __str__(self):
        return self.package_name
