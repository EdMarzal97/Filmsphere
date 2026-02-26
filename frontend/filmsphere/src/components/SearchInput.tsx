"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialValue = searchParams.get("q") ?? "";

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();

      if (value.trim()) {
        params.set("q", value);
      }

      router.replace(`/?${params.toString()}`);
    }, 200);

    return () => clearTimeout(timeout);
  }, [value, router]);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search movies or actors..."
      className="w-full border rounded px-4 py-2"
    />
  );
}
