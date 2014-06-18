# Minimal AngularJS and TypeScript solution for Visual Studio 2013

This project is an application skeleton for a typical [AngularJS](http://angularjs.org/) web app.
You can use it to quickly bootstrap your angular webapp projects and dev environment for these
projects.

The seed contains a sample AngularJS application and is preconfigured to install the Angular
framework.

The seed app features a controller and a service and uses Angular routing.

Note that we have turned on the --noImplicitAny flag for TypeScript compilation. Expressions and declarations will need a type specified.  You can explicitly use `any` but inferencing of any will be an error.

## Getting Started

To get you started you can simply clone this repository and install the dependencies:

### Install Dependencies

You'll need `NodeJs` and the Node Package Manager to install the other project dependencies.

Install [NodeJs](http://nodejs.org/).

Now that you have `npm` you can install the dependencies. Our project dependencies are managed with `bower` a client-side package manager.  Use the following command to install `bower` and `tsd` a TypeScript Definition manager for [DefinitelyTyped](http://definitelytyped.org/).

```
npm install bower tsd typescript -g
```

Now that you have the dependency management tools you can install the project dependencies themselves. The following command will install `JQuery`, `AngularJS`, `HTML5Boilerplate` and `angular-md5` into your project.

```
bower install
```
And, finally, install the TypeScript definition files needed by the project.
```
tsd install
```
You should find that you have two new folders in your project.

* `bower_components` - contains the framework files
* `typings` - contains the TypeScript definition files

## Updating Dependencies

You can update all the project dependencies by running:

```
bower update
tsd update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.