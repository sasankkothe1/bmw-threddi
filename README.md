# global-supply-chain-threat-analysis

### Installation
Using Terminal

`git clone https://gitlab.lrz.de/ge72vob/global-supply-chain-threat-analysis.git`

### Run the Example

start the whole project with:

`docker-compose up`

the images will be built up automatically. 

### Backend Swagger-ui
localhost:3000/api-docs

#### Git Workflow
Please use feature branches only to commit your code. 

After finishing your feature, create a pull request and add one reviewer.

The reviewer needs to make sure that the features committed are working without errors before approving.

The reviewer shall merge the feature branch into the develop branch once they approved the pull request.

The master branch is only used for production, i.e. a finished deliverable/ work product.

##### Here is our workflow:

![Image](https://raw.githubusercontent.com/itsJS/findmycook-webapp/develop/git_workflow.png)
Reference: Copyright 2019 Stephan Krusche, Bernd Bruegge - POM SS19 - 09 - Branch and Merge Management - Slide 7

#### Naming Branches
Name the branches according to the branch types:
- 👨‍🎨 **Feature**: `feature/xx-yy-zz` -- ease tracking of features. Example: `feature/add-free-slots`
- 🧙‍♀️**Bugfix**: `bugfix/xx-yy-zz` -- fixed bugs.
- 👶 **Minor**: `minor/xx-yy-zz` -- refactorings or something similar.

#### Commit messages
Commit Message should start with the corresponding Issue Number it is referred to. 

Write commit messages based on these [guidelines](https://chris.beams.io/posts/git-commit/) ❤

# Directory structure

For every service within the architecture should have an own folder. Please use lowercase letters divided by underscores ( _ ).


