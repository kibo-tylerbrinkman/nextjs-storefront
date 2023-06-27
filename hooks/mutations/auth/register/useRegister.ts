/**
 * @module useRegister
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient, REGISTER_USER_ENDPOINT } from '@/lib/gql/client'
import { createAccountAndLoginMutation } from '@/lib/gql/mutations/user/createAccount'
import { loginKeys } from '@/lib/react-query/queryKeys'

import { CustomerAccountAndAuthInfoInput } from '@/lib/gql/types'

const client = makeGraphQLClient(REGISTER_USER_ENDPOINT)
const registerUser = async (customerAccountAndAuthInfoInput: CustomerAccountAndAuthInfoInput) => {
  const response = await client.request({
    document: createAccountAndLoginMutation,
    variables: { customerAccountAndAuthInfoInput },
  })
  return response?.account
}

/**
 * [Mutation hook] useRegister uses the graphQL mutation
 *
 * <b>createCustomerAccountAndLogin(customerAccountAndAuthInfoInput: CustomerAccountAndAuthInfoInput): CustomerAuthTicket</b>
 *
 * Description : Creates account for user and logIn user into account created
 *
 * Parameters passed to function registerUser(customerAccountAndAuthInfoInput: CustomerAccountAndAuthInfoInput) => expects object of type ' CustomerAccountAndAuthInfoInput' containing account, externalPassword, isImport and password.
 *
 * On success, calls invalidateQueries on loginKeys and fetches the updated result.
 *
 * @returns 'response?.account', which contains auth related information for user
 */

export const useRegister = () => {
  const queryClient = useQueryClient()
  const {
    mutate,
    mutateAsync,
    data = {},
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: registerUser,
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: loginKeys.user })
    },
    retry: 0,
  })

  return {
    mutate,
    mutateAsync,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  }
}
