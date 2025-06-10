import { useEffect, useState } from "react"

export const useDebounce = <T>(value: T, delay = 750) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debouncedValue
}

// Utilizar da seguinte maneira:

  const debounceSearch = useDebounce(route)

 useEffect(() => {
    // Ação desejada
  }, [debounceSearch])
