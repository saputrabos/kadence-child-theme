(function (wp) {
    var el = wp.element.createElement;
    var __ = wp.i18n.__;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var MediaUpload = wp.blockEditor.MediaUpload;
    var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var Button = wp.components.Button;
    var ServerSideRender = wp.serverSideRender;
    var cards = [
        { key: 'One', label: 'Power Raking' },
        { key: 'Two', label: 'Fertilizing' },
        { key: 'Three', label: 'Landscaping' },
        { key: 'Four', label: 'Lawn Maintenance' },
    ];

    wp.blocks.registerBlockType('kadence-child/card-category', {
        edit: function (props) {
            var attributes = props.attributes;
            var controls = cards.map(function (card) {
                var prefix = 'card' + card.key;
                var imageKey = prefix + 'Image';
                var imageIdKey = prefix + 'ImageId';

                return el(PanelBody, {
                    title: attributes[prefix + 'Title'] || card.label,
                    initialOpen: false,
                    key: card.key,
                },
                    el(TextControl, {
                        label: __('Label kategori', 'kadence-child-theme'),
                        value: attributes[prefix + 'Tag'] || '',
                        onChange: function (value) {
                            var update = {};
                            update[prefix + 'Tag'] = value;
                            props.setAttributes(update);
                        },
                    }),
                    el(TextControl, {
                        label: __('Judul kartu', 'kadence-child-theme'),
                        value: attributes[prefix + 'Title'] || '',
                        onChange: function (value) {
                            var update = {};
                            update[prefix + 'Title'] = value;
                            props.setAttributes(update);
                        },
                    }),
                    el(TextControl, {
                        label: __('Deskripsi', 'kadence-child-theme'),
                        value: attributes[prefix + 'Description'] || '',
                        onChange: function (value) {
                            var update = {};
                            update[prefix + 'Description'] = value;
                            props.setAttributes(update);
                        },
                    }),
                    el(MediaUploadCheck, null,
                        el(MediaUpload, {
                            onSelect: function (media) {
                                var update = {};
                                update[imageKey] = media.url;
                                update[imageIdKey] = media.id;
                                props.setAttributes(update);
                            },
                            allowedTypes: ['image'],
                            value: attributes[imageIdKey],
                            render: function (mediaProps) {
                                return el(Button, {
                                    variant: 'secondary',
                                    onClick: mediaProps.open,
                                }, attributes[imageKey]
                                    ? __('Ganti gambar', 'kadence-child-theme')
                                    : __('Pilih gambar', 'kadence-child-theme'));
                            },
                        })
                    ),
                    el(TextControl, {
                        label: __('URL gambar', 'kadence-child-theme'),
                        type: 'url',
                        value: attributes[imageKey] || '',
                        onChange: function (value) {
                            var update = {};
                            update[imageKey] = value;
                            update[imageIdKey] = undefined;
                            props.setAttributes(update);
                        },
                    }),
                    attributes[imageKey] ? el(Button, {
                        variant: 'tertiary',
                        isDestructive: true,
                        onClick: function () {
                            var update = {};
                            update[imageKey] = '';
                            update[imageIdKey] = undefined;
                            props.setAttributes(update);
                        },
                    }, __('Hapus gambar', 'kadence-child-theme')) : null,
                    el(TextControl, {
                        label: __('Teks tombol', 'kadence-child-theme'),
                        value: attributes[prefix + 'ButtonText'] || '',
                        onChange: function (value) {
                            var update = {};
                            update[prefix + 'ButtonText'] = value;
                            props.setAttributes(update);
                        },
                    }),
                    el(TextControl, {
                        label: __('URL tujuan (opsional)', 'kadence-child-theme'),
                        type: 'url',
                        value: attributes[prefix + 'Url'] || '',
                        onChange: function (value) {
                            var update = {};
                            update[prefix + 'Url'] = value;
                            props.setAttributes(update);
                        },
                    })
                );
            });

            return el(wp.element.Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, {
                        title: __('Pengaturan Card Category', 'kadence-child-theme'),
                        initialOpen: true,
                    }, controls)
                ),
                el(ServerSideRender, {
                    block: 'kadence-child/card-category',
                    attributes: attributes,
                })
            );
        },
        save: function () {
            return null;
        },
    });
}(window.wp));
