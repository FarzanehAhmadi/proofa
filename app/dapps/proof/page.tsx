"use client";

import { useState, useCallback } from "react";
import { useProofOfExistence, ProofResult } from "@/hooks/useProofOfExistence";

export default function ProofOfExistencePage() {
  const { notarize, getProof, loading, error } = useProofOfExistence();
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [proof, setProof] = useState<ProofResult | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [mode, setMode] = useState<"idle" | "notarized" | "verified">("idle");

  const handleFile = (f: File) => {
    setFile(f);
    setProof(null);
    setTxHash(null);
    setMode("idle");
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const handleNotarize = async () => {
    if (!file) return;
    try {
      const hash = await notarize(file);
      setTxHash(hash);
      setMode("notarized");
    } catch {}
  };

  const handleVerify = async () => {
    if (!file) return;
    try {
      const result = await getProof(file);
      setProof(result);
      setMode("verified");
    } catch {}
  };

  return (
    <div className="container mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Proof of Existence</h1>
      <p className="mt-4 text-xl text-muted-foreground">
        Upload any file, we&apos;ll hash it and store the hash on the blockchain
        to prove it existed at this moment.
      </p>

      <div className="mt-12 rounded-xl border bg-card p-8">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <ol className="mt-6 space-y-4 text-muted-foreground">
          <li>1. Select or drag &amp; drop a file</li>
          <li>2. We compute SHA-256 hash in your browser</li>
          <li>3. You sign &amp; send the hash to Ethereum</li>
          <li>4. Get a permanent, verifiable proof</li>
        </ol>

        {/* Drop zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}
          className={`mt-10 cursor-pointer rounded-lg border-2 border-dashed p-10 text-center transition-colors
            ${
              dragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/40"
            }`}
        >
          <input
            id="file-input"
            type="file"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          {file ? (
            <div className="space-y-1">
              <p className="text-lg font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB — click to change
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-lg font-medium">
                Drop your file here or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Any file type supported
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        {file && (
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleNotarize}
              disabled={loading}
              className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? "Processing…" : "Notarize on blockchain"}
            </button>
            <button
              onClick={handleVerify}
              disabled={loading}
              className="flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:bg-muted disabled:opacity-50"
            >
              {loading ? "Processing…" : "Verify existence"}
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            This document already existed on chain.
          </div>
        )}

        {/* Result — Notarized */}
        {mode === "notarized" && txHash && (
          <div className="mt-6 rounded-lg border border-green-500/30 bg-green-500/10 p-4 space-y-2">
            <p className="font-medium text-green-700 dark:text-green-400">
              ✓ Successfully notarized
            </p>
            <p className="text-sm text-muted-foreground">Document hash:</p>
            <p className="break-all rounded bg-muted px-3 py-2 font-mono text-xs">
              {txHash}
            </p>
          </div>
        )}

        {/* Result — Verified */}
        {mode === "verified" && proof && (
          <div
            className={`mt-6 rounded-lg border p-4 space-y-2 ${
              proof.exists
                ? "border-green-500/30 bg-green-500/10"
                : "border-muted bg-muted/40"
            }`}
          >
            {proof.exists ? (
              <>
                <p className="font-medium text-green-700 dark:text-green-400">
                  ✓ Document is on-chain
                </p>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Owner: </span>
                    <span className="font-mono text-xs">{proof.owner}</span>
                  </p>
                  <p>
                    <span className="font-medium text-foreground">
                      Notarized:{" "}
                    </span>
                    {new Date(proof.timestamp * 1000).toLocaleString()}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">
                ✗ No record found for this file
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
