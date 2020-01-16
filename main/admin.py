import pprint
import json
import pyrebase
from django.contrib import admin
from .models import Restaurant, MenuItem, Menu, Package

from django.core import serializers

pp = pprint.PrettyPrinter(indent=4)


class MenuItemAdminInline(admin.TabularInline):
    model = MenuItem


class MenuAdmin(admin.ModelAdmin):
    inlines = (MenuItemAdminInline,)


class PackageAdminInline(admin.TabularInline):
    model = Package


class RestaurantAdmin(admin.ModelAdmin):
    readonly_fields = ("firebase_id",)
    inlines = (PackageAdminInline,)
    def save_model(self, request, obj, form, change):
        config = {
          "apiKey": "AIzaSyDKwejiIOKMFxPv7BcGeBo-AkiX3YRWroQ",
          "authDomain": "dindarepo.firebaseapp.com",
          "databaseURL": "https://dindarepo.firebaseio.com",
          "storageBucket": "dindarepo.appspot.com"
        }

        data = {
            "name": "",
            "cost_for_two": "",
            "rating": "",
            "location": {
                "address":"",
                "point":{
                    "lat":"",
                    "lng":""
                }
            },
            "menu":{},
            "packages":{},
            "tags":"",
            "thumbnail":"",
            "image_1":"",
            "image_2":"",
            "image_3":"",
        }

        data["name"] = obj.name
        data["location"]["address"] = obj.address
        data["location"]["point"]["lat"] = float(obj.lat)
        data["location"]["point"]["lng"] = float(obj.lng)
        data["rating"] = float(obj.rating)
        data["cost_for_two"] = float(obj.budget)
        data["tags"] = obj.tags
        menu = {
            "starters":{
                "veg":{},
                "non_veg":{}
            },
            "main_course":{
                "veg":{},
                "non_veg":{},
            },
            "drinks":{}
        }

        count = 0
        for item in obj.menu.menuitem_set.all():
            if(item.item_type=="starters"):
                if(item.food_type == "veg"):
                    menu["starters"]["veg"][count] = item.name
                if(item.food_type == "non_veg"):
                    menu["starters"]["non_veg"][count] = item.name
            if(item.item_type=="main_course"):
                if(item.food_type == "veg"):
                    menu["main_course"]["veg"][count] = item.name
                if(item.food_type == "non_veg"):
                    menu["main_course"]["non_veg"][count] = item.name
            if(item.item_type == 'drinks'):
                menu["drinks"][count] = item.name
            count += 1
        data["menu"] = menu

        packages = {}
        for item in obj.package_set.all():
            packages[str(item)] = {
                "details": item.details,
                "name": item.package_name,
                "main_course":{
                    "0":item.veg_main_course_count,
                    "1":item.non_veg_main_course_count
                },
                "starters":{
                    "0":item.veg_starters_count,
                    "1":item.non_veg_starters_count
                },
                "drinks":{
                    "0":item.drinks_count
                },
                "price": item.price
            }
        data["packages"] = packages

        firebase = pyrebase.initialize_app(config)
        db = firebase.database()

        storage = firebase.storage()
        thumbnail = storage.child('images/'+obj.name+"/"+obj.featured_thumbnail.name).put(obj.featured_thumbnail.path)
        image_1 = storage.child('images/'+obj.name+"/"+obj.image_1.name).put(obj.image_1.path)
        image_2 = storage.child('images/'+obj.name+"/"+obj.image_2.name).put(obj.image_2.path)
        image_3 = storage.child('images/'+obj.name+"/"+obj.image_3.name).put(obj.image_3.path)

        data["thumbnail"] = thumbnail["name"]
        data["image_1"] = image_1["name"]
        data["image_2"] = image_2["name"]
        data["image_3"] = image_3["name"]

        if(obj.firebase_id == ''):
            results = db.child("Restaurants").push(data)
            obj.firebase_id = results["name"]
        else:
            db.child("Restaurants").child(obj.firebase_id).update(data)

        super().save_model(request, obj, form, change)


admin.site.site_header = 'Tout Administration'
admin.site.register(Restaurant, RestaurantAdmin)
admin.site.register(Menu, MenuAdmin)
