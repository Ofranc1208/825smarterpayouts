// Core About Us page types
export interface TechnologyFeature {
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Feature icon or emoji */
  icon: string;
  /** Optional link to feature */
  link?: string;
  /** Optional link text */
  linkText?: string;
  /** Feature color theme */
  color?: string;
  /** Background gradient */
  gradient?: string;
}

export interface CompanyValue {
  /** Value title */
  title: string;
  /** Value description */
  description: string;
  /** Value icon */
  icon: string;
  /** Value color theme */
  color: string;
  /** Background color */
  backgroundColor: string;
}

export interface Recognition {
  /** Recognition title */
  title: string;
  /** Recognition description */
  description: string;
  /** Recognition icon or image */
  icon: string;
  /** Optional credential image */
  image?: string;
  /** Optional link to credential */
  link?: string;
  /** Recognition type */
  type: 'certification' | 'award' | 'license' | 'accreditation';
}
