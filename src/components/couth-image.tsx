import Image, { type ImageProps } from "next/image";

/**
 * Unified image wrapper.
 *
 * Today: thin pass-through to `next/image` with conservative defaults
 * (auto WebP via Next's built-in optimizer, `sizes` encouraged).
 *
 * Tomorrow: when we migrate asset storage to R2 / Cloudflare Images /
 * imgix, only this file changes. The rest of the app keeps importing
 * `<CouthImage>`. Add a `loader` prop here and swap `src` rewrites
 * centrally.
 *
 * Accessibility: alt is required by the type. We warn in dev if it's
 * empty string without `aria-hidden`.
 */
export function CouthImage({ alt, ...rest }: ImageProps) {
  if (process.env.NODE_ENV !== "production") {
    const isDecorative =
      typeof alt === "string" &&
      alt === "" &&
      (rest as Record<string, unknown>)["aria-hidden"] !== "true";
    if (isDecorative) {
      // eslint-disable-next-line no-console
      console.warn(
        "[CouthImage] Image with empty alt should also have aria-hidden=\"true\" if purely decorative.",
      );
    }
  }
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image alt={alt} {...rest} />;
}
