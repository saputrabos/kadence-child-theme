(function (wp) {
    var el = wp.element.createElement;
    var __ = wp.i18n.__;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;

    var items = [
        { key: 'One', label: 'RA An-Nur' },
        { key: 'Two', label: 'MI An-Nur' },
        { key: 'Three', label: 'SMP An-Nur' },
        { key: 'Four', label: 'SMA An-Nur' },
        { key: 'Five', label: 'STIKK' },
        { key: 'Six', label: "Ma'had Aly" },
        { key: 'Seven', label: 'STAI Bad' },
    ];

    wp.blocks.registerBlockType('kadence-child/horizontal-scroll', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var blockProps = wp.blockEditor.useBlockProps({ className: 'annur-scroll-menu' });
            var controls = items.map(function (item) {
                var labelKey = 'link' + item.key + 'Label';
                var urlKey = 'link' + item.key + 'Url';

                return el(PanelBody, {
                    title: item.label,
                    initialOpen: false,
                    key: item.key,
                },
                    el(TextControl, {
                        label: __('Teks tautan', 'kadence-child-theme'),
                        value: attributes[labelKey],
                        onChange: function (value) {
                            var update = {};
                            update[labelKey] = value;
                            setAttributes(update);
                        },
                    }),
                    el(TextControl, {
                        label: __('URL tautan', 'kadence-child-theme'),
                        type: 'url',
                        value: attributes[urlKey],
                        onChange: function (value) {
                            var update = {};
                            update[urlKey] = value;
                            setAttributes(update);
                        },
                    })
                );
            });
            var links = items.map(function (item) {
                var label = attributes['link' + item.key + 'Label'];
                var url = attributes['link' + item.key + 'Url'];

                return label && url
                    ? el('a', { href: url, key: item.key }, label)
                    : null;
            });

            return el(wp.element.Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, {
                        title: __('Pengaturan Horizontal Scroll', 'kadence-child-theme'),
                        initialOpen: true,
                    }, controls)
                ),
                el('nav', Object.assign({}, blockProps, {
                    'aria-label': __('Menu tautan lembaga', 'kadence-child-theme'),
                }), links)
            );
        },
        save: function () {
            return null;
        },
    });
}(window.wp));
