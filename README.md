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

### Version Mismatch?

Sometimes I got an error like "Version x expected, y got". Rebuilding the module helped.

```bash
./node_modules/.bin/electron-rebuild node-lame
```

## Todo

- [ ] Fix known bugs
- [ ] Add Tests
- [ ] Add MediaKey Support
- [ ] Display current song

## Known Bugs

- [ ] "Stop"-Button takes some seconds to take effect.

## Icons

- [Material Design Icons](https://design.google.com/icons/)

## License

MIT