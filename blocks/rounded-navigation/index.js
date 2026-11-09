(function (wp) {
    var el = wp.element.createElement;
    var __ = wp.i18n.__;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var items = [
        { key: 'One', label: 'Nahwu' },
        { key: 'Two', label: 'Shorof' },
        { key: 'Three', label: 'Fiqih' },
        { key: 'Four', label: 'Tauhid' },
        { key: 'Five', label: 'Akhlaq' },
        { key: 'Six', label: 'Mantiq' },
    ];

    wp.blocks.registerBlockType('kadence-child/rounded-navigation', {
        edit: function (props) {
            var attributes = props.attributes;
            var blockProps = wp.blockEditor.useBlockProps({ className: 'subject-menu' });
            var controls = items.map(function (item) {
                var labelKey = 'link' + item.key + 'Label';
                var urlKey = 'link' + item.key + 'Url';

                return el(PanelBody, {
                    title: attributes[labelKey] || item.label,
                    initialOpen: false,
                    key: item.key,
                },
                    el(TextControl, {
                        label: __('Teks tautan', 'kadence-child-theme'),
                        value: attributes[labelKey],
                        onChange: function (value) {
                            var update = {};
                            update[labelKey] = value;
                            props.setAttributes(update);
                        },
                    }),
                    el(TextControl, {
                        label: __('URL tautan', 'kadence-child-theme'),
                        type: 'url',
                        value: attributes[urlKey],
                        onChange: function (value) {
                            var update = {};
                            update[urlKey] = value;
                            props.setAttributes(update);
                        },
                    })
                );
            });
            var links = items.map(function (item) {
                var label = attributes['link' + item.key + 'Label'];
                var url = attributes['link' + item.key + 'Url'];

                return label
                    ? el('a', {
                        className: 'subject-item',
                        href: url || '#',
                        key: item.key,
                    }, label)
                    : null;
            });

            return el(wp.element.Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, {
                        title: __('Pengaturan Rounded Navigation', 'kadence-child-theme'),
                        initialOpen: true,
                    }, controls)
                ),
                el('nav', Object.assign({}, blockProps, {
                    'aria-label': __('Navigasi mata pelajaran', 'kadence-child-theme'),
                }), links)
            );
        },
        save: function () {
            return null;
        },
    });
}(window.wp));
