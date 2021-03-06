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
    - [Using Project Config File](#using-project-config-file)
    - [Creating & Using your own Firebase Project](#creating--using-your-own-firebase-project)
      - [Creating a Firebase Project](#creating-a-firebase-project)
      - [Adding a Web app to your Project](#adding-a-web-app-to-your-project)
      - [Adding Authentication](#adding-authentication)
      - [Adding Firestore Database](#adding-firestore-database)
      - [Copying Credentials](#copying-credentials)
- [Installing Node Dependencies](#installing-node-dependencies)
- [Running the Project Locally (in Development Mode)](#running-the-project-locally-in-development-mode)
- [Testing the Project](#testing-the-project)
- [Building the Project (for exportation)](#building-the-project-for-exportation)
- [Deploying to Hosting](#deploying-to-hosting)

## Folder Structure

    .
    ├── .github/workflows     # stores config files for Github Actions to automatically run.
    ├── .vscode               # stores VS Code config files for project consistency.
    ├── status-reports        # weekly reports of progress maintained during development.
    ├── web                   # React.js web app for development.
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
    databaseURL: "GOES HERE", // if available
    projectId: "GOES HERE",
    storageBucket: "GOES HERE",
    messagingSenderId: "GOES HERE",
    appId: "GOES HERE",
    measurementId: "GOES HERE", // if available
  };
  export default firebaseConfig;
  ```

#### Using Project Config File

- If you don't already have this information, you can either reach out to your
  team mates or find it at:
  [Link](https://console.firebase.google.com/u/0/project/study-buddy-uw/settings/general/web:NDRlNDQzNTQtNzY4NS00MmYwLWI1NmUtOGFjMjdiNmM1YzQz)
  -> `SDK setup and configuration` -> `Config`

> Note: In case you are not a trusted developer (by our organization), you can
> [Create & Use your own Firebase Project](#creating--using-your-own-firebase-project).

#### Creating & Using your own Firebase Project

##### Creating a Firebase Project

- Navigate to
  [https://console.firebase.google.com/u/0/](https://console.firebase.google.com/u/0/).
  Note - you might need to Sign In to Google to continue.
- Click on `Add Project`
- Enter a Project Name (anything should work).
- Disable `Google Analytics for this project`.
- Click `Create Project`.
- Once your project is setup, click `Continue`.

##### Adding a Web app to your Project

- Navigate to your newly created firebase `Project Overview`.
- Under `Get started by adding Firebase to your app` click on `</>` OR `web`.
- Now add a `Nickname` to your app (anything should work).

##### Adding Authentication

- Navigate to the `Authentication` tab from the left, and click
  `Add Authentication`.
- Under `Sign-in method`, enable `Email/Password`.

##### Adding Firestore Database

- Navigate to the `Firestore Database` tab from the left, and click
  `Create Database`.
- Choose the `Start in test mode` option and hit the `Next` button.
- Continue through the setup and don't change anything.

##### Copying Credentials

- Navigate to the `Project Settings` available from the `Settings icon` next to
  `Project Overview`.
- Scroll down to find `SDK setup and configuration` -> `Config` file.
- Use these configurations for the `firebaseConfig` credentials that are
  required in the [above step](#firebase-configuration).

**[⬆ back to top](#table-of-contents)**

## Installing Node Dependencies

- Navigate to the `<root>/web` subdirectory.
- Run the following command using the terminal (at this location): `npm install`

> Note:
>
> - Make sure to always run this command when you pull a new branch.
> - Even after running this command, it is possible that there will be some
>   missing packages in your repository. If this is the case, try to run this
>   command once again and check to see if that fixes the issue.
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
- Run the following command using the terminal (at this location):
  `npm run test:integration`
- Follow allong the interactive terminal window to run the desired tests.

##### Adding Tests to the Project

- Navigate to `<root>/web/src/integration` subdirectory.
- For any specific _.js file, add a corresponding _.test.js file which contains
  all the unit tests for a specific component/function.
- Refer to Jest and Puppeteer testing tools for additional instructions for
  writing tests.
- The
  `` npm run test:integration` script will automatically detect these new unit tests and run them either via CI testing or manually via  ``npm
  run test:integration` locally.

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

## CI/CD Layout

- Pushing changes to the main branch or making a pull request to merge a branch
  onto main will trigger Github Actions to execute `node.js.yml` file inside of
  `<root>/.github/workflows` directory.
- The `Actions` tab contains the build history and the workflow runs.

**[⬆ back to top](#table-of-contents)**
