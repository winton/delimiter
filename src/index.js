/**
 * Build styles
 */
require('./index.css').toString();

/**
 * Delimiter Block for the Editor.js.
 *
 * @author CodeX (team@ifmo.su)
 * @copyright CodeX 2018
 * @license The MIT License (MIT)
 * @version 2.0.0
 */

/**
 * @typedef {Object} DelimiterData
 * @description Tool's input and output data format
 */
class Delimiter {

  /**
   * Notify core that read-only mode is supported
   * @return {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }

  /**
   * Allow Tool to have no content
   * @return {boolean}
   */
  static get contentless() {
    return true;
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {{data: DelimiterData, config: object, api: object}}
   *   data — previously saved data
   *   config - user config for Tool
   *   api - Editor.js API
   */
  constructor({data, config, api}) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.api = api;
    this.config = config;
    this.data = data;

    /**
     * When block is only constructing,
     * current block points to previous block.
     * So real block index will be +1 after rendering
     * @todo place it at the `rendered` event hook to get real block index without +1;
     * @type {number}
     */
     this.blockIndex = this.api.blocks.getCurrentBlockIndex() + 1;

    if (this.config.initialize) {
      this.config.initialize({
        pluginId: this.id,
        pluginApi: this.api,
        pluginData: this.data,
        pluginBlockIndex: this.blockIndex,
        pluginUserConfig: this.config
      });
    }
  }

  /**
   * Return Tool's view
   * @returns {HTMLDivElement}
   * @public
   */
  render() {
    try {
      return this.config.view({
        pluginId: this.id,
        pluginApi: this.api,
        pluginData: this.data,
        pluginBlockIndex: this.blockIndex,
        pluginUserConfig: this.config
      });
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * Extract Tool's data from the view
   * @param {HTMLDivElement} toolsContent - Paragraph tools rendered view
   * @returns {DelimiterData} - saved data
   * @public
   */
  save(element) {
    if (this.config.save) {
      return this.config.save({
        pluginId: this.id,
        pluginApi: this.api,
        pluginData: this.data,
        pluginBlockIndex: this.blockIndex,
        pluginUserConfig: this.config,
        pluginElement: element
      });
    } else {
      return {};
    }
  }

  validate(savedData){
    if (this.config.validate) {
      return this.config.validate({
        pluginId: this.id,
        pluginApi: this.api,
        pluginData: savedData,
        pluginBlockIndex: this.blockIndex,
        pluginUserConfig: this.config,
        pluginLastData: this.data
      })
    }

    return true;
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @return {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: `<svg width="19" height="4" viewBox="0 0 19 4" xmlns="http://www.w3.org/2000/svg"><path d="M1.25 0H7a1.25 1.25 0 1 1 0 2.5H1.25a1.25 1.25 0 1 1 0-2.5zM11 0h5.75a1.25 1.25 0 0 1 0 2.5H11A1.25 1.25 0 0 1 11 0z"/></svg>`,
      title: 'Delimiter'
    };
  }
}

module.exports = Delimiter;
