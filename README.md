# dmenv javascript action

This action install `dmenv` then runs `dmenv install`

## Inputs

### dmenv-version

**required**: the version of dmenv to use. See [
https://github.com/TankerHQ/dmenv/releases](dmenv releases) for available values.

## Exmaple usage

```yaml
uses: dmerejkowsy/dmenv-action@v1.0.0
with:
  dmenv-version: 0.20.0
