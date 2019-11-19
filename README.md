# Poolside FM Player

A native app that resembles the player on [poolside.fm](https://poolside.fm), so that users can the same audio experience without having to have their browser tab opened.

## Index

## 1. Motivation

I love what the guys at [poolside.fm](https://poolside.fm) created! And i'm more a metal and rock guy than a electron music guy.
But still, it's just a fun website that brings back some of my oldest memories of using a computer, in the early 90s. I love their care for details, both merging the styles of Apple's OS and the first editions of Windows.

I wanted to have that audio player on my desktop so that I could listen to poolside without having to have the browser opened.

Also I wanted to try out some web technologies and practices upon building this.

## 2. Development

### 2.1. How do I get the latest version?

You can download the latest build of the app here:

- [OS X/macOS](https://github.com/joaotmdias/poolside-fm-player)
- [Windows](https://github.com/joaotmdias/poolside-fm-player)
- [Linux](https://github.com/joaotmdias/poolside-fm-player)

### 2.2. Technologies and frameworks used

This app was built using these technologies and frameworks:

- [React](https://reactjs.org)
- [Typescript](https://typescriptlang.org)
- [Styled Components](https://www.styled-components.com)
- [Sass](https://sass-lang.com)

Testing was done using these:

- [Jest](https://jestjs.io)
- [Enzyme](https://airbnb.io/enzyme)

Native capabilities were added using [Github's electron](https://github.com).

### 2.3. Installation

> To install this project, you need to have node 8+ and npm or yarn installed on your computer.

First things first, if you don't have them, install electron and typescript globally on your computer:

```sh
$ npm install -g electron typescript
```

Then, at the root of the project, run this command:

```sh
$ npm install
```

### 2.4. Run

To start the app in development mode, at the root of the project, run this command:

```sh
$ npm run start
```

### 2.5. Build

To export and package the app,

### 2.6. Linting

To format typescript files using prettier, run:

```sh
$ npm run format:fix
```

You can also fix eslint issues:

```sh
$ npm run format:lint
```

### 2.7. Test

At the root of the project, run this:

```sh
$ npm run test
```

You can also run tests in watch mode:

```sh
$ npm run test:watch
```

### 2.8. Issues

If you would like to open an issue, please do so [here](https://github.com/JoaoTMDias/poolside-fm-player/issues)

## 3. Future uses of this

- Browser extension for Chrome/Firefox/Edge, maybe?

## 4. Philosophycal questions

### 4.1. How is this different from the original one?

It's a shameless knock-off, so I used almost the same UI that they use - altough built from scratch.
But there are ome key differences:

- Their website was built using Vue and this one uses react.
- They have a full fledged website and this is just an app.
- My audio visualiser actually gets the audio and displays the range into a live canvas.
- I have a dedicated settings page with some options like: - Accessibility - Themes
- Their website is way cooler than this cheap knock-off 😎.

### 4.2. Why didn't you use Redux, bro?

Don't get me wrong,bro, I also love global state frameworks such as Redux, use them everyday!
But I wanted to avoid overkilling the app with something like that and tried building this using only [React's Context API](https://).

### 4.3. Does the world get any better with this?

Nope, 100% that it does not, but you might want to sit down, listen to some tunes, drink that fancy cocktail of yours and think about that.

### 4.4. Do you get any money with this?

I know it sounds cliché, but it's just xxxperience and knowledge.
I didn't built this to make any money, but if you are still with your wallet opened waiting for an opportunity to throw money at the screen, the guys at [poolside.fm](https://poolside.fm) deserve all the credits.

### 4.5. Will they sue you

Gosh, I sure hope not, I have a kid and a wife to feed.
Please Mr. Poolside, don't hurt me!

### 4.5. You haven't called your grandmother in a month!

Mom, please, i'm working here. 🙁

## References

https://gist.github.com/matthewjberger/6f42452cb1a2253667942d333ff53404

## LICENSE

[MIT Licensed](./LICENSE)
