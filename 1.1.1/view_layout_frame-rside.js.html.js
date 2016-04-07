tui.util.defineNamespace("fedoc.content", {});
fedoc.content["view_layout_frame-rside.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview Right Side Frame\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\nvar Frame = require('./frame');\n\n/**\n * right side frame class\n * @module view/layout/frame-rside\n */\nvar RsideFrame = Frame.extend(/**@lends module:view/layout/frame-rside.prototype */{\n    /**\n     * @constructs\n     * @extends module:view/layout/frame\n     */\n    initialize: function() {\n        Frame.prototype.initialize.apply(this, arguments);\n        this.setOwnProperties({\n            whichSide: 'R',\n            $scrollBorder: null\n        });\n        this.listenTo(this.dimensionModel, 'change:bodyHeight change:headerHeight',\n            this._resetScrollBorderHeight);\n    },\n\n    className: 'rside_area',\n\n    /**\n     * Event handler for 'columnWidthChanged' event on dimensionModel\n     * @private\n     * @override\n     */\n    _onColumnWidthChanged: function() {\n        var dimensionModel = this.dimensionModel;\n\n        this.$el.css({\n            width: dimensionModel.get('rsideWidth'),\n            marginLeft: dimensionModel.get('lsideWidth')\n        });\n    },\n\n    /**\n     * Resets the height of a vertical scroll-bar border\n     */\n    _resetScrollBorderHeight: function() {\n        var dimensionModel = this.dimensionModel,\n            height = dimensionModel.get('bodyHeight') - dimensionModel.getScrollXHeight();\n\n        this.$scrollBorder.height(height);\n    },\n\n    /**\n     * To be called before rendering.\n     */\n    beforeRender: function() {\n        var dimensionModel = this.dimensionModel;\n            \n        this.$el.css({\n            display: 'block',\n            width: dimensionModel.get('rsideWidth'),\n            marginLeft: dimensionModel.get('lsideWidth')\n        });\n    },\n\n    /**\n     * To be called after rendering.\n     */\n    afterRender: function() {\n        var dimensionModel = this.dimensionModel,\n            $space, $scrollBorder, $scrollCorner,\n            headerHeight, bodyHeight;\n\n        if (!this.dimensionModel.get('scrollY')) {\n            return;\n        }\n        headerHeight = dimensionModel.get('headerHeight');\n        bodyHeight = dimensionModel.get('bodyHeight');\n\n        // Empty DIV for hiding scrollbar in the header area\n        $space = $('&lt;div />').addClass('header_space');\n\n        // Empty DIV for showing a left-border of vertical scrollbar in the body area\n        $scrollBorder = $('&lt;div />').addClass('scrollbar_border');\n\n        // Empty DIV for filling gray color in the right-bottom corner of the scrollbar.\n        // (For resolving the issue that styling scrollbar-corner with '-webkit-scrollbar-corner'\n        //  casues to be stuck in the same position in Chrome)\n        $scrollCorner = $('&lt;div />').addClass('scrollbar_corner');\n\n        $space.height(headerHeight - 2); // subtract 2px for border-width (top and bottom)\n        $scrollBorder.css('top', headerHeight + 'px');\n        $scrollCorner.css('bottom', dimensionModel.get('toolbarHeight'));\n\n        this.$el.append($space, $scrollBorder, $scrollCorner);\n\n        this.$scrollBorder = $scrollBorder;\n        this._resetScrollBorderHeight();\n    }\n});\n\nmodule.exports = RsideFrame;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"