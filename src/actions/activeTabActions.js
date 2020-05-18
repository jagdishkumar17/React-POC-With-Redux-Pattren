export const ACTIVE_TAB = "ACTIVE_TAB";

export function setActiveTab(tab) {
  const action = {
    type: ACTIVE_TAB,
    payload: {tab}
  };
  return action;
}

