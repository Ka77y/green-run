export enum BET_RESULT {
  WON = "won",
  LOST = "lost"
}
export const TRANSACTION_SETTLED_CATEGORY: Record<string, string> = {
  [BET_RESULT.WON]: "winning",
  [BET_RESULT.LOST]: "",
};

