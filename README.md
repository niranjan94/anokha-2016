## Anokha 2016 - Public Website Module

This repo will hold all the resources and source files of the public website.

> The folder structure must remain unchanged for all the resources to be auto loaded and configured.

#### Directory Structure

1. **/resources/assets** - Contains all the javascript, css, sass files used in the website. Any files in this folder will be automatically minified, merged and served.
2. **/resources/views** - Contains the HTML source files of the website. The extension of all files in this folder should be ```.html```. Any other extension will be ignored.
3. **routes.list** - Contains information about the structure of the website and the route-file mappings

jQuery and the Anokha javascript API will be automatically served and need not be added to the assets directory.

**NOTE:** Do not delete/edit any ```.gitignore``` (or) ```.gitkeep``` files found in this repository.

##### Working with CSS

1. Working with CSS is very simple. Just put all your CSS files inside **/resources/assets/css/**. (you need to include any library that you use too)

##### Working with SASS (SCSS Syntax)

1. Put all your sass assets inside **/resources/assets/sass/**
2. Make sure you have a file named loader.scss which imports all the required sass files. A sample loader.scss has been included inside the same folder

##### Working with javascript

1. Put all the javascript libraries that needs to be loaded before your site's javascript code inside **/resources/assets/js/vendor/** . (The files will be loaded in alphabetical order.)

1. Put all the other javascript files inside **/resources/assets/js/** .(The files will be loaded in alphabetical order.)

##### Configuring the routes.list file

1. Every line in the routes.list file is a separate entry.
2. The format is :

```
[path]<space>[filename]<space>[title]
````

For example:

```
/ index.html Home
/login login.html Login to Anokha 2016
/register register.html Register for Anokha 2016
````

#### Contribution guidelines

Never push directly to this repository. Fork this repository. Make changes. Push. And then send a pull request.

Once the pull request is reviewed, accepted and merged, login to the Anokha Management Panel and Initiate the update.
