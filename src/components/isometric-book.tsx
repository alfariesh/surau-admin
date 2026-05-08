import type {CSSProperties} from "react";

import styles from "./isometric-book.module.css";

type IsometricBookCssProperties = CSSProperties & Record<`--${string}`, string | number>;

export interface IsometricBookProps {
  title: string;
  author?: string;
  color?: string;
  textColor?: string;
  width?: number;
  rotation?: number;
  decorative?: boolean;
}

export function IsometricBook({
  author,
  color = "#123d73",
  decorative = true,
  rotation = -28,
  textColor = "#ffffff",
  title,
  width = 180,
}: IsometricBookProps) {
  const style: IsometricBookCssProperties = {
    "--iso-cover": color,
    "--iso-rotation": `${rotation}deg`,
    "--iso-text": textColor,
    "--iso-width": `${width}px`,
  };

  const accessibilityProps = decorative
    ? ({
        "aria-hidden": true,
      } as const)
    : ({
        "aria-label": author ? `${title} oleh ${author}` : title,
        role: "img",
      } as const);

  return (
    <div className={styles.frame} style={style} {...accessibilityProps}>
      <div className={styles.shadow} />
      <div className={styles.book}>
        <div className={styles.pageBlock} />
        <div className={styles.foreEdge} />
        <div className={styles.footEdge} />
        <div className={styles.cover}>
          <div className={styles.spineEdge} />
          <div className={styles.copy}>
            <span className={styles.title}>{title}</span>
            {author ? <span className={styles.author}>{author}</span> : null}
          </div>
          <div className={styles.mark} />
        </div>
      </div>
    </div>
  );
}
