This is a demo of MFEs using Nx and React.

## Running demo

Install packages:

```bash
yarn install
```

Run all apps:

```bash
nx run-many --target=serve --all
```

## Technical details

Most of the work is done in `withModuleFederation` function in [`tools/mfe/with-module-federation.js`](./tools/mfe/with-module-federation.js).

The `shell` host app has the following layout.

```treeview
apps/shell
├── mfe.config.js             <-- configures the host name and available remotes
├── src/
│  ├── app/
│  ├── bootstrap.tsx          <-- static call to ReactDOM.render
│  ├── main.tsx               <-- dynamically loads bootstrap.tsx
│  ├── remotes.d.ts           <-- module definitions for remote apps
│  └── ...
├── ...
└── webpack.config.prod.js    <-- local development config
└── webpack.config.js         <-- local development config
```

The remote apps `about` and `dashboard` have the following layout.

```treeview
apps/{about,dashboard}
├── mfe.config.js             <-- configures the host name and available remotes
├── src/
│  ├── app/
│  ├── bootstrap.tsx          <-- static call to ReactDOM.render
│  ├── main.tsx               <-- dynamically loads bootstrap.tsx
│  └── ...
├── ...
└── webpack.config.prod.js    <-- local development config
└── webpack.config.js         <-- local development config
```

## Next steps

- [ ] Use RR v5 since that's what Nx comes with
- [ ] Remote apps can run independently
- [ ] (Demo) Add support for overriding shared config by providing a `shared: (libraryName, config) => undefined | false | config` function, where false excludes a library, and `undefined` keeps existing config
- [ ] (Demo) `exposes` mapping should read from `sourceRoot` of project rather than hardcoded value
- [ ] (Demo) Add support for production config `webpack.config.prod.js` (different remote URLs)
- [ ] (Nx) Port `withModuleFedaration` to `@nrwl/react/module-federation`
- [ ] (Nx) Create generators for host and remote apps

Nice to haves:
- [ ] Support loading bundled shared library if version in host is incompatible
- [ ] Ability to run some remotes on local vs another environment
- [ ] Improve running host+remotes, and better output

## Questions

* Do users need to add additional shared libraries that we did not detect? e.g. `extraShared`? (Discuss with Colum, Leo, Rares, Jason)

## Performance

* Shared libs between remotes (that are missing in host) should only load once
* Reduce network as much as possible

