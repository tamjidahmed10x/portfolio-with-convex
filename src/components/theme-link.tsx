import { Link, useSearch } from '@tanstack/react-router'

/**
 * ThemeLink - A wrapper around TanStack Router's Link that preserves theme search params
 * This ensures that mode and palette params persist across navigation
 */
export const ThemeLink = (props: any) => {
  // Get current search params (including theme params)
  const currentSearch = useSearch({ strict: false }) as Record<string, unknown>

  // Extract theme params
  const themeParams: Record<string, unknown> = {}
  if (currentSearch.mode) themeParams.mode = currentSearch.mode
  if (currentSearch.palette) themeParams.palette = currentSearch.palette

  // If no theme params, just use original Link
  if (Object.keys(themeParams).length === 0) {
    return <Link {...props} />
  }

  // Merge theme params with existing search prop
  const { search: searchProp, ...restProps } = props

  const mergedSearch = (prev: Record<string, unknown>) => {
    // If searchProp is a function, call it with prev and merge
    if (typeof searchProp === 'function') {
      const newSearch = searchProp(prev)
      return { ...themeParams, ...newSearch }
    }

    // If searchProp is an object, merge it
    if (searchProp && typeof searchProp === 'object') {
      return { ...themeParams, ...searchProp }
    }

    // Just return theme params
    return themeParams
  }

  return <Link {...restProps} search={mergedSearch} />
}

export default ThemeLink
