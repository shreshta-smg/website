import type { Schema, Struct } from '@strapi/strapi';

export interface SocialLinksSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_social_links_social_links';
  info: {
    displayName: 'Social Links';
    icon: 'link';
  };
  attributes: {
    link_type: Schema.Attribute.Enumeration<
      ['whatsapp', 'facebook', 'instagram']
    > &
      Schema.Attribute.DefaultTo<'facebook'>;
    link_url: Schema.Attribute.String;
  };
}

export interface YogaStylesYogaCategories extends Struct.ComponentSchema {
  collectionName: 'components_yoga_styles_yoga_categories';
  info: {
    displayName: 'Yoga Categories';
    icon: 'information';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'social-links.social-links': SocialLinksSocialLinks;
      'yoga-styles.yoga-categories': YogaStylesYogaCategories;
    }
  }
}
