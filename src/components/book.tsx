import type {CSSProperties, ComponentType, SVGProps} from "react";

import styles from "./book.module.css";

export type BookVariant = "simple" | "stripe";

type BookWidth = number | {sm?: number; md?: number; lg?: number; xl?: number; "2xl"?: number};

type BookCssProperties = CSSProperties & Record<`--${string}`, string | number>;

export interface BookProps {
  color?: string;
  text_color?: string;
  title: string;
  variant?: BookVariant;
  width?: BookWidth;
  textured?: boolean;
  illustration?: ComponentType<SVGProps<SVGSVGElement>>;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function resolveWidth(width: BookWidth | undefined) {
  if (typeof width === "number") return width;
  return "var(--book-default-width)";
}

function LogoVercel(props: SVGProps<SVGSVGElement>) {
  return (
    <svg strokeLinejoin="round" color="currentColor" viewBox="0 0 16 16" {...props}>
      <path
        clipRule="evenodd"
        d="M8 1L16 15H0L8 1Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

function SimpleIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="56" viewBox="0 0 36 56" width="36" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        clipRule="evenodd"
        d="M3.03113 28.0005C6.26017 23.1765 11.7592 20.0005 18 20.0005C24.2409 20.0005 29.7399 23.1765 32.9689 28.0005C29.7399 32.8244 24.2409 36.0005 18 36.0005C11.7592 36.0005 6.26017 32.8244 3.03113 28.0005Z"
        fill="#0070F3"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M32.9691 28.0012C34.8835 25.1411 36 21.7017 36 18.0015C36 8.06034 27.9411 0.00146484 18 0.00146484C8.05887 0.00146484 0 8.06034 0 18.0015C0 21.7017 1.11648 25.1411 3.03094 28.0012C6.25996 23.1771 11.7591 20.001 18 20.001C24.2409 20.001 29.74 23.1771 32.9691 28.0012Z"
        fill="#45DEC4"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M32.9692 28.0005C29.7402 32.8247 24.241 36.001 18 36.001C11.759 36.001 6.25977 32.8247 3.03077 28.0005C1.11642 30.8606 0 34.2999 0 38C0 47.9411 8.05887 56 18 56C27.9411 56 36 47.9411 36 38C36 34.2999 34.8836 30.8606 32.9692 28.0005Z"
        fill="#E5484D"
        fillRule="evenodd"
      />
    </svg>
  );
}

export function Book({
  color,
  illustration: Illustration,
  text_color,
  textured = false,
  title,
  variant = "stripe",
  width,
}: BookProps) {
  const isSimple = variant === "simple";
  const style: BookCssProperties = {
    "--book-text-color": text_color ?? "hsla(var(--gray-1000))",
    "--book-default-width": 196,
    "--book-width": resolveWidth(width),
  };

  const bookStyle: BookCssProperties = {
    "--book-color": color ?? "hsla(var(--amber-600))",
  };

  return (
    <div className={styles.container} style={style}>
      <div id="book" className={styles.book} style={bookStyle}>
        <div id="book-front" className={styles.front}>
          {!isSimple ? (
            <div id="book-stripe" className={styles.stripe}>
              <div id="book-bind-#1" className={styles.bind} />
              <div id="book-stripe-illustration" className={styles.stripeIllustration}>
                {Illustration ? <Illustration /> : null}
              </div>
              {textured ? <div id="book-textured" className={styles.textured} /> : null}
            </div>
          ) : null}
          <div
            id="book-body"
            className={cx(styles.body, isSimple && color ? styles.simpleColor : null)}
          >
            <div
              id="book-bind-#2"
              className={cx(
                styles.bind,
                styles.bodyBind,
                (textured && isSimple) || (isSimple && color) ? styles.bodyBindStrong : null,
              )}
            />
            <div
              id="book-body-illustration"
              className={cx(
                styles.bodyIllustration,
                isSimple ? styles.bodyIllustrationSimple : styles.bodyIllustrationStripe,
              )}
            >
              <span className={styles.title}>{title}</span>
              {Illustration && isSimple ? (
                <Illustration />
              ) : isSimple ? (
                <SimpleIllustration />
              ) : (
                <LogoVercel aria-hidden="true" height="16" width="16" />
              )}
            </div>
          </div>
          {textured ? <div id="book-textured" className={styles.textured} /> : null}
        </div>
        <div id="book-pages" className={styles.pages} />
        <div
          id="book-back"
          className={cx(styles.back, isSimple && color ? styles.backColored : styles.backDefault)}
        />
      </div>
    </div>
  );
}
