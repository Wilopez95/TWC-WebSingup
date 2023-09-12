# TWC React

![TWC Logo](./public/images/Logo TWC Blue.png)

This project contains shared code for The Weather Channel Web Subscription. TWC Web Subscription uses Next Js.

In order to start working on these platforms, some setup is required.

## Shared Setup

### VS Code

The recommended IDE is Visual Studio Code. Install VS-code [here](https://code.visualstudio.com/).

After VS Code has been installed add the VS Code Extensions via the Visual Studio Code Extensions section of this readme.

### Node.js (16.13.2)

### NVM Installation Methods

- Option 1: curl / wget - Read docs [here](https://github.com/nvm-sh/nvm#install--update-script). After installing through curl or wget, you may skip the section labeled "Configure shell" as both commands have this built-in.
- Option 2: Homebrew - Read docs [here](https://formulae.brew.sh/formula/nvm) or continue reading to set up with Homebrew.

### Install NVM with homebrew

```bash
brew update
brew install nvm
```

### Configure shell

Open `~/.bash_profile` or `~/.zshrc` and add

```bash
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

Run this to reload (bash):

```bash
source ~/.bash_profile
```

Run this to reload (zsh):

```zsh
source ~/.zshrc
```

Verify:

```bash
nvm --version
```

### Uninstall any globally installed versions

Node.js doesn't offer an uninstaller - if you had previously installed using their installer [this article](https://www.positronx.io/how-to-uninstall-node-js-and-npm-from-macos/) might be helpful.
If you had previously installed node using homebrew you can uninstall with these commands:

```bash
brew uninstall yarn
brew uninstall node
```

### Install Node

The `.nvmrc` file committed in the repo contains the node version the project is currently on. The nvm commands will use that version. From the root of the repository run the following commands:

```bash
nvm install
nvm use
```

**Tip**: You may also configure your shell profile to automatically detect a `.nvmrc` and call `nvm use` file whenever you switch between repositories. You can read the docs for setting that up [here](https://github.com/nvm-sh/nvm#deeper-shell-integration).

### Install Yarn

The easiest way to install yarn is with the node package manager [NPM](https://www.npmjs.com/).

To install yarn enter this in terminal:

`npm install --global yarn`

To verify that the install was successful type:

`yarn --version`

#### Local setup

This project uses NextJs based in React. Refer to <https://nextjs.org/> - this version will be installed automatically when yarn installs packages.

<!-- 1. Clone the repo at https://github.com/doubleencore/WEX-WebSignup into the root directory of twc-subscription
2. `cd WEX-WebSignup/`
3. `git checkout develop`
4. `yarn install`
5. `yarn dev` -->

Now go to <http://localhost:3000/> and the project should be running

## Accessibility

The Weather Channel Web Subscription was developed following the principle conventions of the accessibility

## Visual Studio Code Extensions

Recommended Extensions can be viewed by pressing `Command + Shift + P`, start typing "extensions:" and select option `Extensions: Show Recommended Extensions`. You can press the download cloud icon next to the heading `Workspace Recommendations` to install all of them.

These recommendations can be modified from within `.vscode/extensions.json`.

### Branch Naming Strategy

The branch conventions follow the standard: Develop: Is the main branch of develop , only the tested and reviewed code is part of this branch.
Master: Only the code ready to production is part of the branch master, this should be tested by QA in different environments.
Feature: Is a new functionality for the project , is new code and should be checked to merge into develop.
Update: Is some change to a feature , some new part or update.
Bugfix: Is a solution for a bug or some bad behavior in the code.

### Develop / Staging URLS

<http://web-staging-twc-tv.s3-website-us-east-1.amazonaws.com/>

### Running Gradle Lint Checks

The project is configured to run lint each time that a commit is executed, can check all the revitions in .eslintrc.js file
