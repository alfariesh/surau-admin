import type {ReactNode} from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function SectionHeading({action, description, eyebrow, title}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? <p className="text-accent mb-3 text-sm font-medium">{eyebrow}</p> : null}
        <h2 className="text-foreground text-3xl font-semibold tracking-normal sm:text-4xl">
          {title}
        </h2>
        {description ? <p className="text-muted mt-3 text-base leading-7">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
