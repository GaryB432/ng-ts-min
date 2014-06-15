# Minimal AngularJS and TypeScript solution for Visual Studio 2013

This project is an application skeleton for a typical [AngularJS](http://angularjs.org/) web app.
You can use it to quickly bootstrap your angular webapp projects and dev environment for these
projects.

The seed contains a sample AngularJS application and is preconfigured to install the Angular
framework.

The seed app features a controller and a service and uses Angular routing.


## Getting Started

To get you started you can simply clone this repository and install the dependencies:

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the angular code via `bower`, a [client-side code package manager][bower].

We have included a bower.json file so you can simply:

```
bower install
```

For TypeScript definition files for AngularJS and JQuery use:

```
tsd update
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `bower_components` - contains the angular framework files
* `typings` - contains the TypeScript definition files

## Updating Angular

Previously we recommended that you merge in changes to angular-seed into your own fork of the project.
Now that the angular framework library code and tools are acquired through package managers (npm and
bower) you can use these tools instead to update the dependencies.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.


