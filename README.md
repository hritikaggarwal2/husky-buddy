# Husky Buddy

## Table of Contents

- [Husky Buddy](#husky-buddy)
  - [Table of Contents](#table-of-contents)
  - [Project Brief](#project-brief)
  - [Project Goals](#project-goals)
    - [Vision](#vision)
    - [4+ Major Features (MVP)](#4-major-features-mvp)
    - [2+ Stretch Goals](#2-stretch-goals)
  - [Getting Started with the Project](#getting-started-with-the-project)
    - [Folder Structure](#folder-structure)
    - [Guides](#guides)
    - [Current (Operational) Use Cases](#current-operational-use-cases)

## Project Brief

A study group web app targeted specifically towards UW Seattle students who are
looking to partner with other students for various classes. Use this app to find
yourself the perfect study group for each class.

**[⬆ back to top](#table-of-contents)**

## Project Goals

### Vision

We want all the students at UW to be able to find study groups, collaborate with
their peers, and build strong relationships, while simultaneously facilitating a
structured learning environment. Although there exist some services that can
perform similarly, we want to make Husky Buddy shine among the competition by
not only including features that make it easier for users to form their perfect
study groups, but by also abolishing the negatives included in our competitors.

**[⬆ back to top](#table-of-contents)**

### 4+ Major Features (MVP)

- User account creation and login facilities of some kind.
- Users can create study groups with defined chat feature.
- Users can define preferences for what they want their study groups to be.
  - Others can join groups based on these preferences.
  - “Classes” and other activities are user defined in the MVP.
- Users can search other groups using their preferences.

**[⬆ back to top](#table-of-contents)**

### 2+ Stretch Goals

- Integration with UW sign in to verify users.
  - Identification with users is 1-1 coordinated with UW NetId.
- Automated/Semi-automated scraping of UW website and time schedule to determine
  some classes the product should offer as presets/defaults.

**[⬆ back to top](#table-of-contents)**

## Getting Started with the Project

### Folder Structure

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

### Guides

- [User Guide](USER_GUIDE.md)
- [Developer Guide](./web/README.md)

**[⬆ back to top](#table-of-contents)**

### Current (Operational) Use Cases

- User creation and login
- Group creation and search
- Group chat

**[⬆ back to top](#table-of-contents)**
