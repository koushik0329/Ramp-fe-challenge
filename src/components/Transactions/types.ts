import { FunctionComponent } from "react"
import { Transaction } from "../../utils/types"

export type SetTransactionApprovalFunction = (params: {
  transactionId: string
  newValue: boolean
  employeeId: string // id of employee who made the transaction
}) => Promise<void>

type TransactionsProps = { transactions: Transaction[] | null }

type TransactionPaneProps = {
  transaction: Transaction
  loading: boolean
  approved?: boolean
  setTransactionApproval: SetTransactionApprovalFunction
}

export type TransactionsComponent = FunctionComponent<TransactionsProps>
export type TransactionPaneComponent = FunctionComponent<TransactionPaneProps>
