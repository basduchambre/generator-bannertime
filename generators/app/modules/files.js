/*
 * Generate files and process them.
 */

const download = require('download');
const getVendorScript = require('./getVendorScript');

module.exports = function files() {
  // Set the default html file based on the type of banner
  switch (this.props.bannerType) {
    case 'Studio (formerly Doubleclick Studio)':
      this.bannerSuffix = 'doubleclick';
      break;
    case 'Sizmek':
      this.bannerSuffix = 'sizmek';
      break;
    case 'Adform':
      this.bannerSuffix = 'adform';
      break;
    case 'Campaign Manager / CM':
      this.bannerSuffix = 'dcm';
      break;
    case 'Atlas':
      this.bannerSuffix = 'atlas';
      break;
    case 'Flashtalking':
      this.bannerSuffix = 'flashtalking';
      break;
    case 'IAB':
      this.bannerSuffix = 'iab';
      break;
    case 'Google Ads / GDA / GDN':
      this.bannerSuffix = 'none';
      break;
    case 'None':
      this.bannerSuffix = 'none';
      break;
    default:
      this.bannerSuffix = 'doubleclick';
  }

  const props = {
    bannerName: this.props.bannerName,
    clientName: this.props.clientName,
    bannerDesc: this.props.bannerDesc,
    bannerType: this.props.bannerType,
    bannerWidth: 300,
    bannerHeight: 250,
    bannerRepo: this.props.bannerRepo,
    includeTimeline: this.props.includeTimeline,
    includeOfflineEnabler: this.props.includeOfflineScripts
  };

  // Process the html files
  this.fs.copyTpl(
    this.templatePath('src/_index.html'),
    this.destinationPath('src/index.html'),
    props
  );
  this.fs.copyTpl(
    this.templatePath('src/300x250/_index.html'),
    this.destinationPath(`src/${this.props.bannerName}-300x250/index.html`),
    props
  );

  // Process the scss files
  this.fs.copyTpl(
    this.templatePath('src/base/styles'),
    this.destinationPath('src/base/styles'),
    props
  );
  this.fs.copyTpl(
    this.templatePath('src/300x250/styles/style.scss'),
    this.destinationPath(`src/${this.props.bannerName}-300x250/styles/style.scss`),
    props
  );
  this.fs.copyTpl(
    this.templatePath('src/300x250/styles/base/banner.scss'),
    this.destinationPath(`src/${this.props.bannerName}-300x250/styles/base/_banner.scss`),
    props
  );
  this.fs.copyTpl(
    this.templatePath('src/300x250/styles/base/preloader.scss'),
    this.destinationPath(`src/${this.props.bannerName}-300x250/styles/base/_preloader.scss`),
    props
  );

  // Process the js files
  this.fs.copy(
    this.templatePath('src/base/js/main.js'),
    this.destinationPath('src/base/js/main.js')
  );
  if (this.props.bannerType === 'Sizmek') {
    this.fs.copy(
      this.templatePath('src/300x250/js/libs/EBLoader.js'),
      this.destinationPath(`src/${this.props.bannerName}-300x250/js/EBLoader.js`)
    );
  }
  if (this.props.bannerType === 'Adform') {
    this.fs.copy(
      this.templatePath('src/300x250/js/libs/AdformDHTML.js'),
      this.destinationPath(`src/${this.props.bannerName}-300x250/js/AdformDHTML.js`)
    );
  }
  this.fs.copy(
    this.templatePath('src/300x250/js/banner.js'),
    this.destinationPath(`src/${this.props.bannerName}-300x250/js/banner.js`)
  );
  this.fs.copy(
    this.templatePath(`src/300x250/js/loader.${this.bannerSuffix}.js`),
    this.destinationPath(`src/${this.props.bannerName}-300x250/js/banner.loader.js`)
  );
  this.fs.copyTpl(
    this.templatePath('src/300x250/js/animation.js'),
    this.destinationPath(`src/${this.props.bannerName}-300x250/js/banner.animation.js`),
    props
  );

  // Retrieve banner properties to create the package.json
  this.fs.copyTpl(
    this.templatePath('_package.json'),
    this.destinationPath('package.json'),
    props
  );

  // Process the readme file
  this.fs.copyTpl(
    this.templatePath('_README.md'),
    this.destinationPath('README.md'),
    props
  );

  // Process the config files
  this.fs.copy(
    this.templatePath('editorconfig'),
    this.destinationPath('.editorconfig')
  );
  this.fs.copy(
    this.templatePath('gitignore'),
    this.destinationPath('.gitignore')
  );
  this.fs.copy(
    this.templatePath('jshintrc'),
    this.destinationPath('.jshintrc')
  );
  this.fs.copy(
    this.templatePath('package-lock.json'),
    this.destinationPath('package-lock.json')
  );

  // Process the images
  this.fs.copy(
    this.templatePath('src/base/images'),
    this.destinationPath('src/base/images')
  );
  this.fs.copy(
    this.templatePath('src/300x250/images'),
    this.destinationPath(`src/${this.props.bannerName}-300x250/images`)
  );

  // Process the gulp tasks
  this.fs.copy(
    this.templatePath('gulpfile.js'),
    this.destinationPath('gulpfile.js')
  );

  // Process the manifest file
  if (this.props.bannerType === 'Adform') {
    this.fs.copyTpl(
      this.templatePath('src/300x250/js/_manifest.json'),
      this.destinationPath(`src/${this.props.bannerName}-300x250/manifest.json`),
      props
    );
  }
  if (this.props.bannerType === 'Flashtalking') {
    this.fs.copyTpl(
      this.templatePath('src/300x250/js/_manifest.flashtalking.js'),
      this.destinationPath(`src/${this.props.bannerName}-300x250/manifest.js`),
      props
    );
  }

  // Process the offline vendor scripts
  if (this.props.includeOfflineScripts === true) {
    download(getVendorScript(this.props.bannerType), 'offline');
  }
};
