"use client";

import React from "react";



function useClipboard({ timeout = 2000 } = {}) {
  const [error, setError] = React.useState<Error | null>(null)
  const [copied, setCopied] = React.useState(false)
  const [copyTimeout, setCopyTimeout] = React.useState<NodeJS.Timeout | null>(null)

  const handleCopyResult = (value: boolean) => {
    copyTimeout && clearTimeout(copyTimeout)
    setCopyTimeout(setTimeout(() => setCopied(false), timeout))
    setCopied(value)
  }

  const copy = (valueToCopy: string) => {
    if ("clipboard" in navigator) {
      navigator.clipboard
        .writeText(valueToCopy)
        .then(() => handleCopyResult(true))
        .catch((err) => setError(err))
    } else {
      setError(new Error("useClipboard: navigator.clipboard is not supported"))
    }
  }

  const reset = () => {
    setCopied(false)
    setError(null)
    copyTimeout && clearTimeout(copyTimeout)
  }

  return { copy, reset, error, copied }
}

export default useClipboard
