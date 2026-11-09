(function (wp) {
    var el = wp.element.createElement;
    var __ = wp.i18n.__;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var SelectControl = wp.components.SelectControl;
    var ToggleControl = wp.components.ToggleControl;
    var ServerSideRender = wp.serverSideRender;

    wp.blocks.registerBlockType('kadence-child/header-category', {
        edit: function (props) {
            return el(wp.element.Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, {
                        title: __('Pengaturan Header Categori', 'kadence-child-theme'),
                        initialOpen: true,
                    },
                        el(TextControl, {
                            label: __('Judul kategori', 'kadence-child-theme'),
                            value: props.attributes.heading,
                            onChange: function (value) {
                                props.setAttributes({ heading: value });
                            },
                        }),
                        el(ToggleControl, {
                            label: __('Tampilkan titik pada judul', 'kadence-child-theme'),
                            checked: props.attributes.showHeadingDot !== false,
                            onChange: function (value) {
                                props.setAttributes({ showHeadingDot: value });
                            },
                        }),
                        el(SelectControl, {
                            label: __('Posisi judul', 'kadence-child-theme'),
                            value: props.attributes.headingAlignment || 'left',
                            options: [
                                { label: __('Kiri', 'kadence-child-theme'), value: 'left' },
                                { label: __('Tengah', 'kadence-child-theme'), value: 'center' },
                                { label: __('Kanan', 'kadence-child-theme'), value: 'right' },
                            ],
                            onChange: function (value) {
                                props.setAttributes({ headingAlignment: value });
                            },
                        }),
                        el(ToggleControl, {
                            label: __('Tampilkan tombol', 'kadence-child-theme'),
                            checked: props.attributes.showNextButton !== false,
                            onChange: function (value) {
                                props.setAttributes({ showNextButton: value });
                            },
                        })
                    )
                ),
                el(ServerSideRender, {
                    block: 'kadence-child/header-category',
                    attributes: props.attributes,
                })
            );
        },
        save: function () {
            return null;
        },
    });
}(window.wp));
