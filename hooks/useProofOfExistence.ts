import { useState, useCallback } from "react";
import { ethers } from "ethers";
import {
  PROOF_OF_EXISTENCE_ABI,
  CONTRACT_ADDRESS,
} from "@/lib/ProofOfExistence.abi";

declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider;
  }
}

export interface ProofResult {
  timestamp: number;
  owner: string;
  exists: boolean;
}

export function useProofOfExistence() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getContract = useCallback(async (withSigner = false) => {
    if (!window.ethereum) throw new Error("MetaMask not found");

    const provider = new ethers.BrowserProvider(window.ethereum);

    if (withSigner) {
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      return new ethers.Contract(
        CONTRACT_ADDRESS,
        PROOF_OF_EXISTENCE_ABI,
        signer,
      );
    }

    return new ethers.Contract(
      CONTRACT_ADDRESS,
      PROOF_OF_EXISTENCE_ABI,
      provider,
    );
  }, []);

  const hashFile = useCallback(async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    return (
      "0x" +
      Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
    );
  }, []);

  const notarize = useCallback(
    async (file: File): Promise<string> => {
      setLoading(true);
      setError(null);
      try {
        const contract = await getContract(true);
        const hash = await hashFile(file);
        const tx = await contract.notarize(hash);
        await tx.wait();
        return hash;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [getContract, hashFile],
  );

  const getProof = useCallback(
    async (file: File): Promise<ProofResult> => {
      setLoading(true);
      setError(null);
      try {
        const contract = await getContract(false);
        const hash = await hashFile(file);
        const [timestamp, owner] = await contract.getProof(hash);
        return {
          timestamp: Number(timestamp),
          owner,
          exists: Number(timestamp) !== 0,
        };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [getContract, hashFile],
  );

  return { notarize, getProof, loading, error };
}
