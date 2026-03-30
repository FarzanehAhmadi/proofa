export default function ProofOfExistencePage() {
  return (
    <div className="container mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Proof of Existence</h1>
      <p className="mt-4 text-xl text-muted-foreground">
        Upload any file — we&apos;ll hash it and store the hash on the
        blockchain to prove it existed at this moment.
      </p>

      <div className="mt-12 rounded-xl border bg-card p-8">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <ol className="mt-6 space-y-4 text-muted-foreground">
          <li>1. Select or drag & drop a file</li>
          <li>2. We compute SHA-256 hash in your browser</li>
          <li>3. You sign & send the hash to Ethereum / your chosen chain</li>
          <li>4. Get a permanent, verifiable proof</li>
        </ol>

        {/* File upload + hash + transaction logic will go here */}
        <div className="mt-10">
          <p className="text-lg font-medium">
            Drop your file here or click to browse
          </p>
          {/* ... placeholder for dropzone / input ... */}
        </div>
      </div>
    </div>
  );
}
