export default function TypographyDemo() {
  return (
    <div className="p-8 space-y-12">
      {/* Heading Section */}
      <section className="space-y-6">
        <h2 className="font-heading text-2xl">Headings</h2>

        <div className="space-y-4">
          <h1>H1 Default</h1>
          <h1 className="h1-large">H1 Large (Desktop)</h1>
          <h2>H2 Heading</h2>
          <h3>H3 Heading</h3>
          <h4>H4 Heading</h4>
          <h5>H5 Heading</h5>
        </div>
      </section>

      {/* Sub Headings */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl">Sub Headings</h2>

        <p className="sub1">Sub1 Text</p>
        <p className="sub2">Sub2 Text</p>
      </section>

      {/* Body Text */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl">Body Text</h2>

        <p className="body-l">Body Large (18px)</p>
        <p className="body-m">Body Medium (16px)</p>
        <p className="body-s">Body Small (14px)</p>
        <p className="body-xs">Body Extra Small (12px)</p>
      </section>

      {/* Button Typography */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl">Button Text</h2>

        <button className="btn-l bg-primary text-primary-foreground px-4 py-2 rounded-lg">
          Button Large
        </button>

        <button className="btn-m bg-secondary text-secondary-foreground px-4 py-2 rounded-lg">
          Button Medium
        </button>

        <button className="btn-s bg-muted px-4 py-2 rounded-lg">
          Button Small
        </button>
        <button className="btn-xs bg-muted px-4 py-2 rounded-lg">
          Button Small
        </button>
      </section>
    </div>
  );
}
