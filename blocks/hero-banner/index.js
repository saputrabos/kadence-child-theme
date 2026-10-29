(function (wp) {
    var el = wp.element.createElement;
    var __ = wp.i18n.__;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var MediaUpload = wp.blockEditor.MediaUpload;
    var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var RangeControl = wp.components.RangeControl;
    var SelectControl = wp.components.SelectControl;
    var ColorPicker = wp.components.ColorPicker;
    var Button = wp.components.Button;

    var fontFamilies = [
        { label: __('Tema / default', 'kadence-child-theme'), value: 'inherit' },
        { label: 'Arial', value: 'Arial, sans-serif' },
        { label: 'Georgia', value: 'Georgia, serif' },
        { label: 'Verdana', value: 'Verdana, sans-serif' },
        { label: 'Times New Roman', value: '"Times New Roman", serif' },
    ];

    function colorControl(label, value, onChange) {
        return el('div', { className: 'kadence-hero__color-control', key: label },
            el('p', { className: 'components-base-control__label' }, label),
            el(ColorPicker, {
                color: value,
                enableAlpha: false,
                onChangeComplete: function (color) {
                    onChange(color.hex);
                },
            })
        );
    }

    function typographyPanel(title, prefix, colorKey, attributes, setAttributes, sizeLimits) {
        return el(PanelBody, { title: title, initialOpen: false, key: prefix },
            el(RangeControl, {
                label: __('Ukuran teks', 'kadence-child-theme'),
                value: attributes[prefix + 'FontSize'],
                onChange: function (value) {
                    var update = {};
                    update[prefix + 'FontSize'] = value;
                    setAttributes(update);
                },
                min: sizeLimits[0],
                max: sizeLimits[1],
            }),
            el(SelectControl, {
                label: __('Jenis font', 'kadence-child-theme'),
                value: attributes[prefix + 'FontFamily'],
                options: fontFamilies,
                onChange: function (value) {
                    var update = {};
                    update[prefix + 'FontFamily'] = value;
                    setAttributes(update);
                },
            }),
            el(SelectControl, {
                label: __('Ketebalan font', 'kadence-child-theme'),
                value: String(attributes[prefix + 'FontWeight']),
                options: [
                    { label: 'Normal', value: '400' },
                    { label: 'Medium', value: '500' },
                    { label: 'Semibold', value: '600' },
                    { label: 'Bold', value: '700' },
                    { label: 'Extra bold', value: '750' },
                    { label: 'Black', value: '800' },
                ],
                onChange: function (value) {
                    var update = {};
                    update[prefix + 'FontWeight'] = Number(value);
                    setAttributes(update);
                },
            }),
            colorControl(__('Warna teks', 'kadence-child-theme'), attributes[colorKey], function (value) {
                var update = {};
                update[colorKey] = value;
                setAttributes(update);
            })
        );
    }

    function mediaControl(attributes, setAttributes, imageKey, imageIdKey, label) {
        return el(wp.element.Fragment, null,
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
                            ? __('Ganti gambar', 'kadence-child-theme')
                            : label);
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
            }, __('Hapus gambar', 'kadence-child-theme')) : null
        );
    }

    function attributeControl(label, attributes, setAttributes, key, type) {
        var Control = type === 'textarea' ? TextareaControl : TextControl;

        return el(Control, {
            label: label,
            type: type === 'url' ? 'url' : undefined,
            value: attributes[key] || '',
            onChange: function (value) {
                var update = {};
                update[key] = value;
                setAttributes(update);
            },
        });
    }

    wp.blocks.registerBlockType('kadence-child/hero-banner', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var blockProps = wp.blockEditor.useBlockProps({ className: 'kadence-hero kadence-hero-editor' });
            var background = attributes.imageUrl
                ? 'linear-gradient(90deg, rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.15)), url("' + attributes.imageUrl + '")'
                : 'linear-gradient(120deg, #253b3a, #5f7651)';

            var awardControls = el(PanelBody, {
                title: __('Penghargaan utama', 'kadence-child-theme'),
                initialOpen: true,
            },
                mediaControl(attributes, setAttributes, 'achievementOneImage', 'achievementOneImageId', __('Pilih gambar penghargaan', 'kadence-child-theme')),
                attributeControl(__('Keterangan penghargaan', 'kadence-child-theme'), attributes, setAttributes, 'achievementOneText', 'text'),
                attributeControl(__('Tautan penghargaan', 'kadence-child-theme'), attributes, setAttributes, 'achievementOneUrl', 'url')
            );

            var statControls = [
                { title: 'achievementTwoTitle', text: 'achievementTwoText', url: 'achievementTwoUrl', label: __('Statistik 1', 'kadence-child-theme') },
                { title: 'achievementThreeTitle', text: 'achievementThreeText', url: 'achievementThreeUrl', label: __('Statistik 2', 'kadence-child-theme') },
            ].map(function (item) {
                return el(PanelBody, { title: item.label, initialOpen: false, key: item.title },
                    attributeControl(__('Judul / tahun', 'kadence-child-theme'), attributes, setAttributes, item.title, 'text'),
                    attributeControl(__('Keterangan', 'kadence-child-theme'), attributes, setAttributes, item.text, 'textarea'),
                    attributeControl(__('Tautan (opsional)', 'kadence-child-theme'), attributes, setAttributes, item.url, 'url')
                );
            });

            var stats = [
                { title: attributes.achievementTwoTitle, text: attributes.achievementTwoText },
                { title: attributes.achievementThreeTitle, text: attributes.achievementThreeText },
            ].map(function (item, index) {
                return el('div', { className: 'kadence-hero__stat', key: index },
                    el('strong', {
                        className: 'kadence-hero__stat-title',
                        style: {
                            fontSize: attributes.statTitleFontSize + 'px',
                            fontFamily: attributes.statTitleFontFamily,
                            fontWeight: attributes.statTitleFontWeight,
                            color: attributes.statTitleColor,
                        },
                    }, item.title),
                    el('span', {
                        className: 'kadence-hero__stat-text',
                        style: {
                            fontSize: attributes.statTextFontSize + 'px',
                            fontFamily: attributes.statTextFontFamily,
                            fontWeight: attributes.statTextFontWeight,
                            color: attributes.statTextColor,
                        },
                    }, item.text)
                );
            });

            return el(wp.element.Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: __('Konten hero', 'kadence-child-theme'), initialOpen: true },
                        mediaControl(attributes, setAttributes, 'imageUrl', 'imageId', __('Pilih gambar latar', 'kadence-child-theme')),
                        attributeControl(__('Judul', 'kadence-child-theme'), attributes, setAttributes, 'heading', 'text'),
                        attributeControl(__('Deskripsi', 'kadence-child-theme'), attributes, setAttributes, 'description', 'textarea'),
                        attributeControl(__('Teks tombol utama', 'kadence-child-theme'), attributes, setAttributes, 'buttonText', 'text'),
                        attributeControl(__('Tautan tombol utama', 'kadence-child-theme'), attributes, setAttributes, 'buttonUrl', 'url'),
                        attributeControl(__('Tautan video YouTube', 'kadence-child-theme'), attributes, setAttributes, 'videoUrl', 'url')
                    ),
                    awardControls,
                    statControls,
                    el(PanelBody, { title: __('Gradien tombol daftar', 'kadence-child-theme'), initialOpen: false },
                        colorControl(__('Warna awal gradien', 'kadence-child-theme'), attributes.buttonGradientStart, function (value) {
                            setAttributes({ buttonGradientStart: value });
                        }),
                        colorControl(__('Warna akhir gradien', 'kadence-child-theme'), attributes.buttonGradientEnd, function (value) {
                            setAttributes({ buttonGradientEnd: value });
                        })
                    ),
                    el(PanelBody, { title: __('Tipografi', 'kadence-child-theme'), initialOpen: false },
                        typographyPanel(__('Judul hero', 'kadence-child-theme'), 'heading', 'headingColor', attributes, setAttributes, [24, 96]),
                        typographyPanel(__('Deskripsi hero', 'kadence-child-theme'), 'description', 'descriptionColor', attributes, setAttributes, [12, 40]),
                        typographyPanel(__('Tombol daftar', 'kadence-child-theme'), 'button', 'buttonTextColor', attributes, setAttributes, [12, 32]),
                        typographyPanel(__('Keterangan penghargaan', 'kadence-child-theme'), 'awardText', 'awardTextColor', attributes, setAttributes, [10, 28]),
                        typographyPanel(__('Judul statistik', 'kadence-child-theme'), 'statTitle', 'statTitleColor', attributes, setAttributes, [16, 48]),
                        typographyPanel(__('Keterangan statistik', 'kadence-child-theme'), 'statText', 'statTextColor', attributes, setAttributes, [10, 24])
                    )
                ),
                el('section', Object.assign({}, blockProps, {
                    style: { backgroundImage: background },
                }),
                    el('div', { className: 'kadence-hero__overlay' }),
                    el('div', { className: 'kadence-hero__award' },
                        attributes.achievementOneImage
                            ? el('img', { src: attributes.achievementOneImage, alt: '', className: 'kadence-hero__award-image' })
                            : el('span', { className: 'kadence-hero__award-placeholder' }),
                        el('span', {
                            className: 'kadence-hero__award-title',
                            style: {
                                fontSize: attributes.awardTextFontSize + 'px',
                                fontFamily: attributes.awardTextFontFamily,
                                fontWeight: attributes.awardTextFontWeight,
                                color: attributes.awardTextColor,
                            },
                        }, attributes.achievementOneText)
                    ),
                    el('div', { className: 'kadence-hero__stats' }, stats),
                    el('div', { className: 'kadence-hero__copy' },
                        el('h2', {
                            className: 'kadence-hero__heading',
                            style: {
                                '--kadence-hero-heading-size': attributes.headingFontSize + 'px',
                                fontFamily: attributes.headingFontFamily,
                                fontWeight: attributes.headingFontWeight,
                                color: attributes.headingColor,
                            },
                        }, attributes.heading),
                        el('p', {
                            className: 'kadence-hero__description',
                            style: {
                                '--kadence-hero-description-size': attributes.descriptionFontSize + 'px',
                                fontFamily: attributes.descriptionFontFamily,
                                fontWeight: attributes.descriptionFontWeight,
                                color: attributes.descriptionColor,
                            },
                        }, attributes.description),
                        el('div', { className: 'kadence-hero__actions' },
                            el('span', {
                                className: 'kadence-hero__button',
                                style: {
                                    backgroundImage: 'linear-gradient(135deg, ' + attributes.buttonGradientStart + ', ' + attributes.buttonGradientEnd + ')',
                                    '--kadence-hero-button-size': attributes.buttonFontSize + 'px',
                                    fontFamily: attributes.buttonFontFamily,
                                    fontWeight: attributes.buttonFontWeight,
                                    color: attributes.buttonTextColor,
                                },
                            }, attributes.buttonText),
                            el('span', {
                                className: 'kadence-hero__play',
                                'aria-hidden': true,
                            }, el('span', { className: 'kadence-hero__play-icon' }))
                        )
                    )
                )
            );
        },
        save: function () {
            return null;
        },
    });
}(window.wp));
