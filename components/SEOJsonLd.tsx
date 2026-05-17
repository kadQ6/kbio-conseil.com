export function SEOJsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify is safe here: data is built server-side from typed helpers.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
