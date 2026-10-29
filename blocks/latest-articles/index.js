(function (wp) {
    var el = wp.element.createElement;
    var __ = wp.i18n.__;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var RangeControl = wp.components.RangeControl;
    var TextControl = wp.components.TextControl;
    var ServerSideRender = wp.serverSideRender;

    wp.blocks.registerBlockType('kadence-child/latest-articles', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return el(wp.element.Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, {
                        title: __('Pengaturan artikel', 'kadence-child-theme'),
                        initialOpen: true,
                    },
                        el(TextControl, {
                            label: __('Judul bagian', 'kadence-child-theme'),
                            value: attributes.heading,
                            onChange: function (value) {
                                setAttributes({ heading: value });
                            },
                        }),
                        el(RangeControl, {
                            label: __('Jumlah artikel', 'kadence-child-theme'),
                            value: attributes.postsToShow,
                            onChange: function (value) {
                                setAttributes({ postsToShow: value });
                            },
                            min: 1,
                            max: 12,
                        })
                    )
                ),
                el(ServerSideRender, {
                    block: 'kadence-child/latest-articles',
                    attributes: attributes,
                })
            );
        },
        save: function () {
            return null;
        },
    });
}(window.wp));
