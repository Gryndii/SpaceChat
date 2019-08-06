//Actions

import * as actions from "../actions";
import { types } from "../types";

describe("ui actions", () => {
  test("startFetching", () => {
    expect(actions.startFetching()).toMatchInlineSnapshot(`
Object {
  "type": "START_FETCHING",
}
`);
  });

  test("stopFetching", () => {
    expect(actions.stopFetching()).toMatchInlineSnapshot(`
Object {
  "type": "STOP_FETCHING",
}
`);
  });

  test("setOnlineState", () => {
    expect(actions.setOnlineState()).toMatchInlineSnapshot(`
Object {
  "type": "SET_ONLINE_STATE",
}
`);
  });

  test("setOflineState", () => {
    expect(actions.setOflineState()).toMatchInlineSnapshot(`
Object {
  "type": "SET_OFLINE_STATE",
}
`);
  });
});
