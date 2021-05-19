# Husky Buddy Developer Guide

This is a guide that allows developers to easily setup the project, ...[TODO]

## Table of Contents

- [Folder Structure](#folder-structure)
- [Setting Up the Environment](#setting-up-the-environment)
  - [Git](#git)
    - [Installing Git](#installing-git)
    - [Configuring Git](#configuring-git)
  - [VS Code](#vs-code)
    - [Downloading and Installing](#downloading-and-installing)
    - [Enabling VS Code Settings](#enabling-vs-code-settings)
    - [Installing Extensions](#installing-extensions)
- [Cloning the Repository](#cloning-the-repository)
- [Adding Private Config Files](#adding-private-config-files)
  - [Firebase Configuration](#firebase-configuration)
- [Installing Node Dependencies](#installing-node-dependencies)
- [Running the Project Locally (in Development Mode)](#running-the-project-locally-in-development-mode)
- [Testing the Project](#testing-the-project)
- [Building the Project (for exportation)](#building-the-project-for-exportation)
- [Deploying to Hosting](#deploying-to-hosting)

## Folder Structure

    .
    ├── public              # public files for building final app.
    └── src                 # development source.
      ├── assets            # image, video, logo, and other assets.
      ├── components        # individual components (no screens here)
      ├── config            # secret config files (not visible on repo)
      ├── data              # data classes for talking to firebase
      ├── providers         # context providers (pass data across components)
      ├── screens           # different full screens with their own routes
      └── styles            # CSS styles

**[⬆ back to top](#table-of-contents)**

## Setting Up the Environment

### Git

#### Installing Git

- All our code is maintained on [GitHub](https://github.com/) and is publically
  available at
  [Husky Buddy Repository](https://github.com/hritikaggarwal2/husky-buddy)
- In order to intereact with this repository, we require `Git` which can be
  installed from
  [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

#### Configuring Git

- Once you have successfully installed `Git`, you will need to configure it.
- You can do this by following along
  [this guide](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)

**[⬆ back to top](#table-of-contents)**

### VS Code

#### Downloading and Installing

- Our support team knows and understand VS Code the best, and thus we prefer to
  use it over other code editors.
- Download the latest version of VS Code from
  [here](https://code.visualstudio.com/download).

#### Enabling VS Code Settings

- Go to `VS Code Settings` and search for `Format on Save` and enable it.

#### Installing Extensions

- Inside your `VS Code`, go to the extensions tab.
- Here search for the extension - `Prettier`.
- If you can't find it, then follow along this
  [link](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  and add it from there.

**[⬆ back to top](#table-of-contents)**

## Cloning the Repository

- The source code for our application is available at
  `https://github.com/hritikaggarwal2/husky-buddy`

- Clone this repository from Github using the following command \
  `git clone https://github.com/hritikaggarwal2/husky-buddy`

**[⬆ back to top](#table-of-contents)**

## Adding Private Config Files

- Once you have clones the repository, you MUST create some configuration files.
- To create these files, navigate to `<root>/web/src/config/`.

### Firebase Configuration

- Once you are insde the above folder, create a new file `Firebase.js`
- Now inside this file you will paste the configuration as shown below:

  ```javascript
  const firebaseConfig = {
    apiKey: "GOES HERE",
    authDomain: "GOES HERE",
    databaseURL: "GOES HERE",
    projectId: "GOES HERE",
    storageBucket: "GOES HERE",
    messagingSenderId: "GOES HERE",
    appId: "GOES HERE",
    measurementId: "GOES HERE",
  };
  export default firebaseConfig;
  ```

- If you don't already have this information, you can either reach out to your
  team mates or find it at:
  [Link](https://console.firebase.google.com/u/0/project/study-buddy-uw/settings/general/web:NDRlNDQzNTQtNzY4NS00MmYwLWI1NmUtOGFjMjdiNmM1YzQz)
  -> `SDK setup and configuration` -> `Config`

**[⬆ back to top](#table-of-contents)**

## Installing Node Dependencies

- Navigate to the `<root>/web` subdirectory.
- Run the following command using the terminal (at this location): `npm install`

> Note:
>
> - You must complete everything before this point to have successfully setup
>   the project.

**[⬆ back to top](#table-of-contents)**

## Running the Project Locally (in Development Mode)

- Navigate to the `<root>/web` subdirectory.
- Run the following command using the terminal (at this location): `npm start`
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

> Note:
>
> - The page will reload if you make edits.\
> - You will also see any lint errors in the console.

**[⬆ back to top](#table-of-contents)**

## Testing the Project

- Navigate to the `<root>/web` subdirectory.
- Run the following command using the terminal (at this location): `npm test`
- Follow allong the interactive terminal window to run the desired tests.

**[⬆ back to top](#table-of-contents)**

## Building the Project (for exportation)

- Navigate to the `<root>/web` subdirectory.
- Run the following command using the terminal (at this location):
  `npm run build`
- Now, a new folder gets created at `<root>/web/build`. This folder will be used
  to deploy to public servers (discussed separately)

> Note:
>
> - Always make sure to run all [tests](#testing-the-project) in the project
>   before running this command
> - Do not try to change the code inside build folder manually!

**[⬆ back to top](#table-of-contents)**

## Deploying to Hosting

- Once you have created a [build](#building-the-project-for-exportation), you
  are ready to deploy it to the Firebase hosting.
- Navigate to the `<root>/web` subdirectory.
- As an initial setup:
  - Run `npm install firebase-tools`.
  - Then run `firebase login`.
    > Note: if you get some error try - `firebase logout && firebase login`.
- Run the following command using the terminal: `firebase deploy`.
- This will deploy your web app at
  [https://study-buddy-uw.web.app/](https://study-buddy-uw.web.app/)

**[⬆ back to top](#table-of-contents)**
