(function (wp) {
    var el = wp.element.createElement;
    var __ = wp.i18n.__;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var MediaUpload = wp.blockEditor.MediaUpload;
    var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var Button = wp.components.Button;

    var items = [
        { key: 'One', label: __('Unit BUMP 1', 'kadence-child-theme') },
        { key: 'Two', label: __('Unit BUMP 2', 'kadence-child-theme') },
        { key: 'Three', label: __('Unit BUMP 3', 'kadence-child-theme') },
        { key: 'Four', label: __('Unit BUMP 4', 'kadence-child-theme') },
        { key: 'Five', label: __('Unit BUMP 5', 'kadence-child-theme') },
    ];

    function getItemAttributes(attributes, key) {
        return {
            label: attributes['item' + key + 'Label'],
            image: attributes['item' + key + 'Image'],
            url: attributes['item' + key + 'Url'],
        };
    }

    wp.blocks.registerBlockType('kadence-child/bump-partners', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var blockProps = wp.blockEditor.useBlockProps({ className: 'annur-bump' });

            var itemControls = items.map(function (item) {
                var labelKey = 'item' + item.key + 'Label';
                var imageKey = 'item' + item.key + 'Image';
                var imageIdKey = 'item' + item.key + 'ImageId';
                var urlKey = 'item' + item.key + 'Url';

                return el(PanelBody, {
                    title: item.label,
                    initialOpen: false,
                    key: item.key,
                },
                    el(TextControl, {
                        label: __('Nama unit', 'kadence-child-theme'),
                        value: attributes[labelKey],
                        onChange: function (value) {
                            var update = {};
                            update[labelKey] = value;
                            setAttributes(update);
                        },
                    }),
                    el(MediaUploadCheck, null,
                        el(MediaUpload, {
                            onSelect: function (media) {
                                var update = {};
                                update[imageKey] = media.url;
                                update[imageIdKey] = media.id;
                                setAttributes(update);
                            },
                            allowedTypes: ['image'],
                            value: attributes[imageIdKey],
                            render: function (mediaProps) {
                                return el(Button, {
                                    variant: 'secondary',
                                    onClick: mediaProps.open,
                                }, attributes[imageKey]
                                    ? __('Ganti gambar logo', 'kadence-child-theme')
                                    : __('Pilih gambar logo', 'kadence-child-theme'));
                            },
                        })
                    ),
                    attributes[imageKey] ? el(Button, {
                        variant: 'tertiary',
                        isDestructive: true,
                        onClick: function () {
                            var update = {};
                            update[imageKey] = '';
                            update[imageIdKey] = undefined;
                            setAttributes(update);
                        },
                    }, __('Hapus gambar', 'kadence-child-theme')) : null,
                    el(TextControl, {
                        label: __('Tautan (opsional)', 'kadence-child-theme'),
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

            var previewItems = items.map(function (item) {
                var data = getItemAttributes(attributes, item.key);
                var image = data.image
                    ? el('img', { src: data.image, alt: '', className: 'annur-bump__image' })
                    : el('span', { className: 'annur-bump__image annur-bump__image--placeholder' });
                var content = [
                    el('span', { className: 'annur-bump__logo', key: 'logo' }, image),
                    el('span', { className: 'annur-bump__label', key: 'label' }, data.label),
                ];

                return el('li', { className: 'annur-bump__item', key: item.key },
                    data.url
                        ? el('a', { className: 'annur-bump__link', href: data.url }, content)
                        : el('div', { className: 'annur-bump__link' }, content)
                );
            });

            return el(wp.element.Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, {
                        title: __('Pengaturan BUMP', 'kadence-child-theme'),
                        initialOpen: true,
                    },
                        el(TextControl, {
                            label: __('Judul bagian', 'kadence-child-theme'),
                            value: attributes.heading,
                            onChange: function (value) {
                                setAttributes({ heading: value });
                            },
                        })
                    ),
                    itemControls
                ),
                el('section', blockProps,
                    el('div', { className: 'annur-bump__header' },
                        el('h2', { className: 'annur-bump__heading' },
                            el('span', { className: 'annur-bump__heading-dot', 'aria-hidden': true }),
                            attributes.heading
                        )
                    ),
                    el('ul', { className: 'annur-bump__list' }, previewItems)
                )
            );
        },
        save: function () {
            return null;
        },
    });
}(window.wp));
