# VERPIJP

**Verpijp** was a solo, non-commercial, proof-of-concept web app where old images of specific locations where geolocated to locations from where they might have been taken.

It was an invitation to users to wander around, find the place where the image was taken, and learn about the past of the neighbourhood by comparing current and past views.

The release loaded on this repository was the second version, involving:
* A gallery to manipulate the selection of the images the user wants to see
* A geo-tracking option to facilitate finding the place where the image was taken, if the user wants to go there 
* What it was an experimental option with rudimentary AR capabilities, where the user could change to the camera mode and manually overlap the image on top of the current view.

Although the project was made on PC, it is meant to be used on the phone.

## Technologies

The project was left without back end because the first focus of the project was to create the front end and test its feasibility, viability and interest before moving to a formal databasing. So all the data is hardcoded inside the project as a *.js file.

For the front end, the project was created using Vue.js (version 2.6) and `vue-cli`. Other relevant technologies used during this project were:
* Google Maps API
* `vue-draggable-resizable` package for the image manipulation and overlapping.

The current version could be found live on https://verpijp.firebaseapp.com (there is no guarantee as I turn this off now and then).

## Remarks

The project you have access through this repository is not the last version. That version might be put available in the future.

For now, you can check the features added for what it was the last version on this [youtube video](https://www.youtube.com/watch?v=rgPVjj0umdw).

Things that you will find there are:
* Stories associated to the images when expanding image cards
* Two categories of images:
  * **Spots**, for users to find the image but without related story
  * **Stories**, for users to find the image and read a related story
  * **Treasure-Hunt** style games where users should try to find collectable images by responding related questions telling part of the history of the neighbourhood

## Future

The project is currently in stand-by, but it has been relived as demo for others to view. If the project is retaken, the project would emphasize on:
* Improving and professionalizing the front end
* Adding a back end to handle data
* Expanding the data so it can cover routes along the city connecting green areas
* Wish-list: adding Voice through AI to read stories and guide the user as a way to improve the user experience