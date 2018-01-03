const Debug = require('debug');
const stylelint = require('stylelint');
const stylelintFormatter = require("eslint/lib/formatters/index");
const { Asset } = require('parcel-bundler');
const CSSAst  = require('parcel-bundler/src/assets/CSSAst');

let ownDebugger = Debug('parcel-plugin-stylelint:MyAsset');

let engine = new stylelint.CLIEngine({
    ignorePattern: '!node_modules/*'
});

ownDebugger('MyAsset');

class MyAsset extends CSSAst {
    async parse(code) {
        ownDebugger('before parse do stylelint.');

        let res = engine.executeOnText(code, this.name, true);
        stylelintFormatter(res.results);

        return await super.parse(code);
    }
}

module.exports = MyAsset;