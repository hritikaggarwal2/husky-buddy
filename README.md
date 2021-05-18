# Husky Buddy

- [Project Brief](Project Brief)
- [Project Goals](Project Goals)
  - [Vision] Vision
  - [4+ Major Features (MVP)] 4+ Major Features (MVP)
- [Folder Structure] Folder Structure

## Project Brief

A study group web app targeted specifically towards UW Seattle students who are
looking to partner with other students for various classes. Use this app to find
yourself the perfect study group for each class.

## Project Goals

### Vision

We want all the students at UW to be able to find study groups, collaborate with
their peers, and build strong relationships, while simultaneously facilitating a
structured learning environment. Although there exist some services that can
perform similarly, we want to make Husky Buddy shine among the competition by
not only including features that make it easier for users to form their perfect
study groups, but by also abolishing the negatives included in our competitors.

### 4+ Major Features (MVP)

- User account creation and login facilities of some kind.
- Users can create study groups with defined chat feature.
- Users can define preferences for what they want their study groups to be.
  - Others can join groups based on these preferences.
  - “Classes” and other activities are user defined in the MVP.
- Users can search other groups using their preferences.

### 2+ Stretch Goals

- Integration with UW sign in to verify users.
  - Identification with users is 1-1 coordinated with UW NetId.
- Automated/Semi-automated scraping of UW website and time schedule to determine
  some classes the product should offer as presets/defaults.

## Folder Structure

    .
    ├── status-reports        # weekly status reports.
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

## Getting Started with the Project

Follow the instructions below in order to install the project and get it
started/running :

### Cloning the Repository

- Clone this repository from Github using the following command \
  `git clone https://github.com/hritikaggarwal2/husky-buddy`

### Instruction to Building & Running the App

- Change directories to the `web` folder.
- Follow along the `README.md` file there.

### Current Use Cases Operational

- User creation and login
- Group creation and search
- Group chat
