"use client";

import { useState } from "react";
import { Button } from "@friendly-ui/react";

export function Counter() {
  const [count, setCount] = useState(0);
  return <Button variant="secondary" onClick={() => setCount(count + 1)}>
    Clicked {count} {count === 1 ? "time" : "times"}
  </Button>;
}
