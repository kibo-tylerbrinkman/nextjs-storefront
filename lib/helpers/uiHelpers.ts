import { buildCategoryPathByCode, buildProductPathByCode } from './buildStorefrontUrls'
import { PrCategory } from '../gql/types'
interface UIHelpersType {
  getCategoryLink: (
    category?: string,
    seoFriendlyUrl?: string,
    categoryMap?: FlatMapCategoryTree
  ) => string
  getProductLink: (productCode?: string, seoFriendlyUrl?: string) => string
  flattenCategoryTree: (categoryTree: Array<PrCategory>) => FlatMapCategoryTree
}

export interface FlatMapCategoryTree {
  [key: string]: string
}

export const uiHelpers = (): UIHelpersType => {
  const getCategoryLink = (
    categoryCode?: string,
    seoFriendlyUrl?: string,
    categoryMap?: any
  ): string => buildCategoryPathByCode(categoryCode as string, {}, categoryMap)
  const getProductLink = (productCode?: string, seoFriendlyUrl?: string) =>
    buildProductPathByCode(productCode as string)

  const flattenCategoryTree = (categoryTree: Array<PrCategory> | []) => {
    const flatMap: FlatMapCategoryTree = {}

    function traverse(node: PrCategory, path: string[]) {
      const slug = node.content?.slug || ''
      const currentPath = [...path, slug]
      flatMap[node.categoryCode as string] = currentPath.join('/')

      if (node.childrenCategories) {
        node.childrenCategories.forEach((child: any) => traverse(child, currentPath))
      }
    }

    categoryTree.forEach((cat: any) => traverse(cat, []))
    return flatMap
  }

  return {
    getCategoryLink,
    getProductLink,
    flattenCategoryTree,
  }
}
