# Canvas

The Canvas project is a Korora Project initiative to simplify distribution and management of customised Korora (and Fedora) systems. Canvas draws inspiration from a number of existing solutions that provide OS customisation and building including:

* [openSUSE Build Service](https://build.opensuse.org/)
* [Revisor](https://fedorahosted.org/revisor/), and
* [Spacewalk](https://fedorahosted.org/spacewalk/)

Some fundamental goals of the Canvas project include:

* To provide a simple and intuitive interface for system composition,
* ProFitted for extensibility, and
* Allow trivial management of your Mum's install.

## Component Overview
The broad components understood to Canvas are:

 * Packages
 * Repos
 * Templates, and
 * Machines

Packages and Repos are the traditional representations as you know them. A package is an installing piece of software that provides a level of functionality for your system. Your OS is typically compsed of 100s to possibly 1000s of individual packages. Repos are the store for where Packages can be fetched from and installed.

Templates are the recipes for how particular systems are to be composed. They will specify the Repos available and the Packages to be installed to make the final compositions.

Machines are managed systems assigned a Template.

## Getting Started

#### Use Case #1
So `firnsy` has has just done a clean install and has his system package and repo selection just how he likes it. Let's make a template out of it for future usage; we'll call it `laptop`.
```
cnvs template add firnsy:laptop
cnvs template push firnsy:laptop
```

Let's say he then goes and adds some packages for to try out, crawls down some dependency rabbit holes installing packages left, right and centre. We have a problem, `firnsy` wants to go back to exactly how it was before he started messing around. Easy.

```
cnvs template pull firnsy:laptop --clean
```

Order restored.

#### Use Case #2

The `kororaproject` have just pushed out their fancy new `steam` template which turns your desktop into an awesome Steam focused gaming console experience and you want in. You've being fussing with this package and that package but couldn't get it quite right.

```
cnvs template pull kororaproject:steam --clean
shutdown -r now
```

Game on!

## Command Line Reference

The Canvas command line provides the necessary tools to add, update, remove, synchronise and command your systems to your will.

### Global Options
The following options are global to all commands:
```
-U|--user  # specify canvas user
-H|--host  # specify canvas server host
```

The default user is the name of the system user account invoking the `cnvs` command. The default user can also be specified in the `~/.config/canvas.conf`.

The default host is the Korora Project canvas server located at https://canvas.kororaproject.org/. The default host can also be specified in the `~/.config/canvas.conf`.

### Templates
The following commands allow adding, removing and updating and synchronising Canvas templates.

#### Command Overview
The following commands are available for the management of Canvas templates:
```
cnvs template add [user:]template [--name] [--description] [--includes]
cnvs template update [user:]template [--name] [--description] [--includes]
cnvs template rm [user:]template
cnvs template push [user:]template
cnvs template pull [user:]template [--clean]
cnvs template diff [user:]template
```

#### Adding Templates
The general usage for adding a new template to a Canvas user is described as:
```
cnvs template add [user:]template [--name] [--description] [--includes]
```

For example, adding a new blank template identifed as `htpc` to the Canvas user `firnsy`.
```
cnvs template add firnsy:htpc
```

Adding a new template identifed as `htpc` to the Canvas user `firnsy` that is based on the `core` template from canvas user `kororaproject`.
```
cnvs template add firnsy:htpc --includes kororaproject:core
```


#### Updating Templates
The general usage for updating an existing template of a Canvas user is described as:
```
cnvs template update [user:]template [--name] [--description] [--includes]
```

Updating the name and description of existing template `htpc` of Canvas user `firnsy`.
```
cnvs template update firnsy:htpc --name="Firnsy's HTPC" --description="Ultimate HTPC recipe!"
```

#### Removing Templates
The general usage for removing an existing template of a Canvas user is described as:
```
cnvs template rm [user:]template
```

Removing the existing template `htpc` from Canvas user `firnsy`.
```
cnvs template rm firnsy:htpc
```

#### Synchronising Templates
The general usage for synchronising existing templates of a Canvas user is described as:
```
cnvs template push [user:]template
cnvs template pull [user:]template [--clean]
```

For example the following command would install all packages and repos specified in the template `htpc` from the Canvas user `firnsy` to the current system. No packages would be removed from the current system.
```
cnvs template pull firnsy:htpc
```

To ensure the package and repos matched the specified template exactly, just add the `--clean` option. This will remove any packages and repos from the current system that are not specified in the template.
```
cnvs template pull firnsy:htpc --clean
```

To add the current packages and repos of the current system to the template.
```
cnvs template push firnsy:htpc
```

#### Diff Templates:
The general usage for viewing the diff between the current system and an existing template of a Canvas user is described as:
```
cnvs template diff [user:]template
```

For example, the following command would show the diff between the current system to the template `htpc` from Canvas user `firnsy`.
```
cnvs template diff firnsy:htpc
```

### Template Packages
The following commands allow adding and removing of packages from specified Templates.

#### Command Overview
The following commands are available for the management of Canvas template packages:
```
cnvs package add [user:]template package1 package2 ... packageN
cnvs package rm [user:]template package1 package2 ... packageN
```

#### Package Definition
When specifying packages it is possible to be as generic or explicit as you wish with regard to epoch, version, release and arch.

The package definition described as:
```
name[[#epoch]:version-release][!arch]
```
Note that a `version` and `release` must be specified together and can not be specified individually.

Examples of package definitions include:
```
foo                   # name only
foo!x86_64            # name and arch
foo:2.1-3             # name, version and release
foo#1:2.1-3!x86_64    # name, epoch, version, release and arch
```


#### Adding Packages
The general usage for adding packages from templates is described as:
```
cnvs package add [user:]template package1 package2 ... packageN
```

```
cnvs package add firnsy:htpc foo @bar baz
cnvs package add firnsy:htpc buz
```

#### Removing Packages
The general usage for removing packages from templates is described as:
```
cnvs package rm [user:]template package1 package2 ... packageN
```

```
cnvs package rm firnsy:htpc @bar
cnvs package rm firnsy:htpc foo baz
```

### Machines
The following commands allow adding, removing and updating Canvas machines that are assigned templates. Machines are your configured Canvas systems that can be managed and easily synchronised with your latest configurations.

Machines have a 1-to-1 link with a Canvas template. For example you may assign your HTPC to a personalised template called `htpc`. Alternatively you may assign your laptop and desktop to your `all-my-favourite-things` template, any changes you make to the template would then be easily reflected on both your laptop and desktop computer.


#### Command Overview
The following commands are available for the management of Canvas machines:
```
cnvs machine add|update [user:]name [--description=] [--name=] [--template=]
cnvs machine rm [user:]name
cnvs machine diff [user:]name
cnvs machine sync [user:]name
cnvs machine cmd [user:]name command arg1 arg2 ... argN
```

#### Adding Machines
The general usage for adding a new managed machine to a Canvas user is described as:
```
cnvs machine add [user:]name [--description=] [--name=] [--template=]
```

To add the current system as a managed machine named `odin` to the Canvas user `firnsy` linked to the `htpc` template from the same Canvas user is as follows:
```
cnvs machine add firnsy:odin --template firnsy:htpc
```

#### Updating Machines
The general usage for updating an existing managed machine of a Canvas user is described as:
```
cnvs machine add [user:]name [--description=] [--name=] [--template=]
```

For example to change the recently added machine from the `htpc` template to the `steam` template from Canvas user `firnsy` we can simply invoke:
```
cnvs machine update firnsy:odin --template firnsy:steam
```

#### Removing Machines
The general usage for adding a new managed machine to a Canvas user is described as:
```
cnvs machine rm [user:]name
```

For example:
```
cnvs machine rm firnsy:odin
```

#### Diff Machines
To determine the state of a machine with respect to it's assigned template. Can be used to determine whether a machine requires re-sync with the template or not.

The general usage for diff'ing an existing managed machine of a Canvas user is described as:
```
cnvs machine diff [user:]name
```

For example to view the diff status of the machine `odin` of Canvas user `firnsy` relative to its assigned template can be done with the following command:
```
cnvs machine diff firnsy:odin
```

#### Synchronising Machines
The general usage for synchronising an existing managed machine of a Canvas user is described as:
```
cnvs machine sync [user:]name
```

For example to synchronise machine `odin` of Canvas user `firnsy` relative to its assigned template can be done with the following command:
```
cnvs machine sync firnsy:odin
```

#### Commanding Machines
The general usage for synchronising an existing managed machine of a Canvas user is described as:
```
cnvs machine cmd [user:]name command arg1 arg2 ... argN
```

Examples of running remote commands on the machine `odin` of Canvas user `firnsy` are shown below.
```
cnvs machine cmd firnsy:odin cat /etc/passwd
cnvs machine cmd firnsy:odin ls /home
cnvs machine cmd firnsy:odin shutdown -h now
cnvs machine cmd firnsy:odin bash
```

