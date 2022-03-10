const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const {
  readCachedProjectGraph,
} = require('@nrwl/workspace/src/core/project-graph');
const { readWorkspaceJson } = require('@nrwl/workspace/src/core/file-utils');
const getWebpackConfig = require('@nrwl/react/plugins/webpack');

module.exports = function withModuleFederation(options) {
  const ws = readWorkspaceJson();
  const graph = readCachedProjectGraph();
  const project = ws.projects[options.name];

  if (!project) {
    throw new Error(
      `Cannot find project "${options.name}". Check that the name is correct in mfe.config.js.`
    );
  }

  const mfeOptions = {
    name: options.name,
    filename: `remoteEntry.js`,
    exposes: {
      // TODO(jack): This should handle different sourceRoot values.
      './Module': './src/index.ts',
    },
  };

  if (options.library) {
    mfeOptions.library = options.library;
  }

  const dependencies = graph.dependencies[options.name];
  mfeOptions.shared = dependencies.reduce((acc, dep) => {
    // npm libs,
    if (graph.externalNodes[dep.target]) {
      const externalNode = graph.externalNodes[dep.target];
      acc[externalNode.data.packageName] = {
        singleton: true,
        requiredVersion: externalNode.data.version,
      };
    }

    // workspace libs
    if (graph.nodes[dep.target]) {
      const node = graph.nodes[dep.target];
      if (node.data.projectType !== 'application') {
        acc[node.name] = {
          singleton: true,
        };
      }
    }

    return acc;
  }, {});

  // TODO(jack): This needs to support override objects
  if (options.remotes) {
    mfeOptions.remotes = options.remotes.reduce((acc, name) => {
      const project = ws.projects[name];
      const serveOptions = project?.targets?.serve.options;
      if (serveOptions) {
        acc[name] = `${name}@//${serveOptions.host ?? 'localhost'}:${
          serveOptions.port ?? 4200
        }/remoteEntry.js`;
      }
      return acc;
    }, {});
  }

  return (config) => {
    config = getWebpackConfig(config);

    config.output.uniqueName = options.name;
    config.output.publicPath = 'auto';

    config.optimization = {
      runtimeChunk: false,
      minimize: false,
    };

    config.plugins.push(new ModuleFederationPlugin(mfeOptions));
    console.log(config);

    return config;
  };
};
