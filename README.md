# Radio SRF Menubar Application

> I'm not connected with Radio SRF. This is just a weekend project.

![Screenshot](https://raw.githubusercontent.com/stefanzweifel/radio-srf-menubarapp/master/resources/screenshot.png)


This simple menubar application plays SRF Radiostations. Currently the following stations are supported:

- Radio SRF 1
- Radio SRF 2
- Radio SRF 3
- Radio SRF 4 News
- Radio SRF Virus

## Download

Download the latest version from the [releases tab](https://github.com/stefanzweifel/radio-srf-menubarapp/releases).

## Local Development

1. `npm install`
2. `npm start`
3 `npm run compile:babel`

### Version Mismatch?

Sometimes I got an error like "Version x expected, y got". Rebuilding the module helped.

```bash
./node_modules/.bin/electron-rebuild node-lame
```

### Build new Version

1. Update Version in `app/package.json`
2. Run `npm run package`

## Todo

- [ ] Add Tests
- [ ] Add MediaKey Support
- [ ] Display current song

## Icons

- [Material Design Icons](https://design.google.com/icons/)

## License

MIT