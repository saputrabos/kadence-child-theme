(function (wp) {
    var el = wp.element.createElement;
    var __ = wp.i18n.__;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var SelectControl = wp.components.SelectControl;
    var TextControl = wp.components.TextControl;
    var Button = wp.components.Button;

    wp.blocks.registerBlockType('kadence-child/gallery-slider', {
        edit: function (props) {
            var items = props.attributes.galleryItems || [];
            var blockProps = wp.blockEditor.useBlockProps({ className: 'gallery-slider' });

            var controls = items.map(function (item, index) {
                function updateItem(key, value) {
                    var updatedItems = items.map(function (currentItem, currentIndex) {
                        if (currentIndex !== index) {
                            return currentItem;
                        }

                        var updatedItem = Object.assign({}, currentItem);
                        updatedItem[key] = value;
                        return updatedItem;
                    });
                    props.setAttributes({ galleryItems: updatedItems });
                }

                return el(PanelBody, {
                    title: item.title || __('Kartu', 'kadence-child-theme') + ' ' + (index + 1),
                    initialOpen: false,
                    key: index,
                },
                    el(SelectControl, {
                        label: __('Urutan kartu', 'kadence-child-theme'),
                        value: String(index + 1),
                        options: items.map(function (currentItem, currentIndex) {
                            return {
                                label: String(currentIndex + 1),
                                value: String(currentIndex + 1),
                            };
                        }),
                        onChange: function (value) {
                            var targetIndex = Number(value) - 1;

                            if (targetIndex === index || targetIndex < 0 || targetIndex >= items.length) {
                                return;
                            }

                            var reorderedItems = items.slice();
                            var movedItem = reorderedItems.splice(index, 1)[0];
                            reorderedItems.splice(targetIndex, 0, movedItem);
                            props.setAttributes({ galleryItems: reorderedItems });
                        },
                    }),
                    el(TextControl, {
                        label: __('URL gambar', 'kadence-child-theme'),
                        type: 'url',
                        value: item.image || '',
                        onChange: function (value) {
                            updateItem('image', value);
                        },
                    }),
                    el(TextControl, {
                        label: __('Nama destinasi', 'kadence-child-theme'),
                        value: item.title || '',
                        onChange: function (value) {
                            updateItem('title', value);
                        },
                    }),
                    el(TextControl, {
                        label: __('Lokasi', 'kadence-child-theme'),
                        value: item.location || '',
                        onChange: function (value) {
                            updateItem('location', value);
                        },
                    }),
                    el(Button, {
                        variant: 'tertiary',
                        isDestructive: true,
                        onClick: function () {
                            props.setAttributes({
                                galleryItems: items.filter(function (currentItem, currentIndex) {
                                    return currentIndex !== index;
                                }),
                            });
                        },
                    }, __('Hapus kartu', 'kadence-child-theme'))
                );
            });

            var cards = items.map(function (item, index) {
                return el('article', { className: 'gallery-slider__card', key: index },
                    item.image
                        ? el('img', {
                            src: item.image,
                            alt: item.title || '',
                            className: 'gallery-slider__image',
                            draggable: false,
                        })
                        : el('div', { className: 'gallery-slider__image gallery-slider__image--placeholder' }),
                    el('div', { className: 'gallery-slider__info' },
                        el('h3', null, item.title || ''),
                        el('p', null, item.location || '')
                    )
                );
            });

            return el(wp.element.Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, {
                        title: __('Pengaturan Gallery Slider', 'kadence-child-theme'),
                        initialOpen: true,
                    },
                        el(Button, {
                            variant: 'primary',
                            onClick: function () {
                                props.setAttributes({
                                    galleryItems: items.concat([{
                                        image: '',
                                        title: '',
                                        location: '',
                                    }]),
                                });
                            },
                        }, __('Tambah kartu', 'kadence-child-theme')),
                        controls
                    )
                ),
                el('div', blockProps,
                    el('div', { className: 'gallery-slider__track' }, cards)
                )
            );
        },
        save: function () {
            return null;
        },
    });
}(window.wp));
