# Radio SRF Menubar Application

> I'm not connected with Radio SRF. This is just a weekend project.

This simple menubar application plays SRF Radiostations. Currently the following stations are supported:

- Radio SRF 1
- Radio SRF 2
- Radio SRF 3
- Radio SRF 4 News
- Radio SRF Virus

## Local Development

1. `npm install`
2. `npm start`
2.1 `npm run compile:babel`

### Version Mismatch?

Sometimes I got an error like "Version x expected, y got". Rebuilding the module helped.

```bash
./node_modules/.bin/electron-rebuild node-lame
```

### Build new Version

1. Update Version in app/package.json
2. Run `npm run package`

## Todo

- [ ] Add Tests
- [ ] Add MediaKey Support
- [ ] Display current song

## Icons

- [Material Design Icons](https://design.google.com/icons/)

## License

MIT