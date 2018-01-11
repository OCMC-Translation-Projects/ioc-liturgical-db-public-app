/**
 * Default user interface labels
 */

const   labels = {
  en: {
  }
  , el: {
  }
}

module.exports = {
  localLabels : labels
  , getAllLabels: (code) => {
    return labels[code];
    }
}
