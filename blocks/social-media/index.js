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

    var platforms = [
        { key: 'facebook', label: 'Facebook', className: 'is-facebook' },
        { key: 'instagram', label: 'Instagram', className: 'is-instagram' },
        { key: 'youtube', label: 'YouTube', className: 'is-youtube' },
        { key: 'tiktok', label: 'TikTok', className: 'is-tiktok' },
    ];

    function icon(platform) {
        var common = {
            viewBox: '0 0 24 24',
            'aria-hidden': true,
            focusable: false,
        };

        if (platform === 'facebook') {
            return el('svg', common,
                el('path', {
                    fill: 'currentColor',
                    d: 'M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z',
                })
            );
        }

        if (platform === 'instagram') {
            return el('svg', common,
                el('rect', {
                    x: '4', y: '4', width: '16', height: '16', rx: '4',
                    fill: 'none', stroke: 'currentColor', strokeWidth: '2',
                }),
                el('circle', {
                    cx: '12', cy: '12', r: '3.5',
                    fill: 'none', stroke: 'currentColor', strokeWidth: '2',
                }),
                el('circle', { cx: '17.5', cy: '6.8', r: '1.2', fill: 'currentColor' })
            );
        }

        if (platform === 'youtube') {
            return el('svg', common,
                el('path', {
                    fill: 'currentColor',
                    d: 'M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.6V8.4l6.2 3.6-6.2 3.6Z',
                })
            );
        }

        return el('svg', common,
            el('path', {
                fill: 'currentColor',
                d: 'M19.6 8.2a5.7 5.7 0 0 1-3.4-1.1v7.2a5.8 5.8 0 1 1-5-5.7v3a2.8 2.8 0 1 0 2 2.7V2.8h3a5.7 5.7 0 0 0 3.4 3.3v2.1Z',
            })
        );
    }

    wp.blocks.registerBlockType('kadence-child/social-media', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var blockProps = wp.blockEditor.useBlockProps({
                className: 'annur-social',
                style: {
                    '--annur-social-background-image': attributes.backgroundImageUrl
                        ? 'url("' + attributes.backgroundImageUrl + '")'
                        : 'none',
                },
            });

            var platformControls = platforms.map(function (platform) {
                var attribute = platform.key + 'Url';

                return el(TextControl, {
                    key: platform.key,
                    label: platform.label + ' URL',
                    type: 'url',
                    value: attributes[attribute],
                    onChange: function (value) {
                        var update = {};
                        update[attribute] = value;
                        setAttributes(update);
                    },
                });
            });

            var socialLinks = platforms.map(function (platform) {
                return el('span', {
                    className: 'annur-social__icon ' + platform.className,
                    key: platform.key,
                    'aria-label': platform.label,
                }, icon(platform.key));
            });

            return el(wp.element.Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, {
                        title: __('Konten sosial media', 'kadence-child-theme'),
                        initialOpen: true,
                    },
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
                        platformControls
                    ),
                    el(PanelBody, {
                        title: __('Background', 'kadence-child-theme'),
                        initialOpen: false,
                    },
                        el(MediaUploadCheck, null,
                            el(MediaUpload, {
                                onSelect: function (media) {
                                    setAttributes({
                                        backgroundImageUrl: media.url,
                                        backgroundImageId: media.id,
                                    });
                                },
                                allowedTypes: ['image'],
                                value: attributes.backgroundImageId,
                                render: function (mediaProps) {
                                    return el(Button, {
                                        variant: 'secondary',
                                        onClick: mediaProps.open,
                                    }, attributes.backgroundImageUrl
                                        ? __('Ganti gambar background', 'kadence-child-theme')
                                        : __('Pilih gambar background', 'kadence-child-theme'));
                                },
                            })
                        ),
                        attributes.backgroundImageUrl ? el(Button, {
                            variant: 'tertiary',
                            isDestructive: true,
                            onClick: function () {
                                setAttributes({ backgroundImageUrl: '', backgroundImageId: undefined });
                            },
                        }, __('Hapus gambar background', 'kadence-child-theme')) : null
                    ),
                    el(PanelBody, {
                        title: __('Ilustrasi', 'kadence-child-theme'),
                        initialOpen: false,
                    },
                        el(MediaUploadCheck, null,
                            el(MediaUpload, {
                                onSelect: function (media) {
                                    setAttributes({ imageUrl: media.url, imageId: media.id });
                                },
                                allowedTypes: ['image'],
                                value: attributes.imageId,
                                render: function (mediaProps) {
                                    return el(Button, {
                                        variant: 'secondary',
                                        onClick: mediaProps.open,
                                    }, attributes.imageUrl
                                        ? __('Ganti ilustrasi', 'kadence-child-theme')
                                        : __('Pilih ilustrasi', 'kadence-child-theme'));
                                },
                            })
                        ),
                        attributes.imageUrl ? el(Button, {
                            variant: 'tertiary',
                            isDestructive: true,
                            onClick: function () {
                                setAttributes({ imageUrl: '', imageId: undefined });
                            },
                        }, __('Hapus ilustrasi', 'kadence-child-theme')) : null
                    )
                ),
                el('section', blockProps,
                    el('div', { className: 'annur-social__copy' },
                        el('h2', { className: 'annur-social__heading' }, attributes.heading),
                        el('p', { className: 'annur-social__description' }, attributes.description),
                        el('div', { className: 'annur-social__links' }, socialLinks)
                    ),
                    attributes.imageUrl ? el('div', { className: 'annur-social__art' },
                        el('img', {
                            src: attributes.imageUrl,
                            alt: '',
                            className: 'annur-social__image',
                        })
                    ) : null
                )
            );
        },
        save: function () {
            return null;
        },
    });
}(window.wp));
