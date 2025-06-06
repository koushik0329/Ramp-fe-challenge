import { useCallback } from "react"
import { useCustomFetch } from "src/hooks/useCustomFetch"
import { EndpointCacheKey } from "src/utils/fetch"
import { SetTransactionApprovalParams } from "src/utils/types"
import { TransactionPane } from "./TransactionPane"
import { SetTransactionApprovalFunction, TransactionsComponent } from "./types"

export const Transactions: TransactionsComponent = ({ transactions }) => {
  const { fetchWithCache, clearCacheByEndpoint, getCacheKey, loading } = useCustomFetch()

  const setTransactionApproval = useCallback<SetTransactionApprovalFunction>(
    async ({ transactionId, newValue, employeeId }) => {
      await fetchWithCache<void, SetTransactionApprovalParams>("setTransactionApproval", {
        transactionId,
        value: newValue,
      })

      const employeeEndpoint: EndpointCacheKey = getCacheKey("transactionsByEmployee", { employeeId })
      clearCacheByEndpoint(["paginatedTransactions", employeeEndpoint])
    },
    [fetchWithCache]
  )

  if (transactions === null) {
    return <div className="RampLoading--container">Loading...</div>
  }

  return (
    <div data-testid="transaction-container">
      {transactions.map((transaction) => (
        <TransactionPane
          key={transaction.id}
          transaction={transaction}
          loading={loading}
          setTransactionApproval={setTransactionApproval}
        />
      ))}
    </div>
  )
}
