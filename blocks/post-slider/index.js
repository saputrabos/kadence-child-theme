(function (wp) {
    var el = wp.element.createElement;
    var __ = wp.i18n.__;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var RangeControl = wp.components.RangeControl;
    var SelectControl = wp.components.SelectControl;
    var TextControl = wp.components.TextControl;
    var ServerSideRender = wp.serverSideRender;
    var useSelect = wp.data.useSelect;

    wp.blocks.registerBlockType('kadence-child/latest-articles', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var records = useSelect(function (select) {
                return {
                    categories: select('core').getEntityRecords('taxonomy', 'category', {
                        per_page: 100,
                        orderby: 'name',
                        order: 'asc',
                    }),
                    pages: select('core').getEntityRecords('postType', 'page', {
                        per_page: 100,
                        status: 'publish',
                        orderby: 'title',
                        order: 'asc',
                    }),
                };
            }, []);
            var categoryOptions = [{
                label: __('Semua kategori', 'kadence-child-theme'),
                value: '0',
            }].concat((records.categories || []).map(function (category) {
                return {
                    label: category.name,
                    value: String(category.id),
                };
            }));
            var pageOptions = [{
                label: records.pages ? __('Pilih laman', 'kadence-child-theme') : __('Memuat laman…', 'kadence-child-theme'),
                value: '0',
            }].concat((records.pages || []).map(function (page) {
                return {
                    label: page.title.rendered || __('(Tanpa judul)', 'kadence-child-theme'),
                    value: String(page.id),
                };
            }));

            return el(wp.element.Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, {
                        title: __('Pengaturan konten', 'kadence-child-theme'),
                        initialOpen: true,
                    },
                        el(TextControl, {
                            label: __('Judul bagian', 'kadence-child-theme'),
                            value: attributes.heading,
                            onChange: function (value) {
                                setAttributes({ heading: value });
                            },
                        }),
                        el(SelectControl, {
                            label: __('Sumber konten', 'kadence-child-theme'),
                            value: attributes.contentSource || 'posts',
                            options: [
                                { label: __('Artikel', 'kadence-child-theme'), value: 'posts' },
                                { label: __('Laman', 'kadence-child-theme'), value: 'pages' },
                            ],
                            onChange: function (value) {
                                setAttributes({ contentSource: value });
                            },
                        }),
                        attributes.contentSource === 'pages'
                            ? el(SelectControl, {
                                label: __('Pilih laman', 'kadence-child-theme'),
                                value: String(attributes.pageId || 0),
                                options: pageOptions,
                                onChange: function (value) {
                                    setAttributes({ pageId: Number(value) });
                                },
                            })
                            : el(SelectControl, {
                                label: __('Kategori artikel', 'kadence-child-theme'),
                                value: String(attributes.categoryId || 0),
                                options: categoryOptions,
                                onChange: function (value) {
                                    setAttributes({ categoryId: Number(value) });
                                },
                            }),
                        attributes.contentSource === 'pages' ? null : el(RangeControl, {
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
