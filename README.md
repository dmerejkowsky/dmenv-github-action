# dmenv javascript action

This action install `dmenv` then runs `dmenv install`

## Inputs

### dmenv-version

**required**: the version of dmenv to use. See [
https://github.com/TankerHQ/dmenv/releases](dmenv releases) for available values.

## Exmaple usage

```yaml

# Note: you *have* to call setup-python with a version >= 3.5
# for the dmenv action to work
- name: Set up Python
  uses: actions/setup-python@v1
  with:
    python-version: 3.7

- name: Install dmenv
  uses: dmerejkowsy/dmenv-action@v1.0.0
  with:
    dmenv-version: 0.20.0
```
