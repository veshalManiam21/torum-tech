import React from "react";
import NextLink from "next/link";

import type { Except, Simplify } from "type-fest";
import type { LinkProps as NextLinkProps } from "next/link";

export type LinkProps = Simplify<
  Except<React.ComponentPropsWithoutRef<"a">, "href"> &
    Except<NextLinkProps, "as" | "passHref"> & {
      /** Only affects external links */
      openInNewTab?: boolean;
      iKnowWhatIAmDoing?: boolean;
    }
>;

/**
 * Using `target="_blank"` without `rel="noopener noreferrer"` is a security
 * vulnerability called the "Reverse Tabnabbing".
 *
 * However, the recommendation to fix this vulnerability is to assign a name to
 * the `target` attribute because using `rel="noopener noreferrer"` will fuck
 * with analytics if the href is our own site.
 *
 * There is no way to enforce this with TypeScript, so hopefully you'll see this
 * comment.
 *
 * @example
 * ```html
 * <!-- Bad! -->
 * <a href="https://example.com" target="_blank">Link</a>
 * <!-- Good -->
 * <a href="https://example.com" target="_blank" rel="noopener noreferrer">Link</a>
 * <!-- Better -->
 * <a href="https://example.com" target="some_name">Link</a>
 * ```
 *
 * @see https://owasp.org/www-community/attacks/Reverse_Tabnabbing
 */
export const Link: React.FC<LinkProps> = ({
  children,
  className,
  href,
  openInNewTab = true,
  iKnowWhatIAmDoing,
  locale,
  prefetch,
  rel,
  replace,
  scroll,
  shallow,
  target,
  ...props
}) => {
  const isExternalLink =
    !!href && (typeof href === "string" ? href.startsWith("http") : false);
  const finalTarget =
    target ?? (isExternalLink && openInNewTab ? "_blank" : undefined);
  const finalRel =
    rel ?? (finalTarget === "_blank" ? "noopener noreferrer" : undefined);

  if (
    iKnowWhatIAmDoing !== true &&
    process.env.NODE_ENV !== "production" &&
    finalTarget === "_blank" &&
    (!finalRel || !hasReverseTabnabbingRel(finalRel))
  ) {
    throw new TypeError(
      `Anchor target of "_blank" must be paired with "rel" attribute of value "noopener noreferrer".`
    );
  }

  return (
    <NextLink
      {...{
        href,
        locale,
        prefetch,
        replace,
        scroll,
        shallow,
      }}
      passHref
    >
      <a
        href="replace"
        className={className}
        target={finalTarget}
        rel={finalRel}
        {...props}
      >
        {children}
      </a>
    </NextLink>
  );
};

function hasReverseTabnabbingRel(rel: string): boolean {
  const rels = rel.split(/\s+/);

  let hasNoOpener = false;
  let hasNoReferrer = false;

  for (const r of rels) {
    if (r === "noopener") {
      hasNoOpener = true;
    } else if (r === "noreferrer") {
      hasNoReferrer = true;
    }
    if (hasNoOpener && hasNoReferrer) {
      return true;
    }
  }

  return false;
}
