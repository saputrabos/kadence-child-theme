(function (wp) {
    var el = wp.element.createElement;
    var __ = wp.i18n.__;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var MediaUpload = wp.blockEditor.MediaUpload;
    var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var Button = wp.components.Button;

    var achievements = [
        { title: 'achievementOneTitle', text: 'achievementOneText', label: __('Kartu pertama', 'kadence-child-theme') },
        { title: 'achievementTwoTitle', text: 'achievementTwoText', label: __('Kartu kedua', 'kadence-child-theme') },
        { title: 'achievementThreeTitle', text: 'achievementThreeText', label: __('Kartu ketiga', 'kadence-child-theme') },
    ];

    wp.blocks.registerBlockType('kadence-child/hero-banner', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var blockProps = wp.blockEditor.useBlockProps({ className: 'kadence-hero kadence-hero-editor' });
            var background = attributes.imageUrl
                ? 'linear-gradient(90deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.16)), url("' + attributes.imageUrl + '")'
                : 'linear-gradient(120deg, #253b3a, #5f7651)';

            var achievementFields = achievements.map(function (item) {
                return el(PanelBody, { title: item.label, initialOpen: false, key: item.title },
                    el(TextControl, {
                        label: __('Judul / tahun', 'kadence-child-theme'),
                        value: attributes[item.title],
                        onChange: function (value) {
                            var update = {};
                            update[item.title] = value;
                            setAttributes(update);
                        },
                    }),
                    el(TextareaControl, {
                        label: __('Keterangan', 'kadence-child-theme'),
                        value: attributes[item.text],
                        onChange: function (value) {
                            var update = {};
                            update[item.text] = value;
                            setAttributes(update);
                        },
                    })
                );
            });

            var cards = achievements.map(function (item, index) {
                return el('div', { className: 'kadence-hero__card' + (index === 0 ? ' is-featured' : ''), key: item.title },
                    index === 0 ? el('span', { className: 'kadence-hero__ribbon', 'aria-hidden': true }) : null,
                    el('strong', { className: 'kadence-hero__card-title' }, attributes[item.title]),
                    el('span', { className: 'kadence-hero__card-text' }, attributes[item.text])
                );
            });

            return el(wp.element.Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: __('Konten hero', 'kadence-child-theme'), initialOpen: true },
                        el(MediaUploadCheck, null,
                            el(MediaUpload, {
                                onSelect: function (media) {
                                    setAttributes({ imageId: media.id, imageUrl: media.url });
                                },
                                allowedTypes: ['image'],
                                value: attributes.imageId,
                                render: function (mediaProps) {
                                    return el(Button, {
                                        variant: 'secondary',
                                        onClick: mediaProps.open,
                                    }, attributes.imageUrl
                                        ? __('Ganti gambar latar', 'kadence-child-theme')
                                        : __('Pilih gambar latar', 'kadence-child-theme'));
                                },
                            })
                        ),
                        attributes.imageUrl ? el(Button, {
                            variant: 'tertiary',
                            isDestructive: true,
                            onClick: function () {
                                setAttributes({ imageId: undefined, imageUrl: '' });
                            },
                        }, __('Hapus gambar latar', 'kadence-child-theme')) : null,
                        el(TextControl, {
                            label: __('Judul', 'kadence-child-theme'),
                            value: attributes.heading,
                            onChange: function (value) { setAttributes({ heading: value }); },
                        }),
                        el(TextareaControl, {
                            label: __('Deskripsi', 'kadence-child-theme'),
                            value: attributes.description,
                            onChange: function (value) { setAttributes({ description: value }); },
                        }),
                        el(TextControl, {
                            label: __('Teks tombol utama', 'kadence-child-theme'),
                            value: attributes.buttonText,
                            onChange: function (value) { setAttributes({ buttonText: value }); },
                        }),
                        el(TextControl, {
                            label: __('Tautan tombol utama', 'kadence-child-theme'),
                            type: 'url',
                            value: attributes.buttonUrl,
                            onChange: function (value) { setAttributes({ buttonUrl: value }); },
                        }),
                        el(TextControl, {
                            label: __('Tautan video (opsional)', 'kadence-child-theme'),
                            type: 'url',
                            value: attributes.videoUrl,
                            onChange: function (value) { setAttributes({ videoUrl: value }); },
                        })
                    ),
                    el(PanelBody, { title: __('Kartu pencapaian', 'kadence-child-theme'), initialOpen: false }, achievementFields)
                ),
                el('section', Object.assign({}, blockProps, {
                    style: { backgroundImage: background },
                }),
                    el('div', { className: 'kadence-hero__copy' },
                        el('h2', { className: 'kadence-hero__heading' }, attributes.heading),
                        el('p', { className: 'kadence-hero__description' }, attributes.description),
                        el('div', { className: 'kadence-hero__actions' },
                            el('span', { className: 'kadence-hero__button' }, attributes.buttonText),
                            attributes.videoUrl ? el('span', {
                                className: 'kadence-hero__play',
                                'aria-hidden': true,
                            }, '▶') : null
                        )
                    ),
                    el('div', { className: 'kadence-hero__cards' }, cards)
                )
            );
        },
        save: function () {
            return null;
        },
    });
}(window.wp));
