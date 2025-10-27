/**
 * Articles Grid Component - Articles Page
 * 
 * Displays article cards in a responsive grid.
 * Uses design system tokens for consistent styling.
 * Fully accessible with semantic HTML, ARIA labels, and keyboard navigation.
 * 
 * @component
 * @returns {JSX.Element} Rendered articles grid
 * 
 * @example
 * <ArticlesGrid />
 */

'use client';
import Link from 'next/link';
import Image from 'next/image';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import type { Article } from '../types';

/**
 * Array of article data
 */
const articles: Article[] = [
  {
    id: 'structured-settlements',
    title: 'Structured Settlements',
    description: 'Understand how structured settlements work, their benefits, and key decisions before cashing out.',
    image: '/assets/images/court1.jpg',
    imageAlt: 'Courtroom with judge - Structured Settlements Explained',
    href: '/blog/structured-settlements',
    featured: true
  },
  {
    id: 'should-you-sell',
    title: 'Should You Sell Your Structured Settlement?',
    description: 'Explore when it\'s smart to sell your payments and what you should watch out for in the process.',
    image: '/assets/images/sell.jpg',
    imageAlt: 'Person considering selling settlement - Should You Sell Your Settlement?',
    href: '/blog/should-you-sell',
    featured: false
  },
  {
    id: 'how-fast-payout',
    title: 'How Fast Is a Settlement Payout?',
    description: 'Learn how long it typically takes to receive your payout and how SmarterPayouts speeds up the process.',
    image: '/assets/images/online.jpg',
    imageAlt: 'Laptop showing online payout - How Fast Is a Settlement Payout?',
    href: '/blog/how-fast-payout',
    featured: false
  }
];

/**
 * Article Card Component
 * @param {Object} props - Component props
 * @param {Article} props.article - Article data
 */
function ArticleCard({ article }: { article: Article }) {
  return (
    <article 
      style={{
        background: COLORS.backgrounds.white,
        borderRadius: BORDER_RADIUS.medium,
        height: '100%',
        border: `1px solid ${COLORS.borders.light}`,
        boxShadow: BOX_SHADOWS.small,
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = BOX_SHADOWS.large;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = BOX_SHADOWS.small;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <Image
        src={article.image}
        alt={article.imageAlt}
        width={400}
        height={220}
        style={{
          width: '100%',
          height: 'auto',
          aspectRatio: '400/220',
          objectFit: 'contain',
          background: COLORS.backgrounds.white
        }}
        loading="lazy"
      />
      <div style={{ padding: SPACING.card.standard }}>
        <h3 style={{
          fontSize: TYPOGRAPHY.fontSize.heading.h5,
          fontWeight: TYPOGRAPHY.fontWeight.semibold,
          marginBottom: SPACING.stack.sm,
          color: COLORS.text.primary
        }}>
          {article.title}
          {article.featured && (
            <span style={{
              background: COLORS.primary.main,
              color: COLORS.backgrounds.white,
              padding: `${SPACING.unit.xxs} ${SPACING.unit.xs}`,
              borderRadius: BORDER_RADIUS.sm,
              fontSize: TYPOGRAPHY.fontSize.body.xsmall,
              marginLeft: SPACING.inline.xs,
              fontWeight: TYPOGRAPHY.fontWeight.semibold
            }}>
              Featured
            </span>
          )}
        </h3>
        <p style={{
          color: COLORS.text.secondary,
          lineHeight: TYPOGRAPHY.lineHeight.relaxed,
          marginBottom: SPACING.stack.md,
          fontSize: TYPOGRAPHY.fontSize.body.medium
        }}>
          {article.description}
        </p>
        <Link 
          href={article.href}
          style={{
            color: COLORS.primary.main,
            border: `1px solid ${COLORS.primary.main}`,
            padding: `${SPACING.unit.sm} ${SPACING.unit.md}`,
            borderRadius: BORDER_RADIUS.small,
            fontSize: TYPOGRAPHY.fontSize.body.small,
            fontWeight: TYPOGRAPHY.fontWeight.medium,
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = COLORS.primary.main;
            e.currentTarget.style.color = COLORS.backgrounds.white;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = COLORS.primary.main;
          }}
          aria-label={`Read more about ${article.title}`}
        >
          Read More
        </Link>
      </div>
    </article>
  );
}

/**
 * Articles Grid Component with optimized spacing for cleaner layout
 */
export default function ArticlesGrid() {
  return (
    <section
      aria-label="Structured Settlement Resources and Articles"
      style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto',
        paddingTop: SPACING.unit.xxl,
        paddingBottom: SPACING.unit.lg,
        paddingLeft: SPACING.unit.md,
        paddingRight: SPACING.unit.md
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: SPACING.grid.comfortable,
        marginBottom: SPACING.unit.xxl
      }}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}

