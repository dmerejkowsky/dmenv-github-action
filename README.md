_Note: since dmenv is no longer maintained, this project has been archived to. If you're looking for a dmenv alternative, please take a look at poetry_

# Use dmenv in GitHub Actions

This action installs and configure [dmenv](https://github.com/tankerhq/dmenv) for use in your Python projects.

## Usage

See example below:

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
    
- name: Run tests
  run: |
     dmenv install
     dmenv run pytest
```


## Inputs

### dmenv-version

**required**: the version of dmenv to use. See [dmenv releases page](https://github.com/TankerHQ/dmenv/releases) for available values.
