import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      className="mt-10 border-t border-border pt-6 text-fluid-card font-semibold tracking-tight text-foreground first:mt-0 first:border-t-0 first:pt-0"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-7 text-base font-semibold tracking-tight text-foreground sm:text-lg"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p
      className="mt-4 max-w-[68ch] text-sm leading-7 text-muted-foreground sm:text-base"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="mt-4 max-w-[68ch] list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground sm:text-base"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="mt-4 max-w-[68ch] list-decimal space-y-2 pl-5 text-sm leading-7 text-muted-foreground sm:text-base"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="pl-1 marker:text-accent-foreground" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-6 rounded-r-lg border-l-4 border-primary bg-surface-elevated/80 px-4 py-3 text-sm leading-relaxed text-foreground [&>p]:mt-0 [&>p]:text-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  a: ({ children, href, ...props }) => {
    const isExternal = href?.startsWith("http");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="font-medium text-primary-link underline decoration-primary-link/50 underline-offset-4 transition-colors hover:decoration-primary-link"
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, className, ...props }) => {
    const isBlock = Boolean(className);
    if (isBlock) {
      return (
        <code
          translate="no"
          className={`font-mono text-xs leading-6 text-foreground sm:text-sm ${className ?? ""}`}
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code
        translate="no"
        className="rounded-md border border-border bg-surface-elevated px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl border border-border bg-surface-elevated p-4 font-mono text-xs leading-6 text-foreground sm:text-sm"
      {...props}
    >
      {children}
    </pre>
  ),
  table: ({ children, ...props }) => (
    <div className="my-6 w-full overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full border-collapse text-left text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead
      className="border-b border-border bg-surface-elevated text-xs font-semibold uppercase tracking-wider text-foreground"
      {...props}
    >
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th scope="col" className="px-4 py-3 font-mono text-xs" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="border-t border-border px-4 py-3 align-top text-sm text-muted-foreground"
      {...props}
    >
      {children}
    </td>
  ),
  hr: (props) => <hr className="my-8 border-border" {...props} />,
};
